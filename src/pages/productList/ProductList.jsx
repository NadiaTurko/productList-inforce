import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../store/productsSlice";
import ProductGrid from "../../components/product/ProductGrid/ProductGrid";
import ProductListHeader from "../../components/product/ProductListHeader/ProductListHeader";
import ProductModal from "../../components/product/ProductModal/ProductModal";
import ConfirmModal from "../../components/common/ConfirmModal/ConfirmModal";
import styles from "./ProductList.module.css";

const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "count", label: "Count (descending)" },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [deleteId, setDeleteId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    await dispatch(deleteProductThunk(deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => setDeleteId(null);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleAddProduct = async (data) => {
    await dispatch(addProductThunk(data));
    setShowModal(false);
    setSuccessMsg("Product successfully added!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleUpdateProduct = async (data) => {
    await dispatch(updateProductThunk({ id: editProduct.id, product: data }));
    setEditProduct(null);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name) || b.count - a.count);
    } else if (sortBy === "count") {
      sorted.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    }
    return sorted;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      <ProductListHeader
        onAdd={() => setShowModal(true)}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        sortOptions={SORT_OPTIONS}
      />
      <ProductGrid
        products={getSortedProducts()}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {showModal && (
        <ProductModal
          onSave={handleAddProduct}
          onCancel={() => setShowModal(false)}
        />
      )}
      {editProduct && (
        <ProductModal
          initialData={editProduct}
          onSave={handleUpdateProduct}
          onCancel={() => setEditProduct(null)}
        />
      )}
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
