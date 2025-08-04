const { body, param } = require('express-validator');
const mongoose = require('mongoose');



exports.validateUserRegistration = [
  body('username')
    .trim()
    .notEmpty().withMessage('Le nom d\'utilisateur est requis')
    .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une minuscule')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
    .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre'),
];



exports.validateUserLogin = [
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Email invalide'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis'),
];



exports.validateUserUpdate = [
  param('id')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('ID utilisateur invalide'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  body('email')
    .optional()
    .normalizeEmail()
    .isEmail().withMessage('Email invalide')
];
