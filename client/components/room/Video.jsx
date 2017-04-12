import React from 'react';
import webrtc from 'webrtc-adapter';

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
      startButton: false
    };
    this.gotStream = this.gotStream.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.triggerGetUserMedia = this.triggerGetUserMedia.bind(this);
    this.handleVideoScreen = this.handleVideoScreen.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidMount() {
    this.triggerGetUserMedia();
  }

  // componentDidUpdate() {
  //   this.triggerGetUserMedia();
  // }

  gotStream(stream) {
    window.localStream = localStream = stream;
    if (window.URL) {
      this.setState({
        localVideoSrc: window.URL.createObjectURL(stream)
      });
    } else {
      this.setState({
        localVideoSrc: stream
      });
    }
  }

  errorCallback(error) {
    console.log('navigator.mediaDevices.getUserMedia error: ', error);
  }

  triggerGetUserMedia() {
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

    return navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.gotStream)
      .catch(this.errorCallback);
  }

  handleVideoScreen() {
    this.setState({
      constraints: {
        video: !this.state.constraints.video,
        audio: this.state.constraints.audio
      },
      video: !this.state.constraints.video ? 'Video Off' : 'Video On'
    }, () => (this.triggerGetUserMedia()));
  }

  handleAudio() {
    this.setState({
      constraints: {
        video: this.state.constraints.video,
        audio: !this.state.constraints.audio
      },
      mute: !this.state.constraints.audio ? 'Mute' : 'Unmute'
    }, () => (this.triggerGetUserMedia()));
  }

  render() {
    return (
      <div className="row border right-side">
        <video className="video" src={this.state.localVideoSrc} autoPlay />
        <div>
          <button id="videoOff" onClick={this.handleVideoScreen}>{this.state.video}</button>
          <button id="mute" onClick={this.handleAudio}>{this.state.mute}</button>
        </div>
      </div>
    );
  }
}

export default Video;
