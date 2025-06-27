import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product }) {
  return (
    <div className={styles.container}>
      <div>
        {product.imageUrl &&
        (product.imageUrl.startsWith("http") ||
          product.imageUrl.startsWith("data:image")) ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
      <div>
        <p>
          <b>Quantity:</b> {product.count}
        </p>
        <p>
          <b>Size:</b> {product.width} x {product.height}
        </p>
        <p>
          <b>Weight:</b> {product.weight} g
        </p>
      </div>
    </div>
  );
}
