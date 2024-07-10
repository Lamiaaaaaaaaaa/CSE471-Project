import { useState, useEffect } from 'react';
import './Profile.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

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

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);

  //   try {
  //     const response = await axios.post('http://localhost:5000/upload', formData, {
  //       // headers: {
  //       //   'Content-Type': 'multipart/form-data',
  //       // },
  //     });
  //     console.log('response:', response)
  //     if (response.data.success) {
  //       console.log('Image uploaded successfully');
  //       setImageFileUrl(`http://localhost:5000${response.data.profilePicture}`);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
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
      <div className="top-left">
        <div className="profile-picture-container">
          {imageFileUrl ? (
            <img src={imageFileUrl} alt="Profile" className="profile-picture" />
          ) : (
            <img src={assets.defaultpfp2} alt="Default Profile" className="profile-picture" />
          )}
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
