# bnj-design.github.io

Le projet "Henri Potier" a pour vocation d'offrir un site de e-commerce afin d'exposer l'ensemble des aventures d'Henri Potier.

- Une interface "Catalogue" présente l'ensemble des articles disponibles.
- Il est possible de sélectionner entre 1 et 10 exemplaire(s) de chaque oeuvre afin de les ajouter au panier.
- Un message d'information suit l'ajout/modification des articles du panier.
- Le clic sur les images des oeuvres ouvre une pop-up avec la taille réelle de ces dernières.

Dans la colonne de droite, un résumé du panier est affiché sous la forme d'un bouton cliquable.

- Ce bouton affiche le nombre d'articles dans le panier.
- Le clic sur ce dernier ouvre une seconde interface : le panier

La seconde interface se présente sous la forme d'une pop-up.

- Elle se compose d'une première partie, récapiulant les articles présents dans le panier.
- Une coche est disponible à gauche de chaque item afin de pouvoir le sélectionner.
- Une seconde partie permet d'appliquer la meilleure offre commerciale disponible sur le panier en cours.
- Le montant "offre comprise" est affiché dans cette seconde zone.
- 3 boutons d'action sont disponibles : 
  - "Continuer mes achats" ferme le panier
  - "Valider mes achats" transfert vers la page de validation et de paiement
  - "Supprimer la sélection" permet de supprimer du panier les articles qui ont été sélectionnés (l'offre commerciale est donc bien entendue recalculée).
  
La 3ème interface permet de valider/payer son panier. Cette interface débouche sur une page en cours de construction.
Cette rubrique sera disponible lors du déploiement de la version 0.0.2 de l'application.


*********** Détails techniques supplémentaires ***********

- L'application sauvegarde les oeuvres et le panier dans le local storage du navigateur
- Le site est responsive pour les résolutions inférieures à 1280px de largeur (pour tablettes et mobiles)

*************** Déploiement ******************
- L'application récupère ses dépendences via npm et bower
- Les tests automatiques sont réalisés via protractor
- l'application est disponible depuis le sous-dossier "app"
- Visualisation possible à l'adresse suivante : http://bnj-design.github.io/app
