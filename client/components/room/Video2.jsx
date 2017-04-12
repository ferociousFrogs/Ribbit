import React from 'react';
import webrtc from 'webrtc-adapter';

// navigator.getUserMedia = navigator.getUserMedia ||
//   navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callButton: true,
      hangupButton: true,
      startButton: '',
      startTime: '',
      localVideoSrc: '',
      remoteVideoSrc: '',
      localStream: '',
      pc1: '',
      pc2: '',
      offerOptions: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      },
      constraints: {
        audio: true,
        video: true
      }
    };
    this.onCreateSessionDescriptionError = this.onCreateSessionDescriptionError.bind(this);
    this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this);
    this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this);
    this.onIceCandidate = this.onIceCandidate.bind(this);
    this.onAddIceCandidateSuccess = this.onAddIceCandidateSuccess.bind(this);
    this.onAddIceCandidateError = this.onAddIceCandidateError.bind(this);
    this.onAddIceCandidateError = this.onAddIceCandidateError.bind(this);
    this.onSetLocalSuccess = this.onSetLocalSuccess.bind(this);
    this.onIceStateChange = this.onIceStateChange.bind(this);
    this.hangup = this.hangup.bind(this);
    this.onSetRemoteSuccess = this.onSetRemoteSuccess.bind(this);
    this.onSetSessionDescriptionError = this.onSetSessionDescriptionError.bind(this);
    this.getName = this.getName.bind(this);
    this.getOtherPc = this.getOtherPc.bind(this);
    this.gotRemoteStream = this.gotRemoteStream.bind(this);
    this.triggerGetUserMedia = this.triggerGetUserMedia.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.gotStream = this.gotStream.bind(this);
    this.start = this.start.bind(this);
    this.call = this.call.bind(this);
    this.trace = this.trace.bind(this);
  }

  componentDidMount() {
    this.triggerGetUserMedia();
  }

  onCreateSessionDescriptionError(error) {
    this.trace(`Failed to create session description: ${error.toString()}`);
  }

  onCreateOfferSuccess(desc) {
    this.trace(`Offer from pc1\n ${desc.sdp}`);
    this.trace('pc1 setLocalDescription start');
    window.pc1.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(window.pc1);
      },
      this.onSetSessionDescriptionError
    );
    this.trace('pc2 setRemoteDescription start');
    window.pc2.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(window.pc2);
      },
      this.onSetSessionDescriptionError
    );
    this.trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    window.pc2.createAnswer().then(
      this.onCreateAnswerSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onCreateAnswerSuccess(desc) {
    this.trace(`Answer from pc2:\n ${desc.sdp}`);
    this.trace('pc2 setLocalDescription start');
    window.pc2.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(window.pc2);
      },
      this.onSetSessionDescriptionError
    );
    this.trace('pc1 setRemoteDescription start');
    window.pc1.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(window.pc1);
      },
      this.onSetSessionDescriptionError
    );
  }

  onIceCandidate(pc, event) {
    if (event.candidate) {
      this.getOtherPc(pc).addIceCandidate(
        new RTCIceCandidate(event.candidate)
      ).then(
        () => {
          this.onAddIceCandidateSuccess(pc);
        },
        (err) => {
          this.onAddIceCandidateError(pc, err);
        }
      );
      this.trace(`${this.getName(pc)} ICE candidate: \n ${event.candidate.candidate}`);
    }
  }

  onAddIceCandidateSuccess(pc) {
    this.trace(`${this.getName(pc)} addIceCandidate success`);
  }

  onAddIceCandidateError(pc, error) {
    this.trace(`${this.getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }

  onSetLocalSuccess(pc) {
    this.trace(`${this.getName(pc)} setLocalDescription complete`);
  }

  onIceStateChange(pc, event) {
    if (pc) {
      this.trace(`${this.getName(pc)} ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
  }

  onSetRemoteSuccess(pc) {
    this.trace(`${this.getName(pc)} setRemoteDescription complete`);
  }

  onSetSessionDescriptionError(error) {
    this.trace(`Failed to set session description: ${error.toString()}`);
  }

  getName(pc) {
    return (pc === this.pc1) ? 'pc1' : 'pc2';
  }

  getOtherPc(pc) {
    return (pc === this.pc1) ? 'pc2' : 'pc1';
  }

  hangup() {
    this.trace('Ending call');
    window.pc1.close();
    window.pc2.close();
    window.pc1 = null;
    window.pc2 = null;
    this.setState({
      hangupButton: true,
      callButton: false
    });
  }

  gotRemoteStream(e) {
    // Add remoteStream to global scope so it's accessible from the browser console
    this.setState({
      remoteVideoSrc: window.URL.createObjectURL(e.stream)
    });
    window.remoteStream = this.state.remoteVideoSrc;
    this.trace('pc2 received remote stream');
  }

  // Consider this for refactor: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // Due to deprecation: https://webrtc.org/web-apis/interop/
  triggerGetUserMedia() {
    navigator.mediaDevices.getUserMedia(this.state.constraints)
            .then(this.successCallback)
            .catch(this.errorCallback);
  }


  errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }


  gotStream(stream) {
    window.localStream = stream; // stream available to console
    if (window.URL) {
      this.setState({
        localVideoSrc: window.URL.createObjectURL(stream),
        callButton: false,
        localStream: window.localStream
      });
    }
  }


  start() {
    this.trace('Requesting local stream');
    // startButton.disabled = true;
    navigator.mediaDevices.getUserMedia(this.state.constraints)
    .then(this.gotStream)
    .catch((e) => {
      alert(`getUserMedia() error: ${e.name}`);
    });
  }

  call() {
    this.setState(() => {
      this.state.callButton = true;
      this.state.hangupButton = false;
      this.state.startTime = window.performance.now();
    });
    this.trace('Starting call');
    let videoTracks = this.state.localStream.getVideoTracks();
    let audioTracks = this.state.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      this.trace(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      this.trace(`Using audio device: ${audioTracks[0].label}`);
    }
    let servers = null;
    // Add pc1 to global scope so it's accessible from the browser console
    this.setState({
      pc1: new RTCPeerConnection(servers),
      pc2: new RTCPeerConnection(servers)
    });
    window.pc1 = this.state.pc1;
    window.pc2 = this.state.pc2;
    this.trace('Created local peer connection object pc1');
    window.pc1.onicecandidate = (e) => {
      this.onIceCandidate(window.pc1, e);
    };
    // Add pc2 to global scope so it's accessible from the browser console
    this.trace('Created remote peer connection object pc2');
    window.pc2.onicecandidate = (e) => {
      this.onIceCandidate(window.pc2, e);
    };
    window.pc1.oniceconnectionstatechange = (e) => {
      this.onIceStateChange(window.pc1, e);
    };
    window.pc2.oniceconnectionstatechange = (e) => {
      this.onIceStateChange(window.pc2, e);
    };
    window.pc2.onaddstream = this.gotRemoteStream;

    window.pc1.addStream(this.state.localStream);
    this.trace('Added local stream to pc1');

    this.trace('pc1 createOffer start');
    window.pc1.createOffer(
      this.state.offerOptions
    ).then(
      this.onCreateOfferSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  trace(text) {
    if (text[text.length - 1] === '\n') {
      text = text.substring(0, text.length - 1);
    }
    if (window.performance) {
      let now = (window.performance.now() / 1000).toFixed(3);
      console.log(now + ': ' + text);
    } else {
      console.log(text);
    }
  }


  render() {
    return (
      <div className="row border right-side">
        <video className="remoteVideo" src={this.state.remoteVideoSrc} autoPlay />
        <video className="localVideo" src={this.state.localVideoSrc} autoPlay />
        <div>
          <button
            id="startButton"
            disabled={this.state.startButton}
            onClick={this.start}
          >Start
          </button>
          <button
            id="callButton"
            disabled={this.state.callButton}
            onClick={this.call}
          >Call
          </button>
          <button
            id="hangupButton"
            disabled={this.state.hangupButton}
          >Hang Up
          </button>
          <button id="mute">Mute</button>
        </div>
      </div>
    );
  }
}

export default Video;
