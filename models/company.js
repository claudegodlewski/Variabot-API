const mongoose = require('mongoose'); // (ORM), Facilite les interactions avec la base de données MongoDB.

const uniqueValidator = require('mongoose-unique-validator'); // Améliore les messages d'erreur lors de l'enregistrement de données uniques.

// Schéma de données.
const companySchema = mongoose.Schema({
  urlCompany: { type: String, required: true },
});

companySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Company', companySchema); // Exportation du schéma sous le nom "Company".