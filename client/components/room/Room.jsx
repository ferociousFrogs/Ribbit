import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';

import io from 'socket.io-client';
const server = location.origin;
const socket = io(server);

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    socket.emit('join room', this.props.roomName);
    socket.on('full', (room) => {
      console.log(`${room} is full`);
      this.setState({ redirect: true });
    });
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.roomName);
  }

  render() {
    return this.state.redirect ? (<Redirect to="/" />) :
      (
        <div className="container-fluid">
          <h2>{this.props.roomName}</h2>
          <div className="col-md-8">
            <Workspace socket={socket} />
          </div>
          <div className="col-md-4">
            <Video socket={socket} />
          </div>
          <div className="col-md-4">
            <Chat socket={socket} />
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName
});

export default connect(mapStateToProps)(Room);

