import React from 'react';
import { connect } from 'react-redux';
import { getPreviousRoomNames, getPartners, getPartnerLogs } from './../../actions/actionCreators';
import ProfileRoomsList from './ProfileRoomsList';
import ProfilePartnersList from './ProfilePartnersList';
import ProfileCodeLog from './ProfileCodeLog';
import ProfileMessageLog from './ProfileMessageLog';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.populatePartners = this.populatePartners.bind(this);
    this.requestPartners = this.requestPartners.bind(this);
  }

  componentDidMount() {
    // listen for 'got partners'
      // call populatePartners with payload
    //listen for 'got partnerLogs'
      // call populatePartnerLogs with payload
  }

  requestPartners() {
      // emit event 'get partners'
      // on event down in server, listen, trigger function, emit event 'got partners'
  }

  populatePartners(payload) {
    // dispatch action to populate state partners
    // action/reducer will be expecting an array of objects {name: name, id: id}
    this.props.getPartners(payload);
  }

  requestPartnerLogs() {
    // emit an event 'get partnerLogs'
    // on event down in server, listen, trigger function for database call, emit event 'got partnerLogs'
  }

  populatePartnerLogs(payload) {
    // dispatch action to populate state partnerLogs
    // action/reducer will be expecting object { code: '', messages: [{}] }
    this.props.getPartnerLogs(payload);

  }

  render() {
    return (
      <div className="col-md-12 container-fluid text-intro left-side">
        <h1 className="text-center">{this.props.userName}'s Profile </h1>
        <div className="col-md-2 ">
          <div className="profile-background">
            <ProfileRoomsList requestPartners={this.requestPartners} />
          </div>
          <div className="profile-background profile-margin" >
            <ProfilePartnersList />
          </div>
        </div>
        <div className="col-md-offset-1 col-md-4 profile-background">
          <ProfileCodeLog code={this.props.partnerLogs.code} />
        </div>
        <div className="col-md-offset-1 col-md-4 profile-background">
          <ProfileMessageLog messages={this.props.partnerLogs.messages} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames,
  userName: state.userName,
  partners: state.partners,
  partnerLogs: state.partnerLogs
});

const mapDispatchToProps = dispatch => ({
  getPreviousRoomNames: () => dispatch(getPreviousRoomNames()),
  getPartners: partners => dispatch(getPartners(partners)),
  getPartnerLogs: partnerLogs => dispatch(getPartnerLogs(partnerLogs))
});

// export default Profile;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
