---
title: Comprendre les erreurs (et les corriger)
---

# Les erreurs sont tes amies

Quand tu codes, tu auras **tout le temps** des erreurs. Même les experts ! Ce qui compte, c'est de savoir **les lire** : Python te dit presque toujours ce qui ne va pas.

Regarde le programme à droite : il contient une erreur. Exécute-le et regarde le message rouge.

## Comment lire un message d'erreur

Un message d'erreur ressemble à ça :

```
Traceback (most recent call last):
  File "<exec>", line 2
    for i in range(1, 6)
                        ^
SyntaxError: expected ':'
```

Lis-le **de bas en haut** :
1. La **dernière ligne** donne le *type* d'erreur et une explication (`SyntaxError: expected ':'`).
2. Au-dessus, `line 2` indique **la ligne** concernée.
3. Le morceau de code et la flèche `^` montrent où regarder (souvent juste avant ou sur la ligne indiquée).

## Les erreurs les plus fréquentes

| Erreur | Ce que ça veut dire | Exemple |
|--------|---------------------|---------|
| `SyntaxError` | Python ne comprend pas ce que tu as écrit | un `:` oublié, une parenthèse non fermée |
| `IndentationError` | Mauvais décalage des lignes | un `print` pas assez décalé dans un `if` |
| `NameError` | Tu utilises un nom qui n'existe pas | une faute de frappe dans une variable |
| `TypeError` | Tu mélanges des types incompatibles | `"age : " + 14` (texte + nombre) |
| `ValueError` | Bonne sorte de valeur, mais impossible à convertir | `int("abc")` |
| `ZeroDivisionError` | Division par zéro | `10 / 0` |
| `IndexError` | Tu demandes une case qui n'existe pas | `liste[10]` dans une liste de 3 éléments |

## Trouver un bug qui n'affiche aucune erreur

Parfois le programme tourne mais fait autre chose que prévu. Quelques astuces :
- Ajoute des `print` pour voir la valeur des variables à différents endroits.
- Relis ton code ligne par ligne, **à voix haute**, en te demandant ce que Python fait à chaque étape.
- Teste avec des valeurs très simples (0, 1, 2...).

## Gérer une erreur avec `try` / `except`

Si tu sais qu'une erreur peut arriver (par exemple, l'utilisateur tape des lettres au lieu d'un nombre), tu peux la **rattraper** pour que le programme ne plante pas :

```python
try:
    age = int(input("Ton âge : "))
    print(f"Dans 10 ans, tu auras {age + 10} ans.")
except ValueError:
    print("Ce n'est pas un nombre !")
```

Python essaie le bloc `try`. Si une `ValueError` se produit, il saute directement au bloc `except`.

## 🏁 Défi à valider

Le programme à droite contient une erreur. **Trouve-la et corrige-la** pour que le programme affiche `Total : 15`.

```check
assert "total" in globals(), "La variable total doit exister."
assert total == 15, "Le total devrait valoir 15 (1 + 2 + 3 + 4 + 5)."
```

```starter
total = 0
for i in range(1, 6)
    total = total + i
print("Total :", total)
```
