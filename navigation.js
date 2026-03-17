import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./spentra-logo.jpeg"; 

function Navi() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Spentra Logo" className="nav-logo" />
        <span className="nav-title">Spentra</span>
      </div>
      <div className="nav-right">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/">Login</Link>
        <Link to="/signup">SignUp</Link>
      </div>
    </nav>
  );
}

export default Navi;
