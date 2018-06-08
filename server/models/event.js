var mongoose = require('mongoose');

var roomInfo = new mongoose.Schema({
  name: String,
  attendanceLimit: Number
});

var EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription:{
    type: String,
    required: true,
    minlength:50
  },
  longDescription:{
    type: String,
    required: true,
    minlength:50
  },
  room: {
    type: roomInfo,
    required: true,
    trim: true,
  },
  startTime: {
    type: Date,
    required: true,
    trim: true,
  },
  endTime: {
    type: Date,
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
  },
  published :{
    type : Boolean
  }
});

var Events = mongoose.model('Events',EventSchema );

module.exports = {Events,EventSchema};
