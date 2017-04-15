import React from 'react';
import io from 'socket.io-client';
import webrtc from 'webrtc-adapter';

const server = location.origin;
const socket = io(server);

let localStream;
let remoteStream;
let turnReady;
let pc;

// Publicly available Google stun server
const configuration = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  }]
};

const sdpConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      constraints: {
        video: true,
        audio: true
      },
      video: 'Video Off',
      mute: 'Mute',
      videoScreen: true,
      startButton: false,
      isChannelReady: false,
      isInitiator: false,
      isStarted: false
    };
    this.createRoom = this.createRoom.bind(this);
    this.connectSockets = this.connectSockets.bind(this);
    this.gotStream = this.gotStream.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.maybeStart = this.maybeStart.bind(this);
    this.start = this.start.bind(this);
    this.doCall = this.doCall.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
    this.handleCreateOfferError = this.handleCreateOfferError.bind(this);
    this.setLocalAndSendMessage = this.setLocalAndSendMessage.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);
    this.handleIceCandidate = this.handleIceCandidate.bind(this);
    // this.getName = this.getName.bind(this);
    // this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this);
    // this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this);
    // this.onSetLocalSuccess = this.onSetLocalSuccess.bind(this);
    // this.onSetRemoteSuccess = this.onSetRemoteSuccess.bind(this);
    this.onSetSessionDescriptionError = this.onSetSessionDescriptionError.bind(this);
    // this.requestTurn = this.requestTurn.bind(this);
    this.handleRemoteStreamAdded = this.handleRemoteStreamAdded.bind(this);
    this.handleRemoteStreamRemoved = this.handleRemoteStreamRemoved.bind(this);
    this.hangup = this.hangup.bind(this);
    this.handleRemoteHangup = this.handleRemoteHangup.bind(this);
    this.stop = this.stop.bind(this);
    this.handleVideoScreen = this.handleVideoScreen.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidMount() {
    let localVideo = document.getElementById('localVideo');
    let remoteVideo = document.getElementById('remoteVideo');
    this.start();
    this.connectSockets();
    this.createRoom();
  }

  connectSockets() {
    socket.on('video message', (message) => {
      console.log(`Client received message: ${message}`);
      if (message === 'got user media') {
        this.maybeStart();
      } else if (message.type === 'offer') {
        if (!this.state.isInitiator && !this.state.isStarted) {
          this.maybeStart();
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        this.doAnswer();
      } else if (message.type === 'answer' && this.state.isStarted) {
        pc.setRemoteDescription(new RTCSessionDescription(message));
      } else if (message.type === 'candidate' && this.state.isStarted) {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      } else if (message === 'bye' && this.state.isStarted) {
        this.handleRemoteHangup();
      }
    });
  }

  // CreateRoom method if required later
  createRoom() {
    let room = 'foo';
    // window.room = prompt('Enter room name:');

    let socket = io.connect();

    if (room !== '') {
      socket.emit('create or join', room);
      console.log(`Creating or joining room ${room}`);
    }

    socket.on('Created', (room) => {
      console.log(`Created room ${room}`);
      this.setState({
        isInitiator: true
      });
    });

    socket.on('Full', (room) => {
      console.log(`Room ${room} is full :^(')`);
    });

    socket.on('Ipaddr', (ipaddr) => {
      console.log(`Server IP address is ${ipaddr}`);
    });

    socket.on('Join', (room) => {
      console.log(`Another peer made a request to join room ${room}`);
      console.log(`This peer is the initiator of room ${room}!`);
      this.setState({
        isChannelReady: true
      });
    });

    socket.on('Joined', (room) => {
      console.log(`You just joined: ${room}`);
      this.setState({
        isChannelReady: false
      });
    });

    socket.on('Log', (array) => {
      console.log.apply(console, array);
    });
  }

  sendMessage(message) {
    console.log(`Client sending message: ${message}`);
    socket.emit('video message', message);
  }

  gotStream(stream) {
    console.log('This adds a local stream');
    localVideo.srcObject = stream;
    localStream = stream;
    this.sendMessage('We got the user media YAAAS');
    if (this.state.isInitiator) {
      this.maybeStart();
    }
  }

  maybeStart() {
    console.log('>>>>>>> maybeStart() ', this.state.isStarted, localStream, this.state.isChannelReady);
    if (!this.state.isStarted && typeof localStream !== 'undefined' && this.state.isChannelReady) {
      console.log('>>>>>> creating peer connection');
      this.createPeerConnection();
      pc.addStream(localStream);
      this.setState({
        isStarted: true
      });
      console.log('isInitiator', this.state.isInitiator);
      if (this.state.isInitiator) {
        this.doCall();
      }
    }
  }

  start() {
    navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.gotStream)
      .then(this.createPeerConnection)
      .catch((error) => {
        alert(`getUserMedia() error: ${error.name}`);
      });
  }

  doCall() {
    console.log('Sending offer to peer');
    pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
  }

  doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      this.setLocalAndSendMessage,
      this.onSetSessionDescriptionError
    );
  }

  setLocalAndSendMessage(sessionDescription) {
    // Set Opus as the preferred codec in SDP if Opus is present.
    // sessionDescription.sdp = this.preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(sessionDescription);
    console.log(`setLocalAndSendMessage sending message ${sessionDescription}`);
    this.sendMessage(sessionDescription);
  }

  handleCreateOfferError(event) {
    console.log(`createOffer() error: ${event}`);
  }

  createPeerConnection() {
    try {
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = this.handleIceCandidate;
      pc.onaddstream = this.handleRemoteStreamAdded;
      pc.onremovestream = this.handleRemoteStreamRemoved;
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      console.log(`Failed to create PeerConnection, exception: ${e.message}`);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  // onCreateOfferSuccess(desc) {
  //   console.log('Check this out', desc)
  //   console.log(`Offer from pc1\n ${desc.sdp}`);
  //   console.log('Start pc1 setLocalDescription');
  //   pc1.setLocalDescription(desc).then(
  //     () => {
  //       this.onSetLocalSuccess(pc1);
  //     },
  //       this.onSetSessionDescriptionError
  //   );
  //   console.log('pc2 setRemoteDescription start');
  //   pc2.setRemoteDescription(desc).then(
  //     () => {
  //       this.onSetRemoteSuccess(pc2);
  //     },
  //     this.onSetSessionDescriptionError
  //   );
  //   console.log('pc2 createAnswer start');
  //   pc2.createAnswer().then(
  //     this.onCreateAnswerSuccess,
  //     this.onSetSessionDescriptionError
  //   );
  // }

  // onCreateAnswerSuccess(desc) {
  //   console.log(`Answer from pc2:\n ${desc.sdp}`);
  //   console.log('pc2 setLocalDescription start');
  //   pc2.setLocalDescription(desc).then(
  //     () => {
  //       this.onSetLocalSuccess(pc2);
  //     },
  //     this.onSetSessionDescriptionError
  //   );

  //   console.log('pc1 setRemoteDescription start');
  //   pc1.setRemoteDescription(desc).then(
  //     () => {
  //       this.onSetRemoteSuccess(pc1);
  //     },
  //     this.onSetSessionDescriptionError
  //   );
  // }

  // onSetLocalSuccess(pc) {
  //   console.log(`${this.getName(pc)} setLocalDescription complete`);
  // }

  // onSetRemoteSuccess(pc) {
  //   console.log(`${this.getName(pc)} setRemoteDescription complete`);
  // }

  onSetSessionDescriptionError(error) {
   console.log(`Failed to set session description: ${error.toString()}`);
  }


  handleIceCandidate(pc, event) {
    console.log(`ICEcandidate event: ${event}`);
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  }

  // requestTurn(turnURL) {
  //   let turnExists = false;
  //   for (const i in configuration.iceServers) {
  //     if (configuration.iceServers[i].url.substr(0, 5) === 'turn:') {
  //       turnExists = true;
  //       turnReady = true;
  //       break;
  //     }
  //   }
  //   if (!turnExists) {
  //     console.log(`Getting TURN server from ${turnURL}`);
  //     // No TURN server. Get one from computeengineondemand.appspot.com:
  //     const xhr = new XMLHttpRequest();
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         const turnServer = JSON.parse(xhr.responseText);
  //         console.log('Got TURN server: ', turnServer);
  //         configuration.iceServers.push({
  //           'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
  //           'credential': turnServer.password
  //         });
  //         turnReady = true;
  //       }
  //     };
  //     xhr.open('GET', turnURL, true);
  //     xhr.send();
  //   }
  // }

  handleRemoteStreamAdded(event) {
    window.remoteStream = remoteVideo.srcObject;
    remoteVideo.srcObject = event.stream;
    console.log('Remote stream added');
  }

  handleRemoteStreamRemoved(event) {
    console.log(`Remote stream removed. Event: ${event}`);
  }

  hangup() {
    console.log('Hanging up.');
    this.stop();
    sendMessage('bye');
  }

  handleRemoteHangup() {
    console.log('Session terminated.');
    this.stop();
    this.setState({
      isInitiator: false
    });
  }

  stop() {
    this.setState({
      isStarted: false
    });
    // isAudioMuted = false;
    // isVideoMuted = false;
    pc.close();
    pc = null;
  }

  handleVideoScreen() {
    this.setState({
      constraints: {
        video: !this.state.constraints.video,
        audio: this.state.constraints.audio
      },
      video: !this.state.constraints.video ? 'Video Off' : 'Video On'
    }, () => (this.start()));
  }

  handleAudio() {
    this.setState({
      constraints: {
        video: this.state.constraints.video,
        audio: !this.state.constraints.audio
      },
      mute: !this.state.constraints.audio ? 'Mute' : 'Unmute'
    }, () => (this.start()));
    navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.successCallback)
      .catch(this.errorCallback);
  }

  render() {
    return (
      <div className="row border right-side">
        <video id="localVideo" autoPlay />
        <video id="remoteVideo" autoPlay />
        <div>
          <button className="videoOff" onClick={this.handleVideoScreen}>{this.state.video}</button>
          <button className="mute" onClick={this.handleAudio}>{this.state.mute}</button>
        </div>
      </div>
    );
  }
}

export default Video;
