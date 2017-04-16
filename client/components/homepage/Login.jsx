import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-8 col-md-offset-2">
          <h1 className="text-center">Sign up!</h1>
          <form className="col-md-12">
            <input
              className="col-md-12"
              type="text"
              placeholder="Enter a username"
            />
            <input
              className="col-md-12"
              type="text"
              placeholder="Enter an e-mail address"
            />
            <input
              className="col-md-12"
              type="text"
              placeholder="Enter a password"
            />
            <button>Sign me up!</button>
          </form>
          <h3 className="text-center">Or...</h3>
          <button>Sign in with google button</button>
          <button>Sign in with facebook button</button>
        </div>
      </div>
    );
  }
}

export default Login;
