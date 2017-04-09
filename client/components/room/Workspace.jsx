import React from 'react';

class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row border left-side">
        <iframe frameBorder="0" width="100%" height="100%" src="https://repl.it/languages" />
      </div>
    );
  }
}

export default Workspace;
