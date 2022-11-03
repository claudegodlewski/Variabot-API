const jwt = require('jsonwebtoken'); // Permet de créer des tokens d'authentification.

module.exports = (req, res, next) => {

   try {

    const token = req.headers.authorization.split(' ')[1]; // Extraction du token du header "Authorization" avec "split" (après "Bearer" et " ").
    const decodedToken = jwt.verify(token, process.env.secretToken); // Décodage du token avec "secretToken" (.env).
    const userId = decodedToken.userId; // Ajout de la valeur du "userId" (user._id) de l'utilisateur à la variable "userId".

    req.auth = { // Ajout du contenu de la variable "userId" à l'objet requête pour que les routes puissent l'exploiter.
        userId: userId
    };

    next();

   } catch(error) {

    res.status(401).json({ error });

   }

};