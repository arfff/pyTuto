---
title: Les conditions (if / else)
---

# Faire des choix

Tu connais le bloc Scratch `if <...> then ... else ...`. En Python, il s'écrit avec **`if`**, **`else`** et deux points `:` à la fin de la ligne.

```python
if age >= 18:
    print("Tu es majeur")
else:
    print("Tu es mineur")
```

## ⚠️ L'indentation est obligatoire

Les lignes **décalées vers la droite** (4 espaces) sont « à l'intérieur » du `if`, comme les blocs Scratch qui sont à l'intérieur du bloc `if`. Si tu oublies le décalage, Python affiche une erreur.

## Les comparaisons

| Python | Signification |
|--------|---------------|
| `==`   | égal à (deux signes `=` !) |
| `!=`   | différent de |
| `<` `>` | plus petit / plus grand |
| `<=` `>=` | plus petit ou égal / plus grand ou égal |

## Plusieurs cas avec elif

`elif` signifie « sinon si » :

```python
if note >= 16:
    print("Très bien")
elif note >= 10:
    print("Bien")
else:
    print("Courage")
```

## Attention aux nombres

`input` renvoie toujours du **texte**. Pour comparer des nombres, on convertit avec `int(...)` :

```python
nombre = int(input("Un nombre : "))
```

> **À toi de jouer !**
> 1. Change le nombre secret et essaie de le deviner.
> 2. Ajoute un cas `elif` qui affiche « Tu es très proche ! » quand la différence est de 1.
> 3. Défi : demande aussi ton prénom au début et utilise-le dans le message de victoire.

```starter
secret = 7
essai = int(input("Devine le nombre entre 1 et 10 : "))

if essai == secret:
    print("Bravo, tu as trouvé !")
elif essai < secret:
    print("Plus grand !")
else:
    print("Plus petit !")
```
