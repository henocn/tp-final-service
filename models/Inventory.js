const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  batchNumber: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  location: String,
  minimumStock: {
    type: Number,
    default: 10
  },
  maximumStock: {
    type: Number,
    default: 100
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  supplier: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema, '70815285_inventories');
