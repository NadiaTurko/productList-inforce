import React, { useState, useEffect } from "react";
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
    <div className={styles["modal-backdrop"]}>
      <div className={styles.modal}>
        <h2>{initialData ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.sectionSeparator} />
          <label className={styles.inputLabel}>
            Image: enter a URL or upload from your computer
          </label>
          <div className={styles.imageInputRow}>
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
          <label className={styles.inputLabel} htmlFor="name">
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
          <label className={styles.inputLabel} htmlFor="count">
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
          <label className={styles.inputLabel}>Size</label>
          <div className={styles.sizeGroup}>
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={form.width}
              onChange={handleChange}
              min="0"
              required
              className={styles.sizeInput}
            />
            <span className={styles.sizeX}>x</span>
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={form.height}
              onChange={handleChange}
              min="0"
              required
              className={styles.sizeInput}
            />
          </div>
          <label className={styles.inputLabel} htmlFor="weight">
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
          {error && <div className={styles.modalError}>{error}</div>}
          <div className={styles.modalActions}>
            <button className={styles.modalBtnSbm} type="submit">
              {initialData ? "Save Changes" : "Confirm"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={styles.modalBtnCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
