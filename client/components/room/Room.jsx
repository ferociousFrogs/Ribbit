import { connect } from 'react-redux';
import React from 'react';
import generateSillyName from 'sillyname';
import socket from '../../clientUtilities/sockets';
import { addUserName, createRoomName,
        addPeerName, previousRoomNames,
        previousRoomNameString, inRoom  } from './../../actions/actionCreators';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';
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
    const roomAndUserNames = {
      roomName: this.props.roomName || browserRoomNamed,
      userName: this.props.userName
    };
    socket.emit('join room', roomAndUserNames);
    socket.on('peer name', this.props.addPeerName);
    socket.on('full', (room) => {
      console.log(`${room} is full`);
      this.setState({ redirect: true });
    });

    !this.props.userName ? this.createSillyName() : null;
    this.props.previousRoomNameString(this.props.roomName);
    this.props.previousRoomNames(this.props.roomName);
    this.props.inRoom(true);
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.roomName);
    this.props.inRoom(false);
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
  previousRoomNames: roomName => dispatch(previousRoomNames(roomName)),
  createRoomName: room => dispatch(createRoomName(room)),
  previousRoomNameString: roomName => dispatch(previousRoomNameString(roomName)),
  inRoom: bool => dispatch(inRoom(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

