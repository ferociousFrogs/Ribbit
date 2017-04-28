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
    // send names from the messages to store
    console.log(payload);
    // const loggedInName = this.props.userName;
    const peerNames = {};
    // peerNames[loggedInName] = true;
    payload.forEach((chunk) => {
      const keyName = chunk.user1name === this.props.userName ? chunk.user2name : chunk.user1name;
      if (!peerNames[keyName]) {
        peerNames[keyName] = true;
      }
    });

    const arrayOfPeerNames = Object.keys(peerNames);
    this.props.listPeerNames(arrayOfPeerNames);
    // create object out of data blob from server
    const peerData = {};
    payload.forEach((chunk) => {
      const data = { type: chunk.type, data: chunk.data, id: chunk.mcid, user1name: chunk.user1name, user2name: chunk.user2name };
      const keyName = chunk.user1name === this.props.userName ? chunk.user2name : chunk.user1name;
      peerData[keyName] = (peerData[keyName] || []).concat(data);
    });
    this.props.addPeerRoomData(peerData);
  }

  separateData(peer) {
    // get the code/messages for just one peer
    console.log('peer in profile,', peer);
    const peerDataArray = this.props.peerData[peer];
    console.log('peerDataArray in profile,', peerDataArray);
    let codeFlag = false;
    // separate messages from code
    const messages = peerDataArray.filter((data) => {
      if (data.type === 'code') {
        codeFlag = true;
      }
      if (data.type === 'message') {
        return data;
      }
    }).sort((a, b) => a.id - b.id);
    this.props.addPeerMessages(messages);

    // separate code from messages
    if (codeFlag) {
      const code = peerDataArray.filter((data) => {
        console.log('data in separateData', data);
        if (data.type === 'code') {
          return data;
        }
      })[0].data;
      this.props.addPeerCode(code);
    }
  }

  render() {
    return (
      <div className="col-md-12 container-fluid profile-background left-side">
        <h1 className="text-center profile-text">{this.props.userName}'s Profile </h1>
        <div className="col-md-2 ">
          <h4 className="text-center profile-list-text">Rooms</h4>
          <div className="profile-list">
            <ProfileRoomsList requestRoomData={this.requestRoomData} />
          </div>
          <h4 className="text-center profile-list-text">Partners</h4>
          <div className="profile-list" >
            <ProfilePartnersList separateData={this.separateData} />
          </div>
        </div>
        <div className="col-md-offset-1 col-md-4">
          <ProfileCodeLog code={this.props.peerCode} />
        </div>
        <div className="col-md-offset-1 col-md-4">
          <ProfileMessageLog messages={this.props.peerMessages} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames,
  userName: state.userName,
  peerNames: state.peerNames,
  peerMessages: state.peerMessages,
  peerCode: state.peerCode,
  peerData: state.peerData
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
