import React from 'react';
import { connect } from 'react-redux';
import ProfilePartnersListItem from './ProfilePartnersListItem';
// [X]functional component
// [X]needs to be a container for the list of partners (people the user worked with in that room)
// []needs to accept the partners from the store (partners) - needs connects
// [X]needs to map each partner onto ProfilePartnersListItem
const ProfilePartnersList = props => (
  <div>
    {props.partners.map((partner, i) => <ProfilePartnersListItem key={i} partner={partner} />)}
  </div>
);

const mapStateToProps = state => ({
  partners: state.partners
});

export default connect(mapStateToProps, null)(ProfilePartnersList);
