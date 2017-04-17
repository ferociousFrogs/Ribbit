import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoomName } from './../../actions/actionCreators';

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.createRoomName(e.target.value);
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
  roomName: state.roomName
});

const mapDispatchToProps = dispatch => ({
  createRoomName: roomName => dispatch(createRoomName(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute);
