---
title: Les classes : des sprites qui ont de la personnalité
---

# Tes propres types d'objets

Dans la leçon précédente, tous les météores se ressemblaient. Et si chaque météore avait **sa propre vitesse**, **sa propre couleur** et **sa propre taille** ? Avec des listes séparées, ce serait vite compliqué.

La solution : les **classes**. Une classe est un **plan de fabrication**. Avec ce plan, tu fabriques autant d'objets que tu veux, et chacun a ses propres valeurs.

## L'analogie avec Scratch

| Scratch | Python |
|---------|--------|
| Le sprite « Météore » (le plan) | `class Meteore:` |
| `when I start as a clone` | `def __init__(self):` |
| Les variables « *for this sprite only* » | `self.vitesse`, `self.couleur`... |
| Les blocs du sprite (comportements) | des **méthodes** : `def deplacer(self):` |
| Chaque clone | un **objet** : `m = Meteore()` |

## Écrire une classe

```python
class Meteore:
    def __init__(self):
        self.rect = pygame.Rect(random.randint(0, 450), -30, 30, 30)
        self.vitesse = random.randint(2, 7)
        self.couleur = random.choice(COULEURS)

    def deplacer(self):
        self.rect.y = self.rect.y + self.vitesse

    def dessiner(self, ecran):
        pygame.draw.rect(ecran, self.couleur, self.rect)
```

- `__init__` s'exécute **automatiquement** à la création d'un objet. Il donne ses valeurs de départ.
- `self` veut dire « **cet** objet-ci ». `self.vitesse` est la vitesse de **ce** météore.
- Une **méthode** est une fonction qui appartient à la classe. Son premier paramètre est toujours `self`.

## Créer des objets

```python
m = Meteore()            # fabrique un météore avec le plan
m.deplacer()             # lui fait faire son action
m.dessiner(screen)
print(m.vitesse)         # lit son attribut
```

Chaque appel à `Meteore()` donne un objet **différent**, avec ses propres valeurs.

## Pourquoi c'est puissant

Dans la boucle du jeu, tu n'as plus de détails à gérer : tu dis juste à chaque objet de se déplacer et de se dessiner :

```python
for m in meteores:
    m.deplacer()
    m.dessiner(screen)
```

Si tu veux changer le comportement des météores, tu modifies **un seul endroit** : la classe.

> **À toi de jouer !**
> 1. Lance le jeu et observe : les météores ont des vitesses et des couleurs différentes.
> 2. Ajoute un attribut `taille` aléatoire (entre 20 et 50) et utilise-le dans le `Rect`.
> 3. Ajoute une méthode `est_sorti(self)` qui renvoie `True` quand le météore est en bas de l'écran, et utilise-la pour nettoyer la liste.
> 4. Défi : crée une classe `Etoile` (à ramasser pour gagner des points) avec le même principe, puis fais-en apparaître dans le jeu.

```starter
import asyncio
import random
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()
police = pygame.font.Font(None, 32)
grande_police = pygame.font.Font(None, 64)

COULEURS = [(200, 120, 60), (220, 70, 70), (180, 90, 200), (240, 200, 60)]


class Meteore:
    def __init__(self):
        self.rect = pygame.Rect(random.randint(0, 450), -30, 30, 30)
        self.vitesse = random.randint(2, 7)
        self.couleur = random.choice(COULEURS)

    def deplacer(self):
        self.rect.y = self.rect.y + self.vitesse

    def dessiner(self, ecran):
        pygame.draw.rect(ecran, self.couleur, self.rect)


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
            meteores.append(Meteore())

        for m in meteores:
            m.deplacer()
            if m.rect.colliderect(joueur):
                perdu = True

        meteores = [m for m in meteores if m.rect.y < 320]

    screen.fill((10, 10, 30))
    pygame.draw.rect(screen, (66, 184, 131), joueur)
    for m in meteores:
        m.dessiner(screen)

    texte = police.render(f"Temps : {compteur // 60} s", True, (255, 255, 255))
    screen.blit(texte, (10, 10))
    if perdu:
        fin = grande_police.render("PERDU !", True, (255, 255, 255))
        screen.blit(fin, fin.get_rect(center=(240, 160)))

    pygame.display.flip()
    clock.tick(60)
    await asyncio.sleep(0)
```
