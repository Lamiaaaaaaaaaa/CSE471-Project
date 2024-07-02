import React from 'react';
import './SignUpForm.css';

const SignUpForm = ({ onClose, onLoginClick }) => {

  const handleLoginClick = () => {
    onClose(); // Close the current popup (Sign In)
    onLoginClick(); // Call the parent function to open the Login popup
  };

  return (
    <div className="sign-in-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Name:" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password:" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Already have an account?{' '}
        <span onClick={handleLoginClick} style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  );
};

export default SignUpForm;
