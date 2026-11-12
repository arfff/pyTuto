---
title: Afficher du texte et des vies
---

# Le score à l'écran

Jusqu'ici, tu as affiché le score dans la console. Dans un vrai jeu, il s'affiche **sur la scène**, comme les variables que tu fais apparaître avec les cases à cocher de Scratch.

Clique sur **▶ Exécuter**, puis sur la scène, et joue avec les flèches gauche et droite : le score et les vies sont maintenant affichés en haut de la scène.

## Écrire du texte en deux étapes

Pour afficher du texte avec pygame, il faut :
1. créer une **police** (une seule fois, avant la boucle),
2. à chaque image, fabriquer une **image de texte** avec `render`, puis la **coller** sur l'écran avec `blit`.

```python
police = pygame.font.Font(None, 36)       # None = police par défaut, 36 = taille

texte = police.render(f"Score : {score}", True, (255, 255, 255))
screen.blit(texte, (10, 10))              # (x, y) du coin en haut à gauche du texte
```

Le `True` rend les bords du texte plus lisses. Comme le texte contient le score, il faut refaire le `render` **à chaque image**.

## Centrer un texte

```python
texte = grande_police.render("GAME OVER", True, (255, 255, 255))
screen.blit(texte, texte.get_rect(center=(240, 160)))
```

`get_rect(center=...)` donne le rectangle du texte avec son centre à l'endroit voulu.

## Les vies et la fin de partie

Une variable `vies` démarre à 3. Quand une pomme tombe sans être attrapée, on perd une vie. Quand `vies == 0`, la partie est terminée : on arrête de bouger les objets (grâce à `if vies > 0:`) mais on continue d'afficher l'écran avec « GAME OVER ».

> **À toi de jouer !**
> 1. Change les couleurs et la taille des textes.
> 2. Fais gagner **2 points** quand la pomme tombe très près du bord du joueur.
> 3. Ajoute un **meilleur score** : une variable `meilleur` qui garde le plus haut score de la session.
> 4. Défi : permets de **rejouer** en appuyant sur la touche Entrée (`pygame.K_RETURN`) quand c'est Game Over : remets `score`, `vies` et la pomme à leur valeur de départ.

```starter
import asyncio
import random
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()
police = pygame.font.Font(None, 32)
grande_police = pygame.font.Font(None, 64)

joueur = pygame.Rect(210, 280, 60, 25)
pomme = pygame.Rect(random.randint(0, 460), 0, 20, 20)
score = 0
vies = 3

while True:
    for event in pygame.event.get():
        pass

    if vies > 0:
        touches = pygame.key.get_pressed()
        if touches[pygame.K_LEFT]:
            joueur.x = joueur.x - 6
        if touches[pygame.K_RIGHT]:
            joueur.x = joueur.x + 6
        joueur.clamp_ip(screen.get_rect())

        pomme.y = pomme.y + 4

        if pomme.colliderect(joueur):
            score = score + 1
            pomme.y = 0
            pomme.x = random.randint(0, 460)
        elif pomme.y > 320:
            vies = vies - 1
            pomme.y = 0
            pomme.x = random.randint(0, 460)

    screen.fill((30, 30, 60))
    pygame.draw.rect(screen, (66, 184, 131), joueur)
    pygame.draw.ellipse(screen, (220, 50, 50), pomme)

    texte_score = police.render(f"Score : {score}", True, (255, 255, 255))
    texte_vies = police.render(f"Vies : {vies}", True, (255, 130, 130))
    screen.blit(texte_score, (10, 10))
    screen.blit(texte_vies, (370, 10))

    if vies == 0:
        texte = grande_police.render("GAME OVER", True, (255, 255, 255))
        screen.blit(texte, texte.get_rect(center=(240, 160)))

    pygame.display.flip()
    clock.tick(60)
    await asyncio.sleep(0)
```
