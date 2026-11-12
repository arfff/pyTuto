---
title: Déplacer un sprite avec le clavier
---

# Faire bouger ton personnage

Dans Scratch, tu écris `when right arrow key pressed` puis `change x by 10`. En pygame, on garde la position du sprite dans des **variables** `x` et `y`, et on les modifie à chaque tour de boucle.

Clique sur **▶ Exécuter**, puis clique sur la scène et utilise les **flèches** du clavier.

## Lire le clavier

```python
touches = pygame.key.get_pressed()
if touches[pygame.K_RIGHT]:
    x = x + vitesse
```

`touches[pygame.K_RIGHT]` vaut vrai tant que la flèche droite est enfoncée. Comme la boucle tourne 60 fois par seconde, le rond avance en continu.

Les autres touches ont des noms du même genre : `pygame.K_LEFT`, `pygame.K_UP`, `pygame.K_DOWN`, `pygame.K_SPACE`, `pygame.K_a`...

## Ne pas sortir de la scène

Sans protection, ton sprite peut disparaître hors de l'écran. La fonction `max` garde la valeur au-dessus d'un minimum, et `min` en dessous d'un maximum :

```python
x = max(20, min(460, x))
```

Ici `x` reste toujours entre 20 et 460.

> **À toi de jouer !**
> 1. Change la `vitesse` pour que le rond aille plus vite ou plus lentement.
> 2. Ajoute la touche espace : quand on appuie dessus, le rond devient rouge (indice : une variable `couleur` que tu modifies dans un `if`).
> 3. Ajoute un deuxième rond contrôlé avec les touches `pygame.K_a`, `pygame.K_d`, `pygame.K_w` et `pygame.K_s`.

```starter
import asyncio
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()

x = 240
y = 160
vitesse = 5

while True:
    for event in pygame.event.get():
        pass

    touches = pygame.key.get_pressed()
    if touches[pygame.K_RIGHT]:
        x = x + vitesse
    if touches[pygame.K_LEFT]:
        x = x - vitesse
    if touches[pygame.K_DOWN]:
        y = y + vitesse
    if touches[pygame.K_UP]:
        y = y - vitesse

    x = max(20, min(460, x))
    y = max(20, min(300, y))

    screen.fill((30, 30, 60))
    pygame.draw.circle(screen, (66, 184, 131), (x, y), 20)
    pygame.display.flip()

    clock.tick(60)
    await asyncio.sleep(0)
```
