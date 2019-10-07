import React, { Component, PropTypes } from "react";
import { NavLink } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  componentDidMount(){
    let access_token ='Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    console.log(access_token)
    try{
      fetch('/o/headless-delivery/v1.0/structured-contents/34713/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': access_token
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.contentFields[0].value.data)
        this.setState({
          content: data.contentFields[0].value.data
        })
      }).catch((err)=>{
        alert('Dashboard data failed. Please try again.')
      })
    }catch(err){
      console.log(err)
    }
  }

  logout = () =>{
    localStorage.setItem("access_token", null);
    this.props.history.push(`/`);
      
  }

  render() {
    let imagePath = window.location.href.search('emerge') == -1 ? 'https://d1ic4altzx8ueg.cloudfront.net/niche-builder/5c8299df36bc4.png' : 'https://quote.emergencyassistltd.co.uk/assets/imgs/Logo-trans.png'
    return (
      <div>
        <img src={imagePath}></img>
        <div>This is dashboard <p>{this.state.content}</p>.</div>
        <a onClick={this.logout} className="links" style={{color: 'blue'}}>Log out</a>
      </div>
    );
  }
}
export default Dashboard;
