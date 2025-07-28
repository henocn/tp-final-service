const router = require('express').Router();

const userRoutes = require('./userRoutes');
const medicineRoutes = require('./medicineRoutes');
const prescriptionRoutes = require('./prescriptionRoutes');
const orderRoutes = require('./orderRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.use('/users', userRoutes);
router.use('/medicines', medicineRoutes);
router.use('/prescriptions', prescriptionRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;
