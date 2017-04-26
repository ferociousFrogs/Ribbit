import { connect } from 'react-redux';
import React from 'react';
import generateSillyName from 'sillyname';
import socket from '../../clientUtilities/sockets';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';
import { addUserName, createRoomName, addPeerName } from './../../actions/actionCreators';
import RoomDropdown from './RoomDropdown';


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.createSillyName = this.createSillyName.bind(this);
    if (!this.props.roomName) {
      const browserRoomName = this.props.match.params.roomName.slice(1);
      this.props.createRoomName(browserRoomName);
    }
  }

  componentDidMount() {
    const browserRoomNamed = this.props.match.params.roomName.slice(1);
    socket.emit('join room', this.props.roomName || browserRoomNamed);
    socket.on('peer name', this.props.addPeerName);
    const roomInfo = {
      roomName: this.props.roomName,
      userName: this.props.userName,
      userId: this.props.userId
    };
    socket.emit('join room', roomInfo);
    socket.on('full', (room) => {
      console.log(`${room} is full`);
      this.setState({ redirect: true });
    });

    !this.props.userName ? this.createSillyName() : null;
    this.props.previousRoomNames(this.props.roomName);
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.roomName);
  }

  createSillyName() {
    const sillyName = generateSillyName();
    this.props.addUserName(sillyName);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-8">
          <Workspace />
        </div>
        <div className="col-md-4">
          <Video />
        </div>
        <div className="col-md-4">
          <Chat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName
});

const mapDispatchToProps = dispatch => ({
  addUserName: name => dispatch(addUserName(name)),
  addPeerName: peerName => dispatch(addPeerName(peerName)),
  previousRoomNames: peerName => dispatch(previousRoomNames(peerName)),
  createRoomName: room => dispatch(createRoomName(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

