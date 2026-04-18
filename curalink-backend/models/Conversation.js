const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  patientName: String,
  disease: String,
  location: String,
  history: [{
    query: String,
    answer: String,
    sources: Array,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Chat', chatSchema);