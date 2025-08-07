const Prescription = require('../models/Prescription');



// fonction pour récuperer toutes les prescriptions existantes dans la base de donnée
// ajout du filtrage et du classement par ordre de date
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = 'asc', date } = req.query;
    const filter = {};

    if (date) {
      const start = new Date(date + 'T00:00:00');
      const end = new Date(date + 'T23:59:59.999');
      filter.createdAt = { $gte: start, $lte: end };
    }

    const prescriptions = await Prescription.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: sort === 'asc' ? 1 : -1 });

    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// récupétation des details d'une prescription
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



// creation d'une precription ou prescrire un médicament
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



// mise a jour d'une prescription en changeant la liste des produits commandé ou la quantité
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



// supprimer une prescription de la base de donnée
exports.delete = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
