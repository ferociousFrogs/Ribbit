import { connect } from 'react-redux';
import React from 'react';
import generateSillyName from 'sillyname';
import socket from '../../clientUtilities/sockets';
import { addUserName, addPeerName } from './../../actions/actionCreators';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.createSillyName = this.createSillyName.bind(this);
    this.checkForPeerName = this.checkForPeerName.bind(this);
  }

  componentDidMount() {
    socket.on('peer name', this.checkForPeerName);
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
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.roomName);
  }

  checkForPeerName(name) {
    console.log('checked for name ', name);
    console.log('current name ', this.props.userName);
    if (name !== this.props.userName) {
      this.props.addPeerName(name);
    }
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
  addPeerName: peerName => dispatch(addPeerName(peerName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

