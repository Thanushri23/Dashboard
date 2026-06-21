const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'employee', 'manager'], default: 'employee' },
  position: String,
  department: String,
  phone: String,
  salary: Number,
});

module.exports = mongoose.model('User', userSchema);