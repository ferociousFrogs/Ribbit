import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RoomDropdown from './room/RoomDropdown';

const Navbar = props => (
  <div className="container-fluid">
    <header className="header">
      <div role="navigation" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          
          <div className="navbar-header">
            <div className="navbar-buttons">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <Link to="/" className="navbar-brand scroll-to">
              <img src="../ribbit.png" alt="logo" />
            </Link>
          </div>
            
          <div id="navigation" className="collapse navbar-collapse navbar-right">
            <ul className="nav navbar-nav">
              {props.inRoom ?
                <li><a className="scroll-to">Room: {props.roomName}</a></li> : null
              }
              {props.loggedIn ?
                <li><RoomDropdown /></li> : null
              }
              <li><a href="#features" className="scroll-to">Features</a></li>
              <li><a href="#testimonials" className="scroll-to">Testimonials</a></li>
              <li><a href="#contact" className="scroll-to">Contact</a></li>
            </ul>
            {props.loggedIn ?
              <ul className="nav navbar-nav">
                <Link to="/profile" data-toggle="modal" data-target="#get-started" className="btn navbar-btn btn-ghost">Profile</Link>
                <span className="userName"> Hello, {props.userName.split(' ')[0]}! </span>
              </ul>
              :
              <ul className="nav navbar-nav">
                <Link to="/login" data-toggle="modal" data-target="#get-started" className="btn navbar-btn btn-ghost">Sign Up</Link>
                <Link to="/login" data-toggle="modal" data-target="#get-started" className="btn navbar-btn btn-ghost">Login</Link>
              </ul>
            }
          </div>

        </div>
      </div>
    </header>
  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  inRoom: state.inRoom,
  userName: state.userName,
  roomName: state.roomName
});

export default connect(mapStateToProps)(Navbar);
