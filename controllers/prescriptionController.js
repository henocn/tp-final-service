const Prescription = require('../models/Prescription');


exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const prescriptions = await Prescription.find()
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getOne = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'patient',
        select: 'email firstName lastName'
      })
      .populate({
        path: 'doctor',
        select: 'email firstName lastName'
      })
      .populate({
        path: 'medicines.medicine',
        select: 'name price stock'
      });
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
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



exports.update = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { ...req.body, doctor: req.user.id },
      { new: true, runValidators: true }
    ).populate('doctor', 'email firstName lastName');
    
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




exports.delete = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
