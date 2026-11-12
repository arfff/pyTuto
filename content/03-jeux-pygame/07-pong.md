---
title: Projet : Pong à deux joueurs
---

# Le plus célèbre des jeux d'arcade

Pong, 1972 : deux raquettes, une balle, et le premier qui rate perd un point. Tu as déjà presque tous les éléments pour le construire !

Clique sur **▶ Exécuter**, puis sur la scène. Le joueur de gauche utilise **W** (monter) et **S** (descendre), celui de droite utilise les **flèches haut et bas**.

## Les éléments

- Deux raquettes : des `Rect` (un par joueur).
- Une balle : un petit `Rect`, avec une vitesse horizontale `vx` et une vitesse verticale `vy`.
- Deux scores.

## La balle

À chaque image, la balle avance de `vx` et `vy` :

```python
balle.x = balle.x + vx
balle.y = balle.y + vy
```

Dans Scratch, ce serait `change x by` et `change y by`.

## Les rebonds

- **Sur le haut et le bas de l'écran** : on **inverse** la vitesse verticale (`vy = -vy`), comme `if on edge, bounce`.
- **Sur une raquette** : on inverse la vitesse horizontale. Mais attention : si la balle reste dans la raquette au tour suivant, elle risque de rebondir deux fois ! On impose donc la direction : `vx = abs(vx)` après un rebond sur la raquette de gauche (la balle part vers la **droite**), et `vx = -abs(vx)` sur celle de droite.

## Marquer un point

Si la balle sort à gauche ou à droite de l'écran, l'autre joueur marque. On remet la balle au centre avec `balle.center = (240, 160)`.

## Gérer deux joueurs au clavier

`pygame.key.get_pressed()` permet de savoir si **plusieurs touches** sont enfoncées en même temps, donc deux joueurs peuvent jouer ensemble sans se gêner.

> **À toi de jouer !**
> 1. Ajoute une ligne pointillée au milieu du terrain (avec une boucle `for` qui dessine de petits rectangles).
> 2. Accélère la balle à chaque rebond sur une raquette (par exemple en ajoutant 1 à la vitesse horizontale), avec une vitesse maximale pour que le jeu reste jouable.
> 3. Fais varier l'angle de rebond selon l'endroit où la balle touche la raquette (milieu = droit, bord = en diagonale).
> 4. Défi : crée un mode **un joueur** où la raquette de droite suit la balle toute seule.

```starter
import asyncio
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()
police = pygame.font.Font(None, 48)

joueur1 = pygame.Rect(20, 130, 10, 60)
joueur2 = pygame.Rect(450, 130, 10, 60)
balle = pygame.Rect(234, 154, 12, 12)
vx = 4
vy = 3
score1 = 0
score2 = 0

while True:
    for event in pygame.event.get():
        pass

    touches = pygame.key.get_pressed()
    if touches[pygame.K_w]:
        joueur1.y = joueur1.y - 6
    if touches[pygame.K_s]:
        joueur1.y = joueur1.y + 6
    if touches[pygame.K_UP]:
        joueur2.y = joueur2.y - 6
    if touches[pygame.K_DOWN]:
        joueur2.y = joueur2.y + 6
    joueur1.clamp_ip(screen.get_rect())
    joueur2.clamp_ip(screen.get_rect())

    balle.x = balle.x + vx
    balle.y = balle.y + vy

    if balle.y <= 0 or balle.y >= 308:
        vy = -vy

    if balle.colliderect(joueur1):
        vx = abs(vx)
    if balle.colliderect(joueur2):
        vx = -abs(vx)

    if balle.x < 0:
        score2 = score2 + 1
        balle.center = (240, 160)
        vx = abs(vx)
    elif balle.x > 480:
        score1 = score1 + 1
        balle.center = (240, 160)
        vx = -abs(vx)

    screen.fill((10, 10, 20))
    pygame.draw.rect(screen, (255, 255, 255), joueur1)
    pygame.draw.rect(screen, (255, 255, 255), joueur2)
    pygame.draw.rect(screen, (255, 220, 80), balle)

    texte = police.render(f"{score1}   {score2}", True, (255, 255, 255))
    screen.blit(texte, texte.get_rect(center=(240, 30)))

    pygame.display.flip()
    clock.tick(60)
    await asyncio.sleep(0)
```
