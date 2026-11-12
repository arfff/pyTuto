# 🔧 Dans les coulisses de pyTuto

Tu apprends Python sur ce site, mais comment est-il fabriqué ? Cette page explique tout, en partant de l'idée générale jusqu'aux détails. Tu n'as pas besoin de tout comprendre : lis ce qui t'intéresse !

## L'idée générale

pyTuto est un site **100 % dans le navigateur** : il n'y a pas d'ordinateur « quelque part sur Internet » qui exécute ton code Python. **C'est ton navigateur qui le fait tout seul.** Cela veut dire que ton code reste chez toi, et que le site peut être hébergé gratuitement, car il ne contient que des fichiers.

Voici les grandes pièces :

```
   Ton navigateur
  ┌──────────────────────────────────────────────────┐
  │  Le site (Vue)                                   │
  │   ├─ Leçon (texte)                               │
  │   ├─ Éditeur (CodeMirror)                        │
  │   └─ Sortie : console / tortue / jeu             │
  │                                                  │
  │  Python (Pyodide) ── exécute ton code            │
  └──────────────────────────────────────────────────┘
          ▲
          │ les fichiers du site sont téléchargés depuis GitHub Pages
```

## Les outils utilisés

| Outil | À quoi il sert |
|-------|----------------|
| **Vue 3** | Construit les pages du site (comme le tutoriel de Vue.js qui a inspiré celui-ci) |
| **Vite** | Prépare le site : serveur de développement rapide, et assemblage final des fichiers |
| **Vue Router** | Passe d'une page à l'autre (accueil, leçons, cette page) |
| **CodeMirror 6** | L'éditeur de code (colorisation, indentation automatique) |
| **Pyodide** | Python lui-même, compilé pour fonctionner dans un navigateur |
| **marked** | Transforme le texte des leçons (écrit en Markdown) en page web |
| **GitHub Pages** | Héberge le site gratuitement |

## Comment Python peut-il tourner dans un navigateur ?

Les navigateurs ne comprennent que le JavaScript... et le **WebAssembly**. Le WebAssembly (ou *wasm*) est un format de programme très rapide, que les navigateurs savent exécuter. Des développeurs ont pris Python (écrit en C) et l'ont **compilé en WebAssembly** : ça s'appelle **Pyodide**.

Quand tu ouvres une leçon, la page télécharge Pyodide (environ 10 Mo la première fois, ensuite le navigateur le garde en mémoire). C'est pour ça que tu vois « ⏳ Chargement de Python… » au début.

## Pourquoi un « Worker » ?

Si ton programme fait une boucle infinie (`while True:` sans fin), il pourrait bloquer toute la page, y compris les boutons. Pour éviter ça, Python tourne dans un **Web Worker** : un second « fil » d'exécution, séparé de la page. Le site reste fluide, et le bouton **■ Stop** peut simplement détruire le Worker et en recréer un nouveau.

Le fichier correspondant est `public/python-worker.js`. Les messages circulent entre la page et le Worker : « exécute ce code », « voici ce que le programme a affiché », « le programme attend une réponse »...

## Le mystère de `input()`

`input()` est étonnamment difficile ! Python doit **s'arrêter** et attendre que tu tapes quelque chose, alors qu'un navigateur ne sait pas « attendre » comme ça.

La solution : le Worker et la page partagent un petit morceau de mémoire (un `SharedArrayBuffer`). Quand ton programme appelle `input()` :

1. Le Worker envoie à la page le message « je veux une réponse » et se met en pause (`Atomics.wait`).
2. La page affiche le champ de saisie dans la console.
3. Quand tu valides avec Entrée, la page écrit ta réponse dans la mémoire partagée et réveille le Worker.
4. Python continue avec ta réponse.

Pour des raisons de sécurité, les navigateurs n'autorisent cette mémoire partagée que si le site envoie des en-têtes spéciaux (appelés COOP et COEP). GitHub Pages ne permet pas de les configurer. On utilise donc un petit « service worker » (`coi-serviceworker.js`) qui les ajoute pour nous. C'est pour ça que la page se recharge toute seule la première fois que tu viens.

## Le module turtle (la tortue)

Le vrai module `turtle` de Python utilise une bibliothèque de fenêtres (tkinter) qui n'existe pas dans un navigateur. J'ai donc écrit **ma propre version**, dans `public/turtle_shim.py`.

