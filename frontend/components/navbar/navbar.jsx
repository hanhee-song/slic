import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <i className="fa fa-hashtag" aria-hidden="true"></i> Slic
        </div>
      </Link>
        <ul className="nav-buttons">
        </ul>
      </div>
    </div>
  );
};

// gutting the nav buttons
// <li className="nav-button"><Link to="/">About Me</Link></li>
// <li className="nav-button"><Link to="/signup">Sign Up</Link></li>
// <li className="nav-button"><Link to="/login">Log In</Link></li>
// <li className="nav-button"><Link to="/guest-login">Guest Login</Link></li>

export default Navbar;
