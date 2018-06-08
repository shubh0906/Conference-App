const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token,'user').then((user) => {
    if (!user) {
      return Promise.reject();
    }
    //console.log("user"+user)
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

const authenticateAdmin = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token,'admin').then((user) => {
    if (!user) {
      return Promise.reject();
    }
    //console.log("user"+user)
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate,authenticateAdmin};
