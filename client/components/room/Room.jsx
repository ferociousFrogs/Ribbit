import io from 'socket.io-client';
import { connect } from 'react-redux';
import React from 'react';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';

const Room = (props) => {
  const server = location.origin;
  const socket = io(server);
  console.log('props in room', props);
  socket.emit('join room', location.pathname.slice(2));

  return (
    <div className="container-fluid">
      <h2>{location.pathname.slice(2)}</h2>
      <div className="col-md-8">
        <Workspace socket={socket} />
      </div>
      <div className="col-md-4">
        <Video socket={socket} />
      </div>
      <div className="col-md-4">
        <Chat socket={socket} />
      </div>
    </div>
  );
};

export default connect()(Room);
