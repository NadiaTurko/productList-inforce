import React, { useState, useEffect } from "react";
// import "./ProductModal.css";
import styles from "./ProductModal.module.css";

export default function ProductModal({ onSave, onCancel, initialData }) {
  const [form, setForm] = useState({
    imageUrl: "",
    name: "",
    count: "",
    width: "",
    height: "",
    weight: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        imageUrl: initialData.imageUrl || "",
        name: initialData.name || "",
        count: initialData.count !== undefined ? initialData.count : "",
        width: initialData.width !== undefined ? initialData.width : "",
        height: initialData.height !== undefined ? initialData.height : "",
        weight: initialData.weight !== undefined ? initialData.weight : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, count, width, height, weight } = form;
    if (
      !name ||
      count === "" ||
      width === "" ||
      height === "" ||
      weight === ""
    ) {
      setError("All fields except image are required!");
      return;
    }
    if ([count, width, height, weight].some((v) => Number(v) < 0)) {
      setError("All numeric values must be greater than or equal to zero!");
      return;
    }
    setError("");
    onSave({
      ...form,
      count: Number(form.count),
      width: Number(form.width),
      height: Number(form.height),
      weight: Number(form.weight),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="section-separator" />
          <label className="input-label">
            Image: enter a URL or upload from your computer
          </label>
          <div className="image-input-row">
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={handleChange}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {form.imageUrl && form.imageUrl.startsWith("data:image") && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className={styles.imagePreview}
            />
          )}
          <label className="input-label" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="input-label" htmlFor="count">
            Count
          </label>
          <input
            id="count"
            type="number"
            name="count"
            placeholder="Count"
            value={form.count}
            onChange={handleChange}
            min="0"
            required
          />
          <label className="input-label">Size</label>
          <div className="size-group">
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={form.width}
              onChange={handleChange}
              min="0"
              required
              className="size-input"
            />
            <span className="size-x">x</span>
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={form.height}
              onChange={handleChange}
              min="0"
              required
              className="size-input"
            />
          </div>
          <label className="input-label" htmlFor="weight">
            Weight (g)
          </label>
          <input
            id="weight"
            type="number"
            name="weight"
            placeholder="Weight (g)"
            value={form.weight}
            onChange={handleChange}
            min="0"
            required
          />
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-actions">
            <button type="submit">
              {initialData ? "Save Changes" : "Confirm"}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
