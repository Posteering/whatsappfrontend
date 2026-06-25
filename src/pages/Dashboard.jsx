import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiShoppingBag, FiDollarSign, FiPackage, FiTrash2,
  FiLogOut, FiRefreshCw, FiHome, FiList, FiGrid,
  FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock,
  FiX
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import './Dashboard.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1';

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="stat-card-pro">
    <div className="stat-icon-wrap" style={{ background: color + '18', color }}>
      {icon}
    </div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      <h3 className="stat-value">{value}</h3>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  </div>
);

const statusConfig = {
  pending:   { label: 'Pending',   color: '#f59e0b', bg: '#fef3c7' },
  paid:      { label: 'Paid',      color: '#10b981', bg: '#d1fae5' },
  new:       { label: 'New',       color: '#FF7A00', bg: '#fff5ee' },
  completed: { label: 'Completed', color: '#34A853', bg: '#e8f5e9' },
  cancelled: { label: 'Cancelled', color: '#ef4444', bg: '#fee2e2' },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status?.toLowerCase()] || { label: status, color: '#666', bg: '#f5f5f5' };
  return (
    <span className="status-badge-pro" style={{ color: cfg.color, background: cfg.bg }}>
      {cfg.label}
    </span>
  );
};

const EmptyState = ({ icon, title, sub }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <p className="empty-title">{title}</p>
    <p className="empty-sub">{sub}</p>
  </div>
);

