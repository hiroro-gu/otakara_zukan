const mongoose = require('mongoose');

const zukanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Zukan = mongoose.model('Zukan', zukanSchema);
module.exports = Zukan;
