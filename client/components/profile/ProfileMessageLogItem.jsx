import React from 'react';

// []should have consistent styling with the chat message component
// []display each message appropriately so messages from me and from partner are separate

const ProfileMessageLogItem = props => (
  <div className="chat-message-container-me">
    <span className="pull-left">
      <img src="http://placehold.it/50/00A5D2/fff&text=ME" alt="User Avatar" className="img-circle" />
    </span>
    <div className="chat-name-from-me"><strong>{props.message.user2name}</strong></div>
    <div className="chat-text-from-me">{props.message.data}</div>
  </div>
);

export default ProfileMessageLogItem;


