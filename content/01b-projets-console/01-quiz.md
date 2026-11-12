---
title: Projet 1 — Un quiz
---

# Ton premier vrai programme

Dans ce module, tu construis des programmes **complets**. On commence par un quiz : l'ordinateur pose des questions, compte les points et affiche le score.

Exécute le programme à droite et joue ! Puis lis l'explication pour comprendre comment il marche.

## Les questions dans une liste

Chaque question est un **couple** (deux valeurs entre parenthèses) : le texte de la question et la bonne réponse. Tous les couples sont rangés dans une liste :

```python
questions = [
    ("Quelle est la capitale de la France ?", "paris"),
    ("Combien font 7 x 8 ?", "56"),
]
```

## Parcourir les couples

Dans la boucle `for`, on peut récupérer les deux valeurs d'un coup :

```python
for question, bonne_reponse in questions:
    ...
```

## Comparer sans se tromper

L'utilisateur peut taper `Paris`, `paris` ou `  PARIS `. Pour comparer de façon équitable, on met sa réponse en minuscules et on enlève les espaces autour :

```python
reponse = input(question + " ").strip().lower()
```

On enchaîne les méthodes avec des points : d'abord `strip()`, puis `lower()`.

## Le score

Une variable `score` démarre à 0. On ajoute 1 à chaque bonne réponse. À la fin, on affiche `score` sur `len(questions)`.

> **À toi de jouer !**
> 1. Ajoute au moins 3 questions sur un thème que tu aimes (jeux vidéo, animaux, sport...).
> 2. Accepte plusieurs bonnes réponses (par exemple « 56 » ou « cinquante-six »). Indice : une liste de réponses et `in`.
> 3. Mélange les questions avec `random.shuffle(questions)` (n'oublie pas `import random`).
> 4. Affiche un message différent selon le score final : excellent, bien, ou « il faut réviser ».
> 5. Défi : à la fin, propose de rejouer avec une boucle `while`.

```starter
questions = [
    ("Quelle est la capitale de la France ?", "paris"),
    ("Combien font 7 x 8 ?", "56"),
    ("Quel langage apprends-tu ici ?", "python"),
]

score = 0

for question, bonne_reponse in questions:
    reponse = input(question + " ").strip().lower()
    if reponse == bonne_reponse:
        print("✅ Bonne réponse !")
        score = score + 1
    else:
        print(f"❌ Raté ! La réponse était : {bonne_reponse}")

print(f"Score final : {score} / {len(questions)}")
```
