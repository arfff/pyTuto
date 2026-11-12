---
title: Les listes
---

# Ranger plusieurs valeurs ensemble

Dans Scratch, tu as créé des **listes** (avec les blocs `add thing to list`, `item 1 of list`...). Python a les mêmes listes, avec des crochets `[ ]` :

```python
fruits = ["pomme", "banane", "cerise"]
```

## Lire un élément

⚠️ Le premier élément est le numéro **0** (et pas 1 comme dans Scratch !) :

```python
print(fruits[0])    # pomme
print(fruits[2])    # cerise
print(fruits[-1])   # cerise (le dernier)
```

## Modifier une liste

| Python | Scratch |
|--------|---------|
| `fruits.append("kiwi")` | `add kiwi to fruits` |
| `fruits.remove("banane")` | `delete (position) of fruits` |
| `fruits[0] = "poire"` | `replace item 1 of fruits with poire` |
| `len(fruits)` | `length of fruits` |
| `"kiwi" in fruits` | `fruits contains kiwi?` |

## Parcourir une liste

La boucle `for` marche très bien avec les listes :

```python
for fruit in fruits:
    print(f"J'aime les {fruit}s")
```

## Une liste de nombres

Les listes peuvent contenir des nombres, et Python sait calculer dessus :

```python
notes = [12, 15, 9, 18]
print(sum(notes) / len(notes))   # la moyenne
print(max(notes))                # la plus grande
```

> **À toi de jouer !**
> 1. Ajoute ton fruit préféré à la liste et relance.
> 2. Crée une liste `notes` avec 5 notes, puis affiche la moyenne, la plus petite (`min`) et la plus grande (`max`).
> 3. Avec `random.choice(liste)`, fais un programme qui choisit un fruit au hasard.
> 4. Défi : demande à l'utilisateur 3 prénoms avec `input`, range-les dans une liste, puis affiche-les triés avec `sorted(prenoms)`.

```starter
fruits = ["pomme", "banane", "cerise"]

fruits.append("kiwi")

print(f"Il y a {len(fruits)} fruits.")
for fruit in fruits:
    print("J'aime les " + fruit + "s")
```
