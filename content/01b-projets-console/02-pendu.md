---
title: Projet 2 — Le pendu
---

# Devine le mot !

Le jeu du pendu : l'ordinateur choisit un mot secret, tu proposes des lettres, et tu as un nombre limité d'erreurs.

## Les ingrédients

| Variable | Rôle |
|----------|------|
| `mot` | le mot secret, choisi au hasard dans une liste |
| `trouvees` | la liste des lettres déjà trouvées |
| `erreurs` | le nombre d'erreurs commises |
| `gagne` | vrai quand le mot est complet |

## Afficher le mot avec des trous

On parcourt chaque lettre du mot. Si elle est dans `trouvees`, on l'affiche, sinon on met un `_` :

```python
affichage = ""
for lettre in mot:
    if lettre in trouvees:
        affichage = affichage + lettre + " "
    else:
        affichage = affichage + "_ "
```

C'est le même principe que construire une chaîne avec `join` dans Scratch.

## La boucle du jeu

Le jeu continue **tant que** le joueur n'a pas perdu (`erreurs < max_erreurs`) et n'a pas gagné. À chaque tour :
1. on affiche le mot avec les trous,
2. on regarde si toutes les lettres sont trouvées (plus de `_`) : si oui, victoire, on sort avec `break`,
3. on demande une lettre,
4. si elle est dans le mot, on la note, sinon on ajoute une erreur.

## Les cas particuliers

Un bon programme gère les entrées bizarres : plusieurs lettres d'un coup, une lettre déjà essayée... Chaque cas a son `if` ou `elif`.

> **À toi de jouer !**
> 1. Ajoute des mots à la liste.
> 2. Affiche la liste des lettres **ratées** pour aider le joueur (une nouvelle liste `ratees`).
> 3. Dessine le pendu avec du texte : une fonction `dessiner(erreurs)` qui affiche un dessin différent selon le nombre d'erreurs.
> 4. Défi : pour que le jeu accepte aussi les accents (`é` pour `e`), cherche comment remplacer les lettres accentuées avec `replace`.

```starter
import random

mots = ["python", "ordinateur", "clavier", "souris", "programme", "boucle"]
mot = random.choice(mots)

trouvees = []
erreurs = 0
max_erreurs = 6
gagne = False

while erreurs < max_erreurs:
    affichage = ""
    for lettre in mot:
        if lettre in trouvees:
            affichage = affichage + lettre + " "
        else:
            affichage = affichage + "_ "
    print(affichage)

    if "_" not in affichage:
        gagne = True
        break

    proposition = input("Une lettre : ").lower()

    if len(proposition) != 1:
        print("Donne une seule lettre !")
    elif proposition in trouvees:
        print("Tu l'as déjà trouvée.")
    elif proposition in mot:
        trouvees.append(proposition)
        print("Bien vu !")
    else:
        erreurs = erreurs + 1
        print(f"Raté ! Il te reste {max_erreurs - erreurs} erreurs.")

if gagne:
    print(f"🎉 Bravo, tu as trouvé : {mot}")
else:
    print(f"Perdu... Le mot était : {mot}")
```
