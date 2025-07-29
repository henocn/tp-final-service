const router = require('express').Router();
const { getAll, create, getOne, delete: deleteOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.get('/:id', auth, getOne);
router.post('/', auth, create);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
