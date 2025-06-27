import styles from "./CommentForm.module.css";

export default function CommentForm({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Add a comment..."
        className={styles.input}
      />
      <button type="submit" disabled={loading}>
        Add
      </button>
    </form>
  );
}
