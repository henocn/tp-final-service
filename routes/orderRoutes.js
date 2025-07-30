const router = require('express').Router();
const { getAll, create, getOne, update: updateOrder, delete: deleteOrder, acceptOrCancelOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/:id', auth, getOne);
router.put('/:id', auth, updateOrder);
router.post('/payement/:id', auth, checkRole("pharmacist"), acceptOrCancelOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