const Modal = ({ title, message, type, onClose, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-box" onClick={e => e.stopPropagation()}>
      {!children && (
        <>
          <div className={`modal-icon-wrap ${type}`}>
            {type === 'danger' ? <FiAlertCircle size={28} /> : <FiCheckCircle size={28} />}
          </div>
          <h3>{title}</h3>
          <p>{message}</p>
        </>
      )}
      {children}
      {!children && (
        <div className="modal-actions">
          {type === 'danger' ? (
            <>
              <button className="btn-pill btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn-pill btn-danger" onClick={onClose} id="confirm-delete">Yes, Delete</button>
            </>
          ) : (
            <button className="btn-pill btn-orange" onClick={onClose}>Got It</button>
          )}
        </div>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [vendorId]       = useState(localStorage.getItem('vendor_id') || '');
  const [vendorName]     = useState(localStorage.getItem('vendor_name') || 'Your Business');
  const [ownerName]      = useState(localStorage.getItem('owner_name') || '');
  const [vendorLocation] = useState(localStorage.getItem('vendor_location') || '');
  const [vendorRating]   = useState(localStorage.getItem('vendor_rating') || '');
  const [data, setData]  = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', image_url: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefresh = false) => {
    if (!vendorId) { navigate('/'); return; }
    if (showRefresh) setRefreshing(true); else setLoading(true);
    try {
      const [txRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/vendor/${vendorId}/transactions`),
        fetch(`${API_BASE}/vendor/${vendorId}/catalog`),
      ]);
      const txJson  = await txRes.json();
      const catJson = await catRes.json();
      setData(txJson);
      setCatalog(catJson.catalog || []);
    } catch (e) {
      setError('Could not reach the server. Make sure the backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('vendor_id');
    localStorage.removeItem('vendor_name');
    navigate('/');
  };

  const handleDeleteRequest = () => {
    setModal({
      type: 'danger',
      title: 'Delete Account?',
      message: 'This will permanently erase your vendor profile, all catalog items, and orders. This action cannot be undone.',
      onConfirm: async () => {
        await fetch(`${API_BASE}/vendor/${vendorId}`, { method: 'DELETE' });
        localStorage.clear();
        navigate('/');
      }
    });
  };

  // Wire up the real confirm button inside the modal
  useEffect(() => {
    if (!modal) return;
    const btn = document.getElementById('confirm-delete');
    if (btn && modal.onConfirm) {
      const handler = () => { setModal(null); modal.onConfirm(); };
      btn.addEventListener('click', handler);
      return () => btn.removeEventListener('click', handler);
    }
  }, [modal]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch(`${API_BASE}/vendor/${vendorId}/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItem.name,
          price: parseFloat(newItem.price),
          description: newItem.description || null,
          image_url: newItem.image_url || null
        })
      });
      if (res.ok) {
        setShowAddItem(false);
        setNewItem({ name: '', price: '', description: '', image_url: '' });
        fetchData(true);
      } else {
        alert("Failed to add item");
      }
    } catch (e) {
      console.error(e);
      alert("Error adding item");
    }
    setIsAdding(false);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API_BASE}/vendor/${vendorId}/catalog/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData(true);
      } else {
        alert("Failed to delete item");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Stats derived from data
  const totalOrders   = data?.transactions?.length || 0;
  const totalRevenue  = data?.transactions?.reduce((s, t) => s + (t.total_amount || 0), 0) || 0;
  const catalogCount  = catalog.length;
  const paidOrders    = data?.transactions?.filter(t => t.status?.toLowerCase() === 'paid').length || 0;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) return (
    <div className="dash-root">
      <aside className="dash-sidebar">
        <div className="skeleton skeleton-title" style={{ width: '80%', marginBottom: 40 }}></div>
        <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
      </aside>
      <main className="dash-main">
        <header className="dash-topbar">
          <div style={{ width: '100%' }}>
            <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
            <div className="skeleton skeleton-title" style={{ width: '300px' }}></div>
          </div>
        </header>
        <section className="tab-section dash-loading skeleton-loading">
          <div className="skeleton-grid">
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
            <div className="skeleton skeleton-card"></div>
          </div>
          <div className="skeleton skeleton-title" style={{ width: '30%', marginTop: 40 }}></div>
          <div className="skeleton skeleton-card" style={{ height: 300 }}></div>
        </section>
      </main>
    </div>
  );

  if (error) return (
    <div className="dash-loading">
      <FiAlertCircle size={48} color="#ef4444" />
      <p style={{ color: '#ef4444', marginTop: 16 }}>{error}</p>
      <button className="btn-pill btn-orange" style={{ marginTop: 16 }} onClick={() => fetchData()}>
        Retry
      </button>
    </div>
  );

  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          <HiOutlineSparkles size={22} />
          <span>WA.VENDOR</span>
        </div>

        {/* Vendor Profile Card in Sidebar */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {ownerName ? ownerName[0].toUpperCase() : vendorName[0].toUpperCase()}
          </div>
          <div className="sidebar-profile-info">
            {ownerName && <span className="sidebar-owner-name">{ownerName}</span>}
            <span className="sidebar-biz-name">{vendorName}</span>
            {vendorLocation && <span className="sidebar-location">📍 {vendorLocation}</span>}
            {vendorRating && <span className="sidebar-rating">⭐ {vendorRating}</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'overview',      label: 'Overview',     icon: <FiHome />    },
            { id: 'catalog',       label: 'Catalogue',    icon: <FiGrid />    },
            { id: 'transactions',  label: 'Transactions', icon: <FiList />    },
          ].map(item => (
            <button
              key={item.id}
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link danger" onClick={handleDeleteRequest}>
            <FiTrash2 /> <span>Delete Account</span>
          </button>
          <button className="sidebar-link" onClick={handleLogout}>
            <FiLogOut /> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dash-main">
        {/* TOPBAR */}
        <header className="dash-topbar">
          <div>
            <p className="topbar-greeting">
              {getGreeting()}{ownerName ? `, ${ownerName}` : ''} 👋
            </p>
            <h1 className="topbar-title">{vendorName}</h1>
            {vendorLocation && <p className="topbar-sub">📍 {vendorLocation}</p>}
          </div>
          <button
            className={`btn-pill btn-ghost refresh-btn ${refreshing ? 'spinning' : ''}`}
            onClick={() => fetchData(true)}
            title="Refresh data"
          >
            <FiRefreshCw size={16} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <section className="tab-section">
            <div className="stats-grid">
              <StatCard icon={<FiShoppingBag size={20}/>}  label="Total Orders"   value={totalOrders}  sub="All time"          color="#FF7A00" />
              <StatCard icon={<FiDollarSign size={20}/>}   label="Total Revenue"  value={`₦${totalRevenue.toLocaleString()}`} sub="Paid orders only" color="#34A853" />
              <StatCard icon={<FiPackage size={20}/>}      label="Catalogue Items" value={catalogCount} sub="Active listings"   color="#6366f1" />
              <StatCard icon={<FiTrendingUp size={20}/>}   label="Paid Orders"    value={paidOrders}   sub="Completed"         color="#0ea5e9" />
            </div>

            {/* Recent snapshot */}
            <div className="section-block">
              <div className="section-header">
                <h2>Recent Transactions</h2>
                <button className="text-link" onClick={() => setActiveTab('transactions')}>View all →</button>
              </div>
              {data?.transactions?.length === 0 ? (
                <EmptyState icon={<FiList size={36}/>} title="No transactions yet" sub="Once customers place orders, they will appear here." />
              ) : (
                <table className="pro-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.transactions?.slice(0, 5).map(tx => (
                      <tr key={tx.order_id}>
                        <td><span className="mono">#{tx.order_id?.split('-')[0]?.toUpperCase()}</span></td>
                        <td><StatusBadge status={tx.status} /></td>
                        <td className="amount-cell">₦{tx.total_amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Catalog snapshot */}
            <div className="section-block">
              <div className="section-header">
                <h2>Your Catalogue</h2>
                <button className="text-link" onClick={() => setActiveTab('catalog')}>View all →</button>
              </div>
              {catalog.length === 0 ? (
                <EmptyState icon={<FiGrid size={36}/>} title="Catalogue is empty" sub='Ask VIOLET to add a menu item by saying "Add item" on WhatsApp.' />
              ) : (
                <div className="catalog-grid-mini">
                  {catalog.slice(0, 4).map(item => (
                    <div className="catalog-mini-card" key={item.id}>
                      {item.image_url
                        ? <img src={item.image_url} alt={item.name} className="catalog-mini-img" />
                        : <div className="catalog-mini-placeholder"><FiPackage size={28}/></div>
                      }
                      <div className="catalog-mini-info">
                        <span className="catalog-mini-name">{item.name}</span>
                        <span className="catalog-mini-price">₦{item.price?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      {/* CATALOGUE TAB */}
        {activeTab === 'catalog' && (
          <section className="tab-section">
            <div className="section-block">
              <div className="section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2>Menu Catalogue</h2>
                  <span className="count-pill">{catalogCount} items</span>
                </div>
                <button className="btn-pill btn-orange" onClick={() => setShowAddItem(true)}>
                  + Add Item
                </button>
              </div>
              {catalog.length === 0 ? (
                <EmptyState icon={<FiGrid size={44}/>} title="No items yet" sub='Click "Add Item" to add your first product.' />
              ) : (
                <div className="table-responsive">
                  <table className="pro-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalog.map(item => (
                        <tr key={item.id}>
                          <td>
                            {item.image_url
                              ? <img src={item.image_url} alt={item.name} className="table-thumb" />
                              : <div className="table-thumb-placeholder"><FiPackage /></div>
                            }
                          </td>
                          <td><strong>{item.name}</strong></td>
                          <td className="amount-cell">₦{item.price?.toLocaleString()}</td>
                          <td className="muted-cell">{item.description || '—'}</td>
                          <td>
                            <button className="icon-btn danger" onClick={() => handleDeleteItem(item.id)} title="Delete item">
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === 'transactions' && (
          <section className="tab-section">
            <div className="section-block">
              <div className="section-header">
                <h2>Transaction History</h2>
                <span className="count-pill">{totalOrders} orders</span>
              </div>
              {data?.transactions?.length === 0 ? (
                <EmptyState icon={<FiDollarSign size={44}/>} title="No transactions yet" sub="Orders from customers will appear here once they are placed." />
              ) : (
                <div className="table-responsive">
                  <table className="pro-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.transactions?.map(tx => (
                        <tr key={tx.order_id}>
                          <td><span className="mono">#{tx.order_id?.split('-')[0]?.toUpperCase()}</span></td>
                          <td><StatusBadge status={tx.status} /></td>
                          <td className="amount-cell">₦{tx.total_amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* MODAL */}
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() => setModal(null)}
        />
      )}

      {showAddItem && (
        <Modal onClose={() => setShowAddItem(false)}>
          <div className="add-item-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Add New Item</h3>
              <button className="icon-btn" onClick={() => setShowAddItem(false)}><FiX size={20}/></button>
            </div>
            <form onSubmit={handleAddItem} className="add-item-form">
              <div className="form-group">
                <label>Item Name *</label>
                <input type="text" required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="e.g., Jollof Rice" />
              </div>
              <div className="form-group">
                <label>Price (₦) *</label>
                <input type="number" required min="0" step="0.01" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} placeholder="e.g., 2500" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} placeholder="Brief description of the item..."></textarea>
              </div>
              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input type="url" value={newItem.image_url} onChange={e => setNewItem({...newItem, image_url: e.target.value})} placeholder="https://example.com/image.jpg" />
              </div>
              <div className="modal-actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn-pill btn-ghost" onClick={() => setShowAddItem(false)}>Cancel</button>
                <button type="submit" className="btn-pill btn-orange" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;