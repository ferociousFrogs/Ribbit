import React from 'react';
import CodeMirror from 'react-codemirror';
import axios from 'axios';
import { connect } from 'react-redux';
import socket from '../../clientUtilities/sockets';

// require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/keymap/sublime');

let cm;

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    // mock user value for now
    this.state = {
      user: Math.floor(999 * Math.random()),
      code: '// Ribbit\nfunction ribbit() {\n return "Ribbit";\n};\nribbit();',
      result: ''
    };
    this.updateCodeHandler = this.updateCodeHandler.bind(this);
    this.runCodeButtonListener = this.runCodeButtonListener.bind(this);
  }

  componentDidMount() {
    cm = this.refs.cm.getCodeMirror();

    cm.on('keyup', () => {
      const editedCode = {
        user: this.state.user,
        value: cm.getValue(),
        language: 'Javascript',
        room: this.props.roomName
      };
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

  runCodeButtonListener() {
    this.setState({
      code: cm.getValue()
    });

    axios.get('/runCode', {
      params: {
        value: cm.getValue(),
        language: 'Javascript'
      }
    })
    .then((response) => {
      console.log(response.request.responseText);
      console.log(JSON.parse(response.request.responseText));
      this.setState({
        result: `Docker-Container: Ribbit user$ ${response.request.responseText}`
      });
    })
    .catch((error) => {
      console.log(error);
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
        <button
          type="button"
          className="btn-danger"
          onClick={this.runCodeButtonListener}
        >
          Run Code
        </button>
        <div className="bash">
          {new Date(Date.now()).toDateString()}
          <p>{this.state.result ? this.state.result : 'Docker-Container: Ribbit user$ '}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName
});

export { Workspace };
export default connect(mapStateToProps)(Workspace);

