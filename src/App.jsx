import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Home from "./pages/Home";
import ProductList from "./pages/productList/ProductList";
import ProductDetail from "./pages/productDetail/ProductDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
