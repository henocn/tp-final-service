const Order = require('../models/Order');
const User = require('../models/User')
const Prescription = require('../models/Prescription');



// Récupération des taux de ventes pour tous les produits 
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



// Function pour récuperer tous les produits (médicaments) dans les commendes
// ceci afin de savoir quel produit est le plus vendus ou a le plus de ventes
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




// récupération de toutes prescriptions d'un certain patient donné
exports.patientsWithPrescriptions = async (req, res) => {
  try {
    const results = await Prescription.aggregate([
      {
        $group: {
          _id: '$patient',
          prescriptionsCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: '70815285_users',
          localField: '_id',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $unwind: '$patient'
      },
      {
        $project: {
          _id: '$patient._id',
          name: { $concat: ['$patient.firstName', ' ', '$patient.lastName'] },
          email: '$patient.email',
          prescriptionsCount: 1
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Récupération des prescriptions d'un certain medecin
exports.doctorsWithPrescriptions = async (req, res) => {
  try {
    const results = await Prescription.aggregate([
      {
        $group: {
          _id: '$doctor',
          prescriptionsCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: '70815285_users',
          localField: '_id',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      {
        $unwind: '$doctor'
      },
      {
        $project: {
          _id: '$doctor._id',
          email: '$doctor.email',
          name: { $concat: ['$doctor.firstName', ' ', '$doctor.lastName'] },
          prescriptionsCount: 1
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Récupération des des statistiques de ventes dans une certaines période 
exports.getSalesInventoryByPeriod = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const orders = await Order.find({
      createdAt: { $gte: new Date(start), $lte: new Date(end) }
    }).populate('items.medicine');

    const salesInventory = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!salesInventory[item.medicine._id]) {
          salesInventory[item.medicine._id] = {
            id: item.medicine._id,
            name: item.medicine.name,
            price: item.medicine.price,
            quantity: 0,
            totalSales: 0
          };
        }
        salesInventory[item.medicine._id].quantity += item.quantity;
        salesInventory[item.medicine._id].totalSales += item.quantity * item.medicine.price;
      });
    });

    res.json(Object.values(salesInventory));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};