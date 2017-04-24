import { connect } from 'react-redux';
import React from 'react';
import generateSillyName from 'sillyname';
import socket from '../../clientUtilities/sockets';
import { addUserName } from './../../actions/actionCreators';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.createSillyName = this.createSillyName.bind(this);
  }

  componentDidMount() {
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

  createSillyName() {
    const sillyName = generateSillyName();
    socket.emit('userName ', sillyName);
    this.props.addUserName(sillyName);
    console.log('sillyname = ', sillyName);
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
  addUserName: name => dispatch(addUserName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

