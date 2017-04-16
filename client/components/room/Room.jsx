import io from 'socket.io-client';
import { connect } from 'react-redux';
import React from 'react';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';

const server = location.origin;
const socket = io(server);

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.emit('join room', this.props.roomName);
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.roomName);
  }

  render() {
    return (
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

