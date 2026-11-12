---
title: Des formes avec des boucles
---

# Ne te répète plus !

Dans la leçon précédente, pour faire un carré, tu as écrit 8 lignes presque identiques. Dans Scratch, tu utiliserais le bloc `repeat 4`. En Python, c'est la boucle **`for`** :

```python
for i in range(4):
    forward(100)
    right(90)
```

Les lignes **décalées** (4 espaces) sont répétées 4 fois. (Si tu n'as pas encore vu les boucles, regarde la leçon « Les boucles » du module Bases.)

## Un polygone, c'est toujours pareil

Pour un polygone à `n` côtés, la tortue tourne de **360 divisé par n** degrés à chaque coin :

| Forme | Côtés | Angle |
|-------|-------|-------|
| Triangle | 3 | 120 |
| Carré | 4 | 90 |
| Pentagone | 5 | 72 |
| Hexagone | 6 | 60 |

On peut donc écrire un programme qui marche pour toutes les formes, en changeant juste la variable `cotes` :

```python
cotes = 6
for i in range(cotes):
    forward(80)
    right(360 / cotes)
```

## La vitesse

`speed(1)` est très lent, `speed(10)` est rapide et `speed(0)` dessine instantanément.

> **À toi de jouer !**
> 1. Change `cotes` pour dessiner un triangle, un pentagone, un octogone...
> 2. Avec 100 côtés, que se passe-t-il ? (mets `speed(0)` pour aller vite)
> 3. Dessine une étoile : avance de 150 et tourne de **144** degrés, 5 fois.
> 4. Défi : dessine un carré, puis tourne la tortue de 10 degrés, et recommence 36 fois (une boucle dans une boucle, ou une seule boucle de 36 tours qui contient le carré).

```starter
from turtle import *

speed(5)
cotes = 5

for i in range(cotes):
    forward(80)
    right(360 / cotes)
```
