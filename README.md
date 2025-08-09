# Phr-Manager - Système de Gestion de pharmacie en ligne

## Description du Projet

**Phar-Manager** est une API REST complète, implémentant un système de gestion pharmaceutique moderne et sécurisé. Cette application permet la gestion des utilisateurs, des médicaments, des prescriptions et des commandes dans un environnement pharmaceutique.



## Architecture du Système
```
tp-final-service/
├── config/          # Configuration de la base de données
├── controllers/     # Logique métier et gestion des requêtes
├── middleware/      # Middlewares d'authentification et autorisation
├── models/          # Modèles de données MongoDB
├── routes/          # Définition des endpoints API
├── validators/      # Validation des données d'entrée
├── docs/            # Documentation Swagger
├── server.js        # Point d'entrée de l'application
└── swagger.js       # Configuration de la documentation API
```

## Système d'Authentification et Autorisation

### Gestion des Rôles
Le système implémente une hiérarchie de rôles sophistiquée :
- **Client** : Peut passer des commandes et consulter ses prescriptions
- **Pharmacien** : Gère l'inventaire et valide les commandes
- **Médecin** : Crée et gère les prescriptions
- **Admin** : Accès complet à toutes les fonctionnalités

### Sécurité JWT
- **Access Token** : Valide 15 minutes pour les opérations courantes
- **Refresh Token** : Valide 30 jours pour renouveler l'access token
- **Hachage des mots de passe** avec bcryptjs (salt rounds: 10)

## Modèles de Données

### 1. Utilisateur (User)
- **email** : Adresse email unique et obligatoire
- **password** : Mot de passe haché et sécurisé
- **role** : Rôle dans le système (client, pharmacien, médecin, admin)
- **firstName** et **lastName** : Nom et prénom obligatoires
- **phoneNumber** et **address** : Informations de contact optionnelles
- **medicalHistory** : Historique des prescriptions du patient
- **allergies** : Liste des allergies connues
- **refreshToken** : Token de renouvellement de session

### 2. Médicament (Medicine)
- **name** : Nom du médicament (obligatoire)
- **description** : Description détaillée du produit
- **requiresPrescription** : Indique si une ordonnance est nécessaire
- **price** : Prix en euros (obligatoire)
- **dosageForm** : Forme du médicament (comprimé, sirop, etc.)
- **sideEffects** : Liste des effets secondaires possibles
- **stock** : Quantité disponible en pharmacie

### 3. Prescription (Prescription)
- **patient** : Référence vers l'utilisateur patient
- **doctor** : Référence vers l'utilisateur médecin
- **medicines** : Liste des médicaments prescrits avec posologie
- **status** : Statut de la prescription (active ou utilisée)
- **notes** : Notes médicales additionnelles

### 4. Commande (Order)
- **user** : Référence vers l'utilisateur qui passe la commande
- **items** : Liste des médicaments commandés avec quantités
- **status** : Statut de la commande (en attente, validée, annulée)
- **prescription** : Référence vers l'ordonnance si nécessaire
- **orderDate** : Date de création de la commande

## Endpoints API

### Authentification
- `POST /auth/register` - Inscription d'un nouvel utilisateur
- `POST /auth/login` - Connexion et génération des tokens
- `POST /auth/refresh` - Renouvellement du token d'accès

### Gestion des Utilisateurs
- `GET /users/profile` - Profil de l'utilisateur connecté
- `PUT /users/profile` - Mise à jour du profil
- `GET /users` - Liste des utilisateurs
- `DELETE /users/:id` - Suppression d'utilisateur (Admin)

### Gestion des Médicaments
- `GET /medicines` - Liste des médicaments
- `POST /medicines` - Ajout d'un médicament (Admin/Pharmacien)
- `PUT /medicines/:id` - Modification d'un médicament (Admin/Pharmacien)
- `DELETE /medicines/:id` - Suppression d'un médicament (Admin)

### Gestion des Prescriptions
- `GET /prescriptions` - Prescriptions de l'utilisateur
- `POST /prescriptions` - Création d'une prescription (Médecin)
- `PUT /prescriptions/:id` - Modification d'une prescription (Médecin)
- `DELETE /prescriptions/:id` - Suppression d'une prescription (Médecin)

### Gestion des Commandes
- `GET /orders` - Commandes de l'utilisateur
- `POST /orders` - Création d'une commande
- `PUT /orders/:id/status` - Mise à jour du statut (Pharmacien)
- `GET /orders/all` - Toutes les commandes (Admin/Pharmacien)

### Gestion de l'Inventaire
- `GET /inventory` - État de l'**inventaire** (Admin/Pharmacien)
- `PUT /inventory/:id` - Mise à jour du stock (Admin/Pharmacien)

## Guide d'Utilisation et Processus

### Processus d'Authentification

#### 1. Inscription d'un Nouvel Utilisateur
**Étape 1 : Création du compte**
- L'utilisateur accède à l'endpoint `/auth/register`
- Il remplit le formulaire avec ses informations personnelles
- Le système vérifie que l'email n'existe pas déjà
- Le mot de passe est automatiquement haché et sécurisé
- Un compte est créé avec le rôle "client" par défaut

