import React from 'react';
import { connect } from 'react-redux';
import ProfileMessageLogItem from './ProfileMessageLogItem';

// [X]needs to be a container for the list of messages

// [X]needs to accept the partnerLogs from the parent
// [X]needs to map the messages onto the ProfileMessageLogItem component
const ProfileMessageLog = props => (
  <div className="chat-area-profile" >
    {props.messages.map((message, i) => <ProfileMessageLogItem key={i} message={message} />)}
  </div>
);

export default ProfileMessageLog;
