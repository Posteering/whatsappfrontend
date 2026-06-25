
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { FiSmartphone, FiShoppingBag, FiLayers, FiActivity, FiSearch, FiCheckCircle } from "react-icons/fi";
import '../App.css';

 
const LandingPage = () => { 
  const navigate = useNavigate();


  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 8%', alignItems: 'center', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-orange)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <HiOutlineSparkles size={24} /> WA.VENDOR
        </div>
        
        <div className="nav-links">
          <a href="#solutions">Solutions</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
        </div>

        <button onClick={() => navigate("/login")}className="btn-pill btn-green-outline" style={{padding: '10px 25px'}}>Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', padding: '80px 8%', alignItems: 'center', gap: '40px' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px', fontWeight: '800' }}>
            <span style={{ color: 'var(--primary-green)' }}>Automate with AI.</span> <br />
            Get More Orders. <br />
            <span style={{ color: 'var(--primary-orange)' }}>Grow your Business.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '35px', lineHeight: '1.6', maxWidth: '550px' }}>
            The AI Sarah handles every customer interaction on WhatsApp—listing available vendors, 
            taking orders, and generating invoices,so you never miss a sale!.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'inherit' }}>
          <button onClick={() => navigate("/register")} className="btn-pill btn-orange">Become a Vendor</button>
            <button onClick={() => navigate ('/whatsapp')} className="btn-pill btn-green-outline" style={{background: 'var(--soft-green)', border: 'none'}}>Watch AI Sarah</button>
          </div>
        </div>

        {/* AI Sarah Logic Preview */}
        <div className="chat-preview" style={{ position: 'relative' }}>
          <div className="glass-card" style={{ maxWidth: '320px', margin: '0 auto' }}>
            {/* Step 1: Customer */}
            <div style={{ background: '#F0F0F0', padding: '12px', borderRadius: '15px 15px 15px 0', marginBottom: '15px', fontSize: '0.85rem', width: '85%' }}>
              "I want to order rice and chicken."
            </div>
            
            {/* Step 2: AI Listing Vendors (Sarah Logic) */}
            <div style={{ background: 'var(--soft-green)', padding: '12px', borderRadius: '15px 15px 0 15px', marginBottom: '15px', fontSize: '0.85rem', marginLeft: '15%', border: '1px solid rgba(52,168,83,0.1)' }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-green)', marginBottom: '5px'}}>
                <FiSearch size={14}/> <b>AI Sarah</b>
              </div>
              Listing vendors for you... <br />
              1. <b>RayFoods</b> (Active) <br />
              2. <b>Mama Put Hub</b> (Offline)
            </div>

            {/* Step 3: Customer selection */}
            <div style={{ background: '#F0F0F0', padding: '12px', borderRadius: '15px 15px 15px 0', marginBottom: '15px', fontSize: '0.85rem', width: '65%' }}>
              "RayFoods please."
            </div>

            {/* Step 4: Final AI Action */}
            <div style={{ background: 'var(--soft-green)', padding: '12px', borderRadius: '15px 15px 0 15px', fontSize: '0.85rem', marginLeft: '15%' }}>
              <b>AI Sarah:</b> "Got it! Adding Rice to cart and generating your invoice..."
            </div>
          </div>

          {/* Floating Vendor Alert */}
          <div className="glass-card" style={{ position: 'absolute', top: '-20px', right: '-10px', padding: '12px 20px', background: 'var(--primary-orange)', color: '#fff', borderRadius: '16px', boxShadow: '0 10px 20px rgba(255,122,0,0.3)' }}>
            <FiShoppingBag size={20} />
            <div style={{fontSize: '0.8rem', marginTop: '5px'}}>
              <b>New Order Received!</b>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section with Elegant Header */}
      <section style={{ padding: '60px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--primary-green)', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>The Blueprint</span>
          <h2 style={{ fontSize: '2.6rem', marginTop: '10px', fontWeight: '800' }}>The Unified Vendor Experience</h2>
        </div>

        <div className="feature-grid">
          <div className="glass-card">
            <FiLayers size={32} color="var(--primary-orange)" />
            <h4 style={{ margin: '15px 0 10px', fontSize: '1.2rem' }}>1. List Products</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Upload items to your custom vendor dashboard in seconds.</p>
          </div>
          <div className="glass-card">
            <FiSmartphone size={32} color="var(--primary-green)" />
            <h4 style={{ margin: '15px 0 10px', fontSize: '1.2rem' }}>2. Connect AI</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Link your WhatsApp. Sarah starts attending to customers 24/7.</p>
          </div>
          <div className="glass-card">
            <FiActivity size={32} color="var(--primary-orange)" />
            <h4 style={{ margin: '15px 0 10px', fontSize: '1.2rem' }}>3. Monitor Growth</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Watch your dashboard fill with automated sales and analytics.</p>
          </div>
          <div className="glass-card">
            <FiCheckCircle size={32} color="var(--primary-green)" />
            <h4 style={{ margin: '15px 0 10px', fontSize: '1.2rem' }}>4. Instant Payouts</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Receive your funds directly after each order confirmation.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA - Theme Based */}
      <footer style={{ padding: '60px 8%', textAlign: 'center' }}>
        <div className="glass-card" style={{ background: 'var(--soft-green)', border: '2px solid var(--primary-green)', padding: '60px 20px', borderRadius: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: '800' }}>Ready to automate your sales?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '35px', fontSize: '1.1rem' }}>Join hundreds of vendors scaling their business with AI Sarah.</p>
         <button onClick={() => navigate("/register")} className="btn-pill btn-orange" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Get Started Today</button>
        </div>
        <p style={{marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.8rem'}}>© 2026 WA.VENDOR. High-Performance AI Sales.</p>
      </footer>
    </div>
  );
};

export default LandingPage;