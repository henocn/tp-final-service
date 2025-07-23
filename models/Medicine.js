const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genericName: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  dosageForm: String,
  strength: String,
  manufacturer: String,
  sideEffects: [String],
  contraindications: [String],
  interactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DrugInteraction'
  }],
  image: String,
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Medicine', medicineSchema, '70815285_medicines');
