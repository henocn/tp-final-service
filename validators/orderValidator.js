const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');



// a validation of order creation function
exports.validateOrderCreation = [
  body('user')
    .notEmpty().withMessage('User ID is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid user ID'),
  body('items')
    .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
  body('items.*.medicine')
    .notEmpty().withMessage('Each item must contain a medicine ID')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid medicine ID'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('prescription')
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid prescription ID'),
];




// a validation of order update function
exports.validateOrderUpdate = [
  param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid order ID'),
  body('status')
    .optional()
    .isIn(['pending', 'success', 'cancelled']).withMessage('Status must be pending, success, or cancelled'),
  body('items')
    .optional()
    .isArray().withMessage('Items must be an array'),
  body('items.*.medicine')
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid medicine ID'),
  body('items.*.quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];
