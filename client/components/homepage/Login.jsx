import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addUserName, addUserEmail, loggedIn } from './../../actions/actionCreators';
import Facebook from './Facebook';
import socket from '../../clientUtilities/sockets';

const Login = (props) => {
    return (
      <div className="container-fluid">
        <div className="col-md-8 col-md-offset-2">
          <h1 className="text-center">Sign up!</h1>
          <form className="col-md-12">
            <input
              className="col-md-12"
              type="text"
              placeholder="Enter a username"
              onChange={(e) => { props.addUserName(e.target.value); }}
            />
            <input
              className="col-md-12"
              type="text"
              placeholder="Enter an e-mail address"
              onChange={(e) => { props.addUserEmail(e.target.value); }}
            />
            <button
              onClick={() => {
                socket.emit('userName submitted', {
                  userName:props.userName,
                  email: props.email,
                  fbToken: null
                });
              }}
            >
              <Link to="/" onClick={(e) => { props.loggedIn(true); }}>Sign me up!</Link>
            </button>
            <Facebook history={props.history} />
          </form>
        </div>
      </div>
  );
};


const mapStateToProps = state => ({
  userName: state.userName,
  email: state.email,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  addUserName: name => dispatch(addUserName(name)),
  addUserEmail: email => dispatch(addUserEmail(email)),
  loggedIn: bool => dispatch(loggedIn(bool))
});

export { Login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);

            // <input
            //   className="col-md-12"
            //   type="text"
            //   placeholder="Enter a password"
            // />
          // <h3 className="text-center">Or...</h3>
          // <button>Sign in with google button</button>
          // <button>Sign in with facebook button</button>
