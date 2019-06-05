const mongoose = require('mongoose');

const SimpleSchema = new mongoose.Schema({
  email: {
    type: String,   
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Simple = mongoose.model('Simple', SimpleSchema);

module.exports = Simple;