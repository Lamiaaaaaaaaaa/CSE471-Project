import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Homepage</h1>
      <p>This is a sample home page.</p>
      <button className="btn">Explore More</button>
    </div>
  );
};

export default Home;


// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import './Home.css';

// const Home = ({ isLoggedIn }) => {
//   if (!isLoggedIn) {
//     return <Redirect to="/login" />;
//   }

//   return (
//     <div className="home-container">
//       <h1>Welcome to the Homepage</h1>
//     </div>
//   );
// };

// export default Home;
