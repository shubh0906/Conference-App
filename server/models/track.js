var mongoose = require('mongoose');

var Tracks = mongoose.model('Tracks', {
  name: {
    type: String
  },
  events: {
    type: [String]  
  },
  createdBy: {
      type: String
  }
});

module.exports = {Tracks};
