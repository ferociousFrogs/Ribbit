import React from 'react';

const ChatMessage = props => (
  <div>
    { props.message.fromMe ?
      <div className="chat-message-container-me">
          <div className="chat-name-from-me chat-message-name"><strong>{props.message.userName}</strong></div>
          <div className="chat-text-from-me">{props.message.text}</div>
      </div>
    :
      <div className="chat-message-container-other">
        <div className="chat-message-name"><strong>{`Guest ${props.message.userName}`}</strong></div>
        <div className="chat-text-from-other">{props.message.text}</div>
      </div>
    }
  </div>
);

export default ChatMessage;
