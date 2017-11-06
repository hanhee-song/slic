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

export default Navbar;
