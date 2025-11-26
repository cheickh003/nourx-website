# Module Documents - Espace Client Nourx

## Vue d'ensemble

Le module Documents permet le partage de fichiers entre l'administration Nourx et les entreprises clientes avec un système de permissions granulaires.

## Fonctionnalités

### Admin
- Créer des dossiers racines par entreprise
- Créer des sous-dossiers avec hiérarchie libre
- Uploader des fichiers (images, PDF, documents)
- Gérer les permissions de partage par dossier
- Partager des dossiers avec une ou plusieurs entreprises
- Configurer les droits CRUD par partage
- Envoyer des notifications email lors du partage

### Client
- Voir les dossiers partagés avec son entreprise
- Naviguer dans la hiérarchie des dossiers
- Prévisualiser les images et PDF
- Télécharger les fichiers (si autorisé)
- Uploader des fichiers (si autorisé)
- Supprimer des fichiers (si autorisé)

## Architecture technique

### Base de données

3 nouvelles tables créées :

```sql
-- Table des dossiers
CREATE TABLE document_folders (
  id UUID PRIMARY KEY,
  parent_id UUID,                    -- Hiérarchie parent/enfant
  company_id UUID,                   -- Entreprise propriétaire
  name VARCHAR(255),
  slug VARCHAR(255),
  description TEXT,
  can_view BOOLEAN DEFAULT true,     -- Permissions par défaut
  can_download BOOLEAN DEFAULT true,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_upload BOOLEAN DEFAULT false,
  created_by_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Table des documents
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  folder_id UUID NOT NULL,           -- Dossier parent obligatoire
  company_id UUID,                   -- Entreprise propriétaire
  project_id UUID,                   -- Lien optionnel vers un projet
  name VARCHAR(255),
  filename VARCHAR(255),
  r2_key VARCHAR(512),               -- Clé Cloudflare R2
  mime_type VARCHAR(127),
  size INTEGER,
  description TEXT,
  uploaded_by_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Table des partages
CREATE TABLE document_folder_shares (
  id UUID PRIMARY KEY,
  folder_id UUID NOT NULL,
  target_company_id UUID NOT NULL,   -- Entreprise cible du partage
  can_view BOOLEAN DEFAULT true,
  can_download BOOLEAN DEFAULT true,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_upload BOOLEAN DEFAULT false,
  notified_at TIMESTAMPTZ,           -- Date de notification email
  created_at TIMESTAMPTZ
);
```

### Fichiers créés

```
src/
├── db/
│   └── migrations/
│       └── 0007_zippy_meggan.sql          # Migration des 3 tables
│
├── lib/
│   └── validators/
│       └── documents.ts                    # Schémas Zod
│
├── features/
│   └── documents/
│       ├── index.ts                        # Exports
│       ├── commands.ts                     # CRUD operations
│       ├── queries.ts                      # Requêtes lecture
│       ├── permissions.ts                  # Calcul permissions
│       └── notifications.ts                # Emails
│
├── components/
│   └── documents/
│       ├── index.ts
│       ├── file-icon.tsx                   # Icônes par type
│       ├── view-toggle.tsx                 # Liste/Grille
│       ├── folder-item.tsx                 # Affichage dossier
│       ├── document-item.tsx               # Affichage fichier
│       ├── create-folder-dialog.tsx        # Modal création
│       ├── upload-dialog.tsx               # Upload drag & drop
│       ├── preview-modal.tsx               # Prévisualisation
│       └── permissions-dialog.tsx          # Gestion partages
│
├── app/
│   ├── (admin)/admin/documents/
│   │   ├── page.tsx                        # Page principale admin
│   │   └── [folderId]/
│   │       └── page.tsx                    # Détail dossier admin
│   │
│   ├── (client)/documents/
│   │   ├── page.tsx                        # Page principale client
│   │   └── [folderId]/
│   │       └── page.tsx                    # Détail dossier client
│   │
│   └── api/
│       ├── admin/documents/
│       │   ├── folders/
│       │   │   ├── route.ts                # GET liste, POST créer
│       │   │   └── [folderId]/
│       │   │       ├── route.ts            # GET, PATCH, DELETE
│       │   │       ├── permissions/
│       │   │       │   └── route.ts        # Gestion partages
│       │   │       └── upload/
│       │   │           └── route.ts        # Upload fichiers
│       │   └── files/
│       │       └── [documentId]/
│       │           ├── route.ts            # GET, PATCH, DELETE
│       │           └── download/
│       │               └── route.ts        # Téléchargement
│       │
│       └── documents/
│           ├── folders/
│           │   ├── route.ts                # Liste dossiers client
│           │   └── [folderId]/
│           │       └── route.ts            # Détail dossier client
│           └── files/
│               └── [documentId]/
│                   └── download/
│                       └── route.ts        # Téléchargement client
```

### Sécurité (RLS)

Politiques Row-Level Security ajoutées dans `src/db/rls/policies.sql` :

