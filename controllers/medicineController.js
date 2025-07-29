const Medicine = require('../models/Medicine');



exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const medicines = await Medicine.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getOne = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.create = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.bulkCreate = async (req, res) => {
  try {
    const medicines = await Medicine.insertMany(req.body);
    res.status(201).json(medicines);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.update = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.patch = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.delete = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
