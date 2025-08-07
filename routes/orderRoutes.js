
const router = require('express').Router();
const { getAll, create, getOne, update: updateOrder, delete: deleteOrder, acceptOrCancelOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {validateOrderCreation, validateOrderUpdate} = require('../validators/orderValidator');
const validate = require('../middleware/validate')


// définition des routes et leur protection avec des middleware de vérification d'authentifiaction et de role
router.get('/', auth, getAll);
router.post('/', auth, validateOrderCreation, validate, create);
router.get('/:id', auth, getOne);
router.put('/:id', auth, validateOrderUpdate, validate, updateOrder);
router.post('/payement/:id', auth, checkRole("pharmacist"), acceptOrCancelOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
