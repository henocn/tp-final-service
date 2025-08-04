
const router = require('express').Router();
const { getAll, getOne, create, bulkCreate, update, patch: patchMedicine, delete: deleteMedicine } = require('../controllers/medicineController');
const auth = require('../middleware/auth');
const { createMedicineValidator, bulkCreateMedicineValidator, updateMedicineValidator } = require('../validators/medicineValidator');
const validate = require('../middleware/validate');


router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, createMedicineValidator, validate, create);
router.post('/bulk', auth, bulkCreateMedicineValidator, validate, bulkCreate);
router.put('/:id', auth, updateMedicineValidator, validate, update);
router.patch('/:id', auth, patchMedicine);
router.delete('/:id', auth, deleteMedicine);

module.exports = router;
