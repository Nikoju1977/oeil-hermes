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

## Lieu de naissance et décalage horaire

Un champ ville renseigne la latitude, la longitude et le décalage UTC. La table couvre l'heure d'été française telle qu'elle a réellement été appliquée : aucune de 1945 à 1975, dates propres à chaque année de 1976 à 1980, dernier dimanche de mars au dernier dimanche de septembre de 1981 à 1995, puis à octobre depuis 1996. Le décalage proposé reste modifiable : c'est une aide à la saisie, pas une autorité.

## Le graphe

Une simulation de forces place les 69 nœuds et leurs correspondances. Elle s'arrête d'elle-même une fois stabilisée, et se résout en un seul calcul si le système demande une réduction des animations.

## Ce qui passe par un modèle

Uniquement la lecture interprétée, et seulement si vous enregistrez une clé. Fournisseurs tentés dans l'ordre : Mistral, Groq, Cerebras.

Les clés sont chiffrées en AES-256-GCM, la clé de chiffrement étant dérivée d'une phrase de passe par PBKDF2-SHA-256 à 210 000 itérations. Le stockage ne contient que le sel, le vecteur d'initialisation et le chiffré. La phrase de passe n'est gardée qu'en mémoire, le temps de l'onglet. Une phrase perdue rend la clé irrécupérable : il faut la ressaisir.

Cela protège la clé d'une lecture directe du stockage, pas d'un code malveillant exécuté dans la page. Sur un site public, n'utilisez qu'une clé révocable.

## Langues

Interface et contenu complets en français et en anglais. La langue suit celle du navigateur au premier lancement, puis le choix fait dans l'en-tête, conservé sur l'appareil. La recherche interroge les deux langues à la fois : `sulphur` trouve Soufre même en mode français.

Pour ajouter une langue, il suffit d'un objet de même forme que `EN` dans `index.html` (`{ id: {n, s, t} }`) et d'une entrée dans `UI`. Rien d'autre à toucher.

## Partager un thème

Le bouton « Copier le lien du thème » encode la saisie dans l'URL. Le lien rouvre l'application et recalcule le thème, sans base de données ni compte.

## Tests

`node test/smoke.js` monte la page dans un DOM simulé et vérifie l'index, la recherche bilingue, les filtres, la réciprocité des correspondances, les décalages horaires, les huit blocs du thème, le lien partageable, le graphe et la bascule de langue. Le workflow GitHub Actions le rejoue à chaque push sur `main`.

```bash
npm install jsdom --no-save && node test/smoke.js
```

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
