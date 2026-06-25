import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navigation from './components/Navbar';
import './App.css';

function App() {
  // 1. Manage Login State with LocalStorage (Persistence)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 2. Update LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    // EVERYTHING must be inside the Router for the Navigation to work
    <Router>
      <div className="App">
        {/* Navigation needs to know the state to show the hamburger */}
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        {/* AppRoutes needs the state to pass it to the Login/Dashboard pages */}
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
  );
}

export default App;