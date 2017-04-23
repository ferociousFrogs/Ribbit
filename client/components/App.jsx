import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from '../clientUtilities/sockets';
import { addUserId } from './../actions/actionCreators';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';
import Login from './homepage/Login';
import Profile from './profile/Profile';

const App = (props) => {
  socket.on('user created', (user) => {
    if (user.userName === props.userName) {
      props.addUserId(user.userId);
    }
  });
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route path={`/:${props.roomName}`} history={props.history} component={Room} />
      </Switch>
    </div>
  );
};


// const mapStateToProps = state => ({
//   userId: state.userId,
//   userName: state.userName
// });

// const mapDispatchToProps = dispatch => ({
//   addUserId: userId => dispatch(addUserId(userId))
// });

// export { App };
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
