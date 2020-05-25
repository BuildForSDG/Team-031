const mongoose = require('mongoose');

const farmerSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, validator: { isEmail: true} },
  password: { type: String, required: true },
  city: {type: String, required: true},
  created_at: { type: Date, required: true, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()}
});

module.exports = mongoose.model('Farmer', farmerSchema);