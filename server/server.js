const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Events} = require('./models/event');
var {Tracks} = require('./models/track');

var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = 3101;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  console.log("meeee"+req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers","Content-Length,X-AUTH,X-Bar");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
  next();
});

require('./routes/user')(app);
require('./routes/track')(app);


// Events API collection
app.post('/event',authenticate, (req, res) => {
  let trackType = req.body.trackType || 'Default';
  var event = new Events({
    title: req.body.title ,
    room: req.body.room,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    hostNames: req.body.hostNames,
    trackType: trackType,
    createdBy: 'admin' //to be changed
  });
  console.log(event)
  event.save().then((eventDoc) => {
    
    console.log(eventDoc);
    //add to Tracks model

    Tracks
    .findOne({
      'name': trackType
    })
    .then((track) => {
      if (!track) {
        //create New Track
        let trackEvents = [];
        trackEvents
        .push(eventDoc._id);
        let newTrack = new Tracks({
          name: trackType,
          events: trackEvents,
          createdBy: 'admin' //to be changed
        });
        
        newTrack.save()
        .then((trackDoc) => {
          let resBody = {
            trackDetails: trackDoc,
            eventDetails: eventDoc
          }
          res.send(resBody);
        }, (e) => {
          res.status(400).send(e);
        });
      } else {
        //Update Track Model
        let trackEvents = track.events;
        trackEvents.push(eventDoc._id)
        track.events = trackEvents;

        track.save()
        .then((trackDoc) => {
          let resBody = {
            trackDetails: trackDoc,
            eventDetails: eventDoc
          }
          res.send(resBody);
        }, (e) => {
          res.status(400).send(e);
        });
      }

    }).catch((e) => {
      res.status(400).send();
    });
    
  }, (e) => {
    console.log(e);
    res.status(400).send(e);
  });
});

app.delete('/event/:id',authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Events.findByIdAndRemove(id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }
    //Delete from track
    let trackType = event.trackType;
    
    Tracks.update({
      'name': trackType
    }, { 
      $pullAll: {events: [event._id] } 
    }).then((trackDoc) => {
      let resBody = {
        trackDetails: trackDoc,
        eventDetails: event
      }
      res.send(resBody);
    }).catch((e) => {
      res.status(400).send();
    });

  }).catch((e) => {
    console.log('error ', e)
    res.status(400).send();
  });
});

app.put('/event/:id',authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Events.findById(id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }
    if(req.body.title) {
      event.title = req.body.title;
    }
    if(req.body.room) {
      event.room = req.body.room;
    }
    if(req.body.startTime) {
      event.startTime = req.body.startTime;
    }
    if(req.body.endTime) {
      event.endTime = req.body.endTime;
    }
    if(req.body.hostNames) {
      event.hostNames = req.body.hostNames;
    }
    if(req.body.trackType) {
      //Delete from old track
      let trackType = event.trackType;
      
      Tracks.update({
        'name': trackType
      }, { 
        $pullAll: {events: [event._id] } 
      }).then((trackDoc) => {
        let resBody = {
          trackDetails: trackDoc,
          eventDetails: event
        }
        res.send(resBody);
      }).catch((e) => {
        res.status(400).send();
      });
      event.trackType = req.body.trackType;
    }

    event.save().then((eventDoc) => {
      if(req.body.trackType) {
        //Add to new track
        let trackType = req.body.trackType;
        Tracks.findOne({
          'name': trackType
        }).then((track) => {
          if (!track) {
            //create New Track
            let trackEvents = [];
            trackEvents.push(eventDoc._id);
            let newTrack = new Tracks({
              name: trackType,
              events: trackEvents,
              createdBy: 'admin' //to be changed
            });
            newTrack.save().then((trackDoc) => {
              let resBody = {
                trackDetails: trackDoc,
                eventDetails: eventDoc
              }
              res.send(resBody);
            }, (e) => {
              res.status(400).send(e);
            });
          } else {
            //Update Track Model
            let trackEvents = track.events;
            trackEvents.push(eventDoc._id)
            track.events = trackEvents;
    
            track.save().then((trackDoc) => {
              let resBody = {
                trackDetails: trackDoc,
                eventDetails: eventDoc
              }
              res.send(resBody);
            }, (e) => {
              res.status(400).send(e);
            });
          }
    
        }).catch((e) => {
          res.status(400).send();
        });
      } else {
        res.send(eventDoc);
      }
      
    }, (e) => {
      res.status(400).send(e);
    });    
  }).catch((e) => {
    res.status(400).send();
  });
});
//End of Events API Collection


//Tracks API Collection


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
