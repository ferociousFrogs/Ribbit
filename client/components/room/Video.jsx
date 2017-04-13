import React from 'react';
import io from 'socket.io-client';
import webrtc from 'webrtc-adapter';

// const port = process.env.PORT || 3000;
const server = location.origin;
// const server2 = 'https://tailbud-pr-17.herokuapp.com/';
const socket = io(server);

var localStream;
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
    console.log('Created a P2P connection!');
    pc1.onicecandidate = (event) => {
      console.log('It is not reaching here', event);
      this.handleIceCandidate(pc1, event);
    };
    console.log('Added a local stream to pc1!', localStream);
    pc1.addStream(localStream);
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
