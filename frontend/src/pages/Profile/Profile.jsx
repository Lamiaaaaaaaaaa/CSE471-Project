import React, { useState, useEffect } from 'react';
import './Profile.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

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

  const resetProfilePicture = async () => {
    try {
      const response = await fetch('/api/user/delete-profile-picture', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'your-user-id-here' }), // Replace with actual user ID
      });

      if (response.ok) {
        setImageFileUrl(null); // Reset the profile picture URL to default
      } else {
        console.error('Failed to delete profile picture');
      }
    } catch (error) {
      console.error('Error deleting profile picture:', error);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('userId', 'your-user-id-here'); //added
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      console.log('response:', response.data); // Log the entire response data
      if (response.data.success) {
        const imageUrl = `http://localhost:5000/public/Images/${response.data.result.image}`;
        console.log('Image URL:', imageUrl);
        setImageFileUrl(imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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
            <>
              <img src={imageFileUrl} alt="Profile" className="profile-picture" />
              <button className="reset-picture-btn" onClick={resetProfilePicture}>
                ×
              </button>
            </>
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
