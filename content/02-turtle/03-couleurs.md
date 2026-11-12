---
title: Couleurs, remplissage et cercles
---

# Mettre de la couleur

Dans Scratch, tu utilises `set pen color to ...` et `set pen size to ...`. En turtle :

```python
color("red")       # couleur du trait
pensize(5)         # épaisseur du trait
bgcolor("black")   # couleur de fond de la scène
```

Les noms de couleurs sont en anglais : `red`, `blue`, `green`, `orange`, `purple`, `pink`, `yellow`, `gold`, `white`, `black`...

Tu peux aussi mélanger toi-même : `color((255, 100, 0))` donne un orange. Les trois nombres (de 0 à 255) sont le rouge, le vert et le bleu.

## Remplir une forme

Pour remplir de couleur, on entoure le dessin avec `begin_fill()` et `end_fill()`. Avec deux couleurs, la première est pour le **trait** et la deuxième pour le **remplissage** :

```python
color("black", "yellow")
begin_fill()
# ... dessine une forme fermée ...
end_fill()
```

## Les cercles

`circle(50)` dessine un cercle de **rayon** 50. Tu peux aussi dessiner un arc de cercle avec un deuxième nombre : `circle(50, 180)` fait un demi-cercle.

## Un point

`dot(20)` dessine un point de 20 pixels de diamètre, sans bouger.

## Écrire du texte

`write("Bravo !", font=("Arial", 24, "bold"))` écrit un texte à la position de la tortue.

> **À toi de jouer !**
> 1. Change les couleurs du fond, du trait et du remplissage.
> 2. Fais un bonhomme de neige : deux ou trois cercles blancs empilés (utilise `penup()`, `goto(...)` et `pendown()` pour te placer), puis deux `dot` noirs pour les yeux.
> 3. Défi : dessine un drapeau avec trois rectangles remplis.

```starter
from turtle import *

bgcolor("midnightblue")
speed(6)
pensize(3)

# Un soleil
penup()
goto(-60, 0)
pendown()
color("orange", "gold")
begin_fill()
circle(60)
end_fill()

# Un point rouge
penup()
goto(100, 50)
pendown()
dot(30, "red")

# Un message
penup()
goto(-80, -100)
color("white")
write("Hello turtle !", font=("Arial", 20, "bold"))
```
