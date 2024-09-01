import React, { useState } from 'react';
import './Profile.css';
import { assets } from '../../assets/assets';


const Profile = ({ name }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      <div className="background-picture">
        {/* Background picture goes here */}
        <img src={assets.backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="profile-content">
        <div className="profile-picture-container">
          {imageFileUrl ? (
            <img src={imageFileUrl} alt="Profile" className="profile-picture" />
          ) : (
            <img src={assets.defaultpfp2} alt="Default Profile" className="profile-picture" />
          )}
          {/* File input triggered by label */}
          <label htmlFor="profile-picture-input" className="change-picture-btn">
            Change Picture
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="username">
          <h2>✧✧ {name} ✧✧</h2>
        </div>
        <div className="count-container">
          <div className="count-box">
            <h2>Follower Count</h2>
            <p>0</p> 
          </div>
          <div className="count-box">
            <h2>Following Count</h2>
            <p>0</p> 
          </div>
          <div className="count-box">
            <h2>Story Count</h2>
            <p>0</p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

