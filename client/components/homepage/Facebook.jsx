import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addUserName, loggedIn } from './../../actions/actionCreators';

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

  testAPI(props) {
    console.log('Welcome! Fetching your information...');
    FB.api('/me', (response) => {
      console.log(`Successful login for: ${response.name}`);
      props.addUserName(response.name);
      props.loggedIn(true);
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
      this.testAPI(this.props);
      axios.defaults.headers.common['Authorization'] = response.authResponse.accessToken;
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
      <button className="btn btn-fb" onClick={this.handleClick.bind(this)}>Login via Facebook</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.userName,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  addUserName: name => dispatch(addUserName(name)),
  loggedIn: bool => dispatch(loggedIn(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
