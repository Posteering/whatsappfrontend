import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { FiSmartphone, FiActivity, FiSearch, FiShoppingBag } from "react-icons/fi";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* Hero Section - Same UI as Landing but with Vendor Actions */}
      <section className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', padding: '80px 8%', alignItems: 'center', gap: '40px' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px', fontWeight: '800' }}>
            <span style={{ color: 'var(--primary-green)' }}>Automate with AI.</span> <br />
            Get More Orders. <br />
            <span style={{ color: 'var(--primary-orange)' }}>Grow your Business.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '35px', lineHeight: '1.6', maxWidth: '550px' }}>
            Welcome back! AI Sarah is ready. Use the buttons below to sync your WhatsApp, 
            track your growth, or see Sarah's latest chat logs.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button className="btn-pill btn-orange" onClick={() => navigate('/whatsapp')}>
              Connect to AI <FiSmartphone />
            </button>
            <button className="btn-pill btn-green-outline" onClick={() => navigate('/dashboard')}>
              View Analytics <FiActivity />
            </button>
            <button className="btn-pill" style={{background: '#f0f0f0', border: 'none'}} onClick={() => navigate('/whatsapp')}>
              Watch AI Sarah
            </button>
          </div>
        </div>

        {/* AI Logic Preview (Consistent with Landing) */}
        <div className="chat-preview" style={{ position: 'relative' }}>
          <div className="glass-card" style={{ maxWidth: '320px', margin: '0 auto' }}>
            <div style={{ background: '#F0F0F0', padding: '12px', borderRadius: '15px 15px 15px 0', marginBottom: '15px', fontSize: '0.85rem' }}>
              "Searching for RayFoods menu..."
            </div>
            <div style={{ background: 'var(--soft-green)', padding: '12px', borderRadius: '15px 15px 0 15px', fontSize: '0.85rem', marginLeft: '15%', border: '1px solid rgba(52,168,83,0.1)' }}>
              <b>AI Sarah:</b> "Orders are being processed automatically while you view this page!"
            </div>
          </div>
          <div className="glass-card" style={{ position: 'absolute', top: '-20px', right: '-10px', padding: '12px 20px', background: 'var(--primary-orange)', color: '#fff', borderRadius: '16px' }}>
            <FiShoppingBag size={20} />
            <div style={{fontSize: '0.8rem', marginTop: '5px'}}><b>AI Active</b></div>
          </div>
        </div>
      </section>

      {/* Feature Section (Stay consistent) */}
      <section style={{ padding: '60px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--primary-green)', fontWeight: 'bold', fontSize: '0.8rem' }}>VENDOR CONSOLE</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>The Unified Vendor Experience</h2>
        </div>
        {/* Reuse your 4-card feature row here */}
      </section>

      {/* Footer CTA - Modified for Logged In User */}
      <footer style={{ padding: '60px 8%', textAlign: 'center' }}>
        <div className="glass-card" style={{ background: 'var(--soft-green)', border: '2px solid var(--primary-green)', padding: '60px 20px', borderRadius: '40px' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '15px' }}>Ready to check your progress?</h2>
          <button className="btn-pill btn-orange" style={{ padding: '15px 45px' }} onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;