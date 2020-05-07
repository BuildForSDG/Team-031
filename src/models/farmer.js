const mongoose = require('mongoose');

const farmerSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  time: { type: Number, required: true }
});

module.exports = mongoose.model('Farmer', farmerSchema);