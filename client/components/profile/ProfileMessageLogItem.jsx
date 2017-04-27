import React from 'react';

// []should have consistent styling with the chat message component
// []display each message appropriately so messages from me and from partner are separate

const ProfileMessageLogItem = props => (
  <div>
    <span>{props.message.user2name}</span><span>{props.message.data}</span>
  </div>
);

export default ProfileMessageLogItem;
