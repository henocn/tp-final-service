
const router = require('express').Router();
const { getAll, getOne, create, bulkCreate, update, patch: patchMedicine, delete: deleteMedicine } = require('../controllers/medicineController');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, create);
router.post('/bulk', auth, bulkCreate);
router.put('/:id', auth, update);
router.patch('/:id', auth, patchMedicine);
router.delete('/:id', auth, deleteMedicine);

module.exports = router;
