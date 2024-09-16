import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Home.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const [showGreeting, setShowGreeting] = useState(false);
  const [name, setName] = useState('');
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories/published', { // Updated endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setStories(result);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    const greetingShown = localStorage.getItem('greetingShown');
    if (!greetingShown) {
      setShowGreeting(true);
      localStorage.setItem('greetingShown', 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('greetingShown');
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleWritingClick = () => {
    history.push('/writing');
  };

  const handleStoryClick = (storyId) => {
    history.push(`/stories/${storyId}`);
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
        <h1>Welcome to SOYO</h1>
        <p>This is where you unleash your creativity</p>
        <button className="btn" onClick={handleWritingClick}>Start Writing</button>
      </div>
      <div className="story-cards-container">
        {stories.length === 0 ? (
          <p> </p>
        ) : (
          stories.map(story => (
            <div
              key={story._id}
              className="story-card"
              onClick={() => handleStoryClick(story._id)}
              >
              <div className="story-card-header">
                <h2>{story.topicName || 'Untitled'}</h2>
              </div>
              <p>Author: {story.userId?.name || 'Unknown'}</p>
              <div className="story-description">
                <ReactQuill 
                  value={story.description || 'No description available'} 
                  readOnly={true}
                  theme="bubble"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
