const router = require('express').Router();
const { getAll, create, verify } = require('../controllers/prescriptionController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', auth, getAll);
router.post('/', auth, checkRole('doctor'), create);
router.put('/:id/verify', auth, checkRole('pharmacist'), verify);

module.exports = router;
