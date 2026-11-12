---
title: Projet 5 — Mots de passe
---

# Un générateur et un testeur de mots de passe

Un bon mot de passe est long, varié et difficile à deviner. Dans ce projet, tu écris deux outils : un qui **génère** un mot de passe au hasard, et un qui **évalue** la solidité d'un mot de passe.

## Générer un mot de passe

On part d'une chaîne qui contient tous les caractères autorisés. On en pioche un au hasard, plusieurs fois, et on les colle les uns aux autres :

```python
alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
mot_de_passe = ""
for i in range(longueur):
    mot_de_passe = mot_de_passe + random.choice(alphabet)
```

## Tester la solidité

On regarde de quoi est fait le mot de passe, avec des **méthodes de chaînes** qui répondent vrai ou faux :

| Méthode | Question |
|---------|----------|
| `c.islower()` | est-ce une minuscule ? |
| `c.isupper()` | est-ce une majuscule ? |
| `c.isdigit()` | est-ce un chiffre ? |

Pour savoir si **au moins un** caractère est un chiffre, on parcourt chaque caractère :

```python
a_un_chiffre = False
for c in mot_de_passe:
    if c.isdigit():
        a_un_chiffre = True
```

Chaque critère rempli (longueur d'au moins 8, une minuscule, une majuscule, un chiffre, un symbole) donne **1 point**. À la fin, on traduit les points en verdict.

## Une fonction par outil

On range chaque outil dans une fonction (`generer`, `evaluer`) : c'est plus lisible, et tu peux les réutiliser.

> **À toi de jouer !**
> 1. Exécute le programme, génère un mot de passe, puis teste-le avec `evaluer`.
> 2. Teste des mots de passe comme `azerty`, `Soleil2024` ou `Pyth0n!Super#123`. Lesquels sont solides ?
> 3. Ajoute un critère : « ne contient pas ton prénom » (demande le prénom avec `input`).
> 4. Défi : crée un mode « phrase de passe » qui assemble 4 mots au hasard d'une liste (comme `cheval-pomme-lune-bateau`).
>
> 🔒 Pour un vrai compte, ne reprends jamais un mot de passe tapé dans un programme de test : demande plutôt à un adulte de t'aider à utiliser un gestionnaire de mots de passe.

```starter
import random


def generer(longueur):
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%"
    resultat = ""
    for i in range(longueur):
        resultat = resultat + random.choice(alphabet)
    return resultat


def evaluer(mot_de_passe):
    points = 0
    if len(mot_de_passe) >= 8:
        points = points + 1

    a_minuscule = False
    a_majuscule = False
    a_chiffre = False
    a_symbole = False
    for c in mot_de_passe:
        if c.islower():
            a_minuscule = True
        elif c.isupper():
            a_majuscule = True
        elif c.isdigit():
            a_chiffre = True
        else:
            a_symbole = True

    for critere in [a_minuscule, a_majuscule, a_chiffre, a_symbole]:
        if critere:
            points = points + 1

    if points <= 2:
        return "faible 😟"
    elif points <= 4:
        return "moyen 🙂"
    return "solide 💪"


choix = input("Générer (g) ou tester (t) un mot de passe ? ").strip().lower()

if choix == "g":
    longueur = int(input("Longueur : "))
    nouveau = generer(longueur)
    print("Mot de passe généré :", nouveau)
    print("Solidité :", evaluer(nouveau))
else:
    saisi = input("Mot de passe à tester : ")
    print("Solidité :", evaluer(saisi))
```
