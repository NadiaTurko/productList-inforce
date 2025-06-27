import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../services/api";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo";
import ProductComments from "../../components/product/ProductComments/ProductComments";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProduct(id).then((prodRes) => {
      setProduct(prodRes.data ? prodRes.data : prodRes);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="card">
      <button onClick={() => navigate(-1)} className="backBtn">
        &larr; Back
      </button>
      <h2 className="heading">{product.name}</h2>
      <ProductInfo product={product} />
      <hr className="hr" />
      <ProductComments productId={product.id} />
    </div>
  );
}
