const express = require('express'); // Permet de créer une application express.
const mongoose = require('mongoose'); // (ORM), Facilite les interactions avec la base de données MongoDB.

// Importation des routes.
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');

require('path'); // Permet d'interagir avec des répertoires et des chemins de fichiers.
require('dotenv').config(); // Permet de stocker des informations dans un fichier ".env".
// const rateLimit = require('express-rate-limit'); // Permet de limiter le nombre de requêtes.

const app = express(); // Création de l'application express.

// const limiter = rateLimit({ // Nombre de requêtes autorisées.
// 	windowMs: 15 * 60 * 1000,
// 	max: 100,
//   message: 'Vous avez dépassé la limite des 100 requêtes en 15 minutes',
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// Connexion à la base de données MongoDB (MongoDB Atlas).
mongoose.connect(`mongodb+srv://${process.env.User}:${process.env.Password}@${process.env.Cluster}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté'))
    .catch(() => console.log('Déconnecté'));

// Cross Origin Resource Sharing: autorisation des appels HTTP entre les serveurs.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(limiter); // Limite le nombre de requêtes.
app.use(express.json()); // Prend toutes les requêtes qui ont comme Content-Type "application/json", et met à disposition leur body sur l'objet req.
app.use('/api/auth', userRoutes); // Ajout des routes "user" après /api/auth.
app.use('/api/data', companyRoutes); // Ajout des routes "company" après /api/data.
app.use('/static', express.static(__dirname + '/output')); // Permet de lier le dossier "output" à /static.
app.use('/poc', express.static(__dirname + '/poc')); // Permet de lier le dossier "images" à /images.

module.exports = app;