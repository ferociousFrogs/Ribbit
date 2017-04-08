import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './homepage/Home';
import Room from './room/Room';

const App = () => (
  <Router>
    <div>
      <p>Hello David!</p>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/room" component={Room} />
    </div>
  </Router>
);

export default App;

