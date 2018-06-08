var mongoose = require('mongoose');
const _ = require('lodash');

var {EventSchema} =require('./event');


var TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
    required: true,
  },
  shortDescription:{
    type: String,
    required: true,
    minlength:50
  },
  events: {
    type: [EventSchema]  
  },
  createdBy: {
      type: String,
      required:true
  }
});

// TrackSchema.methods.toJSON = function () {
//   var track = this;
//   var trackObject = track.toObject();

//   return _.pick(trackObject, ['_id', 'name','shortDescription']);
// };

var Tracks = mongoose.model('Tracks',TrackSchema );

module.exports = {Tracks};
