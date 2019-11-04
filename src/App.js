import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.FB = window.FB;
  }
  componentDidMount() {
    this.FB.getLoginStatus(function(response) {
      console.log(response);
      //statusChangeCallback(response);
    });
  }

  render() {
    return (
      <div className="App">
        <p>Hello World</p>
        <button>Test</button>
      </div>
    );
  }
}


export default App;
