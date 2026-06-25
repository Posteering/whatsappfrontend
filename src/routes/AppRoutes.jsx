// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from '../pages/LandingPage';
// import Register from '../pages/Register'; 
// import Profile from '../pages/Profile'
// import Dashboard from '../pages/Dasboard'
// import Dashboard from '../pages/Products'



// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} /> 
//         <Route path="/profile-setup" element={<Profile/>} />
//         <Route path="/products" element={<Products/>} />
//         <Route path="/AddProduct" element={<AddProduct/>} />
//         <Route path="/whatsapp" element={<Whatsapp/>} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/dashboard" element={<Dasboard />} />
//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Whatsapp from '../pages/Whatsapp';
import Products from '../pages/Products';
import AddProduct from '../components/AddProduct';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
      <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      
      {/* Pages that depend on being logged in */}
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/whatsapp" element={<Whatsapp />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addproduct" element={<AddProduct />} />
    </Routes>
  );
};

export default AppRoutes;