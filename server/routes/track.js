const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {Tracks} = require('../models/track');
const {authenticate,authenticateAdmin} = require('../middleware/authenticate');

module.exports = app => {
    //add a new track
    app.post('/api/track',authenticateAdmin, (req, res) => {
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

    // Delete a track  
    app.delete('/api/track/:id',authenticateAdmin, (req, res) => {
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
      
    //patch a track
    app.patch('/api/track/:id',authenticate, (req, res) => {
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
          track.shortDescription = req.body.shortDescription;
          console.log('oldName', oldName, 'newName', newName)
        
          track.save().then((trackDoc) => {
            console.log("patch"+trackDoc);
            res.send(trackDoc);
            
          }).catch( (e) => {
            res.status(400).send(e);
          }); 
        }   
      }).catch((e) => {
        res.status(400).send();
      });
    });
    
    //Get APIs
      
    //Get all tracks
    app.get('/api/tracks',authenticate, (req, res) => {
      console.log("hello0"+req);
      Tracks.find().select('-events').then((track) => {
        res.send({track});
      }, (e) => {
        res.status(400).send(e);
      });
    });
      
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