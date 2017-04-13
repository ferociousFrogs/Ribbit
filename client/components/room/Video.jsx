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
      localVideoSrc: '',
      videoScreen: true,
      startButton: false,
      pc1: '',
      pc2: ''
    };
    this.gotStream = this.gotStream.bind(this);
    this.start = this.start.bind(this);
    this.handleVideoScreen = this.handleVideoScreen.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidMount() {
    socket.emit('Hello', 'Hello');
    this.start();
  }

  gotStream(stream) {
    console.log('What is this stream?', stream);
    window.localStream = localStream = stream;
    if (window.URL) {
      this.setState({
        localVideoSrc: window.URL.createObjectURL(stream)
      });
    } else {
      this.setState({
        localVideoSrc: window.localStream
      });
    }
  }

  start() {
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

    return navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.gotStream)
      .catch((error) => {
        alert(`getUserMedia() error: ${error.name}`);
      });
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
        <video className="video" src={this.state.localVideoSrc} controls autoPlay />
        <video className="video" src={this.state.remoteVideoSrc} controls autoPlay />
        <div>
          <button className="videoOff" onClick={this.handleVideoScreen}>{this.state.video}</button>
          <button className="mute" onClick={this.handleAudio}>{this.state.mute}</button>
        </div>
      </div>
    );
  }
}

export default Video;
