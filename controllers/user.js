const bcrypt = require ('bcrypt'); // Hachage et comparaison des mots de passe.
const jwt = require('jsonwebtoken'); // Gère les tokens d'authentification.
const User = require('../models/user'); // Modèle de création des utilisateurs.
require('dotenv').config(); // Charge les variables d'environnements (.env).

// # Login des utilisateurs #
exports.login = (req, res, next) => {

  User.findOne({ email: req.body.email }) // Recherche de l'utilisateur dans la base de données avec son e-mail.

  .then(user => {

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé.' });
    }

    /* 
    Bcrypt créer un hash avec le mot de passe entré, puis le compare au hash stocké dans la base de données: ces deux hashs ne sont pas les mêmes.
    Bcrypt ne peut pas décrypter ses propres hashs: il peut indiquer si deux hashs ont été générés avec le même mot de passe.
    */
    bcrypt.compare(req.body.password, user.password)

    .then(valid => {

      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }

      res.status(200).json({
        // Chiffrement du token, il contient: _id de l'utilisateur + délai d'expiration du token.
        token: jwt.sign({ userId: user._id }, process.env.secretToken, { expiresIn: '1h' }),
      });

    })

  })

};

// # Création des utilisateurs #
exports.createUser = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1]; // Extraction du token du header "Authorization" avec "split" (après "Bearer" et " ").
  const decodedToken = jwt.verify(token, process.env.secretToken); // Décodage du token avec "secretToken" (.env).
  const idOfTheUser = decodedToken.userId; // Ajout de la valeur du "userId" (user._id) de l'utilisateur à la variable "idOfTheUser".

  User.findOne({ _id: idOfTheUser }) // Recherche de l'utilisateur dans la base de données.

  .then((a) => {

    if (a.systemAdministrator == true) { // On vérifie que l'utilisateur est "administrateur".

      bcrypt.hash(req.body.password, 10) // Salage du mot de passe (10 fois).

      .then(hash => {

        const user = new User({ // Création d'un utilisateur "normal".
          systemAdministrator: false,
          systemUser: req.body.systemUser,
          email: req.body.email,
          password: hash,
        });

        user.save()

        .then(() => res.status(201).json({message: 'Utilisateur enregistré.'}))
        .catch((error) => res.status(400).json(error));

      })

    }

    else {
      return res.status(401).json({ error: 'Non autorisé.' });
    }

  })

};