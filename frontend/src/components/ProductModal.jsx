import { useState } from "react";
import { createProduct, updateProduct } from "../api";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Kitchen",
  "Other",
];

export default function ProductModal({ product, onClose, onSaved, showToast }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    category: product?.category || "Electronics",
    image: product?.image || "",
    description: product?.description || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    const { title, price, category, description,image } = form;
    if (!title || !price || !category || !description) {
      setError("Please fill in all required fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setError("Enter a valid price");
      return;
    }
    if (!image.startsWith("http")) {
      showToast("Invalid Image URL");
    }
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await updateProduct(product._id, {
          ...form,
          price: Number(form.price),
        });
      } else {
        await createProduct({ ...form, price: Number(form.price) });
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? "Edit product" : "Add product"}</h3>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="form-group">
          <label>Product name *</label>
          <input
            value={form.title}
            onChange={set("title")}
            placeholder="e.g. Wireless Mouse"
          />
        </div>
        <div className="form-group">
          <label>Price (USD) *</label>
          <input
            type="number"
            value={form.price}
            onChange={set("price")}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Category *</label>
          <select value={form.category} onChange={set("category")}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Image URL{" "}
            <span style={{ color: "#999", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            value={form.image}
            onChange={set("image")}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea
            value={form.description}
            onChange={set("description")}
            placeholder="Describe the product..."
          />
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Add product"}
          </button>
        </div>
      </div>
    </div>
  );
}
