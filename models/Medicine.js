const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
  sideEffects: [String],
  image: String,
  stock: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Medicine', medicineSchema, '70815285_medicines');
