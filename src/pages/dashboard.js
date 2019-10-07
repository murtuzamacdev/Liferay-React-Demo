import React, { Component, PropTypes } from "react";
import { NavLink } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    let user = JSON.parse(localStorage.getItem('user'));

    this.state = {
      email: user.screenName,
    };
  }

  logout = () =>{
    localStorage.setItem("user", null);
    this.props.history.push(`/`);
      
  }

  render() {
    return (
      <div>
        <div>This is dashboard for {this.state.email}</div>
        <a onClick={this.logout} className="links" style={{color: 'blue'}}>Log out</a>
      </div>
    );
  }
}
export default Dashboard;
