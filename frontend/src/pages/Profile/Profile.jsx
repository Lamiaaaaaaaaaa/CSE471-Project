import React, { useState } from 'react';
import './Profile.css';
import { assets } from '../../assets/assets';

const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl)
  return (
    <div className="profile-container">
      <div className="top-left">
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
      </div>
      <div className="top-right">
        <div className="count-container">
          <div className="count-box">
            <h2>Follower Count</h2>
            <p>1000</p> {/* Replace with dynamic data */}
          </div>
          <div className="count-box">
            <h2>Following Count</h2>
            <p>500</p> {/* Replace with dynamic data */}
          </div>
          <div className="count-box">
            <h2>Story Count</h2>
            <p>10</p> {/* Replace with dynamic data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
