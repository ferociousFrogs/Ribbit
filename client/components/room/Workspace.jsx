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
    this.state = {
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
        userName: this.props.userName,
        peerName: this.props.peerName,
        type: 'code',
        data: cm.getValue(),
        language: 'Javascript',
        roomName: this.props.roomName
      };
      socket.emit('code-edit', editedCode);
    });
    socket.on('newCode', this.updateCodeHandler);
    cm.setSize(null, 550);
  }

  updateCodeHandler(otherPersonsCode) {
    cm.setValue(otherPersonsCode.data);
    this.setState({
      code: otherPersonsCode.data
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
      <div className="row left-side">
        <CodeMirror
          ref="cm"
          value={this.state.code}
          options={options}
        />
        <div className="bash col-md-11">
          {new Date(Date.now()).toDateString()}
          <p>{this.state.result ? this.state.result : 'Docker-Container: Ribbit user$ '}</p>
        </div>
        <button
          type="button"
          className="btn-code col-md-2"
          onClick={this.runCodeButtonListener}
        >
          Run Code
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName,
  peerName: state.peerName
});

export { Workspace };
export default connect(mapStateToProps)(Workspace);

