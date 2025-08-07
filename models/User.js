const mongoose = require('mongoose');


// User model
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
  refreshToken: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: String,
  address: String,
  medicalHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  allergies: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema, '70815285_users');
