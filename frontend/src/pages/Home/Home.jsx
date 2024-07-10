import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Home.css';
import { assets } from '../../assets/assets';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    history.push('/profile');
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
            alt=""
            className="profile-picture"
            onClick={handleProfileClick}
            style={{ width: '70px', height: '70px' }}
          />
          <h5>Hello, username!</h5>
        </div>
      </div>
      <div className="welcome-section">
        <h1>Welcome to the Homepage</h1>
        <p>This is a sample home page.</p>
        <button className="btn">Explore More</button>
      </div>
    </div>
  );
};

export default Home;