import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiUser, FiLogOut, FiMenu, FiX, FiChevronDown, FiShoppingBag, FiBox } from 'react-icons/fi';
import { HiOutlineSparkles } from "react-icons/hi2";
import './Navbar.css';



const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [isDashOpen, setIsDashOpen] = useState(false);

  // Hidden on Landing, Login, Register, and Dashboard
  const hideNav = ['/', '/login', '/register', '/dashboard'].includes(location.pathname);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsHamOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* TOP NAV: Only shows the Hamburger Trigger if Logged In */}
      {!hideNav && isLoggedIn && (
        <nav className="top-nav-fixed">
          <div className="nav-logo" onClick={() => navigate('/home')}>
            <HiOutlineSparkles /> <span>WA.VENDOR</span>
          </div>
          <div className="ham-trigger" onClick={() => setIsHamOpen(true)}>
            <FiMenu size={30} />
          </div>
        </nav>
      )}

      {/* SLIDING HAMBURGER OVERLAY */}
      <div className={`ham-overlay ${isHamOpen ? 'active' : ''}`}>
        <div className="ham-card">
          <div className="ham-header">
            <div className="logo"><HiOutlineSparkles /> VENDOR</div>
            <FiX className="close-x" onClick={() => setIsHamOpen(false)} />
          </div>

          <div className="ham-body">
            <div className="ham-link" onClick={() => {navigate('/home'); setIsHamOpen(false)}}>Home</div>
            <div className="ham-link" onClick={() => {navigate('/dashboard'); setIsHamOpen(false)}}>Dashboard</div>
            
            <div className="ham-dropdown">
              <div className="ham-link flex-between" onClick={() => setIsDashOpen(!isDashOpen)}>
                Manage Business <FiChevronDown className={isDashOpen ? 'rotate' : ''} />
              </div>
              {isDashOpen && (
                <div className="sub-links-container">
                  <div className="sub-item" onClick={() => {navigate('/products'); setIsHamOpen(false)}}><FiBox /> Products</div>
                  <div className="sub-item" onClick={() => {navigate('/whatsapp'); setIsHamOpen(false)}}><HiOutlineSparkles /> Sarah AI Sync</div>
                </div>
              )}
            </div>

            <div className="ham-link" onClick={() => {navigate('/profile'); setIsHamOpen(false)}}>Profile</div>
            <div className="ham-link logout-red" onClick={handleLogout}>
              Logout <FiLogOut />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PILL NAV: Always visible if logged in */}
      {!hideNav && isLoggedIn && (
        <div className="bottom-pill-container">
          <div className="bottom-pill">
            <div className="pill-item" onClick={() => navigate('/home')}><FiHome /></div>
            <div className="pill-item" onClick={() => navigate('/dashboard')}><FiGrid /></div>
            <div className="pill-item" onClick={() => navigate('/profile')}><FiUser /></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;