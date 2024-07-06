import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { AuthContextProvider } from './components/Context/AuthContext'; 

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AuthContextProvider>
      {showLogin ? <Login onClose={() => setShowLogin(false)} onSignupClick={() => setShowLogin(false)} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
      </div>
    </AuthContextProvider>
  );
};

export default App;
