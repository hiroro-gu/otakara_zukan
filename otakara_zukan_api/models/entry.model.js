const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  zukan: { type: mongoose.Schema.Types.ObjectId, ref: 'Zukan', required: true }
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
