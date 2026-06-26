import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyProducts, getLiked, deleteProduct } from '../api';
import ProductModal from '../components/ProductModal';

export default function Profile({ showToast }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState([]);
  const [likedCount, setLikedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mine, liked] = await Promise.all([getMyProducts(), getLiked()]);
      setMyProducts(mine.data);
      setLikedCount(liked.data.length);
    } catch {
      showToast('Failed to load profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      showToast('Product deleted');
      fetchData();
    } catch {
      showToast('Could not delete product', 'error');
    }
  };

  return (
    <div className="page">
      <div className="profile-card">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div className="profile-avatar">{initials}</div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{user.name}</h2>
          <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{user.email}</p>
             <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{user.mobile}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-value">{myProducts.length}</p>
            <p className="stat-label">Products added</p>
          </div>
          <div className="stat-card">
            <p className="stat-value" style={{ color: '#dc2626' }}>{likedCount}</p>
            <p className="stat-label">Liked items</p>
          </div>
        </div>

        {!loading && myProducts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#555', marginBottom: 12 }}>
              Your products
            </h3>
            {myProducts.map((p) => (
              <div
                key={p._id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: '1px solid #f0f0f0'
                }}
              >
                <img src={p.image} alt={p.title} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</p>
                  <p style={{ fontSize: 12, color: '#666' }}>${Number(p.price).toFixed(2)} · {p.category}</p>
                </div>
                <button className="btn-icon" onClick={() => setEditProduct(p)} aria-label="Edit">✏️</button>
                <button className="btn-icon" onClick={() => handleDelete(p._id)} aria-label="Delete" style={{ color: '#dc2626' }}>🗑</button>
              </div>
            ))}
          </div>
        )}

        <button className="btn btn-danger btn-full" onClick={handleLogout}>
          Sign out
        </button>
      </div>

      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSaved={() => { setEditProduct(null); fetchData(); showToast('Product updated!'); }}
        />
      )}
    </div>
  );
}
