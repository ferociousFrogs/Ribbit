import React from 'react';
import ProfileMessageLogItem from './ProfileMessageLogItem';

// []needs to be a container for the list of messages

// []needs to accept the partnerLogs from the store (connect)
// []needs to map the messages onto the ProfileMessageLogItem component
const ProfileMessageLog = props => (
  <div>
    {props.messages.map((message, i) => <ProfileMessageLogItem key={i} message={message} />)}
  </div>
);

export default ProfileMessageLog;
