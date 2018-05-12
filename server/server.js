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


// POST /users
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

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
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
app.get('/tracks',authenticate, (req, res) => {
  Tracks.find().then((track) => {
    res.send({track});
  }, (e) => {
    res.status(400).send(e);
  });
})

//Get a particular track with all events
app.get('/tracks/:id', (req, res) => {
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

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
