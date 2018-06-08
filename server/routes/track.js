const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {Tracks} = require('../models/track');
const {authenticate,authenticateAdmin} = require('../middleware/authenticate');

module.exports = app => {
    app.post('/track',authenticateAdmin, (req, res) => {
        const track = new Tracks({
          name: req.body.name,
          events: [],
          shortDescription: req.body.shortDescription,
          createdBy: 'admin' //to be changed
        });
      
        track.save().then((trackDoc) => {
          res.send(trackDoc);
        }, (e) => {
          res.status(400).send(e);
        });
      });
      
    app.delete('/track/:id',authenticateAdmin, (req, res) => {
      if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
      }
    
      Tracks.findByIdAndRemove(id).then((track) => {
        if (!track) {
          return res.status(404).send();
        }
        res.send(track);
      }).catch((e) => {
        console.log('error ', e)
        res.status(400).send();
      });
    });
      
    app.put('/track/:id',authenticate, (req, res) => {
      var id = req.params.id;
    
      if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
    
      Tracks.findById(id).then((track) => {
        if (!track) {
          return res.status(404).send();
        }
        if(req.body.name) {
          let oldName = track.name;
          let newName = req.body.name;
          track.name = newName;
          console.log('oldName', oldName, 'newName', newName)
        
          track.save().then((trackDoc) => {
            let query = {
              'trackType': oldName
            };
            Events.findOneAndUpdate(query, 
              { $set: { 'trackType': newName }
            }).then((eventDoc) => {
              let resBody = {
                trackDetails: trackDoc,
                eventDetails: eventDoc
              }
              res.send(resBody);
            }, (e) => {
              return res.status(400).send(e);
            });
            
          }, (e) => {
            res.status(400).send(e);
          }); 
        }   
      }).catch((e) => {
        res.status(400).send();
      });
    });
      
      //End of Track API Collection
      
      //Get APIs
      
      //Get all tracks
    app.get('/api/tracks',authenticate, (req, res) => {
      console.log("hello0"+req);
      Tracks.find().select('-events').then((track) => {
        res.send({track});
      }, (e) => {
        res.status(400).send(e);
      });
    })
      
      //Get a particular track with all events
    app.get('/api/tracks/:id',authenticate,  (req, res) => {
      var id = req.params.id;
    
      if (!ObjectID.isValid(id)) {
        return res.status(404).send({errorMessage:'Invalid id'});
      }
    
      Tracks.findById(id).then((track) => {
        if (!track) {
          return res.status(404).send({errorMessage:'No Track found'});
        }
        res.send({track});
      }).catch((e) => {
        res.status(400).send();
      });
    });
}