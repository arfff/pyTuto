---
title: Ta première fenêtre de jeu
---

# Bienvenue dans pygame

**pygame** est une bibliothèque qui sert à créer des jeux en Python. Ici, ton jeu s'affiche dans la zone noire en bas à gauche : c'est la **scène**, comme dans Scratch.

Clique sur **▶ Exécuter** : un rond vert apparaît sur la scène. Pour arrêter le jeu, clique sur **■ Stop**.

## La boucle de jeu

Dans Scratch, tu utilises `when green flag clicked` puis `forever`. En pygame, c'est la même idée avec une boucle **`while True:`** qui répète les mêmes étapes, environ 60 fois par seconde :

1. lire ce que fait le joueur (`pygame.event.get()`),
2. effacer l'écran avec une couleur (`screen.fill`),
3. dessiner les objets (`pygame.draw.circle`),
4. afficher le résultat (`pygame.display.flip()`).

## Les couleurs

Une couleur s'écrit avec trois nombres de 0 à 255 : `(rouge, vert, bleu)`.
Par exemple `(255, 0, 0)` est rouge, `(0, 0, 0)` est noir et `(255, 255, 255)` est blanc.

## Les coordonnées

Attention, c'est différent de Scratch : le point `(0, 0)` est **en haut à gauche** de la scène, et `y` **augmente vers le bas**.

## La dernière ligne de la boucle

```python
await asyncio.sleep(0)
```

Cette ligne laisse le navigateur respirer entre deux images. **Elle doit toujours être à la fin de ta boucle**, sinon la page se bloque !

> **À toi de jouer !**
> 1. Change la couleur du fond et celle du rond.
> 2. Change la taille du rond (le dernier nombre de `pygame.draw.circle`).
> 3. Change sa position : `(240, 160)` est le centre de la scène.
> 4. Défi : dessine un rectangle avec `pygame.draw.rect(screen, (255, 0, 0), (50, 50, 100, 60))`.

```starter
import asyncio
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        pass

    screen.fill((30, 30, 60))
    pygame.draw.circle(screen, (66, 184, 131), (240, 160), 40)
    pygame.display.flip()

    clock.tick(60)
    await asyncio.sleep(0)
```
