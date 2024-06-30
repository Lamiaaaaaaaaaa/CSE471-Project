// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import SignInForm from '../SignInForm/SignInForm';
import Login from '../Login/Login';

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Menu");

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowLogin(false); // Ensure only one pop-up is open at a time
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignIn(false); // Ensure only one pop-up is open at a time
  };

  const handleClosePopups = () => {
    setShowSignIn(false);
    setShowLogin(false);
  };

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo' />
      <img src={assets.art} alt="" className='art' />
      <ul className="navbar-menu">
        <li onClick={() => setActiveMenuItem("Home")} className={activeMenuItem === "Home" ? "active" : ""}>Home</li>
        <li onClick={() => setActiveMenuItem("Menu")} className={activeMenuItem === "Menu" ? "active" : ""}>Menu</li>
        <li onClick={() => setActiveMenuItem("Contact-Us")} className={activeMenuItem === "Contact-Us" ? "active" : ""}>Contact Us</li>
        <div className="sliding-line" style={{ left: activeMenuItem === "Home" ? "0%" : activeMenuItem === "Menu" ? "33.33%" : "66.66%" }}></div>
      </ul>
      <div className="dot">
        <button onClick={handleSignInClick}>SIGN IN</button>
        <button onClick={handleLoginClick}>LOG IN</button>
      </div>

      {showSignIn && <SignInForm onClose={handleClosePopups} />}
      {showLogin && <Login onClose={handleClosePopups} />}
    </div>
  );
};

export default Navbar;