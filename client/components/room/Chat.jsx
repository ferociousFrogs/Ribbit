import React from 'react';
import ChatWindow from './ChatWindow';
import io from 'socket.io-client';

let socket = io('http://localhost:3000');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      user: [{ name: 'Batman' }, { name: 'Bane' }],
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount() {
    // Listeners for socket events go here
    socket.on('chat message', this.receiveMessage);
  }

  receiveMessage(msg) {
    // method for updating state with the new message.
    const prevMessages = this.state.messages;
    prevMessages.push(msg);
    this.setState({ messages: prevMessages });
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('chat message', this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div className="row border right-side">
        <div className="container-fluid chat-container">
          <div className="chat-header">
            <span className="glyphicon glyphicon-user" />
            <span>    Chat with USER</span>
          </div>
          <ChatWindow messages={this.state.messages} />
          <div className="chat-input">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="col-md-10 col-sm-10 col-xs-10"
                placeholder="Type your message here."
                value={this.state.text}
                onChange={this.handleInput}
              />
              <button className="btn-info col-md-2  col-sm-2 col-xs-2">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
