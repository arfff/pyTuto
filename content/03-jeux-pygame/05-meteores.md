---
title: Plusieurs objets : la pluie de météores
---

# Beaucoup d'ennemis à la fois

Dans le jeu des pommes, il n'y avait qu'**une seule** pomme à la fois. Pour un jeu avec des dizaines d'ennemis, on ne peut pas créer une variable par ennemi : on utilise une **liste**.

Dans Scratch, tu utiliserais des **clones** (`create clone of myself`). Ici, on fabrique des rectangles et on les range dans une liste `meteores`.

Clique sur **▶ Exécuter**, puis sur la scène : évite les météores avec les flèches gauche et droite !

## Ajouter un objet à la liste

À intervalles réguliers, on fabrique un nouveau météore à une position au hasard en haut de l'écran :

```python
meteores.append(pygame.Rect(random.randint(0, 450), -30, 30, 30))
```

## Faire apparaître un objet toutes les N images

Une variable `compteur` augmente d'1 à chaque image. Le **modulo** `%` donne le reste d'une division : `compteur % 20 == 0` est vrai toutes les 20 images, soit environ 3 fois par seconde.

```python
compteur = compteur + 1
if compteur % 20 == 0:
    ...    # un nouveau météore !
```

## Parcourir tous les objets

```python
for m in meteores:
    m.y = m.y + 4
    if m.colliderect(joueur):
        perdu = True
```

## Retirer les objets sortis de l'écran

Si on ne retire jamais les météores, la liste grossit sans fin et le jeu ralentit. On ne garde que ceux qui sont **encore sur l'écran** :

```python
meteores = [m for m in meteores if m.y < 320]
```

Cette ligne se lit : « la nouvelle liste contient chaque `m` de l'ancienne liste, **seulement si** `m.y < 320` ». C'est une *liste en compréhension*.

⚠️ On ne retire pas un élément d'une liste **pendant** qu'on la parcourt avec `for` : ça donne des bugs. Il vaut mieux fabriquer une nouvelle liste, comme ici.

## Le score

Le score est le nombre de secondes survécues : `compteur // 60` (la division entière, car le jeu tourne à 60 images par seconde).

> **À toi de jouer !**
> 1. Rends le jeu plus facile ou plus difficile en changeant `20` (fréquence) ou `4` (vitesse).
> 2. Augmente la difficulté avec le temps : le météore apparaît plus souvent au fil des secondes.
> 3. Donne à chaque météore une vitesse différente avec une deuxième liste de vitesses (ou, mieux, prépare la leçon suivante sur les classes !).
> 4. Défi : ajoute des étoiles à ramasser qui donnent 5 points.

```starter
import asyncio
import random
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()
police = pygame.font.Font(None, 32)
grande_police = pygame.font.Font(None, 64)

joueur = pygame.Rect(225, 275, 30, 30)
meteores = []
compteur = 0
perdu = False

while True:
    for event in pygame.event.get():
        pass

    if not perdu:
        touches = pygame.key.get_pressed()
        if touches[pygame.K_LEFT]:
            joueur.x = joueur.x - 6
        if touches[pygame.K_RIGHT]:
            joueur.x = joueur.x + 6
        joueur.clamp_ip(screen.get_rect())

        compteur = compteur + 1
        if compteur % 20 == 0:
            meteores.append(pygame.Rect(random.randint(0, 450), -30, 30, 30))

        for m in meteores:
            m.y = m.y + 4
            if m.colliderect(joueur):
                perdu = True

        meteores = [m for m in meteores if m.y < 320]

    screen.fill((10, 10, 30))
    pygame.draw.rect(screen, (66, 184, 131), joueur)
    for m in meteores:
        pygame.draw.rect(screen, (200, 120, 60), m)

    texte = police.render(f"Temps : {compteur // 60} s", True, (255, 255, 255))
    screen.blit(texte, (10, 10))
    if perdu:
        fin = grande_police.render("PERDU !", True, (255, 255, 255))
        screen.blit(fin, fin.get_rect(center=(240, 160)))

    pygame.display.flip()
    clock.tick(60)
    await asyncio.sleep(0)
```
