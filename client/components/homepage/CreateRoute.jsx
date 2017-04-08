import React from 'react';
import { Link } from 'react-router-dom';

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/Room">This is our room creation div</Link>
      </div>
    );
  }
}

export default CreateRoute;
