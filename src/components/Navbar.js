import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Scotbase Entertainment
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/artists" className="nav-link">
              Performance Acts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dinner-speakers" className="nav-link">
              Dinner Speakers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/experiences" className="nav-link">
              Themed Nights
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

