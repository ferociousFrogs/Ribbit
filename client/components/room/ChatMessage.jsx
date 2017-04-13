import React from 'react';

const ChatMessage = props => (
  <div>
    <strong>{props.message.userName}</strong>
    <span className="name-msg-offset">{props.message.text}</span>
  </div>
);

export default ChatMessage;
