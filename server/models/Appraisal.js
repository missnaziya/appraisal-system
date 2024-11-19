const mongoose = require('mongoose');

const AppraisalSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  role: { type: String, enum: ['admin', 'manager', 'employee'], required: true },
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submitted_for: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  response: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Appraisal', AppraisalSchema);
