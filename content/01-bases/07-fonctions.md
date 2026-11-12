---
title: Les fonctions
---

# Créer tes propres blocs

Dans Scratch, tu peux créer tes propres blocs avec **My Blocks** (`define ...`). En Python, c'est le rôle des **fonctions**, avec le mot **`def`** :

```python
def dire_bonjour():
    print("Bonjour !")
```

Cette ligne ne fait rien toute seule : elle **définit** le bloc. Pour l'utiliser, on l'**appelle** :

```python
dire_bonjour()
dire_bonjour()
```

## Des paramètres

Comme les blocs My Blocks avec des cases à remplir, une fonction peut avoir des **paramètres** :

```python
def saluer(prenom):
    print(f"Salut {prenom} !")

saluer("Alex")
saluer("Sam")
```

## Renvoyer une valeur

Avec **`return`**, la fonction renvoie un résultat, comme un bloc ovale de Scratch (un *reporter*) :

```python
def carre(n):
    return n * n

print(carre(5))        # 25
resultat = carre(3) + 1
```

## Pourquoi c'est utile ?

- Tu ne copies plus le même code plusieurs fois.
- Si tu veux modifier quelque chose, tu le fais à **un seul endroit**.
- Ton programme est plus lisible : chaque fonction a un nom qui dit ce qu'elle fait.

## Attention à l'ordre

Une fonction doit être définie **avant** de l'appeler (donc plus haut dans le programme).

> **À toi de jouer !**
> 1. Appelle `saluer` avec ton prénom.
> 2. Écris une fonction `aire_rectangle(largeur, hauteur)` qui **renvoie** l'aire, et affiche l'aire d'un rectangle de 4 sur 7.
> 3. Écris une fonction `est_pair(n)` qui renvoie `True` si `n` est pair (indice : `n % 2 == 0`).
> 4. Défi : écris une fonction `table(n)` qui affiche la table de multiplication de `n` (avec une boucle `for`), puis appelle-la pour 3, 4 et 5.

## 🏁 Défi à valider

Écris une fonction `est_pair(n)` qui **renvoie** `True` si `n` est pair et `False` sinon (indice : `n % 2 == 0`). Puis exécute : le site la teste.

```check
assert "est_pair" in globals(), "Écris une fonction nommée est_pair."
assert est_pair(4) is True, "est_pair(4) doit renvoyer True (utilise return)."
assert est_pair(7) is False, "est_pair(7) doit renvoyer False."
assert est_pair(0) is True, "0 est pair : est_pair(0) doit renvoyer True."
```

```starter
def saluer(prenom):
    print(f"Salut {prenom} !")


def carre(n):
    return n * n


saluer("Alex")
saluer("Sam")

for i in range(1, 6):
    print(f"Le carré de {i} est {carre(i)}")
```
