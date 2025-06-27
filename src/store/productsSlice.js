import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetchProducts();
    return res.data ? res.data : res;
  }
);

export const addProductThunk = createAsyncThunk(
  "products/add",
  async (product) => {
    const res = await createProduct(product);
    return res.data ? res.data : res;
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, product }) => {
    const res = await updateProduct(id, product);
    return res.data ? res.data : res;
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
