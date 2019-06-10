import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      userInfoScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.userInfoScreen}
      </div>
    );
  }
}

export default App;
