import styles from "./CommentList.module.css";

export default function CommentList({ comments }) {
  if (!comments.length) return <div>No comments yet.</div>;
  return (
    <ul className={styles.commentList}>
      {comments.map((c) => (
        <li key={c.id} className={styles.item}>
          <span className={styles.author}>"Comment":</span>
          {c.description}
          {c.date && <span className={styles.date}> ({c.date})</span>}
        </li>
      ))}
    </ul>
  );
}
