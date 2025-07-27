const Prescription = require('../models/Prescription');



exports.getAll = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patient')
      .populate('doctor')
      .populate('medicines.medicine');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.create = async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      doctor: req.user.id
    });
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.verify = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { 
        verificationStatus: 'verified',
        verifiedBy: req.user.id
      },
      { new: true }
    );
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
