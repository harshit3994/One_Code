const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  deviceOS: {
    type: String,
    required: true
  },
  extrainfo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "available"
  },
  action: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = Device = mongoose.model('device', DeviceSchema);