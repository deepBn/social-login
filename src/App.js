import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
    this.FB = window.FB;
  }

  componentDidMount() {
    this.FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    }, {scope: 'public_profile,email'});
  }

  handleLogin = () => {
    this.FB.login(response => {
      this.statusChangeCallback(response);
    }, {scope: 'public_profile,email'});
  };

  statusChangeCallback = response => {
    console.log(response);
    const {authResponse} = response;
    if (response.status === 'connected') {
      this.FB.api(
        `/me?fields=id,name,birthday,email,picture.width(800).height(800)&access_token=${authResponse.accessToken}`, userData => {
          const result = {
            ...authResponse,
            user: userData
          };
          this.setState({authUser: result});
        });
    }
  };

  render() {
    const {authUser} = this.state;
    console.log(authUser);
    let buttonText = 'Login with facebook';
    let userImage = '';
    if (authUser) {
      buttonText = `Welcome ${authUser.user.name}`;
      userImage = authUser.user.picture.data.url;
    }

    return (
      <div className="App">
        <p>Hello World</p>
        {
          userImage
            ? <img src={userImage} alt="profile"/>
            : null
        }
        <button onClick={this.handleLogin}>{buttonText}</button>
      </div>
    );
  }
}


export default App;