Elle a les mêmes commandes (`forward`, `left`, `penup`, `circle`...), mais au lieu de dessiner elle-même, elle fabrique une **liste d'opérations** : « trace un trait de ce point à celui-là, en rouge ». Cette liste est envoyée à la page, et le fichier `src/lib/turtleCanvas.js` les **anime** sur un `<canvas>`, un petit peu à chaque image (60 fois par seconde). C'est comme ça que tu vois la tortue avancer. Le réglage `speed()` décide de la distance parcourue à chaque image.

## Le module pygame (les jeux)

**pygame** a aussi une version pour les navigateurs (pygame-ce). Comme il doit dessiner sur un canvas, il ne peut pas tourner dans le Worker : il s'exécute directement dans la page.

Il y a un piège : si une boucle de jeu ne laisse jamais « respirer » le navigateur, la page se bloque. C'est pour ça que ta boucle doit finir par `await asyncio.sleep(0)` : cette ligne dit « navigateur, tu peux t'occuper d'autre chose pendant une milliseconde ». Ton code est lancé comme une **tâche asyncio**, ce qui permet au bouton **■ Stop** de l'annuler proprement.

## Comment sont organisées les leçons

Tout le contenu est dans le dossier `content/` :

```
content/
  01-bases/
    module.json        ← titre, icône, description, type de module
    01-print.md        ← une leçon
    02-variables.md
  02-turtle/
  03-jeux-pygame/
```

Chaque leçon est un fichier **Markdown** (du texte simple avec quelques symboles pour le titre, les listes, le code). Elle commence par un en-tête `title: ...`, et le code qui s'affiche au départ dans l'éditeur est placé dans un bloc spécial ` ```starter `.

Le site **découvre tout seul** les dossiers et les fichiers au moment de sa construction (`import.meta.glob` dans `src/lib/content.js`). Ajouter une leçon, c'est donc juste ajouter un fichier : il n'y a pas besoin de toucher au code du site. Les numéros devant les noms donnent l'ordre.

## Comment les défis sont validés

Certaines leçons se terminent par un **🏁 Défi à valider**. Quand tu exécutes ton programme, le site lance ensuite un petit **test** écrit par l'auteur de la leçon, et te dit « ✅ Bravo » ou te donne un indice.

Dans le fichier de la leçon, le test est un bloc spécial ` ```check ` qui contient du code Python avec des `assert` (une vérification qui échoue si la condition est fausse, avec un message d'aide) :

```
assert "total" in globals(), "Crée une variable nommée total."
assert total == 5050, "Ce n'est pas encore la bonne somme."
```

Le test s'exécute **dans le même espace que ton programme** : il peut donc lire tes variables, tes fonctions et même tout ce que ton programme a affiché (la variable `output`). Si tu veux, tu peux l'ouvrir dans le dossier `content/` pour voir comment une leçon est vérifiée... mais ce serait dommage de regarder la solution !

## Ta progression

Il n'y a **pas de compte** et pas de serveur : ta progression (les leçons terminées et le code que tu as écrit dans chaque leçon) est enregistrée dans le **`localStorage`** de ton navigateur, une petite zone de stockage propre à chaque site.

Conséquences :
- ça marche sans rien créer ni configurer ;
- si tu changes de navigateur ou d'ordinateur, ou si tu vides les données du navigateur, tu repars de zéro ;
- personne d'autre ne peut voir ta progression.

## Comment le site est publié

Le code est sur GitHub : **https://github.com/arfff/pyTuto**. À chaque fois que le code est envoyé sur la branche `main`, une automatisation (GitHub Actions) :

1. installe les outils (`npm ci`),
2. construit le site (`npm run build`),
3. publie le résultat sur GitHub Pages.

Quelques minutes plus tard, le site est à jour pour tout le monde.

## Lancer le site chez toi

Il faut installer [Node.js](https://nodejs.org), puis dans le dossier du projet :

```
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (en général `http://localhost:5173`). Chaque modification que tu fais dans le code ou dans une leçon s'affiche immédiatement.

## Les défauts actuels (et des idées)

- Python est téléchargé depuis Internet : le site ne fonctionne pas hors connexion.
- Seuls quelques défis sont vérifiés automatiquement (ceux qui n'utilisent pas `input()` ni le dessin).
- Une boucle pygame sans `await asyncio.sleep(0)` bloque la page.

Des idées pour la suite : ajouter des images et des sons dans les jeux, créer de nouveaux modules (programmation objet, fractales...), ou même écrire tes propres leçons !
