import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Conf from './containers/conf/conf';
import Login from './containers/login/login';
import Anon from './containers/anon/anon';
import Admin from './containers/admin/admin';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
              <Route path="/admin" exact component={Admin} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/users/anon" exact component={Anon} />
              <Route path="/" exact component={Conf} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
