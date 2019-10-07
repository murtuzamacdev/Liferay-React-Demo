import React, { Component, PropTypes } from "react";
import { NavLink } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    try{
      fetch('/o/authentication/v1.0/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.access_token){
          let access_token = data.access_token;
          console.log(access_token)
          localStorage.setItem("access_token", JSON.stringify(access_token));
          this.props.history.push(`/dashboard`);
        }else{
          alert("Something went wrong. Please try")
        }
        
      }).catch((err)=>{
        alert('Login failed. Please try again.')
      })
    }catch(err){
      console.log(err)
    }
  }

  // handleLogin(event) {
  //   // alert('Login submit clicked')
  //   this.props.history.push(`/dashboard`);
  // }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {});
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          {/* <form noValidate> */}
          <div className="email">
            <label htmlFor="email">Username</label>
            <input
              placeholder="Username"
              type="text"
              name="email"
              noValidate
              onChange={this.handleChange}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              noValidate
              onChange={this.handleChange}
            />
          </div>
          <div className="createAccount">
            <button onClick={this.handleLogin}>Login</button>
            <NavLink to="/">
              {/* <small className="links">Sign Up?</small> */}
            </NavLink>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
export default Login;
