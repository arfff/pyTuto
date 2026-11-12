---
title: Projet : Snake
---

# Le serpent qui grandit

Snake : un serpent avance sur une grille, mange des pommes, grandit, et perd s'il se mord la queue ou touche un mur. C'est un projet qui réunit presque tout ce que tu as appris.

Clique sur **▶ Exécuter**, puis sur la scène, et dirige le serpent avec les **flèches**.

## Une grille

Au lieu de pixels, on raisonne en **cases** de 20 par 20 pixels. La scène fait 24 cases de large et 16 de haut. Chaque case est repérée par un couple `(colonne, ligne)`. Pour dessiner, on multiplie par `TAILLE` :

```python
pygame.Rect(x * TAILLE, y * TAILLE, TAILLE - 1, TAILLE - 1)
```

Le `- 1` laisse un petit espace entre les cases, ce qui donne un effet de segments.

## Le serpent : une liste de cases

```python
serpent = [(5, 8), (4, 8), (3, 8)]
```

Le **premier** élément est la **tête**. Pour avancer d'une case :
1. on calcule la **nouvelle tête** en ajoutant la direction à la tête actuelle,
2. on l'**insère au début** de la liste (`insert(0, ...)`),
3. on **retire le dernier** élément (`pop()`) : la queue avance.

Si le serpent mange une pomme, on **ne retire pas** la queue : le serpent s'allonge d'une case !

## La direction

La direction est un couple : `(1, 0)` = droite, `(-1, 0)` = gauche, `(0, -1)` = haut, `(0, 1)` = bas. Une touche change la direction, sauf pour faire **demi-tour** (le serpent se mordrait immédiatement).

## Une vitesse raisonnable

Le jeu tourne à 60 images par seconde, mais le serpent avancerait beaucoup trop vite ! On le fait bouger seulement **une image sur 6** avec `compteur % 6 == 0`, soit 10 cases par seconde.

## Les collisions

Le serpent perd si sa nouvelle tête :
- est **déjà dans** le serpent (`nouvelle_tete in serpent`),
- sort de la grille. On le teste avec une comparaison enchaînée : `0 <= x < COLONNES` est vrai si `x` est entre 0 et `COLONNES - 1`.

## Dessiner le serpent

Dans le programme, `enumerate(serpent)` donne, pour chaque case, son **numéro** `i` en plus de ses coordonnées. On s'en sert pour colorer la tête (`i == 0`) en plus clair. L'expression `a if condition else b` est un `if` en une ligne : elle vaut `a` si la condition est vraie, sinon `b`.

## La pomme

Quand elle est mangée, on en place une nouvelle **au hasard**, mais pas sur le serpent ! Une boucle `while` retire au sort tant que la case est occupée.

> **À toi de jouer !**
> 1. Change la vitesse (le `6`) et la taille de la grille.
> 2. Fais traverser les murs : le serpent réapparaît de l'autre côté (indice : l'opérateur `%`).
> 3. Accélère un peu le serpent à chaque pomme mangée.
> 4. Ajoute un **meilleur score** et une touche pour rejouer.
> 5. Défi : ajoute des obstacles (une liste de cases `murs`) ou une pomme bonus qui disparaît au bout de 5 secondes.

```starter
import asyncio
import random
import pygame

pygame.init()
TAILLE = 20
COLONNES = 24
LIGNES = 16
screen = pygame.display.set_mode((COLONNES * TAILLE, LIGNES * TAILLE))
clock = pygame.time.Clock()
police = pygame.font.Font(None, 32)
grande_police = pygame.font.Font(None, 64)

serpent = [(5, 8), (4, 8), (3, 8)]
direction = (1, 0)
nourriture = (15, 8)
score = 0
perdu = False
compteur = 0

while True:
    for event in pygame.event.get():
        pass

    touches = pygame.key.get_pressed()
    if touches[pygame.K_UP] and direction != (0, 1):
        direction = (0, -1)
    if touches[pygame.K_DOWN] and direction != (0, -1):
        direction = (0, 1)
    if touches[pygame.K_LEFT] and direction != (1, 0):
        direction = (-1, 0)
    if touches[pygame.K_RIGHT] and direction != (-1, 0):
        direction = (1, 0)

    if not perdu:
        compteur = compteur + 1
        if compteur % 6 == 0:
            tete_x, tete_y = serpent[0]
            nouvelle_tete = (tete_x + direction[0], tete_y + direction[1])
            x, y = nouvelle_tete

            if nouvelle_tete in serpent or not (0 <= x < COLONNES) or not (0 <= y < LIGNES):
                perdu = True
            else:
                serpent.insert(0, nouvelle_tete)
                if nouvelle_tete == nourriture:
                    score = score + 1
                    while nourriture in serpent:
                        nourriture = (random.randint(0, COLONNES - 1), random.randint(0, LIGNES - 1))
                else:
                    serpent.pop()

    screen.fill((20, 25, 30))
    pygame.draw.rect(screen, (220, 60, 60), (nourriture[0] * TAILLE, nourriture[1] * TAILLE, TAILLE - 1, TAILLE - 1))
    for i, (cx, cy) in enumerate(serpent):
        couleur = (120, 230, 150) if i == 0 else (66, 184, 131)
        pygame.draw.rect(screen, couleur, (cx * TAILLE, cy * TAILLE, TAILLE - 1, TAILLE - 1))

    texte = police.render(f"Score : {score}", True, (255, 255, 255))
    screen.blit(texte, (10, 10))
    if perdu:
        fin = grande_police.render("PERDU !", True, (255, 255, 255))
        screen.blit(fin, fin.get_rect(center=(COLONNES * TAILLE // 2, LIGNES * TAILLE // 2)))

    pygame.display.flip()
    clock.tick(60)
    await asyncio.sleep(0)
```
