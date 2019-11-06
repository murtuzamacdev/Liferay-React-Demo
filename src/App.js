import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
  
function App() {
  return (
    <div className="App">
    <Router basename={'/'}>
      <Route
        exact
        path="/"
        render={props => <Login {...props}></Login>}
      ></Route>
      <Route
            path="/dashboard"
            render={props => <Dashboard {...props}></Dashboard>}
          ></Route>
    </Router>
  </div>
  );
}

export default App;
