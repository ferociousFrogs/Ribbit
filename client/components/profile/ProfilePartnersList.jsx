import React from 'react';
import { connect } from 'react-redux';
import ProfilePartnersListItem from './ProfilePartnersListItem';
// [X]functional component
// [X]needs to be a container for the list of partners (people the user worked with in that room)
// []needs to accept the partners from the store (partners) - needs connects
// [X]needs to map each partner onto ProfilePartnersListItem
const ProfilePartnersList = props => (
  <div className="profile-list-height">
    {props.peerNames.map((peer, i) => <ProfilePartnersListItem key={i} peer={peer} separateData={props.separateData} />)}
  </div>
);

const mapStateToProps = state => ({
  peerNames: state.peerNames
});

export default connect(mapStateToProps, null)(ProfilePartnersList);
