import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from '../clientUtilities/sockets';
import { addUserId, previousRoomNames } from './../actions/actionCreators';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';
import Login from './homepage/Login';
import Profile from './profile/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('app was called from the navbar');
    socket.on('user created', (user) => {
      console.log('user in user created response', user);
      this.props.previousRoomNames(user.rooms);
      // if (user.userName === this.props.userName) {
      //   this.props.addUserId(user.userId);
      // }
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route path={`/:roomName`} history={props.history} component={Room} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUserId: userId => dispatch(addUserId(userId)),
  previousRoomNames: rooms => dispatch(previousRoomNames(rooms))
});


export { App };
export default withRouter(connect(null, mapDispatchToProps)(App));
// export default App;
