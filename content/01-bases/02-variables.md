---
title: Les variables
---

# Garder des informations en mémoire

Dans Scratch, tu crées une variable `score` et tu utilises `set score to 0` puis `change score by 1`.

En Python, c'est plus court :

```python
score = 0
score = score + 1
```

Le signe `=` ne veut pas dire « égal » comme en maths : il veut dire **« range cette valeur dans la variable »**, comme `set ... to ...`.

## Afficher une variable

```python
prenom = "Alex"
print(prenom)
```

Pour mélanger du texte et des variables, on met un `f` devant les guillemets et on met les variables entre accolades `{ }` :

```python
print(f"Bravo {prenom}, ton score est de {score} !")
```

## Demander quelque chose à l'utilisateur

C'est l'équivalent du bloc `ask ... and wait`. Avec Python, la réponse est directement rangée dans une variable (alors que Scratch la met dans `answer`) :

```python
prenom = input("Comment tu t'appelles ? ")
```

Le programme s'arrête et attend que tu tapes ta réponse dans la console, puis que tu appuies sur Entrée.

> **À toi de jouer !**
> 1. Exécute le programme et réponds à la question.
> 2. Ajoute une variable `age` avec `input`, et affiche une phrase qui utilise le prénom **et** l'âge.
> 3. Crée une variable `points = 10`, puis ajoute 5 avec `points = points + 5` et affiche le résultat.

```starter
prenom = input("Comment tu t'appelles ? ")
print(f"Salut {prenom} !")
```
