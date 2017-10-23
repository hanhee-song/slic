import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div>
      <div>
        <Link to="/get-started">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Navbar;
