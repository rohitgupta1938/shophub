import { useEffect, useState, useCallback } from 'react';
import { getLiked } from '../api';
import ProductCard from '../components/ProductCard';

export default function Liked({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiked = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getLiked();
      setProducts(data);
    } catch {
      showToast('Failed to load liked products', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLiked(); }, [fetchLiked]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Liked products</h2>
          <p>{products.length} saved items</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : products.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">❤️</span>
          <h3>No liked products yet</h3>
          <p>Heart items on the home screen to save them here</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onRefresh={fetchLiked} showToast={showToast} />
          ))}
        </div>
      )}
    </div>
  );
}
