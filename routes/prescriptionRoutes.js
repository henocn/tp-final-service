const router = require('express').Router();
const { getAll, getOne, create, update: updatePrescription, delete: deletePrescription } = require('../controllers/prescriptionController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', auth, getAll);
router.post('/', auth, checkRole('doctor'), create);
router.get('/:id', auth, getOne);
router.patch('/:id', auth, checkRole('doctor'), updatePrescription);
router.delete('/:id', auth, checkRole('doctor'), deletePrescription);

module.exports = router;
