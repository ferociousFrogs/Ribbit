import React from 'react';

const ChatMessage = props => (
  <div>
    { props.message.fromMe ?
      <div>
        <strong>{props.message.userName}</strong>
        <span className="name-msg-offset">{props.message.text}</span>
      </div>
    :
      <div>
        <span className="name-msg-offset">{props.message.text}</span>
        <strong>{props.message.userName}</strong>
      </div>
    }
  </div>
);

export default ChatMessage;


     // <span className={"name-msg-offset " + (props.message.fromMe ? 'from-me' : '')}>{props.message.text}</span>