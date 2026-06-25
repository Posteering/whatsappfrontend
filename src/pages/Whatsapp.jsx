import React, { useState, useEffect } from 'react';
import { FiPhone, FiCheckCircle, FiShield, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from "react-icons/hi2";
import './WhatsApp.css';

const WhatsApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="whatsapp-container">
      <div className="whatsapp-card">
        <div className="skeleton skeleton-title" style={{ width: '50%', marginBottom: 30 }}></div>
        <div className="skeleton skeleton-card" style={{ height: 100, marginBottom: 30 }}></div>
        <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '60%', marginBottom: 30 }}></div>
        <div className="skeleton skeleton-title" style={{ width: '100%', height: 45, borderRadius: 50 }}></div>
      </div>
    </div>
  );

  return (
    <div className="whatsapp-container">
      <div className="whatsapp-card">
        <div className="status-header">
          <div className="ai-brand">
            <HiOutlineSparkles size={30} color="var(--primary-orange)" />
            <span>AI SARAH CONNECTION</span>
          </div>
          <div className={`status-badge ${isConnected ? 'connected' : 'disconnected'}`}>
            <div className="pulse"></div>
            {isConnected ? 'AI Active' : 'AI Offline'}
          </div>
        </div>

        <div className="sync-visual">
          <div className="device-box">
             <FiPhone size={40} />
             <p>Your Phone</p>
          </div>
          <div className="sync-line">
            <FiRefreshCw className={isConnected ? '' : 'spinning'} />
          </div>
          <div className="device-box sarah">
             <HiOutlineSparkles size={40} />
             <p>Sarah AI</p>
          </div>
        </div>

        <div className="connection-info">
          <h2>{isConnected ? 'Sarah is attending to customers' : 'Sarah is waiting to help'}</h2>
          <p>
            {isConnected 
              ? 'Your WhatsApp number is currently synced. Sarah is listing products and taking orders 24/7.'
              : 'Connect your business WhatsApp number so Sarah can start taking orders and managing your catalog.'}
          </p>
        </div>

        <div className="security-note">
          <FiShield /> <span>End-to-end encrypted connection</span>
        </div>

        <button 
          className={`btn-pill ${isConnected ? 'btn-green-outline' : 'btn-orange'} full-width-btn`}
          onClick={() => setIsConnected(!isConnected)}
        >
          {isConnected ? 'Disconnect Sarah' : 'Connect WhatsApp Now'}
        </button>

        {!isConnected && (
          <div className="how-to-connect">
            <h4><FiAlertCircle /> How to connect:</h4>
            <ul>
              <li>Click the connect button above</li>
              <li>A QR code will appear (Simulated)</li>
              <li>Scan with your WhatsApp Linked Devices</li>
            </ul>
          </div>
        )}

        {isConnected && (
          <div className="live-activity" style={{ marginTop: '20px' }}>
            <h4>Sarah's Live Activity:</h4>
            <div className="activity-log" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
              <div className="log-item" style={{ marginBottom: '10px' }}>
                <span className="time" style={{ marginRight: '10px', color: '#666' }}>10:05 AM</span>
                <span className="action">Sarah listed <b>RayFoods</b> menu to +234...</span>
              </div>
              <div className="log-item" style={{ marginBottom: '10px' }}>
                <span className="time" style={{ marginRight: '10px', color: '#666' }}>10:07 AM</span>
                <span className="action">Order for <b>Rice & Chicken</b> received!</span>
              </div>
              <div className="log-item">
                <span className="time" style={{ marginRight: '10px', color: '#666' }}>10:08 AM</span>
                <span className="action">Invoice #4402 sent to customer.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsApp;