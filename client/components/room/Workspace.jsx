import React from 'react';
import CodeMirror from 'react-codemirror';
import io from 'socket.io-client';

// require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/keymap/sublime');

const server = location.origin;
const socket = io(server);
let cm;

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    // mock user value for now
    this.state = {
      user: Math.floor(999 * Math.random()),
      code: '// Ribbit\nfunction ribbit() {\n return "Ribbit";\n}\n'
    };
    this.updateCodeHandler = this.updateCodeHandler.bind(this);
  }

  componentDidMount() {
    cm = this.refs.cm.getCodeMirror();

    cm.on('keyup', () => {
      const editedCode = {
        id: 1,
        user: this.state.user,
        value: cm.getValue()
      };
      this.setState({
        code: editedCode.value
      });
      socket.emit('code-edit', editedCode);
    });
    socket.on('newCode', this.updateCodeHandler);
    cm.setSize(null, 550);
  }

  updateCodeHandler(otherPersonsCode) {
    cm.setValue(otherPersonsCode.value);
    this.setState({
      code: otherPersonsCode.value
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
          options={options}
        />
        This is the Workspace Component
      </div>
    );
  }
}

export default Workspace;
