import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Home.css';
import { assets } from '../../assets/assets';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const [showGreeting, setShowGreeting] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    // Initialize name from localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    // Check for greeting display
    const greetingShown = localStorage.getItem('greetingShown');
    if (!greetingShown) {
      setShowGreeting(true);
      localStorage.setItem('greetingShown', 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Clear name from localStorage
    localStorage.removeItem('greetingShown');
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleWritingClick = () => {
    history.push('/writing'); // Navigate to the Writing page
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="home-container">
      <div className="top-right">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="top-left">
        <div className="profile-picture-container">
          <img
            src={assets.defaultpfp}
            alt="Profile"
            className="profile-picture"
            onClick={handleProfileClick}
          />
          {showGreeting && <h5>Hello, {name ? name : 'User'}!</h5>}
        </div>
      </div>
      <div className="welcome-section">
        <h1>Welcome to the Homepage</h1>
        <p>This is a sample home page.</p>
        <button className="btn" onClick={handleWritingClick}>Start Writing</button> 
      </div>
    </div>
  );
};

export default Home;
