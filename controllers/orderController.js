const Order = require('../models/Order');
const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');



// Récupération de toutes les prescription par filtrage, classement par ordre et ^pagination
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = 'asc', date, status } = req.query;
    const filter = {};

    if (date) {
      const start = new Date(date + 'T00:00:00');
      const end = new Date(date + 'T23:59:59.999');
      filter.createdAt = { $gte: start, $lte: end };
    }

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: sort === 'asc' ? 1 : -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Récupération des details d'une prescription
exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', '_id email role')
      .populate('items.medicine', '_id name');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// création de prescripion ou prescrire des médicaments
// Mise en place de vérification de la possibilité de commander sans l'l'odonnance
exports.create = async (req, res) => {
  try {
    const { user, items, prescription: prescriptionId } = req.body;

    const medicineIds = items.map(i => i.medicine);
    const medicines = await Medicine.find({ _id: { $in: medicineIds } });

    if (medicines.length !== medicineIds.length) {
      return res.status(400).json({ error: 'Some medicines do not exist' });
    }

    let validPrescription = null;
    let validPrescriptionMedicines = [];

    if (prescriptionId) {
      validPrescription = await Prescription.findOne({ _id: prescriptionId })
        .populate('medicines.medicine');

      if (!validPrescription) {
        return res.status(400).json({ error: 'Prescription not found' });
      }

      // vérifier si l'ordonnance a deja été utoilisée poour passer une commande ou pas
      if (validPrescription.status === 'used') {
        return res.status(403).json({ error: 'Prescription already used' });
      }

      // vérifier que effectivement l'ordonnance que le client fourni lui apparteint effectivement
      if (validPrescription.patient.toString() !== user.toString()) {
        return res.status(403).json({ error: 'Prescription does not belong to the user' });
      }

      validPrescriptionMedicines = validPrescription.medicines.map(pm => ({
        medicine: pm.medicine._id.toString(),
        quantity: pm.quantity > 0 ? pm.quantity : 1
      }));
    }

    const prescribedMedicineIds = new Set(validPrescriptionMedicines.map(m => m.medicine));

    const filteredItems = items.filter(item => {
      return !prescribedMedicineIds.has(item.medicine.toString());
    });

    const filteredMedicineInfos = medicines.filter(m =>
      filteredItems.some(fi => fi.medicine.toString() === m._id.toString())
    );

    const invalidMeds = filteredMedicineInfos.filter(m => m.requiresPrescription === true);

    if (invalidMeds.length > 0) {
      return res.status(400).json({
        error: 'Some items require a prescription but are not in the provided prescription',
        medicines: invalidMeds.map(m => m.name)
      });
    }

    const finalItems = [];

    for (const item of filteredItems) {
      finalItems.push({
        medicine: item.medicine,
        quantity: item.quantity
      });
    }

    // reformation de l'objet a inserer dans la base de donnée après le sanitizing
    for (const pm of validPrescriptionMedicines) {
      finalItems.push({
        medicine: pm.medicine,
        quantity: pm.quantity
      });
    }

    let order = new Order({
      user,
      items: finalItems,
      prescription: prescriptionId || null
    });

    order = await order.save();

    // mettre a jour le status de l'ordonnance a used afin quelle ne s'utilise plus une fois encore
    if (order) {
      if (validPrescription) {
        validPrescription.status = 'used';
        await validPrescription.save();
      }

      for (const item of finalItems) {
        await Medicine.findByIdAndUpdate(
          item.medicine,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }
    }

    return res.status(201).json(order);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



// A la caisse, le pharmacien a la possibilité de rejeter une commande ou de l'accepter
// Pour certaines raisons
exports.acceptOrCancelOrder = async (req, res) => {
  const { action } = req.body;

  if (!['pay', 'cancel'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Condition pour vérifier si le status est en cours ou pas afin de permettre sa mise à jour
    if (action === 'pay') {
      if (order.status !== 'pending') {
        return res.status(400).json({ error: 'Order cannot be paid, it is not in pending status' });
      }
      order.status = 'success';
    } else if (action === 'cancel') {
      if (order.status !== 'pending') {
        return res.status(400).json({ error: 'Order cannot be cancelled, it is not in pending status' });
      }
      order.status = 'cancelled';
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Mise à jour  des commandes dans la base de donnée
exports.update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// Suppression des commades dans la nase de donnée
exports.delete = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
