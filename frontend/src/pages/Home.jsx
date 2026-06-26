import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Kitchen', 'Other'];

export default function Home({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(category === 'All' ? '' : category);
      setProducts(data);
    } catch {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Products</h2>
          <p>{products.length} items available</p>
        </div>
      </div>

      <div className="filter-bar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner" />
      ) : products.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">📦</span>
          <h3>No products found</h3>
          <p>Try a different category or add the first one!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onRefresh={fetchProducts} showToast={showToast} />
          ))}
        </div>
      )}
    </div>
  );
}
