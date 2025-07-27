const router = require('express').Router();
const { getAll, create, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.get('/user/:userId', auth, getUserOrders);
router.post('/', auth, create);

module.exports = router;
