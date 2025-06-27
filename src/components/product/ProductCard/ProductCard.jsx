import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.imageUrl &&
        (product.imageUrl.startsWith("http") ||
          product.imageUrl.startsWith("data:image")) ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Quantity: {product.count}</p>
        <p>
          Size: {product.width} x {product.height}
        </p>
        <p>Weight: {product.weight} g</p>
      </div>
      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="view-btn">
          View
        </Link>
        <button className="edit-btn" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
