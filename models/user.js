const mongoose = require('mongoose'); // (ORM), Facilite les interactions avec la base de données MongoDB.

const uniqueValidator = require('mongoose-unique-validator'); // Améliore les messages d'erreur lors de l'enregistrement de données uniques.

// Schéma de données.
const userSchema = mongoose.Schema({
  systemAdministrator: { type: Boolean, required: false },
  systemUser: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); // Exportation du schéma sous le nom "User".