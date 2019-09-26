const mongoose = require('mongoose');

// Define Schemes
const ScoreSchema = new mongoose.Schema({
	id: { type: Number, required: true, unique: true },
	score: { type: String, required: true },
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Score', ScoreSchema);