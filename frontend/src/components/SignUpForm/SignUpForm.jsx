// import React, { useState } from 'react';
// import React from 'react';
// import './SignUpForm.css';

// const SignUpForm = ({ onClose, onLoginClick }) => {

//   const handleLoginClick = () => {
//     onClose(); // Close the current popup (Sign In)
//     onLoginClick(); // Call the parent function to open the Login popup
//   };

//   return (
//     <div className="sign-in-form">
//       <button className="close-button" onClick={onClose}>✕</button>
//       <h2>Sign Up</h2>
//       <form>
//         <div className="form-group">
//           <input type="text" placeholder="Name:" />
//         </div>
//         <div className="form-group">
//           <input type="email" placeholder="Email:" />
//         </div>
//         <div className="form-group">
//           <input type="password" placeholder="Password:" />
//         </div>
//         <div className="form-group">
//           <input type="password" placeholder="Confirm Password:" />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p style={{ marginTop: '10px', textAlign: 'center' }}>
//         Already have an account?{' '}
//         <span onClick={handleLoginClick} style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Login</span>
//       </p>
//     </div>
//   );
// };

// export default SignUpForm;















import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios'

const SignUpForm = ({ onClose, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUpClick = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/user/signup', { name, email, password });
      console.log('Received response:',response.data);
  
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        onClose();
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="sign-up-form">
      <button className="close-button" onClick={onClose}>✕</button>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUpClick}>
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Already have an account?{' '}
        <span onClick={onLoginClick} style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  );
};

export default SignUpForm;

