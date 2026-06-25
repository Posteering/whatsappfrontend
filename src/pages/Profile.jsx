import React, { useState, useEffect } from 'react';
import { FiUser, FiBriefcase, FiPhone, FiMail, FiEdit, FiShield } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const vendorName = localStorage.getItem('vendor_name') || "Your Business";
  const ownerName = localStorage.getItem('owner_name') || "Business Owner";
  const vendorLocation = localStorage.getItem('vendor_location') || "Not specified";
  const vendorRating = localStorage.getItem('vendor_rating') || "5.0";
  const whatsapp = "Available via WhatsApp Bot"; // Could be stored if needed
  const email = "N/A"; // Not currently collected

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="skeleton skeleton-title" style={{ width: '250px' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '120px', height: '40px', borderRadius: '50px' }}></div>
      </div>
      <div className="profile-grid">
        <div className="profile-main-card">
          <div className="skeleton" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 20 }}></div>
          <div className="skeleton skeleton-title" style={{ width: '80%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
        </div>
        <div className="profile-details-list">
          <div className="skeleton skeleton-card" style={{ height: 60, marginBottom: 15 }}></div>
          <div className="skeleton skeleton-card" style={{ height: 60, marginBottom: 15 }}></div>
          <div className="skeleton skeleton-card" style={{ height: 60, marginBottom: 15 }}></div>
          <div className="skeleton skeleton-card" style={{ height: 60, marginBottom: 15 }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Business Identity</h1>
        <button className="btn-pill btn-green-outline"><FiEdit /> Edit Profile</button>
      </div>

      <div className="profile-grid">
        <div className="profile-main-card">
          <div className="profile-avatar">
            {vendorName.charAt(0).toUpperCase()}
          </div>
          <h2>{vendorName}</h2>
          <span className="cat-badge">Vendor</span>
        </div>

        <div className="profile-details-list">
          <div className="detail-item">
            <FiUser className="d-icon" />
            <div><label>Business Owner</label><p>{ownerName}</p></div>
          </div>
          <div className="detail-item">
            <FiBriefcase className="d-icon" />
            <div><label>Location</label><p>{vendorLocation}</p></div>
          </div>
           <div className="detail-item">
            <FiShield className="d-icon" />
            <div><label>Rating</label><p>⭐️ {vendorRating}</p></div>
          </div>
          <div className="detail-item">
            <FiPhone className="d-icon" />
            <div><label>Contact Info</label><p>{whatsapp}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;