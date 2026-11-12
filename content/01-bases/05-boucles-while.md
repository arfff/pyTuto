---
title: Répéter tant que (while)
---

# `repeat until`, version Python

Parfois, on ne sait pas combien de fois il faudra répéter. Dans Scratch, tu utilises `repeat until <...>` ou `forever`. En Python, on a **`while`** (« tant que ») :

```python
while vies > 0:
    print("Encore en vie !")
    vies = vies - 1
```

Attention : `while` répète **tant que** la condition est vraie. `repeat until` s'arrête quand la condition devient vraie, c'est donc l'inverse !

| Scratch | Python |
|---------|--------|
| `repeat until <vies = 0>` | `while vies != 0:` (ou `while vies > 0:`) |
| `forever` | `while True:` |

## Sortir d'une boucle

Avec **`break`**, on sort tout de suite de la boucle, comme le bloc `stop this script` :

```python
while True:
    reponse = input("Tape 'stop' pour arrêter : ")
    if reponse == "stop":
        break
```

## ⚠️ Les boucles infinies

Si la condition ne devient jamais fausse, le programme tourne **sans fin**. Pas de panique : clique sur **■ Stop**.

Voilà un exemple : le jeu du « plus ou moins ». On répète tant que le joueur n'a pas trouvé, et on compte ses essais :

```python
import random
secret = random.randint(1, 100)
```

`random.randint(1, 100)` choisit un nombre au hasard, comme `pick random 1 to 100`.

> **À toi de jouer !**
> 1. Joue au jeu et essaie de trouver le nombre en un minimum d'essais. Quelle est la meilleure méthode ? (indice : toujours viser le milieu)
> 2. Change l'intervalle pour que le secret soit entre 1 et 1000.
> 3. Ajoute une limite : le joueur perd après 7 essais (indice : `if essais >= 7: break`).

```starter
import random

secret = random.randint(1, 100)
essais = 0
trouve = False

while not trouve:
    essai = int(input("Devine le nombre (1-100) : "))
    essais = essais + 1

    if essai < secret:
        print("Plus grand !")
    elif essai > secret:
        print("Plus petit !")
    else:
        trouve = True

print(f"Bravo ! Trouvé en {essais} essais.")
```
