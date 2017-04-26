import React from 'react';
import webrtc from 'webrtc-adapter';
import { connect } from 'react-redux';
import socket from '../../clientUtilities/sockets';

let localStream;
let remoteStream;
let pc;

const configuration = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  }]
};

let sdpConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
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
      isStarted: false,
      hasRemote: false,
      value: '',
      copied: false
    };
    this.createRoom = this.createRoom.bind(this);
    this.connectSockets = this.connectSockets.bind(this);
    this.gotStream = this.gotStream.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getUserMedia = this.getUserMedia.bind(this);
    this.start = this.start.bind(this);
    this.doCall = this.doCall.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
    this.handleCreateOfferError = this.handleCreateOfferError.bind(this);
    this.setLocalAndSendMessage = this.setLocalAndSendMessage.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);
    this.handleIceCandidate = this.handleIceCandidate.bind(this);
    this.onSetSessionDescriptionError = this.onSetSessionDescriptionError.bind(this);
    this.handleRemoteStreamAdded = this.handleRemoteStreamAdded.bind(this);
    this.handleRemoteStreamRemoved = this.handleRemoteStreamRemoved.bind(this);
    this.handleRemoteHangup = this.handleRemoteHangup.bind(this);
    this.stop = this.stop.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.sendToMessenger = this.sendToMessenger.bind(this);
  }

  componentDidMount() {
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    this.handleCopy();
    this.getUserMedia();
    this.createRoom();
    this.connectSockets();
  }

  createRoom() {
    const room = this.props.roomName;

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

    socket.on('ipaddr', (ipaddr) => {
      console.log(`Server IP address is ${ipaddr}`);
    });

    socket.on('Join', (room) => {
      console.log(`Another peer made a request to join room ${room}`);
      this.setState({
        isChannelReady: true
      });
    });

    socket.on('Joined', (room) => {
      console.log(`You just joined: ${room}`);
      this.setState({
        isChannelReady: true
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

  getUserMedia() {
    navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.gotStream)
      .catch((error) => {
        alert(`getUserMedia() error: ${error.name}`);
      });
  }

  connectSockets() {
    socket.on('video message', (message) => {
      console.log(`Client received message: ${message}`);
      if (message === 'got user media') {
        this.start();
      } else if (message.type === 'offer') {
        if (!this.state.isInitiator && !this.state.isStarted) {
          this.start();
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

  // Initiates video from the local camera by creating an object blob URL
  gotStream(stream) {
    localVideo.srcObject = stream;
    localStream = stream;
    this.sendMessage('got user media');
    if (this.state.isInitiator) {
      this.start();
    }
  }

  // Initiates a connection based on state of connection and channel
  start() {
    if (!this.state.isStarted && typeof localStream !== 'undefined' && this.state.isChannelReady) {
      console.log('Ready to create peer connection');
      this.createPeerConnection();
      pc.addStream(localStream);
      this.setState({
        isStarted: true
      });
      if (this.state.isInitiator) {
        this.doCall();
      }
    }
  }

  // Create a new peer connection using STUN server as configuration
  createPeerConnection() {
    try {
      pc = new RTCPeerConnection(configuration);
      pc.onicecandidate = this.handleIceCandidate;
      pc.onaddstream = this.handleRemoteStreamAdded;
      pc.onremovestream = this.handleRemoteStreamRemoved;
      console.log('Peer connection established');
    } catch (event) {
      console.log(`Failed to create peer connection, exception: ${event.message}`);
    }
  }

  // Once connection is created, initiate call by sending offer to remote peer
  doCall() {
    console.log('Sending offer to peer');
    pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
  }

  // Remote peer responds with an answer to local peer
  doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      this.setLocalAndSendMessage,
      this.onSetSessionDescriptionError
    );
  }

  // Message sent to remote peer giving a serialised session description for the offer
  setLocalAndSendMessage(sessionDescription) {
    console.log('This is the session description', sessionDescription);
    pc.setLocalDescription(sessionDescription);
    console.log(`setLocalAndSendMessage sending message ${sessionDescription}`);
    this.sendMessage(sessionDescription);
  }

  handleCreateOfferError(event) {
    console.log(`createOffer() error: ${event}`);
  }

  onSetSessionDescriptionError(error) {
   console.log(`Failed to set session description: ${error.toString()}`);
  }


  // Request handlers for RTCPeerConnection events
  handleIceCandidate(event) {
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

  handleRemoteStreamAdded(event) {
    window.remoteStream = remoteVideo.srcObject;
    remoteVideo.srcObject = event.stream;
    this.setState({
      hasRemote: true
    });
    console.log('Remote stream added!');
  }

  handleRemoteStreamRemoved(event) {
    this.setState({
      hasRemote: false
    });
    console.log(remoteStream);
    remoteStream.getVideoTracks()[0].stop();
    console.log(`Remote stream removed! Event: ${event}`);
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
    pc.close();
    pc = null;
  }

  // Toggle video and audio buttons
  toggleVideo() {
    if(localStream.getVideoTracks()[0].enabled) {
      localStream.getVideoTracks()[0].enabled = false;
      document.getElementById('video').src = ('../img/video-off.png');
    } else {
      localStream.getVideoTracks()[0].enabled = true;
      document.getElementById('video').src = ('../img/video-on.png');
    }
  }

  toggleAudio() {
    if(localStream.getAudioTracks()[0].enabled) {
      localStream.getAudioTracks()[0].enabled = false;
      document.getElementById('audio').src = ('../img/audio-off.png');
    } else {
      localStream.getAudioTracks()[0].enabled = true;
      document.getElementById('audio').src = ('../img/audio-on.png');
    }
  }

  // Copy room URL to clipboard
  copyUrl(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log(`Successfully copied text ${msg}`);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  }

  handleCopy() {
    document.querySelector('.js-textareacopybtn').addEventListener('click', () => {
      this.copyUrl(window.location.href);
    });
  }

  // Send room URL via Facebook Messenger
  sendToMessenger() {
    FB.ui({
      method: 'send',
      link: window.location.href
    });
  }

  render() {
    let sharing = null;
    if (!this.state.hasRemote) {
      sharing = <div className="shareLink">
        <div className="center">
          <p><strong>Share the link with a friend <br /> and invite them to chat!</strong></p>
          <button className="js-textareacopybtn btn btn-room">Copy Link</button><br />
          <button className="btn btn-room" onClick={this.sendToMessenger}>Invite via Messenger</button>
        </div>
      </div>;
    }

    return (
      <div className="row right-side">
        <div>
          <input
            id="video"
            className="videoToggle"
            type="image"
            src="../img/video-on.png"
            onClick={this.toggleVideo}
          />
          <input
            id="audio"
            className="audioToggle"
            type="image"
            src="../img/audio-on.png"
            onClick={this.toggleAudio}
          />
        </div>
        {sharing}
        <video id="localVideo" autoPlay muted="muted" />
        <video id="remoteVideo" autoPlay />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomName: state.roomName,
  userName: state.userName
});
export { Video };
export default connect(mapStateToProps)(Video);
