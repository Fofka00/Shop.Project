import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { IProduct } from "../../../Shared/types";
import { IProductEntity } from "../../../Shared/types";
import '../App.css';

const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => {
    const matchesTitle = title ? p.title.toLowerCase().includes(title.toLowerCase()) : true;
    const matchesPriceFrom = priceFrom ? p.price >= Number(priceFrom) : true;
    const matchesPriceTo = priceTo ? p.price <= Number(priceTo) : true;
    return matchesTitle && matchesPriceFrom && matchesPriceTo;
  });

  if (loading) return <Loader />;
  

  return (
    <div className="centered-container">
      <h2>Список товаров ({filtered.length})</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Цена от"
          type="number"
          value={priceFrom}
          onChange={e => setPriceFrom(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Цена до"
          type="number"
          value={priceTo}
          onChange={e => setPriceTo(e.target.value)}
        />
      </div>
      <ul>
        {filtered.map(p => (
          <li key={p.id}>
            <div style={{ cursor: "pointer" }} onClick={() => navigate(`/products/${p.id}`)}>
              <b>{p.title}</b> — {p.price}₽
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsListPage;