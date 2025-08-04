const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');



exports.validateOrderCreation = [
  body('user')
    .notEmpty().withMessage('L\'ID utilisateur est requis')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID utilisateur invalide'),
  body('items')
    .isArray({ min: 1 }).withMessage('Les items doivent être un tableau non vide'),
  body('items.*.medicine')
    .notEmpty().withMessage('Chaque item doit contenir un ID de médicament')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de médicament invalide'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('La quantité doit être au moins de 1'),
  body('prescription')
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de prescription invalide'),
];



exports.validateOrderUpdate = [
  param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de commande invalide'),
  body('status')
    .optional()
    .isIn(['pending', 'success', 'cancelled']).withMessage('Le statut doit être pending, success ou cancelled'),
  body('items')
    .optional()
    .isArray().withMessage('Les items doivent être un tableau'),
  body('items.*.medicine')
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID de médicament invalide'),
  body('items.*.quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('La quantité doit être au moins de 1'),
];
