const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'pharmacist', 'doctor', 'admin'],
    default: 'client'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  medicalHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  allergies: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema, '70815285_users');
