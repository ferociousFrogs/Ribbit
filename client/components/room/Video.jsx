import React from 'react';
import webrtc from 'webrtc-adapter';

const constraints = {
  audio: true,
  video: true
};



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
    window.stream = stream; // stream available to console
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
    console.log('navigator.getUserMedia error: ', error);
  }

  // Consider this for refactor: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // Due to deprecation: https://webrtc.org/web-apis/interop/
  triggerGetUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
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
