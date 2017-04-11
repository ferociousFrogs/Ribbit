import React from 'react';
import webrtc from 'webrtc-adapter';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: ''
    };
    this.successCallback = this.successCallback.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.triggerGetUserMedia = this.triggerGetUserMedia.bind(this);
  }

  componentDidMount() {
    this.triggerGetUserMedia();
  }

  successCallback(stream) {
    window.stream = stream;
    if (window.URL) {
      this.setState({
        videoSrc: window.URL.createObjectURL(stream)
      });
    } else {
      this.setState({
        videoSrc: stream
      });
    }
  }

  errorCallback(error) {
    console.log('navigator.mediaDevices.getUserMedia error: ', error);
  }

  triggerGetUserMedia() {
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

    const constraints = {
      audio: true,
      video: true
    };
    return navigator.mediaDevices.getUserMedia(constraints)
      .then(this.successCallback)
      .catch(this.errorCallback);
  }

  render() {
    return (
      <div className="row border right-side">
        <video className="video" src={this.state.videoSrc} autoPlay />
        <div>
          <button id="startButton">Start</button>
          <button id="callButton">Call</button>
          <button id="videoOff">Video Off</button>
          <button id="mute">Mute</button>
        </div>
      </div>
    );
  }
}

export default Video;
