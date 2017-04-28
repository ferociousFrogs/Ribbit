import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = (props) => (

  <div className="chat-area" id="chatWindow">
    {props.messages.map((message, i) => <ChatMessage key={i} message={message} />)}
  </div>
);

export default ChatWindow;
