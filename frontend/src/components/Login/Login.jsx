// Login.jsx
import React from 'react';
import './Login.css';

const Login = ({ onClose }) => {
  return (
    <div className="login-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <input type="email" placeholder="email:" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="password:" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
