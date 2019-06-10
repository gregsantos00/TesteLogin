import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import UserInfoScreen from './UserInfoScreen';
import LoginScreen from './Loginscreen';
import axios from 'axios';
var apiBaseUrl = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: [] };
  }
  componentDidMount() {
    this.onLoadUserInfo(this);
  }

  onLoadUserInfo(ctx) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.props.token
      }
    };
    axios.post(apiBaseUrl + 'connect/userinfo', null, config)
      .then(function (response) {
        if (response.status == 200) {
          var currentScreen = [];
          currentScreen.push(<UserInfoScreen appContext={ctx.props.appContext} model={response.data} />);
          ctx.setState({ currentScreen })
        }
      })

  }

  handleMenuClick(event, page) {
    switch (page) {
      case "logout":
        var loginPage = [];
        loginPage.push(<LoginScreen appContext={this.props.appContext} />);
        this.props.appContext.setState({ loginPage: loginPage, userInfoScreen: [] })
        break;
    }
    this.setState({ })
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="User info"
            />
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

export default App;
