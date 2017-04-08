import React from 'react';
import { render } from 'react-dom';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';

const App = () => (
  <div>
    <p> Hello David!</p>
    <Navbar />
    <Home />
    <Room />
  </div>
);

render(<App />, document.getElementById('app'));
