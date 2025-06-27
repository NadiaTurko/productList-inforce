import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCommentsThunk,
  addCommentThunk,
} from "../../../store/commentsSlice";
import CommentList from "../../comment/CommentList/CommentList";
import CommentForm from "../../comment/CommentForm/CommentForm";
import styles from "./ProductComments.module.css";

export default function ProductComments({ productId }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.comments.byProduct[productId] || []
  );
  const commentsLoading = useSelector((state) => state.comments.loading);
  const commentsError = useSelector((state) => state.comments.error);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCommentsThunk(productId));
  }, [dispatch, productId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    await dispatch(
      addCommentThunk({
        productId,
        comment: {
          description: commentText,
          date: new Date().toLocaleString(),
        },
      })
    );
    setCommentText("");
    setCommentLoading(false);
  };

  return (
    <>
      <h3 className={styles.commentsTitle}>Comments</h3>
      <CommentForm
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onSubmit={handleAddComment}
        loading={commentLoading || commentsLoading}
      />
      <div className={styles.commentsBlock}>
        {commentsError && <div className={styles.error}>{commentsError}</div>}
        <CommentList comments={comments} />
      </div>
    </>
  );
}
