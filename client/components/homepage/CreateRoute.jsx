import React from 'react';
import { Link } from 'react-router-dom';

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    console.log(e.target.value);
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div className="border">
        <input
          type="text"
          value={this.state.name}
          placeholder="Enter a Room Name"
          onChange={this.handleNameChange}
        />
        <Link to={`/:${this.state.name}`}>This is our room creation div</Link>
      </div>
    );
  }
}

export default CreateRoute;
