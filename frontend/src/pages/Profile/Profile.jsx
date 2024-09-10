import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Profile = ({ setIsLoggedIn }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(localStorage.getItem('profileImageUrl') || assets.defaultpfp2); // Check localStorage first
  const [name, setName] = useState(localStorage.getItem('userName') || ''); // Check localStorage for name
  const history = useHistory();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  // Fetch user profile on component mount, only if profileImageUrl or name is not in localStorage
  useEffect(() => {
    if (!localStorage.getItem('profileImageUrl') || !localStorage.getItem('userName')) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/user/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const profilePictureUrl = response.data.profilePicture || assets.defaultpfp2;
          const fetchedName = response.data.name || '';

          // Update state and save the profile picture URL and name to localStorage
          if (profilePictureUrl !== assets.defaultpfp2) {
            setImageFileUrl(profilePictureUrl);
            localStorage.setItem('profileImageUrl', profilePictureUrl);
          }

          if (fetchedName) {
            setName(fetchedName);
            localStorage.setItem('userName', fetchedName); // Store name in localStorage
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserData();
    }
  }, []);

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Set the new file to be uploaded
      const previewUrl = URL.createObjectURL(file); // Create a preview URL
      setImageFileUrl(previewUrl); // Update state with preview URL
    }
  };

  // Handle profile picture reset (deleting the image) with confirmation
  const confirmResetProfilePicture = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile picture?');

    if (confirmDelete) {
      try {
        const response = await fetch('/api/user/delete-profile-picture', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ userId }), // Include the dynamic userId
        });

        if (response.ok) {
          // Reset to default picture and update localStorage
          const defaultPicture = assets.defaultpfp2;
          setImageFileUrl(defaultPicture);
          localStorage.setItem('profileImageUrl', defaultPicture); // Store default image in localStorage
        } else {
          console.error('Failed to delete profile picture');
        }
      } catch (error) {
        console.error('Error deleting profile picture:', error);
      }
    }
  };

  // Upload image when the image file changes
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Handle image upload
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('userId', userId); // Ensure userId is passed correctly

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        const uploadedImageUrl = `http://localhost:5000/public/Images/${response.data.result.image}`;
        setImageFileUrl(uploadedImageUrl); // Update state with the new image URL

        // Store the uploaded image URL in localStorage for persistence
        localStorage.setItem('profileImageUrl', uploadedImageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImageUrl'); // Remove profile image from localStorage on logout
    localStorage.removeItem('userName'); // Remove name from localStorage on logout
    setIsLoggedIn(false);
    history.push('/');
  };

  return (
    <div className="profile-container">
      <div className="background-picture">
        <img src={assets.backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="profile-content">
        <div className="profile-picture-container">
          <img src={imageFileUrl} alt="Profile" className="profile-picture" />
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
          {imageFileUrl !== assets.defaultpfp2 && (
            <button className="reset-picture-btn" onClick={confirmResetProfilePicture}>
              X
            </button>
          )}
        </div>
        <div className="username">
          <h2>✧✧ {name ? name : ''} ✧✧</h2>
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
        <div className="top-right">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
