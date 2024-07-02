import React from 'react';
import './Login.css';

const Login = ({ onClose, onSignupClick }) => {
  const handleLoginClick = () => {
    
  };

  return (
    <div className="login-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Login</h2>
      <form onSubmit={handleLoginClick}>
        <div className="form-group">
          <input type="email" placeholder="email:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="password:" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <span onClick={onSignupClick} style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Signup</span>
      </p>
    </div>
  );
};

export default Login;
