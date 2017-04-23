import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoomName } from './../../actions/actionCreators';
import socket from '../../clientUtilities/sockets';

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.isRoomFull = this.isRoomFull.bind(this);
  }

  componentDidMount() {
    socket.on('full', () => {
      const submitbtn = document.getElementById('submit_intro');
      submitbtn.disabled = true;
      submitbtn.classList.remove('btn-primary');
      submitbtn.className += ' btn-disable';
      submitbtn.value = 'Room full!';
    });
    socket.on('not full', () => {
      const submitbtn = document.getElementById('submit_intro');
      submitbtn.disabled = false;
      submitbtn.className += ' btn-primary';
      submitbtn.classList.remove('btn-disable');
      submitbtn.value = 'Create room';
    });
  }

  handleNameChange(e) {
    this.props.createRoomName(e.target.value);
  }

  isRoomFull() {
    socket.emit('any room left', this.props.roomName);
  }

  render() {
    return (
      <div>
        <form className="form-inline margin-top sign-up-form">
          <input
            id="email_intro"
            type="text"
            placeholder="Enter a room name"
            value={this.props.roomName}
            onChange={this.handleNameChange}
            onKeyUp={this.isRoomFull}
            className="form-control"
          />
          <Link to={`/:${this.props.roomName}`}>
            <input
              id="submit_intro"
              type="submit"
              value="Create room"
              className="btn btn-primary"
              onClick={() => { socket.emit('room created', this.props.roomName)} }
            />
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName
});

const mapDispatchToProps = dispatch => ({
  createRoomName: roomName => dispatch(createRoomName(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute);
