# pyTuto

Site pour apprendre Python pas à pas, directement dans le navigateur : la leçon à gauche, l'éditeur et la sortie à droite.
Python tourne côté navigateur (Pyodide), il n'y a aucun serveur à installer.

## Lancer en local

```
npm install
npm run dev
```

## Ajouter des leçons

Le contenu est dans `content/`, un dossier par module :

```
content/
  01-bases/
    module.json        titre, icône, description, mode
    01-print.md        une leçon
  02-turtle/
  03-jeux-pygame/
```

- Les dossiers et fichiers sont classés par ordre alphabétique : préfixe-les par un numéro.
- `module.json` : `title`, `icon`, `description` et `mode` (`console`, `turtle` ou `pygame`).
- Une leçon est un fichier Markdown avec un en-tête `title:`. Le code de départ de l'éditeur est placé dans un bloc ` ```starter `.

## Déployer sur GitHub Pages

1. Pousser le projet sur la branche `main` d'un dépôt GitHub.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push sur `main` reconstruit et publie le site (`.github/workflows/deploy.yml`).

Notes techniques :
- Python (Pyodide) est chargé depuis le CDN jsDelivr : une connexion Internet est nécessaire.
- `input()` a besoin de `SharedArrayBuffer`, donc d'en-têtes COOP/COEP. En local, Vite les envoie ; sur GitHub Pages, `public/coi-serviceworker.js` s'en charge (la page se recharge une fois à la première visite).
- La progression est stockée dans le `localStorage` du navigateur (pas de compte).
