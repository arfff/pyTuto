---
title: Projet 3 — Pierre, feuille, ciseaux
---

# Joue contre l'ordinateur

Un classique : tu choisis pierre, feuille ou ciseaux, l'ordinateur choisit au hasard, et on décide qui gagne.

## Choisir au hasard

```python
choix = ["pierre", "feuille", "ciseaux"]
ordi = random.choice(choix)
```

## Qui bat qui ? Un dictionnaire !

Plutôt que d'écrire 6 cas avec des `if`, on utilise un **dictionnaire** qui dit ce que chaque coup bat :

```python
gagne_contre = {
    "pierre": "ciseaux",
    "feuille": "pierre",
    "ciseaux": "feuille",
}
```

La pierre bat les ciseaux, la feuille bat la pierre, les ciseaux battent la feuille. Pour savoir si le joueur gagne :

```python
if gagne_contre[joueur] == ordi:
    print("Tu gagnes !")
```

## Les manches

Une boucle `for` rejoue plusieurs manches. Le mot **`continue`** saute directement à la manche suivante (utile quand le joueur tape quelque chose d'invalide).

## Les trois cas d'une manche

1. **Égalité** : `joueur == ordi`
2. **Le joueur gagne** : `gagne_contre[joueur] == ordi`
3. **L'ordinateur gagne** : tout le reste (`else`)

> **À toi de jouer !**
> 1. Change le nombre de manches.
> 2. Ajoute des raccourcis : « p », « f » et « c » pour jouer plus vite (indice : un autre dictionnaire qui traduit « p » en « pierre »).
> 3. Ajoute « puits » et « spock » pour jouer à une version à 5 choix (il faut compléter le dictionnaire, avec plusieurs victoires par coup).
> 4. Défi : le premier qui arrive à 3 points gagne (une boucle `while` à la place du `for`).

```starter
import random

choix = ["pierre", "feuille", "ciseaux"]
gagne_contre = {
    "pierre": "ciseaux",
    "feuille": "pierre",
    "ciseaux": "feuille",
}

score_joueur = 0
score_ordi = 0
manches = 5

for manche in range(1, manches + 1):
    print(f"--- Manche {manche} sur {manches} ---")
    joueur = input("pierre, feuille ou ciseaux ? ").strip().lower()

    if joueur not in choix:
        print("Choix invalide, manche perdue !")
        score_ordi = score_ordi + 1
        continue

    ordi = random.choice(choix)
    print(f"L'ordinateur joue : {ordi}")

    if joueur == ordi:
        print("Égalité !")
    elif gagne_contre[joueur] == ordi:
        print("Tu gagnes la manche !")
        score_joueur = score_joueur + 1
    else:
        print("L'ordinateur gagne la manche !")
        score_ordi = score_ordi + 1

print(f"Score final : toi {score_joueur} - ordinateur {score_ordi}")
```
