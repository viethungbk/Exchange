const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const ExchangeSchema = new Schema({
  timestamp: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  base: {
    type: String,
    default: 'EUR'
  },
  rates: {
    type: Object
  }
});

module.exports = Exchange = mongoose.model('exchange', ExchangeSchema);