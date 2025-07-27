import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}product/products/`).then((res) => {
      setProducts(res.data.results);
    });
  }, []);

  const addToCart = (productId) => {
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}product/cart/`,
      { product_id: productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };

  return (
    <div className="home-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="product-image"
              />
            )}
            <h4>
              <Link to={`/product/${p.id}`}>{p.name}</Link>
            </h4>
            <p>₹{p.price}</p>

            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}