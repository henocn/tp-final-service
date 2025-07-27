const router = require('express').Router();
const { register, login, getProfile, refreshToken } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/profile', auth, getProfile);

module.exports = router;
