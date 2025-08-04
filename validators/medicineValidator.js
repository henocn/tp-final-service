const { body } = require('express-validator');
// change all text into english and add a one line comment before each export



// Function to validate the creation of a medicine
exports.createMedicineValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('The medicine name is required.')
    .isLength({ min: 2 }).withMessage('The name must be at least 2 characters long.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('The description must not exceed 500 characters.'),

  body('requiresPrescription')
    .optional()
    .isBoolean().withMessage('requiresPrescription must be a boolean.'),

  body('price')
    .notEmpty().withMessage('The price is required.')
    .isFloat({ gt: 0 }).withMessage("The price shouldn't be a negative number."),

  body('sideEffects')
    .optional()
    .isArray().withMessage('The side effects must be an array of strings.')
    .bail()
    .custom((arr) => arr.every(item => typeof item === 'string'))
    .withMessage('All side effects must be strings.'),

  body('stock')
    .notEmpty().withMessage('The stock is required.')
    .isInt({ min: 0 }).withMessage('The stock must be a positive integer or zero.')
];



// Function to validate the bulk creation of medicines
exports.bulkCreateMedicineValidator = [
  body()
    .isArray({ min: 1 }).withMessage('The medicines list is required.')
    .bail()
    .custom((arr) => arr.every(item => typeof item === 'object' && item !== null))
    .withMessage('Each medicine should be an object.'),

  body('*.name')
    .notEmpty().withMessage('Medicine name is required.')
    .isLength({ min: 2 }).withMessage('Medicine name should have at least 2 letters.'),

  body('*.price')
    .notEmpty().withMessage('The price is required.')
    .isFloat({ gt: 0 }).withMessage("The price shouldn't be a negative number."),

  body('*.stock')
    .notEmpty().withMessage('Stock is required.')
    .isInt({ min: 0 }).withMessage('The stock must be a positive integer or zero.'),
];




// Function to validate the update of a medicine
exports.updateMedicineValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Medicine name is required.')
    .isLength({ min: 2 }).withMessage('Medicine name must have at least 2 letters.'),


  body('requiresPrescription')
    .optional()
    .isBoolean().withMessage('requiresPrescription should be boolean.'),

  body('price')
    .optional()
    .notEmpty().withMessage('Price required.')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive integer.'),

  body('sideEffects')
    .optional()
    .isArray().withMessage('The side effects must be an array of strings.')
    .bail()
    .custom((arr) => arr.every(item => typeof item === 'string'))
    .withMessage('All side effects must be strings.'),

  body('stock')
    .notEmpty().withMessage('The stock is required.')
    .isInt({ min: 0 }).withMessage('The stock must be a positive integer or zero.')
];