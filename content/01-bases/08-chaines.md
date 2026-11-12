---
title: Jouer avec les mots (chaînes)
---

# Les chaînes de caractères

Un texte entre guillemets, c'est une **chaîne de caractères** (*string*). Python sait faire plein de choses avec : dans Scratch, tu avais `join`, `length of`, `letter 1 of`... En voici la version Python.

| Python | Scratch |
|--------|---------|
| `len("chat")` | `length of chat` |
| `"chat"[0]` | `letter 1 of chat` |
| `"ba" + "teau"` | `join ba teau` |
| `"chat" in "chateau"` | `chateau contains chat?` |

⚠️ Comme pour les listes, la première lettre est la numéro **0**.

## Découper une chaîne

On met entre crochets `[début:fin]` : on s'arrête **juste avant** `fin`.

```python
mot = "ordinateur"
print(mot[0])       # o
print(mot[:3])      # ord
print(mot[3:6])     # ina
print(mot[-1])      # r  (la dernière lettre)
print(mot[::-1])    # ruetanidro  (à l'envers !)
```

## Les méthodes des chaînes

```python
phrase = "  Python, c'est génial  "
phrase.upper()                       # TOUT EN MAJUSCULES
phrase.lower()                       # tout en minuscules
phrase.strip()                       # enlève les espaces autour
phrase.replace("génial", "super")    # remplace un morceau
phrase.count("a")                    # compte les "a"
```

Une méthode **ne modifie pas** la chaîne d'origine : elle en renvoie une nouvelle. Pour la garder, il faut la ranger dans une variable : `phrase = phrase.upper()`.

## Couper et recoller

```python
mots = "un deux trois".split(" ")    # ["un", "deux", "trois"]
phrase = "-".join(mots)              # "un-deux-trois"
```

## Répéter

```python
print("ha" * 3)      # hahaha
print("=" * 20)      # une ligne de séparation
```

## 🏁 Défi à valider

Crée une variable `inverse` qui contient la `phrase` écrite **à l'envers**. Puis exécute : le site vérifie ta réponse.

```check
assert "inverse" in globals(), "Crée une variable nommée inverse."
assert inverse == phrase[::-1], "inverse doit contenir phrase à l'envers (indice : [::-1])."
```

```starter
phrase = "Python, c'est génial"

print(len(phrase))
print(phrase.upper())
print(phrase[:6])
print(phrase.replace("génial", "super"))
print("-" * 20)
```
