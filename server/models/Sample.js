const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sample', sampleSchema);
