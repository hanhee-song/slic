import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/">LOGO</Link>
        </div>
        
        <ul className="nav-buttons">
          <li className="nav-button"><button onClick={props.logout}>Sign out</button></li>
          <li className="nav-button"><Link to="/">About Me</Link></li>
          <li className="nav-button"><Link to="/signup">Sign Up</Link></li>
          <li className="nav-button"><Link to="/login">Log In</Link></li>
          <li className="nav-button"><Link to="/guest-login">Guest Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;