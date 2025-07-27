const router = require('express').Router();
const { getAll, getOne, create, update, delete: deleteMedicine } = require('../controllers/medicineController');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteMedicine);

module.exports = router;
