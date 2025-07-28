const router = require('express').Router();
const { register, login, getProfile, refreshToken, getAllUsers, getUserById } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/profile', auth, getProfile);

module.exports = router;
