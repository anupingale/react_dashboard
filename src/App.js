import React, { Component } from 'react';
import './App.css';

const Users = function(props) {
  const { users } = props;
  console.log(users);
  return <div>{users}</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.addUser = this.addUser.bind(this);
    this.showUser = this.showUser.bind(this);
  }

  showUser() {
    fetch('/getusers')
      .then(user => user.json())
      .then(users => {
        this.setState({
          users
        });
      });
  }

  addUser(event) {
    const username = document.getElementById('username').value;
    event.preventDefault();
    fetch('/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(users => {
        this.setState({ users });
      });
  }

  render() {
    return (
      <div>
        {this.state.users.length}
        <button name="user" value="submit" onClick={this.showUser}>
          show users
        </button>
        <form>
          <input type="text" name="username" id="username" />
          <button onClick={this.addUser}>add User</button>
        </form>
      </div>
    );
  }
}

export default App;
