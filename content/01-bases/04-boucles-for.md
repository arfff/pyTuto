---
title: Répéter avec for
---

# Le bloc `repeat`, version Python

Dans Scratch, tu utilises `repeat 10` pour répéter des blocs. En Python, on utilise **`for`** avec **`range`** :

```python
for i in range(10):
    print("Hello !")
```

Cette boucle affiche « Hello ! » **10 fois**. Comme pour le `if`, les lignes **décalées** sont celles qui sont répétées.

## Le compteur

La variable `i` (tu peux l'appeler comme tu veux) change à chaque tour. Elle commence à **0** (pas à 1 !) :

```python
for i in range(5):
    print(i)       # affiche 0, 1, 2, 3, 4
```

Pour compter de 1 à 5, écris `range(1, 6)` : on s'arrête **juste avant** le dernier nombre.

## Un peu de calcul

La boucle est pratique pour faire plein de calculs d'un coup, par exemple une table de multiplication :

```python
nombre = 7
for i in range(1, 11):
    print(f"{nombre} x {i} = {nombre * i}")
```

## Parcourir des mots

On peut aussi répéter pour chaque lettre d'un texte :

```python
for lettre in "Python":
    print(lettre)
```

> **À toi de jouer !**
> 1. Change `nombre` pour afficher une autre table de multiplication.
> 2. Demande le nombre à l'utilisateur avec `int(input(...))`.
> 3. Affiche un compte à rebours de 10 à 1 (indice : `range(10, 0, -1)`), puis « Décollage ! ».
> 4. Défi : calcule la somme de tous les nombres de 1 à 100 avec une variable `total`.

```starter
nombre = 7

for i in range(1, 11):
    print(f"{nombre} x {i} = {nombre * i}")
```
