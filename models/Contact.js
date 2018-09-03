var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phonenumber: Number,
  group: String
});

module.exports = mongoose.model('Contact', ContactSchema);