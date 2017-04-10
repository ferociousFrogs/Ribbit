import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row border right-side">
        <div className="chat-header">
          <span className="glyphicon glyphicon-user" />
          <span>Chat with USER</span>
        </div>
        <div className="chat-area">
          chat area
        </div>
        <div className="chat-input">
          <form>
            <input
              type="text"
              className="col-md-10 col-sm-10 col-xs-10"
              placeholder="Type your message here."
            />
            <button className="btn-info col-md-2  col-sm-2 col-xs-2">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
