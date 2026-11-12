---
title: Mini-jeu : attrape les pommes
---

# Ton premier vrai jeu

Il est temps de tout assembler : un joueur qui se déplace, une pomme qui tombe et un **score**.

Clique sur **▶ Exécuter**, puis sur la scène, et utilise les flèches gauche et droite pour attraper les pommes. Ton score s'affiche dans la console, à droite de la scène.

## Les rectangles : `pygame.Rect`

Un `Rect` représente un rectangle avec sa position et sa taille : `pygame.Rect(x, y, largeur, hauteur)`. On peut modifier directement `joueur.x` ou `pomme.y`.

## La détection de contact

Dans Scratch, tu utilises le bloc `touching [sprite]?`. En pygame :

```python
if pomme.colliderect(joueur):
    ...
```

`colliderect` signifie « est-ce que ces deux rectangles se touchent ? ».

## Le hasard

Dans Scratch, tu utilises `pick random 1 to 10`. En Python, avec `import random`, c'est :

```python
random.randint(0, 460)
```

Ici, la pomme réapparaît en haut de l'écran à une position au hasard.

## Comment ça marche

À chaque image :
1. la pomme descend un peu (`pomme.y += 4`),
2. si elle touche le joueur, on ajoute 1 point et on la remet en haut,
3. si elle tombe en bas sans être attrapée, on la remet aussi en haut.

> **À toi de jouer !**
> 1. Rends la pomme plus rapide en changeant `4`.
> 2. Fais que la pomme accélère un peu à chaque point gagné.
> 3. Ajoute un compteur de vies : tu en perds une chaque fois qu'une pomme tombe, et le jeu s'arrête à 0 (avec `break`).
> 4. Défi : ajoute une pomme pourrie (de couleur différente) qui fait perdre un point si on l'attrape.

```starter
import asyncio
import random
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()

joueur = pygame.Rect(210, 280, 60, 25)
pomme = pygame.Rect(random.randint(0, 460), 0, 20, 20)
score = 0

while True:
    for event in pygame.event.get():
        pass

    touches = pygame.key.get_pressed()
    if touches[pygame.K_LEFT]:
        joueur.x = joueur.x - 6
    if touches[pygame.K_RIGHT]:
        joueur.x = joueur.x + 6
    joueur.clamp_ip(screen.get_rect())

    pomme.y = pomme.y + 4

    if pomme.colliderect(joueur):
        score = score + 1
        print(f"Score : {score}")
        pomme.y = 0
        pomme.x = random.randint(0, 460)
    elif pomme.y > 320:
        pomme.y = 0
        pomme.x = random.randint(0, 460)

    screen.fill((30, 30, 60))
    pygame.draw.rect(screen, (66, 184, 131), joueur)
    pygame.draw.ellipse(screen, (220, 50, 50), pomme)
    pygame.display.flip()

    clock.tick(60)
    await asyncio.sleep(0)
```
