const mongoose = require('mongoose');

const drugInteractionSchema = new mongoose.Schema({
  drug1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  drug2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  severityLevel: {
    type: String,
    enum: ['minor', 'moderate', 'major'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  effects: String,
  recommendations: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DrugInteraction', drugInteractionSchema, '70815285_drug_interactions');
