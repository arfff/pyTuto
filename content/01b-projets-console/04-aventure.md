---
title: Projet 4 — Une aventure textuelle
---

# Raconte ta propre histoire

Une aventure textuelle, c'est un jeu où l'ordinateur décrit un lieu et où tu choisis quoi faire. Selon tes choix, l'histoire change : c'est comme les histoires dont tu es le héros.

## Une salle = une fonction

Chaque lieu est une **fonction** qui :
1. décrit la salle,
2. demande un choix au joueur,
3. **renvoie le nom de la prochaine salle**.

```python
def salle_depart():
    print("Tu es dans une salle sombre.")
    choix = input("Que fais-tu ? (gauche / coffre) ")
    if choix == "gauche":
        return "couloir"
    return "depart"      # sinon, on reste ici
```

## La boucle principale

Une variable `lieu` garde la salle actuelle. Tant que ce n'est pas `"fin"`, on appelle la fonction de la salle correspondante :

```python
lieu = "depart"
while lieu != "fin":
    if lieu == "depart":
        lieu = salle_depart()
    elif lieu == "couloir":
        lieu = couloir()
```

C'est comme un `broadcast` Scratch qui envoie le joueur d'une salle à l'autre.

## L'inventaire

Une liste `inventaire` garde les objets ramassés. Une salle peut tester `"clé" in inventaire` pour décider ce qui se passe : par exemple, le coffre ne s'ouvre qu'avec la clé !

Une liste créée en dehors des fonctions peut être modifiée depuis les fonctions avec `append` (elle est partagée).

> **À toi de jouer !**
> 1. Change l'histoire : lieu, ambiance, objets, personnages.
> 2. Ajoute au moins **2 nouvelles salles** avec leur fonction (une cave, une forêt, un château...).
> 3. Ajoute un objet utile dans une salle et un obstacle qui le demande (une porte verrouillée, un monstre à vaincre avec une épée...).
> 4. Ajoute un compteur de **points de vie** : certaines salles font perdre des points, et le jeu s'arrête à 0.
> 5. Défi : ajoute au moins deux fins différentes (victoire, défaite, fin secrète...).

```starter
inventaire = []


def salle_depart():
    print("\nTu es dans une salle sombre. Une porte à gauche, un coffre au centre.")
    choix = input("Que fais-tu ? (gauche / coffre) ").strip().lower()
    if choix == "gauche":
        return "couloir"
    elif choix == "coffre":
        if "clé" in inventaire:
            print("Tu ouvres le coffre avec la clé : il contient un trésor !")
            return "fin"
        print("Le coffre est verrouillé. Il faut une clé.")
        return "depart"
    print("Je n'ai pas compris.")
    return "depart"


def couloir():
    print("\nTu es dans un couloir. Au sol, quelque chose brille.")
    choix = input("Que fais-tu ? (ramasser / retour) ").strip().lower()
    if choix == "ramasser":
        if "clé" not in inventaire:
            inventaire.append("clé")
            print("Tu ramasses une petite clé dorée !")
        else:
            print("Il n'y a plus rien ici.")
        return "couloir"
    elif choix == "retour":
        return "depart"
    print("Je n'ai pas compris.")
    return "couloir"


print("=== L'AVENTURE COMMENCE ===")
lieu = "depart"

while lieu != "fin":
    if lieu == "depart":
        lieu = salle_depart()
    elif lieu == "couloir":
        lieu = couloir()

print("\n🏆 Bravo, tu as terminé l'aventure !")
```