**Étape 2 : Première connexion**
- L'utilisateur se connecte via `/auth/login`
- Le système vérifie les identifiants
- Deux tokens sont générés : access token (15 min) et refresh token (30 jours)
- L'utilisateur est maintenant authentifié et peut accéder aux fonctionnalités

#### 2. Gestion des Sessions
**Renouvellement automatique des tokens**
- L'access token expire après 15 minutes
- L'utilisateur utilise le refresh token pour obtenir un nouveau access token


### Gestion des Rôles et Permissions

#### Rôle Client
**Fonctionnalités disponibles :**
- Consulter son profil personnel
- Modifier ses informations
- Consulter l'historique de ses prescriptions
- Passer des commandes de médicaments
- Suivre le statut de ses commandes

**Processus de commande :**
1. **Consultation du catalogue** : Le client parcourt la liste des médicaments disponibles
2. **Vérification des prescriptions** : Pour les médicaments les ajout à la liste des commande si et seulement s'ils ne nécéssitent pas une prescription. Dans le cas où un médicament nécessite une prescription, le patient la référence afin que le pharmacien vérifie sa validité ant de pouvoir passer commande.
3. **Création de la commande** : Sélection des médicaments et quantités
4. **Validation** : Le système vérifie la disponibilité et les prescriptions
5. **Suivi** : Le client peut suivre l'évolution de sa commande

#### Rôle Pharmacien
**Fonnalités spécifiques :**
- Gestion complète de l'inventaire
- Validation des commandes des clients
- Mise à jour des stocks en temps réel
- Consultation de toutes les commandes
- Gestion des médicaments (ajout, modification, suppression)

**Processus de gestion des commandes :**
1. **Réception des commandes** : Consultation des nouvelles commandes
2. **Vérification des stocks** : Contrôle de la disponibilité
3. **Validation des prescriptions** : Vérification des ordonnances si nécessaire
4. **Mise à jour du statut** : Passage de "pending" à "success"
5. **Gestion des stocks** : Déduction automatique des quantités commandées

**Processus de gestion d'inventaire :**
1. **Surveillance des stocks** : Consultation régulière des niveaux
2. **Mise à jour des quantités** : Ajout de nouveaux  via un update selectionné sur le produit en question.
3. **Gestion des ruptures** : Identification des médicaments en rupture avec la réquete ``` GET/medicines?understock=valeur```

#### Rôle Médecin
**Fonctionnalités dédiées :**
- Création de nouvelles prescriptions
- Modification des prescriptions existantes
- Consultation de l'historique des patients
- Gestion des posologies et durées de traitement lors de la prescription d'une ordonnance.

**Processus de prescription :**
1. **Identification du patient** : Sélection du patient dans la base
2. **Sélection des médicaments** : Choix des traitements appropriés
3. **Définition de la posologie** : Dosage, fréquence, durée
4. **Ajout de notes médicales** : Instructions spéciales ou précautions
5. **Validation et enregistrement** : Création de la prescription active

**Processus de suivi :**
1. **Consultation des prescriptions actives** : Suivi des traitements en cours
2. **Modification si nécessaire** : Ajustement des posologies
3. **Archivage** : Passage au statut "used" après traitement
4. **Historique médical** : Conservation pour le suivi du patient qui peut être consulté par lui même ou par le médécin.

#### Rôle Admin
**Accès complet au système :**
- Gestion de tous les utilisateurs
- Supervision de toutes les opérations
- Accès aux statistiques et rapports
- Gestion des rôles et permissions avec le registration, pour créer de nouveaux utilisateur et mettre a jour leur role dans la base de donnée.

**Processus de supervision :**
1. **Monitoring global** : Surveillance de l'ensemble du système
2. **Gestion des utilisateurs** : Création, modification, suppression
3. **Audit et sécurité** : Contrôle des accès et des actions
4. **Maintenance** : Gestion des configurations système


#### Suivi et Modification
1. **Consultation régulière** : Vérification de l'évolution
2. **Ajustements** : Modification des posologies si nécessaire
3. **Renouvellement** : Création de nouvelles prescriptions
4. **Archivage** : Conservation de l'historique médical



### Sécurité et Validation

#### Authentification Continue
- **Vérification des tokens** à chaque requête si l'action réquiert une authentification.
- **Contrôle des permissions** selon le rôle
- **Gestion des sessions** avec expiration automatique
- **Protection contre les attaques** par rate limiting

#### Validation des Données
- **Contrôle des entrées** utilisateur
- **Vérification des formats** (email, téléphone, etc.)
- **Validation des références** (existence des objets liés)
- **Sanitisation** des données sensibles

## Tests et Validation

### Points de Validation
- [x] Authentification et autorisation
- [x] CRUD complet pour tous les modèles
- [x] Validation des données d'entrée
- [x] Gestion des erreurs
- [x] Documentation API complète avec swagger
- [x] Sécurité des endpoints

### Tests Manuels
- **Swagger UI** pour la documentation interactive
- **Validation des réponses** et codes d'état
- **Tests des différents rôles** et permissions
- **Vérification des processus** métier

---

**Note** : Ce README documente l'implémentation complète d'un système de gestion pharmaceutique.
