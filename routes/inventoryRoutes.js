
const router = require('express').Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const { getProductsWithSalesRate, getTotalSalesByProduct, patientsWithPrescriptions, doctorsWithPrescriptions, getSalesInventoryByPeriod } = require('../controllers/inventoryController');

router.get('/sales-rate', auth, checkRole('admin'), getProductsWithSalesRate);
router.get('/total-sales', auth, checkRole('admin'), getTotalSalesByProduct);
router.get('/patients/prescriptions', auth, checkRole('admin'), patientsWithPrescriptions);
router.get('/doctors/prescriptions', auth, checkRole('admin'), doctorsWithPrescriptions);
router.get('/sales', auth, checkRole('admin'), getSalesInventoryByPeriod);

module.exports = router;
