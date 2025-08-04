const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');



exports.validatePrescriptionCreation = [
  body('user')
    .notEmpty().withMessage('L\'ID de l\'utilisateur est requis')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID utilisateur invalide'),
  body('doctor')
    .notEmpty().withMessage('L\'ID du médecin est requis')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID médecin invalide'),
  body('medicines')
    .isArray({ min: 1 }).withMessage('La liste des médicaments est obligatoire'),
  body('medicines.*.medicine')
    .notEmpty().withMessage('Chaque médicament doit avoir un ID')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de médicament invalide'),
  body('medicines.*.quantity')
    .isInt({ min: 1 }).withMessage('Chaque médicament doit avoir une quantité d\'au moins 1'),
];



exports.validatePrescriptionUpdate = [
  param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de prescription invalide'),
  body('medicines')
    .optional()
    .isArray().withMessage('La liste des médicaments doit être un tableau'),
  body('medicines.*.medicine')
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de médicament invalide'),
  body('medicines.*.quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('La quantité doit être au moins 1'),
];