const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicines: [{
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    dosage: String,
    frequency: String,
    duration: String,
    quantity: Number
  }],
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema, '70815285_prescriptions');
