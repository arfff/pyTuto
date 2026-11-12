---
title: Les dictionnaires
---

# Des étiquettes au lieu de numéros

Une liste range des valeurs avec des **numéros** (0, 1, 2...). Un **dictionnaire** range des valeurs avec des **étiquettes** de ton choix, qu'on appelle des **clés**. C'est comme un inventaire de jeu : « pièces : 5 », « potions : 2 ».

```python
inventaire = {"pièces": 5, "potions": 2}
```

On utilise des accolades `{ }`, et chaque élément est écrit `clé: valeur`.

## Lire, ajouter, modifier

```python
print(inventaire["pièces"])        # 5

inventaire["clé"] = 1              # ajoute une nouvelle entrée
inventaire["pièces"] = 20          # modifie une entrée existante
inventaire["pièces"] = inventaire["pièces"] + 1   # comme score = score + 1
```

Si tu demandes une clé qui n'existe pas, Python affiche une erreur (`KeyError`). Pour éviter ça :

```python
inventaire.get("épée", 0)          # renvoie 0 si "épée" n'existe pas
"épée" in inventaire               # vrai ou faux
```

## Supprimer

```python
del inventaire["potions"]
```

## Parcourir un dictionnaire

```python
for objet, quantite in inventaire.items():
    print(f"{objet} : {quantite}")
```

Pour ne parcourir que les clés : `for objet in inventaire:`. Pour les valeurs : `inventaire.values()`.

## À quoi ça sert ?

- Un **inventaire** de jeu, les **scores** de plusieurs joueurs, les **points de vie** de personnages...
- Une **traduction** : `{"chat": "cat", "chien": "dog"}`.
- Le **choix de l'ordinateur** dans pierre-feuille-ciseaux (tu le verras dans le module Projets).

## 🏁 Défi à valider

Modifie l'`inventaire` pour que :
1. les `pièces` passent de 5 à **15** (en ajoutant 10),
2. il contienne une `épée` en **1** exemplaire.

Exécute ensuite : le site vérifie ta réponse.

```check
assert "inventaire" in globals(), "Garde le dictionnaire inventaire."
assert inventaire.get("pièces") == 15, "Les pièces doivent valoir 15 (5 + 10)."
assert inventaire.get("épée") == 1, 'Ajoute la clé "épée" avec la valeur 1.'
```

```starter
inventaire = {"pièces": 5, "potions": 2}

print(inventaire)

for objet, quantite in inventaire.items():
    print(f"{objet} : {quantite}")
```
