import api from './api';

// REGISTER: Sends vendor data to PostgreSQL
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Save the session
  }
  return response.data;
};

// LOGIN: Checks credentials against PostgreSQL
export const loginUser = async (vendor_id, phone_number) => {
  // Use absolute URL since backend is on 8000
  const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1';
  const response = await fetch(`${BASE}/vendor/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vendor_id, phone_number })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Invalid login credentials");
  }
  
  if (data.status === "success") {
    localStorage.setItem('vendor_id',       data.vendor_id);
    localStorage.setItem('vendor_name',     data.vendor_name  || 'Your Business');
    localStorage.setItem('owner_name',      data.owner_name   || '');
    localStorage.setItem('vendor_location', data.location     || '');
    localStorage.setItem('vendor_rating',   data.rating       || '');
    if (data.payment_account) {
      localStorage.setItem('payment_account', JSON.stringify(data.payment_account));
    }
  }
  return data;
};

// LOGOUT: Clears the session
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};