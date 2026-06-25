import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiArrowLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from "react-icons/hi2";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-wrapper">
      {/* Top Header */}
      <nav className="register-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <HiOutlineSparkles size={24} /> <span>WA.VENDOR</span>
        </div>
        <div className="nav-right">
          <span>Already a vendor?</span>
          <button onClick={() => navigate("/login")} className="btn-login-small">Login</button>
        </div>
      </nav>

      <div className="register-container">
        <div className="register-card">
          <div className="form-header">
            <Link to="/" className="back-link"><FiArrowLeft /> Back</Link>
            <h1>Create your Vendor Account</h1>
            <p>Join the future of automated WhatsApp commerce.</p>
          </div>

          <form className="register-form">
            <div className="input-group-row">
              <div className="input-field">
                <label>Business Name</label>
                <div className="input-wrapper">
                  <FiBriefcase className="input-icon" />
                  <input type="text" placeholder="e.g. RayFoods" />
                </div>
              </div>
              <div className="input-field">
                <label>Owner Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input type="text" placeholder="Full Name" />
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input type="email" placeholder="name@business.com" />
              </div>
            </div>

            <div className="input-group-row">
              <div className="input-field">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <FiPhone className="input-icon" />
                  <input type="tel" placeholder="+234..." />
                </div>
              </div>
              <div className="input-field">
                <label>WhatsApp Number</label>
                <div className="input-wrapper">
                  <FiPhone className="input-icon" style={{color: 'var(--primary-green)'}} />
                  <input type="tel" placeholder="For AI Connection" />
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Business Category</label>
              <div className="input-wrapper">
                <FiBriefcase className="input-icon" />
                <select>
                  <option>Select Category</option>
                  <option>Food & Drinks</option>
                  <option>Fashion</option>
                  <option>Groceries</option>
                  <option>Services</option>
                </select>
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input type="password" placeholder="Min. 8 characters" />
              </div>
            </div>

            <button type="submit" className="btn-submit-pill">
              Create Account & Continue
            </button>
          </form>

          <p className="terms-text">
            By signing up, you agree to our <span className="highlight">Terms of Service</span> and <span className="highlight">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;