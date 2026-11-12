---
title: Spirales, motifs et hasard
---

# Des dessins qui impressionnent

Avec une variable qui change à chaque tour de boucle, tu peux créer des dessins incroyables avec très peu de code.

## Une spirale

Au lieu de toujours avancer de la même distance, on avance de **plus en plus** :

```python
longueur = 5
for i in range(100):
    forward(longueur)
    right(91)
    longueur = longueur + 3
```

Change l'angle (`91`) pour obtenir d'autres spirales : 90 donne des carrés emboîtés, 120 un triangle qui grandit, 144 une étoile...

## Un motif qui tourne

On dessine une forme, on tourne un peu, et on recommence :

```python
for i in range(36):
    for j in range(4):
        forward(60)
        right(90)
    right(10)
```

(36 fois 10 degrés = 360 degrés : on fait un tour complet.)

## Le hasard et les listes de couleurs

Dans Scratch, tu utilises `pick random`. En Python, il faut importer `random` :

```python
import random

couleurs = ["red", "orange", "gold", "green", "blue", "purple"]
color(random.choice(couleurs))
```

`random.choice` choisit un élément au hasard dans une liste.

> **À toi de jouer !**
> 1. Exécute le programme plusieurs fois : les couleurs changent à chaque fois.
> 2. Change l'angle `91` pour voir d'autres spirales.
> 3. Change la liste `couleurs`.
> 4. Défi : au lieu d'une spirale, dessine 50 cercles de taille aléatoire (`random.randint(10, 80)`) à des positions aléatoires.

```starter
from turtle import *
import random

bgcolor("black")
speed(0)
pensize(2)

couleurs = ["red", "orange", "gold", "lime", "cyan", "violet"]
longueur = 5

for i in range(120):
    color(random.choice(couleurs))
    forward(longueur)
    right(91)
    longueur = longueur + 3
```
