const express = require('express'); // Permet de créer l'application express.
const auth = require('../middleware/auth'); // Permet de sécuriser les routes.
const userCtrl = require('../controllers/user'); // Importation du controller "user".

const router = express.Router(); // Permet de créer des routeurs.

router.post('/createuser', userCtrl.createUser); // Route de création des utilisateurs.
router.post('/login', userCtrl.login); // Route de login des utilisateurs.

module.exports = router;