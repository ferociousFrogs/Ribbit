import React from 'react';
import { connect } from 'react-redux';

// [X]when the state (partnerLogs) is populated, this field needs to populate
// []the code needs to be pretty printed
const ProfileCodeLog = props => (
  <div>
    {props.code}
  </div>
);

export default ProfileCodeLog;
