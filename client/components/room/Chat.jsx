import React from 'react';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

const port = process.env.PORT || 3000;
const server = `http://localhost:${port}`;
const socket = io(server);

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      users: [{ name: 'The Batman', id: '' }, { name: 'The Joker', id: '' }, { name: 'The Nightman', id: '' }, { name: 'Tim', id: '' }],
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.saveUniqueUser = this.saveUniqueUser.bind(this);
  }

  componentDidMount() {
    // Listeners for socket events go here
    socket.on('chat message', this.receiveMessage);
    socket.on('newUser', this.saveUniqueUser);
    socket.emit('join', this.state.users);
  }

  receiveMessage(msg) {
    // method for updating state with the new message.
    const prevMessages = this.state.messages;
    prevMessages.push(msg);
    this.setState({ messages: prevMessages });
  }
  // this function isn't implemented properly.  Currently it only
  // updates properly for the first user who connects.
  saveUniqueUser(newUser) {
    const users = this.state.users;
    const userIndex = users.findIndex(user => user.name === newUser.name);
    users[userIndex].id = newUser.id;
    this.setState({ users: users });
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text !== '') {
      socket.emit('chat message', this.state.text);
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
