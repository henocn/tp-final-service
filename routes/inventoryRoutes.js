const router = require('express').Router();
const { getAll, updateStock, checkStock } = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', auth, getAll);
router.put('/:medicineId/stock', auth, checkRole('pharmacist'), updateStock);
router.get('/:medicineId/stock', auth, checkStock);

module.exports = router;
