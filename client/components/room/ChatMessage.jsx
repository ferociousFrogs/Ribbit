import React from 'react';

const ChatMessage = props => (
  <div>
    <strong>user</strong><span className="name-msg-offset">{props.message}</span>
  </div>
);

export default ChatMessage;
