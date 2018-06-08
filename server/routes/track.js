const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('../db/mongoose');
var {Tracks} = require('../models/track');
var {authenticate} = require('../middleware/authenticate');

module.exports = app => {
    app.post('/track',authenticate, (req, res) => {
        let name = req.body.name || 'Default';
        var track = new Tracks({
          name: name,
          events: [],
          createdBy: 'admin' //to be changed
        });
      
        track.save().then((trackDoc) => {
          res.send(trackDoc);
        }, (e) => {
          res.status(400).send(e);
        });
      });
      
      app.delete('/track/:id', (req, res) => {
        var id = req.params.id;
      
        if (!ObjectID.isValid(id)) {
          return res.status(404).send();
        }
      
        Tracks.findByIdAndRemove(id).then((track) => {
          if (!track) {
            return res.status(404).send();
          }
          //Delete events
          
          Events.deleteMany({ trackType: track.name}, (err) => {
            if(err) {
              console.log('error ', err)
              return res.status(400).send();    
            } else {
              res.send(track);
            }
          });
      
      
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
        Tracks.find().then((track) => {
          res.send({track});
        }, (e) => {
          res.status(400).send(e);
        });
      })
      
      //Get a particular track with all events
      app.get('/api/tracks/:id', (req, res) => {
        var id = req.params.id;
      
        if (!ObjectID.isValid(id)) {
          return res.status(404).send();
        }
      
        Tracks.findById(id).then((track) => {
          if (!track) {
            return res.status(404).send();
          }
          if(track.events && track.events.length>0) {
            let eventIdArray = [];
            for(let i=0; i<track.events.length; i++) {
              eventIdArray.push(new mongoose.Types.ObjectId( track.events[i] ));
            }
            Events.find({
              '_id': { $in: eventIdArray}
            }, function(err, docs){
              if(err) {
                console.log(err);
                return res.status(400).send();
              }
                console.log(docs);
                res.send(docs);
            });  
          } else {
            res.send({track});
          }
        
        }).catch((e) => {
          res.status(400).send();
        });
      });
}