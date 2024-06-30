// SignInForm.jsx
import React from 'react';
import './SignInForm.css';

const SignInForm = ({ onClose }) => {
  return (
    <div className="sign-in-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="name:" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="email:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="password:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="confirm password:" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
