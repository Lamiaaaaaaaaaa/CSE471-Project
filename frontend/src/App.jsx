import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Home from './pages/Home/Home';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn ? (
              <>
                <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
                {showLogin && <Login onClose={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} />}
                {showSignup && <SignUpForm onClose={() => setShowSignup(false)} />}
              </>
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
          <Route path="/home" exact>
            {isLoggedIn ? (
              <Home />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

