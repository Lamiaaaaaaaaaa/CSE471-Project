
// import React, {useContext} from 'react';
// import { Redirect, useHistory } from 'react-router-dom';
// // import { AuthContext } from '../context/AuthContext.jsx';
// import './Home.css';
// import { assets } from '../../assets/assets';


// const Home = ({ isLoggedIn, setIsLoggedIn }) => {
//   const history = useHistory();
//   // const { user } = AuthContext()

//   const handleLogout = () => {
//     localStorage.removeItem('token');

//     setIsLoggedIn(false);
//   };
  
   

//   const handleProfileClick = () => {
//     history.push('/profile');
//   };

//   if (!isLoggedIn) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className="home-container">
//       <div className="top-right">
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </div>
//       <div className="top-left">
//       <div className="profile-picture-container">
//         <img
//           src={assets.defaultpfp}
//           alt=""
//           className="profile-picture"
//           onClick={handleProfileClick}
//           style={{ width: '70px', height: '70px' }}
//         />
//         <h5>hello username!</h5>
//         </div>
//       </div>
//       <h1>     </h1>
//       <h1>     </h1>
//       <h1>     </h1>

// import React from 'react';
// import './Home.css';

// const Home = () => {
//   return (
//     <div className="home-container">

//       <h1>Welcome to the Homepage</h1>
//       <p>This is a sample home page.</p>
//       <button className="btn">Explore More</button>
//     </div>
//   );
// };

// export default Home;



// // import React from 'react';
// // import { Redirect } from 'react-router-dom';
// // import './Home.css';

// // const Home = ({ isLoggedIn }) => {
// //   if (!isLoggedIn) {
// //     return <Redirect to="/login" />;
// //   }

// //   return (
// //     <div className="home-container">
// //       <h1>Welcome to the Homepage</h1>
// //     </div>
// //   );
// // };

// // export default Home;




//--------------------------------------------------------

// 

import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Home.css';
import { assets } from '../../assets/assets';

const Home = ({ isLoggedIn, setIsLoggedIn, name }) => {
  const history = useHistory();
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const greetingShown = localStorage.getItem('greetingShown');
    if (!greetingShown) {
      setShowGreeting(true);
      localStorage.setItem('greetingShown', 'true');
      }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('greetingShown');
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
            alt="Profile"
            className="profile-picture"
            onClick={handleProfileClick}
          />
          {showGreeting && <h5>Hello, {name}!</h5>}
        </div>
      </div>
      <div className="welcome-section">
        <h1>Welcome to the Homepage</h1>
        <p>This is a sample home page.</p>
        <button className="btn">Explore More</button>
      </div>
    </div>
  );
};

export default Home;

