const Company = require('../models/company'); // Modèle de création des compagnies.
const { exec } = require('child_process'); // Permet l'éxécution des scripts Bash et de commandes.

// # Création d'une compagnie #
exports.createCompany = (req, res, next) => {

  function deleteUrlCompany() {
    Company.collection.drop({ urlCompany: req.body.urlCompany })
  };

  function createCompany() {
    const company = new Company({ // Création d'une compagnie avec le modèle "Company".
      urlCompany: req.body.urlCompany,
    });
    company.save() // Enregistrement dans la base de données.
    .then(() => res.status(201).json({message: 'Compagnie enregistrée.'}))
    .catch((error) => res.status(400).json(error));
  }

  deleteUrlCompany();
  setTimeout(createCompany, 2000);

};

// # Récupération des noms #
exports.getCompany = (req, res, next) => {

  const sort = { _id: -1};
  Company.find().sort(sort)
  .then((companies) => res.status(200).json(companies))
  .catch((error) => res.status(400).json(error));

};

// # Récupération des endpoints #
exports.endpointsCompany = (req, res, next) => {

  console.log('Endpoints.');

  exec("cd bash && ./getCompany && ./endpointsCompany", (error, stdout, stderr) => {

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
  });

  res.status(200).json({message: 'Script des endpoints exécuté.'})

};

// # Récupération des sous-domaines #
exports.subdomainsCompany = (req, res, next) => {

  console.log('Subdomains.');

  exec("cd bash && ./getCompany && ./subdomainsCompany", (error, stdout, stderr) => {

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
  });

  res.status(200).json({message: 'Script des sous-domaines exécuté.'})

};

// # Récupération des URLs #
exports.allurlsCompany = (req, res, next) => {

  console.log('URLs.');

  exec("cd bash && ./getCompany && ./allurlsCompany", (error, stdout, stderr) => {

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
  });
  
  res.status(200).json({message: 'Script des URLs exécuté.'})

};

// # Simulation de trafic # => En cours de développement (nouvelle version).
exports.trafficCompany = (req, res, next) => {

  console.log('Traffic.');

  exec("cd bash && ./getCompany && ./trafficCompany", (error, stdout, stderr) => {

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
  });
  
  res.status(200).json({message: 'Script de simulation de trafic exécuté.'})

};