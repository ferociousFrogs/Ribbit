import React from 'react';
import Video from './Video';
import Workspace from './Workspace';
import Chat from './Chat';

const Room = () => (
  <div className="container-fluid">
    <div className="col-md-8">
      <Workspace />
    </div>
    {['left', 'right'].map(side => (
      <div className="col-md-2">
        <Video key={side} side={side} />
      </div>
      ))}
    <div className="col-md-4">
      <Chat />
    </div>
  </div>
);

      // <Chat />
export default Room;
