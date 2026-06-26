import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function Navbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [showAdd, setShowAdd] = useState(false);

  if (!user) return null;

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <span>🛍</span>
            <span>ShopHub</span>
          </Link>
          <div className="navbar-nav">
            <Link to="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`}>
              🏠 Home
            </Link>
            <Link to="/liked" className={`nav-btn ${pathname === '/liked' ? 'active' : ''}`}>
              ❤️ Liked
            </Link>
            <Link to="/profile" className={`nav-btn ${pathname === '/profile' ? 'active' : ''}`}>
              👤 Profile
            </Link>
            <button className="nav-btn nav-btn-primary" onClick={() => setShowAdd(true)}>
              ＋ Add Product
            </button>
          </div>
        </div>
      </nav>
      {showAdd && (
        <ProductModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); window.location.reload(); }}
        />
      )}
    </>
  );
}
