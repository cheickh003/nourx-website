# Configuration des offres d'emploi et candidatures

## Vue d'ensemble

Le système de candidature permet aux candidats de postuler en ligne aux offres d'emploi publiées. Les documents (CV, lettres de motivation) sont stockés sur Cloudflare R2 et les candidatures sont envoyées par email aux administrateurs.

## Architecture

### Pages
- `/offres-emploi` - Liste des offres d'emploi
- `/offres-emploi/postuler?job=<job-id>` - Formulaire de candidature multi-étapes

### API
- `POST /api/jobs/apply` - Soumission de candidature (multipart/form-data)

### Stockage
- Cloudflare R2 (compatible S3) pour les documents uploadés
- Organisation: `jobs/<job-id>/<timestamp>-<filename>`
- Liens présignés valides 7 jours pour les admins

## Configuration requise

### 1. Variables d'environnement

Créez ou mettez à jour votre fichier `.env.local` avec ces variables:

```bash
# Email (unifiées pour tout le site)
EMAIL_HOST=mail.spacemail.com
EMAIL_PORT=465
EMAIL_USER=no-reply@nourx.dev
EMAIL_PASS=********
EMAIL_FROM="Nourx" <no-reply@nourx.dev>
ADMIN_EMAILS=cheickh@nourx.dev,cheickh.keita@outlook.fr

# Cloudflare R2
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxx
R2_BUCKET=nourx-candidatures
```

### 2. Configuration Cloudflare R2

#### Étape 1: Créer un bucket R2
1. Connectez-vous à votre dashboard Cloudflare
2. Naviguez vers **R2 Object Storage**
3. Cliquez sur **Create bucket**
4. Nom du bucket: `nourx-candidatures`
5. Région: Automatic (ou choisir la plus proche de vos utilisateurs)

#### Étape 2: Générer les clés d'accès API
1. Dans R2, allez dans **Manage R2 API Tokens**
2. Cliquez sur **Create API token**
3. Nom: `Nourx Candidatures API`
4. Permissions: **Object Read & Write**
5. Bucket: Sélectionnez `nourx-candidatures`
6. Copiez:
   - Access Key ID → `R2_ACCESS_KEY_ID`
   - Secret Access Key → `R2_SECRET_ACCESS_KEY`
   - Account ID → `R2_ACCOUNT_ID` (dans l'URL de votre dashboard)

⚠️ **Important**: Sauvegardez les clés immédiatement, elles ne seront plus affichées.

#### Étape 3: Configuration CORS (optionnel)
Si vous voulez permettre l'upload direct depuis le navigateur (futur), configurez CORS:

```json
[
  {
    "AllowedOrigins": ["https://nourx.dev", "https://www.nourx.dev"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 3. Dépendances installées

Les packages suivants ont été ajoutés:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner react-day-picker date-fns @radix-ui/react-popover
```

## Fonctionnalités

### Formulaire de candidature (4 étapes)

1. **Informations personnelles**
   - Nom complet
   - Email
   - Téléphone (format ivoirien: +225 ou 10 chiffres)

2. **Détails du profil**
   - Niveau d'études (Bac à Doctorat)
   - Années d'expérience
   - Date de disponibilité (date picker)
   - Localisation (communes d'Abidjan)

3. **Documents**
   - CV (obligatoire, PDF/DOC/DOCX, max 8 Mo)
   - Lettre de motivation (optionnel)
   - Autre document (optionnel)

4. **Motivation & Consentement**
   - Lettre de motivation (min 100 caractères)
   - Case de consentement CNDP (loi ivoirienne n° 2013-450)

### Validation

- Validation côté client (React Hook Form + Zod)
- Validation côté serveur (taille/type fichiers, champs obligatoires)
- Messages d'erreur contextuels

### Emails

#### Email admin (2 destinataires)
- Détails complets du candidat
- Liens présignés vers les documents (valides 7 jours)
- Lettre de motivation intégrée
- Design cohérent avec la marque

#### Email candidat (confirmation)
- Accusé de réception
- Récapitulatif de la candidature
- Timeline des prochaines étapes
- Coordonnées de contact

## Gestion des offres

Pour ajouter/modifier/supprimer des offres, éditez le fichier:

```
data/jobs.ts
```

Structure d'une offre:

```typescript
{
  id: 'identifiant-unique',
  title: 'Titre du poste',
  location: 'Abidjan, Côte d\'Ivoire',
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance',
  department: 'Département',
  description: 'Description courte...',
  responsibilities: ['...'],
  requirements: ['...'],
  niceToHave?: ['...'],
  benefits?: ['...'],
  postedAt: '2025-01-15'
}
```

## Sécurité

- ✅ Validation stricte des types de fichiers (PDF, DOC, DOCX uniquement)
- ✅ Limite de taille: 8 Mo par fichier
- ✅ Sanitisation des noms de fichiers
- ✅ Clés R2 organisées par job + timestamp
- ✅ Liens présignés avec expiration (7 jours)
- ✅ Validation des données côté serveur
- ✅ Runtime Node.js pour l'API (accès Nodemailer)

## Conformité Côte d'Ivoire

- ✅ Formulaire en français
- ✅ Validation téléphone ivoirien (+225)
- ✅ Communes d'Abidjan dans le sélecteur
- ✅ Fuseau horaire Africa/Abidjan dans les emails
- ✅ Consentement CNDP (loi n° 2013-450)
- ✅ Lien vers politique de confidentialité

## Responsive Design

- ✅ Mobile-first (≥375px)
- ✅ Tablet (≥768px)
- ✅ Desktop (≥1024px)
- ✅ Navigation par étapes claire
- ✅ Upload de fichiers tactile-friendly

## Tests recommandés

1. **Upload de fichiers**
   - [ ] Upload CV PDF (< 8 Mo) → succès
   - [ ] Upload fichier > 8 Mo → erreur
   - [ ] Upload fichier non-PDF/DOC/DOCX → erreur
   - [ ] Upload 3 fichiers (CV + lettre + autre) → succès

2. **Validation formulaire**
   - [ ] Email invalide → erreur
   - [ ] Téléphone invalide → erreur
   - [ ] Téléphone format +225 et 10 chiffres → succès
   - [ ] Lettre motivation < 100 chars → erreur
   - [ ] Case consentement non cochée → erreur

3. **Emails**
   - [ ] Email admin reçu par les 2 destinataires
   - [ ] Liens R2 fonctionnels (téléchargement docs)
   - [ ] Email candidat reçu avec récapitulatif

4. **Responsive**
   - [ ] Liste offres lisible sur mobile
   - [ ] Formulaire utilisable sur mobile (≤375px)
   - [ ] Date picker fonctionnel sur tactile

## Maintenance

### Nettoyage R2
Les fichiers restent sur R2 indéfiniment. Pour nettoyer:

1. **Manuellement**: via dashboard Cloudflare R2
2. **Automatiquement**: configurer une règle de lifecycle dans R2
   - Exemple: supprimer les fichiers > 90 jours

### Monitoring
- Surveiller les logs serveur pour les erreurs d'upload R2
- Vérifier la réception des emails admin
- Surveiller l'espace de stockage R2 utilisé

## Support

Pour toute question:
- Email: cheickh@nourx.dev
- Téléphone: +225 07 20 11 11 08

