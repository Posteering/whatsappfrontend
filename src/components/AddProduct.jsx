import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiImage, FiPlusCircle } from 'react-icons/fi';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="add-product-wrapper">
      <div className="add-product-card">
        <button className="back-btn-simple" onClick={() => navigate('/products')}>
          <FiArrowLeft /> Back to Catalog
        </button>
        
        <div className="form-head">
          <h2>Add New Product</h2>
          <p>Enter the details for Sarah to list on WhatsApp.</p>
        </div>

        <form className="add-product-form">
          <div className="image-upload-box">
             <FiImage size={40} color="var(--text-muted)" />
             <p>Upload Product Image</p>
             <input type="file" className="file-input-hidden" />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" placeholder="e.g. Jollof Rice & Plantain" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₦)</label>
              <input type="number" placeholder="0.00" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Main Dish</option>
                <option>Drinks</option>
                <option>Sides</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Product Description (Tell Sarah about this)</label>
            <textarea rows="4" placeholder="Mention ingredients or special details..."></textarea>
          </div>

          <button type="submit" className="btn-pill btn-orange full-width">
            <FiPlusCircle /> List Product on AI Sarah
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;