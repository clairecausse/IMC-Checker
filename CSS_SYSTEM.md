# 📐 Système de Design CSS - IMC Checker

## 🎨 Palette de Couleurs

Basée sur les couleurs du logo :

```
--primary-teal: #43c6ac    (Turquoise/Teal)
--primary-dark: #191654    (Bleu foncé)
--primary-blue: #195c9f    (Bleu)
--secondary-light: #eef6fa (Bleu très clair)
--secondary-lighter: #d4edf4 (Bleu clair)
--text-dark: #263238       (Texte foncé)
--text-light: #f5f5f5      (Texte clair)
```

## 📁 Structure CSS

```
src/
├── index.css              # Feuille de style principale
├── design-system.css      # Variables de design réutilisables
├── globals.css           # Styles globaux et réinitialisations
├── components/
│   ├── Navbar.css        # Navigation
│   ├── BmiForm.css       # Formulaires
│   └── BmiResult.css     # Résultats IMC
├── pages/
│   ├── Pages.css         # Styles des pages
│   └── Client/
│       └── History.css   # Historique
└── router/
    └── AppRouter.css     # Conteneur principal
```

## 🚀 Fonctionnalités

### Marges et Espacement

- Conteneur principal avec **padding: 2.5rem 3rem**
- Sections avec marges cohérentes
- Padding responsive pour mobile (1rem)

### Design Cohérent

- Dégradés primaires : `linear-gradient(135deg, #43c6ac 0%, #191654 100%)`
- Ombres : `var(--shadow-md)` et `var(--shadow-lg)`
- Border-radius : `10px` pour tous les éléments

### Composants Stylisés

- **Boutons** : Dégradé + effet hover avec transform
- **Inputs** : Border teal au focus avec ombre
- **Sections** : Border-left teal avec animation fadeInUp
- **Historique** : Cartes élégantes avec gradient

### Animations

- `fadeInUp` : Apparition avec mouvement vers le haut
- `slideIn` : Glissement depuis la gauche
- `popIn` : Zoom d'apparition

## 📱 Responsive Design

### Breakpoints

- **1024px** : Réduction du padding
- **768px** : Tablette - Réduction des typos et espacements
- **480px** : Mobile - Layout compact

### Navigation Adaptée

- Desktop : Liens en ligne avec hover
- Mobile : Navigation compacte et optimisée

## 🎯 Utilisation

### Importer le système

```tsx
import "./index.css";
```

### Utiliser les variables CSS

```css
.element {
  color: var(--primary-teal);
  box-shadow: var(--shadow-md);
  background: var(--gradient-primary);
}
```

### Classes Utilitaires

```html
<!-- Sections -->
<section class="calculator">...</section>
<section class="history-section">...</section>

<!-- Formulaires -->
<div class="form-group">
  <label>Label</label>
  <input type="text" />
</div>

<!-- Historique -->
<ul class="history-list">
  <li class="history-item">...</li>
</ul>
```

## ✨ Points Clés

✅ **Professionnel** : Design sobre et élégant
✅ **Cohérent** : Palette de couleurs du logo respectée
✅ **Responsive** : Fonctionne sur tous les appareils
✅ **Accessible** : Contraste suffisant, focus visible
✅ **Performant** : CSS optimisé sans dépendances
✅ **Maintenable** : Code bien organisé et documenté

## 🔄 Mises à Jour Futures

Pour modifier les couleurs globalement, éditez `design-system.css` :

```css
:root {
  --primary-teal: #nouvelle-couleur;
  /* ... */
}
```

Toutes les pages et composants hériteront automatiquement des nouvelles couleurs.
