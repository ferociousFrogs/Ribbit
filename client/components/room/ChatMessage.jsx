import React from 'react';

const ChatMessage = props => (
  <div>
    { props.message.fromMe ?
      <div className="chat-message-container-me">
        <span className="pull-left">
          <img src="http://placehold.it/50/00A5D2/fff&text=ME" alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-name-from-me"><strong>{props.message.userName}</strong></div>
        <div className="chat-text-from-me">{props.message.text}</div>
      </div>
    :
      <div className="chat-message-container-other">
        <span className="pull-right">
          <img src="http://placehold.it/50/FF7473/fff&text=YOU" alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-name-from-other"><strong>{props.message.userName}</strong></div>
        <div className="chat-text-from-other">{props.message.text}</div>
      </div>
    }
  </div>
);

export default ChatMessage;
