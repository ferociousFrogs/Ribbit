import React from 'react';
import { connect } from 'react-redux';
import Chance from 'chance';
import ChatWindow from './ChatWindow';
import { sendMessage, addUserName } from './../../actions/actionCreators';

// const port = process.env.PORT || 3000;
// const server2 = 'https://tailbud-pr-17.herokuapp.com/';

const chance = new Chance();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount() {
    // Listeners for socket events go here
    // const randomName = chance.first();
    // console.log('randomName', randomName);
    // this.props.addUserName(`"${randomName}"`);
    this.props.socket.on('chat message', this.receiveMessage);
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('chatWindow');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  receiveMessage(msg) {
    this.props.sendMessage(msg);
  }


  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text !== '') {
      const messageObj = {
        userName: `Guest ${this.props.userName}`,
        text: this.state.text,
        fromMe: false,
        roomName: location.pathname
      };
      this.props.socket.emit('chat message', messageObj);
      messageObj.fromMe = true;
      this.props.sendMessage(messageObj);
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
          <ChatWindow messages={this.props.messages} />
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

const mapStateToProps = state => ({
  messages: state.messages,
  userName: state.userName
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
  addUserName: name => dispatch(addUserName(name))
});

// give mapstateToProps and mapDispatchToProps to the connect function in
// order to provide access to the props to the component specified in
// the () after the function call.
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
