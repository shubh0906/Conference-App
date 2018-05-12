var mongoose = require('mongoose');

var Account = mongoose.model('Account', {
  type: {
    type: String,
    required : true
  },
  username: {
    type: String,
    required : true
  },
  password: {
    type: String,
    required : true
  }
});

module.exports = {Account};
