---
title: Utiliser des modules
---

# Des boîtes à outils déjà prêtes

Python vient avec plein de **modules** : des boîtes à outils écrites par d'autres, que tu peux utiliser en une ligne. Tu en as déjà croisé : `random` et `turtle`.

Pour en utiliser un, on l'**importe** :

```python
import random
print(random.randint(1, 6))     # un dé
```

On écrit `module.fonction()` : le nom du module, un point, puis la fonction.

## Quelques modules utiles

**`random`** : le hasard (comme `pick random` de Scratch)
```python
random.randint(1, 6)                   # un entier entre 1 et 6
random.choice(["pierre", "feuille"])   # un élément au hasard
random.shuffle(liste)                  # mélange une liste
```

**`math`** : les maths
```python
import math
math.sqrt(16)      # racine carrée : 4.0
math.pi            # 3.14159...
math.floor(3.7)    # 3  (arrondi vers le bas)
math.ceil(3.2)     # 4  (arrondi vers le haut)
```

**`time`** : le temps
```python
import time
debut = time.time()       # l'heure actuelle en secondes
# ... du travail ...
print(time.time() - debut)  # le temps écoulé
```

## Importer juste ce qu'on veut

```python
from random import randint
print(randint(1, 6))        # plus besoin d'écrire random.
```

## Python en a des centaines

Il existe des modules pour dessiner (`turtle`), faire des jeux (`pygame`), manipuler des dates (`datetime`), travailler avec des fichiers... C'est ce qui rend Python si puissant : on ne réinvente pas la roue. Et quand tu seras plus avancé, tu pourras écrire **tes propres modules**.

## 🏁 Défi à valider

Utilise `math.sqrt` pour calculer, dans une variable `hypotenuse`, la longueur de l'hypoténuse d'un triangle rectangle dont les côtés mesurent **3** et **4** (théorème de Pythagore : `racine de 3² + 4²`).

```check
assert "hypotenuse" in globals(), "Crée une variable nommée hypotenuse."
assert abs(hypotenuse - 5) < 1e-9, "Le résultat devrait être 5. Calcule math.sqrt(3**2 + 4**2)."
```

```starter
import random
import math

print("Un dé :", random.randint(1, 6))

fruits = ["pomme", "banane", "cerise", "kiwi"]
random.shuffle(fruits)
print("Fruits mélangés :", fruits)

print("Racine de 16 :", math.sqrt(16))
print("Aire d'un cercle de rayon 5 :", math.pi * 5 ** 2)
```
