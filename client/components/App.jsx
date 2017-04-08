import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';

const App = () => (
  <div>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route path="/room" component={Room} />
  </div>
);

export default App;

