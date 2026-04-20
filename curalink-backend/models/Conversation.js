const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  title: String,
  source: String,
  url: String,
  year: Number
}, { _id: false });

const historySchema = new mongoose.Schema({
  query: { type: String, required: true },
  answer: { type: String, required: true },
  sources: [sourceSchema],
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const chatSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  disease: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  history: [historySchema]
}, {
  timestamps: true // adds createdAt & updatedAt
});

// 🔥 Index for fast search
chatSchema.index({ patientName: 1, disease: 1 });

module.exports = mongoose.model('Chat', chatSchema);