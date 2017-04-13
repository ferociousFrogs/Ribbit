import React from 'react';
import CodeMirror from 'react-codemirror';

// require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/keymap/sublime');

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// Ribbit\nfunction ribbit() {\n return "Ribbit";\n}\n'
    };
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const cm = this.refs.cm.getCodeMirror();
    cm.setSize(null, 550);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      lineWrapping: true,
      keyMap: 'sublime',
      mode: 'javascript'
    };
    return (
      <div className="row border left-side">
        <CodeMirror
          ref="cm"
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
