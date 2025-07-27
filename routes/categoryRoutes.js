const router = require('express').Router();
const { getAll, create, update, delete: deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', getAll);
router.post('/', auth, checkRole('admin'), create);
router.put('/:id', auth, checkRole('admin'), update);
router.delete('/:id', auth, checkRole('admin'), deleteCategory);

module.exports = router;
