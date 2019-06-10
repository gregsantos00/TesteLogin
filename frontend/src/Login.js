import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var apiBaseUrl = "http://localhost:5000/";
import axios from 'axios';
import UserInfoPage from './UserInfoPage';
import qs from 'qs';


class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter your user name"
           floatingLabelText="User name"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username : '',
      password : '',
      loginComponent:localloginComponent,
    }
  }
  handleClick(event){
    var self = this;
    var payload={
      "grant_type" : 'password',
      "client_id" : "ro.client",
      "client_secret" : "secret",
      "scope" : "openid profile api1",
      "username" : this.state.username,
	    "password" : this.state.password
    }

   const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    axios.post(apiBaseUrl+'connect/token', qs.stringify(payload), config)
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
       console.log("Login successfull");
       var userInfoScreen=[];
       userInfoScreen.push(<UserInfoPage appContext={self.props.appContext} token={response.data.access_token}/>)
       self.props.appContext.setState({loginPage:[],userInfoScreen:userInfoScreen})
     }
   })
   .catch(function (error) {
     if(error.response.status == 400){
       alert(error.response.data.error_description);
     }else {
       alert('error on login')
     }
   });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
