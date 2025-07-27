const Inventory = require('../models/Inventory');



exports.getAll = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('medicine');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const inventory = await Inventory.findOneAndUpdate(
      { medicine: req.params.medicineId },
      { $inc: { quantity } },
      { new: true }
    );
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.checkStock = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ 
      medicine: req.params.medicineId 
    });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    
    const isLow = inventory.quantity <= inventory.minimumStock;
    res.json({
      quantity: inventory.quantity,
      isLow,
      minimumStock: inventory.minimumStock
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
