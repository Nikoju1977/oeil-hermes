# L'Œil d'Hermès

Grimoire numérique : 69 notions d'alchimie, d'astrologie, de kabbale et de tarot, reliées entre elles par leurs correspondances, avec un module de calculs de nombres et de positions.

Création : Lyssa Jung et Niko — Studio Niko Design.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière : données, styles, moteur, calculs |
| `sw.js` | Service worker, mise en cache de la coquille |
| `manifest.webmanifest` | Manifeste PWA |
| `icone.svg`, `icone-maskable.svg` | Icônes |

## Ce qui est calculé localement

Chemin de vie, nombre du jour de naissance, année personnelle, position du Soleil et son décan, position de la Lune, phase lunaire natale, ascendant, prochaine révolution solaire. Aucun de ces calculs n'utilise le réseau.

Précisions : Soleil au centième de degré, Lune à environ un degré (série tronquée), ascendant exact à condition de fournir l'heure, le décalage UTC, la latitude et la longitude. Les positions situées à moins de 1,5° d'une frontière de signe sont signalées comme incertaines.

## Ce qui passe par un modèle

Uniquement la lecture interprétée, et seulement si vous enregistrez une clé. Fournisseurs tentés dans l'ordre : Mistral, Groq, Cerebras. La clé reste sur l'appareil.

Sur un site public, une clé saisie dans le navigateur reste exposée à qui utilise l'appareil. N'y mettez qu'une clé révocable.

## Langues

Interface et contenu complets en français et en anglais. La langue suit celle du navigateur au premier lancement, puis le choix fait dans l'en-tête, conservé sur l'appareil. La recherche interroge les deux langues à la fois : `sulphur` trouve Soufre même en mode français.

Pour ajouter une langue, il suffit d'un objet de même forme que `EN` dans `index.html` (`{ id: {n, s, t} }`) et d'une entrée dans `UI`. Rien d'autre à toucher.

## Mise en ligne

GitHub Pages sert le dépôt tel quel. La PWA ne s'installe qu'en HTTPS : en `file://`, l'application fonctionne mais sans installation ni service worker.

```bash
git init
git add .
git commit -m "L'Œil d'Hermès — grimoire, calculs, PWA"
git branch -M main
git remote add origin https://github.com/Nikoju1977/oeil-hermes.git
git push -u origin main
```

Puis, dans les réglages du dépôt : Pages → Source → `main` / `/ (root)`.
