const Medicine = require('../models/Medicine');



// Récupération de tous les produit dans la base de donnée avec pagination
// filtrage et recherche et classement par ordre alphabetique
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '', sort = 'asc', understock } = req.query;
    const filter = { name: new RegExp(search, 'i') };
    if (understock) {
      filter.stock = { $lt: understock };
    }
    const medicines = await Medicine.find(filter)
      .sort({ name: sort === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// details d'un produit (médicament) unique
exports.getOne = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// création d'un produit (médicament)
exports.create = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Création en masse des médicament récuperés depuis une liste
exports.bulkCreate = async (req, res) => {
  try {
    const medicines = await Medicine.insertMany(req.body);
    res.status(201).json(medicines);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Mise a joute total des médicaments
exports.update = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Mise à jour partielle des médicaments
exports.patch = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Suppression d'un médicament de la base de donnée
exports.delete = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
