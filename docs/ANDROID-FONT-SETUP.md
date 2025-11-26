# Installation de la police Android

## ✅ Configuration complète

La police Android a été configurée sur tout le site Nourx. Voici ce qui a été fait :

### 1. **Structure créée**
- `app/fonts/` - Dossier pour les polices locales
- `app/fonts.ts` - Configuration des polices
- `app/fonts/Android.ttf` - Fichier placeholder (à remplacer)

### 2. **Configuration Next.js**
- Import de la police avec `localFont` dans `app/fonts.ts`
- Variable CSS `--font-android` ajoutée
- Fallback vers Inter si la police n'est pas chargée

### 3. **Configuration Tailwind**
- Classe `font-android` disponible dans tout le projet
- Peut être utilisée avec : `className="font-android"`

### 4. **Applications actuelles**

La police Android est maintenant appliquée sur :

#### Pages principales
- **Services** : Titre principal + Numéros 01-09
- **À propos** : Titre principal + Statistiques (150+, 50+, etc.)
- **Expertise** : Titre principal + Stats (30+, 150+, 99.9%)
- **Réalisations** : Titre principal + Stats
- **Contact** : Titre principal

#### Composants Homepage
- **Hero** : Titre avec effet typewriter + Stats
- **Services** : Titre de section

## 🚨 ACTION REQUISE

**Téléchargez la vraie police Android :**
1. Allez sur https://www.dafont.com/android.font
2. Cliquez sur "Télécharger"
3. Extrayez le ZIP
4. Remplacez `app/fonts/Android.ttf` par le vrai fichier

## 📝 Utilisation future

Pour appliquer la police Android à de nouveaux éléments :

```jsx
// Pour un titre
<h1 className="font-android text-5xl">Mon titre</h1>

// Pour un nombre
<span className="font-android text-7xl">99</span>

// Avec d'autres classes Tailwind
<p className="font-android text-4xl font-bold text-nourx-blue">42</p>
```

## 🎨 Stratégie typographique

- **Police Android** : Titres principaux, numéros, éléments d'accent tech
- **Inter** : Police unique pour tout le site
- **Inter** : Corps de texte, paragraphes

Cette hiérarchie crée une identité visuelle cohérente avec votre logo tout en maintenant une excellente lisibilité.