---
title: Premiers pas avec la tortue
---

# Une tortue qui dessine

Tu connais l'extension **Pen** de Scratch : `pen down`, `move 10 steps`, `turn ↻ 90 degrees`. Avec le module **turtle** de Python, c'est exactement le même principe : un petit sprite (la tortue) se déplace et laisse une trace derrière lui.

Clique sur **▶ Exécuter** et regarde la tortue dessiner dans la zone en bas à gauche.

## Les commandes de base

| Python | Scratch |
|--------|---------|
| `forward(100)` | `move 100 steps` |
| `backward(50)` | `move -50 steps` |
| `right(90)` | `turn ↻ 90 degrees` |
| `left(90)` | `turn ↺ 90 degrees` |
| `penup()` | `pen up` |
| `pendown()` | `pen down` |

Pour utiliser ces commandes, il faut d'abord écrire `from turtle import *` en haut du programme.

## Les coordonnées

Comme dans Scratch, le point `(0, 0)` est **au centre** de la scène, et `y` augmente vers le **haut**. Pour aller à un endroit précis : `goto(100, 50)`.

La tortue commence en regardant vers la **droite**.

> **À toi de jouer !**
> 1. Change les nombres pour faire un carré plus grand.
> 2. Fais un triangle : il faut tourner de **120** degrés trois fois (pas de 60 !).
> 3. Utilise `penup()` puis `goto(-100, 80)` puis `pendown()` pour dessiner un deuxième carré ailleurs, sans trace entre les deux.
> 4. Dessine la première lettre de ton prénom.

```starter
from turtle import *

forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
```
