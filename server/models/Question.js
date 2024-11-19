// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   // To do add answer  (make in array)
// });

// module.exports = mongoose.model('Question', questionSchema);

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
