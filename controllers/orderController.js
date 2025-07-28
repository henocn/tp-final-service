const Order = require('../models/Order');
const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');



exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.medicine');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('items.medicine');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.create = async (req, res) => {
  try {
    const { user, items, prescription: prescriptionId } = req.body;

    if (!user || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'User and items are required' });
    }

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

      if (validPrescription.status === 'used') {
        return res.status(403).json({ error: 'Prescription already used' });
      }

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




exports.update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};