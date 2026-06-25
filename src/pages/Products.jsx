import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mature sample data with high-quality images
  const products = [
    { 
      id: 1, 
      name: 'Smokey Jollof Rice', 
      price: '4,500', 
      category: 'Main Dish',
      img: 'https://images.unsplash.com/photo-1644342566113-1789c676774e?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 2, 
      name: 'Berry Blast Smoothie', 
      price: '2,800', 
      category: 'Drinks',
      img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 3, 
      name: 'Gourmet Beef Burger', 
      price: '5,500', 
      category: 'Fast Food',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' 
    }
  ];

  if (loading) return (
    <div className="catalog-container">
      <div className="catalog-header">
        <div style={{ width: '100%' }}>
          <div className="skeleton skeleton-title" style={{ width: '300px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
        </div>
      </div>
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card" style={{ height: '250px' }}></div>
        <div className="skeleton skeleton-card" style={{ height: '250px' }}></div>
        <div className="skeleton skeleton-card" style={{ height: '250px' }}></div>
      </div>
    </div>
  );

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <div>
          <h1>Product Catalog</h1>
          <p>You have {products.length} active items Sarah is selling.</p>
        </div>
        <button className="btn-pill btn-orange" onClick={() => navigate('/add-product')}>
          <FiPlus /> Add New Product
        </button>
      </div>

      <div className="catalog-grid">
        {products.map(item => (
          <div key={item.id} className="catalog-card">
            <div className="card-image-wrapper">
              <img src={item.img} alt={item.name} />
              <div className="image-overlay">
                 <button className="overlay-btn"><FiEdit2 /> Edit</button>
                 <button className="overlay-btn delete-btn"><FiTrash2 /> Delete</button>
              </div>
            </div>
            
            <div className="card-details">
              <div className="card-top">
                <span className="cat-tag">{item.category}</span>
                <span className="price-tag">₦{item.price}</span>
              </div>
              <h4>{item.name}</h4>
              <div className="card-footer">
                <span className="ai-status"><FiExternalLink /> View on WA</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;