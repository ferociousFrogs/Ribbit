import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';
import Login from './homepage/Login';

const App = props => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path={`/:${props.roomName}`} history={props.history} component={Room} />
    </Switch>
  </div>
);

export default App;
