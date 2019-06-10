import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleLogout(event) {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this.props.appContext} />);
    this.props.appContext.setState({ loginPage: loginPage, userInfoScreen: [] })
  }
  static renderTable(user) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Family Name</th>
            <th>Given Name</th>
            <th>Preferred Username</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.family_name}</td>
            <td>{user.given_name}</td>
            <td>{user.preferred_username}</td>
            <td>{user.website}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  render() {
    let contents =  UserInfoScreen.renderTable(this.props.model);

    return (
      <div className="App">
        <div>
          <center>
            {contents}
          </center>
          <MuiThemeProvider>
            <RaisedButton label="Back" primary={true} style={style} onClick={(event) => this.handleLogout(event)} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default UserInfoScreen;