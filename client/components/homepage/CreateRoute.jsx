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
    console.log(e.target.value);
    this.props.createRoomName(e.target.value);
  }

  render() {
    return (
      <div className="border">
        <div>
          <input
            type="text"
            value={this.props.roomName}
            placeholder="Enter a Room Name"
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          <input
            type="text"
            value=""
            placeholder="Enter a username"
          />
          <Link to={`/:${this.props.roomName}`}>This is our room creation div</Link>
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
  createRoomName: roomName => dispatch(createRoomName(roomName)),
  addUserName: name => dispatch(addUserName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute);
