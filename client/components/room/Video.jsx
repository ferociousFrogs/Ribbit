import React from 'react';
import webrtc from 'webrtc-adapter';


console.log('hello', webrtc);

const constraints = {
  audio: true,
  video: true
};

// const navigator.getUserMedia = navigator.getUserMedia ||
//       navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

class Video extends React.Component {
  constructor(props) {
    super(props);
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
      this.refs.video.src = window.URL.createObjectURL(stream);
    } else {
      this.refs.video.src = stream;
    }
  }

  errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  // Consider this for refactor: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // Due to deprecation: https://webrtc.org/web-apis/interop/
  triggerGetUserMedia() {
    navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
  }

  render() {
    return (
      <div className="row border right-side">2
        <video ref="video" autoPlay />
        <div>
          <button id="startButton">Start</button>
          <button id="callButton">Call</button>
          <button id="hangupButton">Hang Up</button>
          <button id="nute">Mute</button>
        </div>
      </div>
    );
  }
}

export default Video;
