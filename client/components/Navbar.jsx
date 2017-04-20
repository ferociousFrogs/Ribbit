import React from 'react';
import { Link } from 'react-router-dom';
import RoomDropdown from './room/RoomDropdown';

const Navbar = () => (
  <div className="container-fluid">
    <header className="header">
      <div role="navigation" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header"><Link to="/" className="navbar-brand scroll-to"><img src="../ribbit.png" alt="logo" className="hidden-xs hidden-sm" /></Link>
            <div className="navbar-buttons">
              <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle navbar-btn">Menu<i className="pe-7s-menu" /></button>
            </div>
          </div>
            
          <div id=
          "navigation" className="collapse navbar-collapse navbar-right">

            <ul className="nav navbar-nav">
              <li><RoomDropdown /></li>
              <li><a href="#features" className="scroll-to">Features</a></li>
              <li><a href="#integrations" className="scroll-to">Integrations</a></li>
              <li><a href="#testimonials" className="scroll-to">Testimonials</a></li>
              <li><a href="#contact" className="scroll-to">Contact</a></li>
            </ul><Link to="/login" data-toggle="modal" data-target="#get-started" className="btn navbar-btn btn-ghost">Sign Up</Link>
            <Link to="/login" data-toggle="modal" data-target="#get-started" className="btn navbar-btn btn-ghost">Login</Link>
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default Navbar;
