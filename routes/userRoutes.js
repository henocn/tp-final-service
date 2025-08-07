
const router = require('express').Router();
const { register, login, refreshToken, getAllUsers, getUserById, deleteUser, updateProfile, changePassword, getUserOrders, getUserPrescriptions } = require('../controllers/userController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const { validateUserRegistration, validateUserLogin, validateUserUpdate } = require('../validators/userValidator');
const validate = require('../middleware/validate');


// fonction qui permet de limiter le nombre de requêtes de connexion
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many trying in 10 min. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});


// définition des routes et leur protection avec des middleware de vérification d'authentifiaction et de role
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.delete('/:id', auth, deleteUser);
router.put('/:id', validateUserUpdate, validate, auth, updateProfile);
router.get('/:id/orders', auth, getUserOrders);
router.get('/:id/prescriptions', auth, getUserPrescriptions);
router.patch('/:id/change-password', auth, changePassword);
router.post('/register', validateUserRegistration, validate, register);
router.post('/login', loginLimiter, validateUserLogin, validate, login);
router.post('/refresh-token', refreshToken);

module.exports = router;
