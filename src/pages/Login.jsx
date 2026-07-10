import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from "react-icons/hi2";
import { loginUser } from '../services/authService'; // <--- IMPORT THE SERVICE
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // THIS IS THE MAIN FUNCTION THAT TALKS TO THE DATABASE
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Call the PostgreSQL database
      const result = await loginUser(vendorId.trim(), phoneNumber.trim());
      
      // 2. If successful, unlock the app
      setIsLoggedIn(true);
      navigate('/home'); 

    } catch (err) {
      // 3. If the database says "No", show the error
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo" onClick={() => navigate('/')}>
          <HiOutlineSparkles size={32} /> <span>WA.VENDOR</span>
        </div>
        
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>VIOLET has been busy! Log in to see your new orders.</p>
        </div>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div className="error-banner">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Vendor ID</label>
            <div className="input-box">
              <FiLock className="input-icon" />
              <input 
                type="text" 
                placeholder="e.g. 123e4567-e89b-12d3..." 
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>WhatsApp Phone Number</label>
            <div className="input-box">
              <FiMail className="input-icon" />
              <input 
                type="text" 
                placeholder="+234..." 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-pill btn-orange full-width" disabled={loading}>
            {loading ? (
              <FiLoader className="spinner" />
            ) : (
              <>Log In to Dashboard <FiArrowRight /></>
            )}
          </button>
        </form>

        {/* DEVELOPER MODE BYPASS */}
        {import.meta.env.DEV && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button 
              type="button" 
              className="btn-pill" 
              style={{ background: '#333', color: '#fff', width: '100%' }}
              onClick={() => {
                localStorage.setItem('vendor_id', 'dev-uuid-0000-0000');
                localStorage.setItem('vendor_name', 'Developer Sandbox');
                localStorage.setItem('owner_name', 'Dev User');
                localStorage.setItem('vendor_location', 'Localhost');
                localStorage.setItem('vendor_rating', '5.0');
                localStorage.setItem('payment_account', JSON.stringify({
                  bank: "Mock Bank",
                  account_number: "0000000000",
                  account_name: "Developer Sandbox"
                }));
                setIsLoggedIn(true);
                navigate('/home');
              }}
            >
              🛠 Dev Mode: Auto-Login
            </button>
          </div>
        )}

        <div className="login-footer">
          <p>New to WA.VENDOR? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;