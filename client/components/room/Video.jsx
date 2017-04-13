import React from 'react';
import io from 'socket.io-client';
import webrtc from 'webrtc-adapter';

// const port = process.env.PORT || 3000;
const server = location.origin;
// const server2 = 'https://tailbud-pr-17.herokuapp.com/';
const socket = io(server);

let localStream;
let pc1;
let pc2;
let offerOptions = {
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
      pc1: '',
      pc2: ''
    };
    this.gotStream = this.gotStream.bind(this);
    this.start = this.start.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);
    this.handleIceCandidate = this.handleIceCandidate.bind(this);
    this.getName = this.getName.bind(this);
    this.getOtherPc = this.getOtherPc.bind(this);
    this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this);
    this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this);
    this.onSetLocalSuccess = this.onSetLocalSuccess.bind(this);
    this.onSetRemoteSuccess = this.onSetRemoteSuccess.bind(this);
    this.onSetSessionDescriptionError = this.onSetSessionDescriptionError.bind(this);
    this.gotRemoteStream = this.gotRemoteStream.bind(this);
    this.handleVideoScreen = this.handleVideoScreen.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidMount() {
    socket.emit('Hello', 'Hello');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    this.start();
  }

  gotStream(stream) {
    localVideo.srcObject = stream;
    localStream = stream;
  }

  start() {
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

    return navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.gotStream)
      .then(this.createPeerConnection)
      .catch((error) => {
        alert(`getUserMedia() error: ${error.name}`);
      });
  }

  createPeerConnection() {
    // Publicly available Google stun server
    const configuration = {
      'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
      }]
    };
    // Establish a new RTCPeerConnection object using STUN server
    pc1 = new RTCPeerConnection(configuration);
    console.log('Created a P2P connection for PC1!');
    pc1.onicecandidate = (event) => {
      this.handleIceCandidate(pc1, event);
    };
    console.log('Added a local stream to pc1!', localStream);

    pc2 = new RTCPeerConnection(configuration);
    console.log('Created a P2P connection for PC2!');

    pc2.onicecandidate = (event) => {
      this.handleIceCandidate(pc2, event);
    };
    console.log('Added a local stream to pc2!', localStream);

    pc2.onaddstream = this.gotRemoteStream;

    pc1.addStream(localStream);
    console.log('Time to create an offer!');
    pc1.createOffer(
      offerOptions
      // Why can't I put a console log here: console.log('These options', offerOptions)
    ).then(
      this.onCreateOfferSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onCreateOfferSuccess(desc) {
    console.log(`Offer from pc1\n ${desc.sdp}`);
    console.log('Start pc1 setLocalDescription');
    pc1.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(pc1);
      },
        this.onSetSessionDescriptionError
    );
    console.log('pc2 setRemoteDescription start');
    pc2.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(pc2);
      },
      this.onSetSessionDescriptionError
    );
    console.log('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    pc2.createAnswer().then(
      this.onCreateAnswerSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onCreateAnswerSuccess(desc) {
    console.log(`Answer from pc2:\n ${desc.sdp}`);
    console.log('pc2 setLocalDescription start');
    pc2.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(pc2);
      },
      this.onSetSessionDescriptionError
    );
    console.log('pc1 setRemoteDescription start');
    pc1.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(pc1);
      },
      this.onSetSessionDescriptionError
    );
  }

  onSetLocalSuccess(pc) {
    console.log(`${this.getName(pc)} setLocalDescription complete`);
  }

  onSetRemoteSuccess(pc) {
    console.log(`${this.getName(pc)} setRemoteDescription complete`);
  }

  onSetSessionDescriptionError(error) {
   console.log(`Failed to set session description: ${error.toString()}`);
  }


  handleIceCandidate(pc, event) {
    if (event.candidate) {
      this.getOtherPc(pc).addIceCandidate(
        new RTCIceCandidate(event.candidate)
      ).then(
        () => {
          console.log(`${this.getName(pc)} addIceCandidate success!`);
        },
        (error) => {
          console.error(`${this.getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
        }
      );
      console.log(`${this.getName(pc)} ICE candidate: ${event.candidate.candidate}`);
    }
  }

  gotRemoteStream(event) {
    window.remoteStream = remoteVideo.srcObject;
    remoteVideo.srcObject = event.stream;
    console.log('The pc2 received remote stream');
  }

  getName(pc) {
    return (pc === pc1) ? pc1 : pc2;
  }

  getOtherPc(pc) {
    return (pc === pc1) ? pc2 : pc1;
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
        <video id="localVideo" controls autoPlay />
        <video id="remoteVideo" controls autoPlay />
        <div>
          <button className="videoOff" onClick={this.handleVideoScreen}>{this.state.video}</button>
          <button className="mute" onClick={this.handleAudio}>{this.state.mute}</button>
        </div>
      </div>
    );
  }
}

export default Video;
