import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserName, addUserEmail } from './../../actions/actionCreators';
import Facebook from './Facebook';

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
            <Link to="/">Sign me up!</Link>
            <Facebook />
          </form>
        </div>
      </div>
    );
};


const mapStateToProps = state => ({
  userName: state.userName,
  email: state.email
});

const mapDispatchToProps = dispatch => ({
  addUserName: name => dispatch(addUserName(name)),
  addUserEmail: email => dispatch(addUserEmail(email))
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
