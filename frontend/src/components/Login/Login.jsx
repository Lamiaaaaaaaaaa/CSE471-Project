import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';


const SITE_KEY = '6LfQHQwqAAAAAF7daSw9Ig1SWXX1PwnvDuknB41T';

const Login = ({ onClose, onSignupClick, setIsLoggedIn }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setError('Please complete the CAPTCHA');
      return;
    }

    try {
      const response = await axios.post('/api/user/login', { email, password });
      console.log('Received response:', response.data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setSuccess('Login successful!');
        setError('');
        setIsLoggedIn(true); 
        history.push('/home'); 
        setError(response.data.error || 'Login failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      setSuccess('');
      console.error('Login error:', error);
    }
  };

  const onChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  return (
    <div className="login-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Login</h2>
      <form onSubmit={handleLoginClick}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={onChange}
            size="compact" 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <span
          onClick={onSignupClick}
          style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
