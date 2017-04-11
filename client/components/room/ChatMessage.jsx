import React from 'react';

const ChatMessage = props => (
  <div>
    <strong>user</strong><span>{props.message}</span>
  </div>
);

export default ChatMessage;
