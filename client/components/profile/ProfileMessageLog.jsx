import React from 'react';
import { connect } from 'react-redux';
import ProfileMessageLogItem from './ProfileMessageLogItem';

// [X]needs to be a container for the list of messages

// [X]needs to accept the partnerLogs from the parent
// [X]needs to map the messages onto the ProfileMessageLogItem component
const ProfileMessageLog = props => (
  <div>
    {props.peerData.map((peer, i) => <ProfileMessageLogItem key={i} message={peer.messages} />)}
  </div>
);

export default ProfileMessageLog;
