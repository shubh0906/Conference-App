var mongoose = require('mongoose');

var roomInfo = mongoose.Schema({
  name: String,
  attendanceLimit: Number
});


var Events = mongoose.model('Events', {
  title: {
    type: String,
    required: true,
    trim: true
  },
  room: {
    type: roomInfo,
    required: true,
    trim: true,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
    trim: true,
  },
  hostNames: {
    type: [String],
    required: true,
    trim: true, 
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  trackType: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = {Events};
