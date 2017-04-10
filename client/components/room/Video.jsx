import React from 'react';

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

  triggerGetUserMedia() {
    navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
  }

  render() {
    return (
      <div className="row border right-side">
        <video ref="video" autoPlay />

      </div>
    );
  }
}

export default Video;
