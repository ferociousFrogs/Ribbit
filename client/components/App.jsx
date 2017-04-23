import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';
import Login from './homepage/Login';
import { createSocket } from '../actions/actionCreators';

const server = location.origin;

const App = (props) => {
  const socket = io(server);
  props.createSocket(socket);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path={`/:${props.roomName}`} history={props.history} component={Room} />
      </Switch>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  createSocket: socket => dispatch(createSocket(socket))
});

export default connect(null, mapDispatchToProps)(App);
