---
description: Generate the website design
---

# PROMPT OPTIMISÉ CLAUDE CODE - SITE VITRINE COMPLET

## CONTEXTE & OBJECTIF

Vous devez créer un site vitrine professionnel complet pour un développeur fullstack freelance spécialisé en NodeJS, Svelte, Flutter et MySQL. Le site doit être techniquement irréprochable, SEO-optimisé, RGPD-compliant et parfaitement responsive.

## FICHIERS DE RÉFÉRENCE DISPONIBLES À LA RACINE

- `design.json` : Design system complet avec couleurs, typographie, composants et règles d'application
- `README.md` : Contenus textuels et idées pour alimenter le site

## STACK TECHNIQUE REQUISE

- **Frontend** : HTML5 sémantique, CSS3 moderne (Grid/Flexbox), JavaScript vanilla ES6+
- **Performance** : Code optimisé, images WebP, lazy loading, minification
- **SEO** : Métadonnées complètes, Schema.org, sitemap.xml, robots.txt
- **RGPD** : Banner cookies, politique de confidentialité, formulaires conformes
- **Responsive** : Mobile-first, breakpoints standards, accessibilité WCAG 2.1

## STRUCTURE DU PROJET ATTENDUE ET DÉJÀ PARTIELLEMENT EXISTANTE

```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── ...(optional css)
│   ├── js/
│   │   ├── script.js
│   │   ├── ...(optional js)
│   └── images/
│       ├── logo.png
├── index.html
├── ...(optionnal html)
├── sitemap.xml
├── robots.txt
└── README.md
└── design.json
```

## DIRECTIVES SPÉCIFIQUES

### 1. DESIGN SYSTEM (design.json)

- **IMPÉRATIF** : Respecter EXACTEMENT les couleurs, typographies et composants définis
- Appliquer la couleur primaire #0f8cc8 uniquement selon les règles spécifiées
- Utiliser les motifs hexagonaux comme éléments décoratifs uniquement
- Respecter les règles "DO NOT" pour éviter les erreurs d'application

### 2. SEO TECHNIQUE

- Métadonnées complètes (title, description, keywords, og:, twitter:)
- Structure H1-H6 sémantique et logique
- Schema.org pour les données structurées (Person, Organization, Service)
- Images optimisées avec alt text descriptif
- URLs propres et parlantes
- Temps de chargement < 3 secondes

### 3. RGPD COMPLIANCE

- Banner de consentement cookies avec choix granulaire
- Page mentions légales complète (SIRET, contact, hébergeur)
- Politique de confidentialité détaillée
- Formulaires avec cases de consentement explicite
- Pas de tracking sans consentement

### 4. PERFORMANCE & ACCESSIBILITÉ

- Score Lighthouse > 90 sur tous les critères
- Navigation clavier complète
- Contrastes de couleurs WCAG 2.1 AA
- Aria-labels et rôles appropriés
- Responsive design fluide 320px-2560px

### 5. CONTENU (README.md)

- Utiliser les textes fournis comme base
- Adapter le ton professionnel mais accessible
- Éviter les superlatifs marketing excessifs
- Rester factuel sur les compétences et expériences

## SECTIONS DU SITE OBLIGATOIRES

### PAGE D'ACCUEIL

1. **Hero Section** : Présentation claire, CTA visible
2. **Services** : NodeJS, Svelte, Flutter, MySQL avec descriptions
3. **À propos** : Parcours professionnel depuis 2015
4. **Portfolio/Réalisations** : 3-4 projets représentatifs
5. **Témoignages** : Si disponibles dans README.md
6. **Contact** : Formulaire + informations

### PAGES SECONDAIRES

- **Services détaillés** : Technologies, méthodologies, tarification
- **Portfolio complet** : Projets avec technologies utilisées
- **Contact** : Formulaire RGPD-compliant + coordonnées
- **Mentions légales** : Conformité légale complète

## CONTRAINTES TECHNIQUES CRITIQUES

### CSS

- Utiliser CSS Grid et Flexbox modernes
- Variables CSS pour les couleurs du design system
- Animations fluides (transform, opacity)
- Media queries mobile-first
- Pas de frameworks CSS externes

### JavaScript

- Vanilla JS ES6+ uniquement
- Gestion du consentement cookies
- Formulaire avec validation côté client
- Lazy loading des images
- Navigation smooth scroll

### HTML

- Sémantique parfaite (nav, main, section, article, aside)
- Microdata Schema.org intégrées
- Meta tags complets pour chaque page
- Liens internes optimisés

## OPTIMISATIONS ATTENDUES

- Images next-gen (WebP avec fallback)
- CSS et JS minifiés en production
- Preload des ressources critiques
- Cache headers appropriés
- Sitemap XML automatiquement généré

## TESTS DE VALIDATION

Votre code doit passer :

- Validation W3C HTML/CSS
- Test PageSpeed Insights (score > 90)
- Test accessibilité WAVE
- Test responsive sur tous breakpoints
- Vérification RGPD avec outils dédiés

## LIVRABLES FINAUX

1. Code source complet et commenté
2. Documentation technique (README.md)
3. Guide de déploiement
4. Checklist SEO/RGPD complétée
5. Rapport de performance (screenshots Lighthouse)

## INSTRUCTIONS D'EXÉCUTION

1. Analyser design.json pour comprendre le système visuel
2. Lire README.md pour s'imprégner du contenu
3. Créer la structure de fichiers
4. Développer page par page en commençant par l'accueil
5. Implémenter le système RGPD
6. Optimiser les performances
7. Tester sur tous les critères listés

**CRUCIAL** : Ne prenez aucun raccourci sur la qualité technique. Ce site doit être exemplaire en termes de code, performance et conformité légale. Chaque ligne de code doit avoir sa justification technique.
