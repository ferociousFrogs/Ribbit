import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoomName, addUserName } from './../../actions/actionCreators';

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.createRoomName(e.target.value);
  }

  handleUserNameChange(e) {
    this.props.addUserName(e.target.value);
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
            className="form-control"
          />
          <input
            type="email_intro"
            value={this.props.userName}
            placeholder="Enter a username"
            onChange={this.handleUserNameChange}
            className="form-control"
          />
          <Link to={`/:${this.props.roomName}`}>
            <input
              id="submit_intro"
              type="submit"
              value="Create room"
              className="btn btn-primary"
            />
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName
});

const mapDispatchToProps = dispatch => ({
  createRoomName: roomName => dispatch(createRoomName(roomName)),
  addUserName: name => dispatch(addUserName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute);
