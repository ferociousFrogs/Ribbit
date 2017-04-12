import React from 'react';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

// const port = process.env.PORT || 3000;
const server = location.origin;
// const server2 = 'https://tailbud-pr-17.herokuapp.com/';
const socket = io(server);

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      user: '',
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

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('chatWindow');
    objDiv.scrollTop = objDiv.scrollHeight;
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
    if (this.state.text !== '') {
      const messageObj = {
        userName: this.state.user !== '' ? this.state.user : 'Guest',
        text: this.state.text,
        fromMe: false
      };
      socket.emit('chat message', messageObj);
      // eventually, we will use the 'fromMe' property to tag messages as from the sender so that they can render differently on the page.
    }
    this.setState({ text: '' });
  }

  render() {
    return (
      <div className="row border right-side">
        <div className="container-fluid chat-container">
          <div className="chat-header">
            <span className="glyphicon glyphicon-user" />
            <span className="name-msg-offset">Chat with USER</span>
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
