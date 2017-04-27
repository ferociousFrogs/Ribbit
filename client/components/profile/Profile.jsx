import React from 'react';
import { connect } from 'react-redux';
import { getPreviousRoomNames, addPeerRoomData, listPeerNames, addPeerMessages, addPeerCode } from './../../actions/actionCreators';
import ProfileRoomsList from './ProfileRoomsList';
import ProfilePartnersList from './ProfilePartnersList';
import ProfileCodeLog from './ProfileCodeLog';
import ProfileMessageLog from './ProfileMessageLog';
import socket from '../../clientUtilities/sockets';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.requestRoomData = this.requestRoomData.bind(this);
    this.populateRoomData = this.populateRoomData.bind(this);
    this.separateData = this.separateData.bind(this);
  }

  componentDidMount() {
    socket.on('room data sent', this.populateRoomData);
  }

  requestRoomData(room) {
    // this function will be invoked onClick of the room name listed in ProfileRoomsListItem
    const payload = {
      userName: this.props.userName,
      roomName: room
    };
    socket.emit('grab room data', payload);
  }

  populateRoomData(payload) {
    // need an action to take this payload and put it in the state as peerRoomData
    const peerNames = [];
    payload.forEach((chunk) => {
      if (!peerNames.includes(chunk.user2name)) {
        peerNames.push(chunk.user2name);
      }
    });
    this.props.listPeerNames(peerNames);

    const peerData = {};
    payload.forEach((chunk) => {
      const data = { type: chunk.type, data: chunk.data, id: chunk.mcid };
      peerData[chunk.user2name] = (peerData[chunk.user2name] || []).concat(data);
    });
    // Need to create an object out of this data that has a unique key for each username called peername: userName
    // each object looks like { peerName: user2Name, messages: [{}] }
    this.props.addPeerData(peerData);
  }

  separateData(peer) {
    const peerDataArray = this.props.peerData[peer];
    const messages = peerDataArray.filter((data) => {
      if (data.type === 'message') {
        return data;
      }
    }).sort((a, b) => a.id - b.id);
    //dispatch action to capture messages
    this.props.addPeerMessages(messages);

    const code = peerDataArray.filter((data) => {
      if (data.type === 'code') {
        return data;
      }
    })[0].data;
    //dispatch action to capture code
    this.props.addPeerCode(code);

  }

  render() {
    return (
      <div className="col-md-12 container-fluid text-intro left-side">
        <h1 className="text-center">{this.props.userName}'s Profile </h1>
        <div className="col-md-2 ">
          <div className="profile-background">
            <ProfileRoomsList />
          </div>
          <div className="profile-background profile-margin" >
            <ProfilePartnersList />
          </div>
        </div>
        <div className="col-md-offset-1 col-md-4 profile-background">
          <ProfileCodeLog  />
        </div>
        <div className="col-md-offset-1 col-md-4 profile-background">
          <ProfileMessageLog  />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames,
  userName: state.userName
});

const mapDispatchToProps = dispatch => ({
  getPreviousRoomNames: () => dispatch(getPreviousRoomNames()),
  addPeerRoomData: peerData => dispatch(addPeerRoomData(peerData)),
  listPeerNames: names => dispatch(listPeerNames(names)),
  addPeerMessages: msgs => dispatch(addPeerMessages(msgs)),
  addPeerCode: code => dispatch(addPeerCode(code))
});

// export default Profile;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
