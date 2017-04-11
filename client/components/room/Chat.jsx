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
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const prevMessages = this.state.messages;
    prevMessages.push(this.state.text);
    this.setState({ messages: prevMessages });
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
                onChange={this.handleMessage}
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


// [] Get data to append to the chat window on submit
// [] set up function to grab data from the input box and update state
// [] pass that data down to be rendered by the chatwindow and chatmessage components
// [] for now, store messages in an array and map them all
// []
// []
