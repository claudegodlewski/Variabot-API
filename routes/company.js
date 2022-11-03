const express = require('express'); // Permet de créer l'application express.
const auth = require('../middleware/auth'); // Permet de sécuriser les routes.
const companyCtrl = require('../controllers/company'); // Importation du controller "company".

const router = express.Router(); // Permet de créer des routeurs.

router.post('/createcompany', auth, companyCtrl.createCompany); // Route de création des compagnies.
router.get('/getcompany', companyCtrl.getCompany); // Route de récupération des compagnies (pas d'auth).
router.get('/endpointscompany', auth, companyCtrl.endpointsCompany); // Route de collecte des endpoints.
router.get('/subdomainscompany', auth, companyCtrl.subdomainsCompany); // Route de collecte des sous-domaines.
router.get('/allurlscompany', auth, companyCtrl.allurlsCompany); // Route de collecte des URLs.

module.exports = router;