const router = require('express').Router();
const { register, login, refreshToken, getAllUsers, getUserById, deleteUser, updateProfile, changePassword, getUserOrders, getUserPrescriptions } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.delete('/:id', auth, deleteUser);
router.put('/:id', auth, updateProfile);
router.get('/:id/orders', auth, getUserOrders);
router.get('/:id/prescriptions', auth, getUserPrescriptions);
router.patch('/:id/change-password', auth, changePassword);
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router;
