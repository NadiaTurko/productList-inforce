import styles from "./ProductListHeader.module.css";

export default function ProductListHeader({
  onAdd,
  sortBy,
  onSortChange,
  sortOptions,
}) {
  return (
    <div className={styles.headerBar}>
      <button className={styles.addBtn} onClick={onAdd}>
        Add Product
      </button>
      <div className={styles.sortContainer}>
        <label className={styles.sortLabel} htmlFor="sort-select">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={onSortChange}
          className={styles.sortSelect}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
