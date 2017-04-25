import React from 'react';
import { connect, getState } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import { sendMessage, addUserName, getMessageText } from './../../actions/actionCreators';
import socket from '../../clientUtilities/sockets';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount() {
    socket.on('chat message', this.receiveMessage);
  }

  componentDidUpdate() {
    // If there is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('chatWindow');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  receiveMessage(msg) {
    this.props.sendMessage(msg);
  }


  handleInput(e) {
    this.props.getMessageText(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.text !== '') {
      let room = this.props.roomName;
      const messageObj = {
        userName: `${this.props.userName}`,
        peerName: this.props.peerName,
        type: 'message',
        data: this.props.text,
        fromMe: false,
        roomName: room
      };
      socket.emit('chat message', messageObj);
      messageObj.fromMe = true;
      this.props.sendMessage(messageObj);
      this.props.getMessageText('');
    }
  }

  render() {
    return (
      <div className="row border right-side">
        <div className="container-fluid chat-container">
          <div className="chat-header">
            <span className="glyphicon glyphicon-user" />
            <span className="name-msg-offset">Chat with USER</span>
          </div>
          <ChatWindow messages={this.props.messages} />
          <div className="chat-input">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="col-md-10 col-sm-10 col-xs-10"
                placeholder="Type your message here."
                value={this.props.text}
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

// this function is how we connect our state to props.  it is returning
// an object because props ARE objects.  So when I say "messages" as
// the key of the object, that is the same as if I had a key of
// messages up in my state. When you inspect the state using
// react dev tools, you will see that "messages" is part of the state
// for the chat component.

// The value (state.messages) comes from my rootReducer where I am returning
// an object that has the key that I specify (in this case, messages), and
// the value is the reducer itself, in this case coming from
// chatMessage-reducer file (chatMessagesReducer)

const filterMessages = (messages, roomName) =>
  messages.filter(message => message.roomName === roomName);

const mapStateToProps = state => ({
  messages: filterMessages(state.messages, state.roomName),
  userName: state.userName,
  roomName: state.roomName,
  text: state.text,
  peerName: state.peerName
});


// it's this function that is allowing us to dispatch our actions.
//  Pay close attention to what we're doing.  Similar to how we would pass
// a function as props in usual react (and we can name it whatever we want in
// the subsequent component, as in, potato={this.handleClick}, then in the
// next lower component, this.props.potato), we are calling this sendMessage,
// and the function will be accessible as sendMessage through props.
// See my "receiveMessage" function further up.
const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendMessage(message)),
  addUserName: name => dispatch(addUserName(name)),
  getMessageText: text => dispatch(getMessageText(text))
});

// give mapstateToProps and mapDispatchToProps to the connect function in
// order to provide access to the props to the component specified in
// the () after the function call.
export { Chat };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
