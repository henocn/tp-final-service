const { body } = require('express-validator');

exports.createMedicineValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom du médicament est requis.')
    .isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères.'),

  body('requiresPrescription')
    .optional()
    .isBoolean().withMessage('requiresPrescription doit être un booléen.'),

  body('price')
    .notEmpty().withMessage('Le prix est requis.')
    .isFloat({ gt: 0 }).withMessage('Le prix doit être un nombre positif.'),

  body('dosageForm')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('La forme de dosage ne doit pas dépasser 100 caractères.'),

  body('sideEffects')
    .optional()
    .isArray().withMessage('Les effets secondaires doivent être un tableau de chaînes de caractères.')
    .bail()
    .custom((arr) => arr.every(item => typeof item === 'string'))
    .withMessage('Tous les effets secondaires doivent être des chaînes de caractères.'),

  body('stock')
    .notEmpty().withMessage('Le stock est requis.')
    .isInt({ min: 0 }).withMessage('Le stock doit être un entier positif ou nul.')
];
