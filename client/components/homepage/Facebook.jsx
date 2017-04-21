import React from 'react';
import axios from 'axios';

class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : process.env.APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });
      this.checkLoginState;
    };
  }


  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  testAPI() {
    console.log('Welcome! Fetching your information...');
    FB.api('/me', (response) => {
      console.log(`Successful login for: ${response.name}`);
      document.getElementById('status').innerHTML =
        `Thanks for logging in, ${response.name} !`;
      this.props.history.push('/profile');
    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      console.log('this is the token', response.authResponse.accessToken);
      this.testAPI();
      axios.defaults.headers.common['Authorization'] = response.authResponse.accessToken;
      this.props.setToken(response.authResponse.accessToken);
      this.props.history.push('/profile');
    } else if (response.status === 'not_authorized') {
      this.props.history.push('/login');
      document.getElementById('status').innerHTML = 'Please log ' +
  'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please try again';
      this.props.history.push('/login');
    }
  }

  handleClick(e) {
    e.preventDefault();
    FB.login(this.statusChangeCallback.bind(this), { scope: 'public_profile, email' });
  }


  render() {
    return (
      <div>
      <div id="status"></div>
      <button onClick={this.handleClick.bind(this)}>Login with Facebook</button>
      </div>
    );
  }
}

export default Facebook;