```sql
-- Dossiers : superadmin OU propriétaire OU partagé avec l'entreprise
create policy document_folders_access_policy on document_folders
for all using (
  current_setting('app.role', true) = 'superadmin'
  or company_id = nullif(current_setting('app.company_id', true), '')::uuid
  or exists (
    select 1 from document_folder_shares dfs
    where dfs.folder_id = document_folders.id
      and dfs.target_company_id = nullif(current_setting('app.company_id', true), '')::uuid
      and dfs.can_view = true
  )
);

-- Documents : superadmin OU propriétaire OU dossier parent partagé
create policy documents_access_policy on documents
for all using (
  current_setting('app.role', true) = 'superadmin'
  or company_id = nullif(current_setting('app.company_id', true), '')::uuid
  or exists (
    select 1 from document_folder_shares dfs
    where dfs.folder_id = documents.folder_id
      and dfs.target_company_id = nullif(current_setting('app.company_id', true), '')::uuid
      and dfs.can_view = true
  )
);

-- Partages : superadmin OU entreprise cible
create policy document_folder_shares_access_policy on document_folder_shares
for all using (
  current_setting('app.role', true) = 'superadmin'
  or target_company_id = nullif(current_setting('app.company_id', true), '')::uuid
);
```

## Flux d'utilisation

### Upload de fichier (Admin)

1. Admin clique sur "Uploader" dans un dossier
2. Frontend appelle `POST /api/admin/documents/folders/{folderId}/upload`
3. API génère une URL présignée Cloudflare R2
4. Frontend upload directement vers R2
5. Frontend confirme via `POST` avec les métadonnées
6. Document créé en base avec la clé R2

### Partage de dossier (Admin)

1. Admin ouvre le dialog des permissions
2. Sélectionne une entreprise et les droits
3. `POST /api/admin/documents/folders/{folderId}/permissions`
4. Partage créé en base
5. Email de notification envoyé (optionnel)

### Accès client

1. Client accède à `/documents`
2. API liste les dossiers partagés avec son entreprise
3. Permissions calculées selon le partage
4. Actions disponibles selon les droits

## Modèle de permissions

Les permissions sont définies au niveau du partage de dossier :

| Permission | Description |
|------------|-------------|
| `canView` | Peut voir le dossier et son contenu |
| `canDownload` | Peut télécharger les fichiers |
| `canEdit` | Peut renommer fichiers/dossiers |
| `canDelete` | Peut supprimer des fichiers |
| `canUpload` | Peut uploader de nouveaux fichiers |

Les documents **héritent** des permissions de leur dossier parent.

## Configuration requise

### Variables d'environnement

```env
# Cloudflare R2 (déjà configuré)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET=
CLOUDFLARE_R2_PUBLIC_URL=

# Email (déjà configuré)
RESEND_API_KEY=
EMAIL_FROM=
```

### Application des migrations

```bash
# Appliquer la migration
npx drizzle-kit migrate

# Appliquer les politiques RLS
npx tsx scripts/apply-rls.ts --force
```

## Interface utilisateur

### Vue Admin

- **Page principale** : Stats (dossiers, fichiers, partages, stockage) + liste des dossiers par entreprise
- **Page dossier** : Breadcrumb, sous-dossiers, fichiers, boutons actions
- **Toggle vue** : Liste ou grille
- **Dialogs** : Création dossier, upload, gestion permissions

### Vue Client

- **Page principale** : Liste des dossiers partagés avec l'entreprise
- **Page dossier** : Navigation, fichiers, actions selon permissions
- **Prévisualisation** : Modal pour images et PDF

## Routes ajoutées

### Middleware (`middleware.ts`)

```typescript
const CLIENT_ROUTES = [
  // ...existants
  "/documents",
  "/api/documents",
];

// Matcher mis à jour
matcher: [
  // ...existants
  "/documents/:path*",
  "/api/documents/:path*",
]
```

### Navigation

- **Admin** : `/admin/documents` (ajouté dans `admin-sidebar.tsx`)
- **Client** : `/documents` (ajouté dans `client-sidebar.tsx`)

## Types exportés

```typescript
// src/db/schema.ts
export type DocumentFolder = typeof documentFolders.$inferSelect;
export type NewDocumentFolder = typeof documentFolders.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type DocumentFolderShare = typeof documentFolderShares.$inferSelect;
export type NewDocumentFolderShare = typeof documentFolderShares.$inferInsert;

// src/lib/validators/documents.ts
export type Permissions = {
  canView: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canUpload: boolean;
};
```

## Améliorations futures possibles

- [ ] Versioning des fichiers
- [ ] Historique/audit des accès
- [ ] Partage avec utilisateurs individuels
- [ ] Recherche de documents
- [ ] Tags et catégories
- [ ] Quotas de stockage par entreprise
- [ ] Compression automatique des images
- [ ] Scan antivirus à l'upload

## Date d'implémentation

25 novembre 2025
