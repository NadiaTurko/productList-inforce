import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments, createComment, deleteComment } from "../services/api";

export const fetchCommentsThunk = createAsyncThunk(
  "comments/fetchByProduct",
  async (productId) => {
    const res = await fetchComments(productId);
    return { productId, comments: res.data ? res.data : res };
  }
);

export const addCommentThunk = createAsyncThunk(
  "comments/add",
  async ({ productId, comment }) => {
    const res = await createComment(productId, comment);
    return { productId, comment: res.data ? res.data : res };
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "comments/delete",
  async ({ productId, commentId }) => {
    await deleteComment(productId, commentId);
    return { productId, commentId };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byProduct: {}, // { [productId]: [comments] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.byProduct[action.payload.productId] = action.payload.comments;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        const { productId, comment } = action.payload;
        if (!state.byProduct[productId]) state.byProduct[productId] = [];
        state.byProduct[productId].push(comment);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        const { productId, commentId } = action.payload;
        if (state.byProduct[productId]) {
          state.byProduct[productId] = state.byProduct[productId].filter(
            (c) => c.id !== commentId
          );
        }
      });
  },
});

export default commentsSlice.reducer;
