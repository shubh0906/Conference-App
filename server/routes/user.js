const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('../db/mongoose');
var {User} = require('../models/user');
var {authenticate} = require('../middleware/authenticate');


module.exports = app =>{
    app.post('/users/create', (req, res) => {
        var body = _.pick(req.body, ['accountType','email', 'password','name','phone']);
        var user = new User(body);
        console.log(body)
      
        user.save().then(() => {
          return user.generateAuthToken();
        }).then((token) => {
          
          res.header('x-auth', token).send(user);
        }).catch((e) => {
          res.status(400).send(e);
        })
      });
      
      app.get('/users/me', authenticate, (req, res) => {
        res.send(req.user);
      });
      
      app.post('/users/anon',(req, res) => {
        console.log(req.body);
        var body = _.pick(req.body, ['accountType', 'password']);
        User.authenticateAnon(body.accountType, body.password).then((token) => {
          res.header('x-auth',token).send();
        }).catch((e) => {
          res.status(400).send();
        });
      });
      app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['accountType','email', 'password']);
        console.log(body);
        User.findByCredentials(body.email, body.password).then((user) => {
          return user.generateAuthToken().then((token) => {
            res.header('x-auth', token);
            console.log(res);
            res.header('x-auth', token).send(user);
          });
        }).catch((e) => {
          res.status(400).send();
        });
      });
      
      app.delete('/users/me/logout', authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
          res.status(200).send();
        }, () => {
          res.status(400).send();
        });
      });
      

}
