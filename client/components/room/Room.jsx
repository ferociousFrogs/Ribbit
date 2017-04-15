import io from 'socket.io-client';
import { connect } from 'react-redux';
import React from 'react';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';

const Room = (props) => {
  const server = location.origin;
  const socket = io(server);
  socket.emit('join room', location.pathname);

  return (
    <div className="container-fluid">
      <h2>{location.pathname}</h2>
      <div className="col-md-8">
        <Workspace />
      </div>
      <div className="col-md-4">
        <Video />
      </div>
      <div className="col-md-4">
        <Chat socket={socket} />
      </div>
    </div>
  );
};

export default connect()(Room);
