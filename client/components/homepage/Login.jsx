import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addUserName, addUserEmail, loggedIn } from './../../actions/actionCreators';
import Facebook from './Facebook';
import socket from '../../clientUtilities/sockets';

const Login = (props) => {
    const submitUserName = () => {
      // user = {userName, email, fbToken}
      const roomInfo = {
        userName: props.userName,
        email: props.email,
        fbToken: null
      };
      socket.emit('userName submitted', roomInfo);
    }
    return (
      <div>
        <ul id="login">
          <li>
            <div className="row">
              <div className="login-box col-md-4 col-md-offset-4">
                <div className="social-buttons">
                  <Facebook history={props.history} />
                </div>
                <center><p>or</p></center>
                 <form className="form" role="form" action="login" acceptCharset="UTF-8" id="login-nav">
                    <div className="form-group">
                      <label className="sr-only">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => { props.addUserName(e.target.value); }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        onChange={(e) => { props.addUserEmail(e.target.value); }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                      <div className="help-block text-right"><a href="">Forgot your password?</a></div>
                    </div>
                   <div className="form-group">
                      <Link to="/" onClick={(e) => { props.loggedIn(true); }}>
                        <button type="submit" onClick={submitUserName}className="btn btn-primary">Sign in</button>
                      </Link>
                   </div>
                   <div className="checkbox">
                     <label>
                       <input type="checkbox" /> Keep me logged in
                     </label>
                   </div>
                 </form>
                <div className="bottom text-center">
                  New here? <a href="#"><b>Sign up</b></a>
                </div>
              </div>
             </div>
          </li>
        </ul>
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
