import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Conf from './containers/conf/conf';
import Tracks from './containers/tracks/tracks'
import Anon from './containers/anon/anon';
import Admin from './containers/admin/admin';
//import Layout from './hoc/Layout/Layout';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route path="/admin" exact component={Admin} />
              <Route path="/tracks" exact component={Tracks} />
              <Route path="/users/anon" exact component={Anon} />
              <Route path="/" exact component={Conf} />
            </Switch>
      
      </div>
    );
  }
}

export default App;
