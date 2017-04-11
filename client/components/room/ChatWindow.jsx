import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = (props) => (

  <div className="chat-area">
    {props.messages.map(message => <ChatMessage message={message} />)}
  </div>
);

export default ChatWindow;
