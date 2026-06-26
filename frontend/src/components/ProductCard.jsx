import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import { toggleLike, deleteProduct } from '../api';
import ProductModal from './ProductModal';

export default function ProductCard({ product, onRefresh, showToast }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(product.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(product.likes.length);
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwner = product.author?._id === user._id || product.author === user._id;

  const handleLike = async () => {
    try {
      const { data } = await toggleLike(product._id);
      setLiked(data.liked);
      setLikeCount(data.likes.length);
      showToast(data.liked ? 'Added to liked ❤️' : 'Removed from liked');
    } catch {
      showToast('Something went wrong', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      showToast('Product deleted');
      onRefresh();
    } catch {
      showToast('Could not delete product', 'error');
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="product-card-img">
          <img src={product.image} alt={product.title} />
          <span className="product-card-badge">{product.category}</span>
          <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="product-card-body">
          <p className="product-card-title">{product.title}</p>
          <p className="product-card-desc">{product.description}</p>
          <div className="product-card-footer">
            <span className="product-price">${Number(product.price).toFixed(2)}</span>
            {isOwner && (
              <div className="product-card-actions">
                <button className="btn-icon" onClick={() => setShowEdit(true)} aria-label="Edit product">
                  ✏️
                </button>
                <button
                  className="btn-icon text-3xl"
                  onClick={handleDelete}
                  disabled={deleting}
                  aria-label="Delete product"
                  style={{ color: '#dc2626', fontSize: '14px' }}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <p className="product-likes">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</p>
        </div>
      </div>

      {showEdit && (
        <ProductModal
          product={product}
          onClose={() => setShowEdit(false)}
          onSaved={() => { setShowEdit(false); onRefresh(); showToast('Product updated!'); }}
        />
      )}
    </>
  );
}
