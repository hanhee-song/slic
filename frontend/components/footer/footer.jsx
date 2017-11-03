import React from 'react';
import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <Link to="/">
          <div className="footer-logo">
            <i className="fa fa-hashtag" aria-hidden="true"></i>
          </div>
        </Link>
        <ul className="footer-categories">
          <ul className="footer-list">
            <li><a href="#">About Me</a></li>
          </ul>
          <ul className="footer-list">
            <li><a href="#"><i className="fa fa-github" aria-hidden="true"></i> Github</a></li>
          </ul>
          <ul className="footer-list">
            <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i> Linkedin</a></li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default footer;
