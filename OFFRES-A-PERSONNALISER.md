# 📝 Offres d'Emploi à Personnaliser

Ce fichier contient les templates des 2 offres actuellement dans `data/jobs.ts`.
**Personnalise-les selon tes besoins réels**, puis édite directement le fichier `data/jobs.ts`.

---

## Offre 1 : Développeur Full-Stack Senior

### Informations de base
- **ID** : `dev-fullstack-senior` (ne pas changer, utilisé dans les URLs)
- **Titre** : Développeur Full-Stack Senior
- **Localisation** : Abidjan, Côte d'Ivoire
- **Type de contrat** : CDI
- **Département** : Développement
- **Date de publication** : 2025-01-15 (à mettre à jour)

### Description
Nous recherchons un développeur Full-Stack senior pour rejoindre notre équipe technique. Vous travaillerez sur des projets innovants pour des clients locaux et internationaux, en utilisant les technologies les plus récentes.

### Responsabilités
- Concevoir et développer des applications web modernes et performantes
- Collaborer avec les équipes design et produit pour définir les spécifications techniques
- Assurer la maintenance et l'évolution des applications existantes
- Participer aux revues de code et mentorat des développeurs juniors
- Optimiser les performances et la sécurité des applications

### Profil recherché
- Bac+3 minimum en informatique ou équivalent
- 5+ années d'expérience en développement web
- Maîtrise de React, Next.js, Node.js et TypeScript
- Expérience avec les bases de données SQL et NoSQL
- Connaissance des bonnes pratiques de développement (Git, CI/CD, tests)
- Excellentes compétences en communication en français

### Atouts supplémentaires (Nice to have)
- Expérience avec les technologies cloud (AWS, Azure, Cloudflare)
- Connaissance de l'écosystème mobile (React Native)
- Contributions open-source

### Avantages
- Salaire compétitif selon expérience
- Environnement de travail moderne et collaboratif
- Formation continue et accès aux dernières technologies
- Assurance maladie
- Opportunités d'évolution de carrière

---

## Offre 2 : Designer UI/UX

### Informations de base
- **ID** : `designer-ui-ux` (ne pas changer, utilisé dans les URLs)
- **Titre** : Designer UI/UX
- **Localisation** : Abidjan, Côte d'Ivoire
- **Type de contrat** : CDI
- **Département** : Design
- **Date de publication** : 2025-01-10 (à mettre à jour)

### Description
Rejoignez notre équipe créative en tant que Designer UI/UX. Vous serez responsable de la conception d'interfaces utilisateur élégantes et intuitives pour nos projets web et mobile.

### Responsabilités
- Concevoir des maquettes et prototypes interactifs pour web et mobile
- Réaliser des recherches utilisateurs et des tests d'utilisabilité
- Créer et maintenir des systèmes de design cohérents
- Collaborer avec les développeurs pour assurer l'implémentation fidèle
- Définir l'architecture de l'information et les parcours utilisateurs

### Profil recherché
- Bac+3 en design graphique, design d'interaction ou équivalent
- 3+ années d'expérience en design UI/UX
- Maîtrise de Figma, Adobe XD ou Sketch
- Portfolio démontrant des projets web et mobile
- Compréhension des principes de design responsive et accessible
- Excellente maîtrise du français

### Atouts supplémentaires (Nice to have)
- Connaissance de HTML/CSS
- Expérience en design système et tokens
- Compétences en motion design

### Avantages
- Salaire attractif selon profil
- Environnement créatif et stimulant
- Matériel de pointe (Mac, tablette graphique)
- Formations aux nouvelles tendances design
- Flexibilité horaire

---

## 🎯 Comment Personnaliser

### Étape 1 : Prépare tes vraies offres
Documente pour chaque poste :
- Le titre exact
- Les missions principales
- Le profil recherché (diplômes, expérience)
- Les compétences techniques requises
- Le type de contrat (CDI, CDD, Stage)
- Les avantages proposés
- La date de publication

### Étape 2 : Édite data/jobs.ts

Ouvre le fichier :
```
data/jobs.ts
```

Modifie ou remplace les 2 offres existantes avec tes vraies informations.

**Structure à respecter** :
```typescript
{
  id: 'identifiant-unique-en-kebab-case', // Ex: 'chef-projet-digital'
  title: 'Titre du poste',
  location: 'Abidjan, Côte d\'Ivoire', // ou autre ville
  type: 'CDI', // ou 'CDD', 'Stage', 'Freelance'
  department: 'Nom du département',
  description: 'Description courte du poste...',
  responsibilities: [
    'Responsabilité 1',
    'Responsabilité 2',
    // etc.
  ],
  requirements: [
    'Exigence 1',
    'Exigence 2',
    // etc.
  ],
  niceToHave: [ // Optionnel
    'Atout 1',
    'Atout 2',
  ],
  benefits: [ // Optionnel
    'Avantage 1',
    'Avantage 2',
  ],
  postedAt: '2025-01-20' // Format YYYY-MM-DD
}
```

### Étape 3 : Sauvegarde et teste

Après modification, le serveur Next.js rechargera automatiquement.
Vérifie sur :
```
http://localhost:3000/offres-emploi
```

---

## 🔧 Ajouter Plus d'Offres

Pour ajouter une 3ème, 4ème offre, etc. :

1. Ouvre `data/jobs.ts`
2. Ajoute un nouvel objet dans le tableau `jobs` :

```typescript
export const jobs: Job[] = [
  {
    // Offre 1 (existante)
  },
  {
    // Offre 2 (existante)
  },
  {
    // 👇 NOUVELLE OFFRE
    id: 'nouvelle-offre-id',
    title: 'Nouveau Poste',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'CDI',
    department: 'Département',
    description: '...',
    responsibilities: ['...'],
    requirements: ['...'],
    postedAt: '2025-01-25'
  }
]
```

3. Sauvegarde → L'offre apparaît automatiquement sur la page

---

## 🎨 Personnalisation Visuelle (Optionnel)

Si tu veux modifier le design des cards d'offres ou du formulaire :

### Cards d'offres
Fichier : `app/(pages)/offres-emploi/page.tsx`
- Lignes ~70-150 : Structure et style des cards

### Formulaire
Fichier : `components/jobs/ApplicationForm.tsx`
- Lignes ~240-280 : Étape 1 (Infos personnelles)
- Lignes ~285-395 : Étape 2 (Détails profil)
- Lignes ~400-550 : Étape 3 (Documents)
- Lignes ~555-620 : Étape 4 (Motivation)

---

## 💡 Conseils

### Rédaction d'offres efficaces
1. **Titre clair** : Évite les jargons, sois précis
2. **Description concise** : 2-3 phrases max
3. **Responsabilités** : 4-6 points, commencer par des verbes d'action
4. **Requirements** : Séparer "indispensables" et "nice to have"
5. **Avantages** : Sois transparent sur la rémunération et les bénéfices

### SEO
- Utilise des mots-clés pertinents dans le titre et la description
- Sois spécifique sur la localisation (Abidjan, quartier si pertinent)
- Mentionne les technologies/outils clés

### Recrutement en CI
- Précise si télétravail possible
- Indique le salaire ou la fourchette (optionnel mais apprécié)
- Mentionne la prise en charge des transports si applicable
- Évoque les opportunités de formation continue

---

## 📞 Besoin d'Aide ?

Si tu as besoin d'aide pour rédiger ou personnaliser les offres :
- Email : cheickh@nourx.dev
- Téléphone : +225 07 20 11 11 08

**Tu peux aussi me donner directement les détails de tes 2 offres et je les intégrerai dans le code !**

