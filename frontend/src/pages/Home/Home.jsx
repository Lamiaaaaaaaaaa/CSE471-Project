import React, {useContext} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext,jsx';
import './Home.css';
import { assets } from '../../assets/assets';


const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  // const { user } = AuthContext()

  const handleLogout = () => {
    localStorage.removeItem('token');

    setIsLoggedIn(false);
  };
  
   

  const handleProfileClick = () => {
    history.push('/profile');
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="home-container">
      <div className="top-right">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="top-left">
      <div className="profile-picture-container">
        <img
          src={assets.defaultpfp}
          alt=""
          className="profile-picture"
          onClick={handleProfileClick}
          style={{ width: '70px', height: '70px' }}
        />
        <h5>hello username!</h5>
        </div>
      </div>
      <h1>     </h1>
      <h1>     </h1>
      <h1>     </h1>
      <h1>Welcome to the Homepage</h1>
      <p>This is a sample home page.</p>
      <button className="btn">Explore More</button>
    </div>
  );
};

export default Home;
