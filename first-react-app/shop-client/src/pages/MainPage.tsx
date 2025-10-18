import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import '../App.css';

const MainPage: React.FC = () => {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(products => {
      setCount(products.length);
      setSum(products.reduce((acc, p) => acc + Number(p.price || 0), 0));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="centered-container">
      <h1>Shop.Client</h1>
      <p>
        В базе данных находится {count} товаров общей стоимостью {sum}₽
      </p>
      <button onClick={() => navigate("/products-list")}>Перейти к списку товаров</button>
      <br />
      <a href="http://localhost:4000/admin" target="_blank" rel="noopener noreferrer" >Перейти в систему администрирования</a>
    </div>
  );
};

export default MainPage;