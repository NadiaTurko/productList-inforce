import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, onDelete, onEdit }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
