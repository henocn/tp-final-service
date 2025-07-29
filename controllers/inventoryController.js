const Order = require('../models/Order');
const User = require('../models/User')


/**
 * LISTE FINALE :
 *
 * 1 Lister les produits avec leur taux de vente
 * 2 Faire l'innventaire de la somme de vente par produit
 * 3 Lister les clients avec leur nombre de médicaments prescrits
 * 4 Lister les docteurs avec leur nombre de médicaments prescrits par patient
 * 5 Inventaire de vente dans une période donnée
*/


// implementation de la fonction 1
exports.getProductsWithSalesRate = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.medicine');
    const medicineSales = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!medicineSales[item.medicine._id]) {
          medicineSales[item.medicine._id] = {
            name: item.medicine.name,
            totalSold: 0,
            totalQuantity: 0
          };
        }
        medicineSales[item.medicine._id].totalSold += item.quantity;
        medicineSales[item.medicine._id].totalQuantity += item.medicine.stock;
      });
    });

    const salesRate = Object.values(medicineSales).map(med => ({
      name: med.name,
      salesRate: med.totalSold / med.totalQuantity
    }));

    res.json(salesRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// implementation de la fonction 2
exports.getTotalSalesByProduct = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.medicine');
    const salesByProduct = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!salesByProduct[item.medicine._id]) {
          salesByProduct[item.medicine._id] = {
            name: item.medicine.name,
            totalSales: 0
          };
        }
        salesByProduct[item.medicine._id].totalSales += item.quantity * item.medicine.price;
      });
    });

    res.json(Object.values(salesByProduct));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// implementation de la fonction 3
exports.patientsWithPrescriptions = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).populate({
      path: 'prescriptions',
      model: 'Prescription',
      populate: {
        path: 'items.medicine',
        model: 'Medicine'
      }
    });

    const patientsWithCounts = patients.map(patient => ({
      name: patient.name,
      prescriptionsCount: patient.prescriptions.length
    }));

    res.json(patientsWithCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// implementation de la fonction 4
exports.doctorsWithPrescriptions = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).populate({
      path: 'prescriptions',
      model: 'Prescription',
      populate: {
        path: 'items.medicine',
        model: 'Medicine'
      }
    });

    const doctorsWithCounts = doctors.map(doctor => ({
      name: doctor.name,
      prescriptionsCount: doctor.prescriptions.length
    }));

    res.json(doctorsWithCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// implementation de la fonction 5
exports.getSalesInventoryByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const orders = await Order.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('items.medicine');

    const salesInventory = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!salesInventory[item.medicine._id]) {
          salesInventory[item.medicine._id] = {
            name: item.medicine.name,
            totalSales: 0
          };
        }
        salesInventory[item.medicine._id].totalSales += item.quantity * item.medicine.price;
      });
    });

    res.json(Object.values(salesInventory));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};