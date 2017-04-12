import React from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// Ribbit'
    };
  }

  getInitialState() {
    return {
      code: '// Code'
    };
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript'
    };
    return (
      <div className="row border left-side">
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
        This is the Workspace Component
      </div>
    );
  }
}

export default Workspace;
