import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct, fetchSimilarProducts, fetchProductComments, addComment } from "../api/products";
import Loader from "../components/Loader";
import { IProduct, IComment } from "../../../Shared/types"; 
import '../App.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [similar, setSimilar] = useState<IProduct[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", body: "" });
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

useEffect(() => {
  if (!id) return;

  setLoading(true);

  const load = async () => {
    try {
      const prod = await fetchProduct(id);
      setProduct(prod);

      try {
        const sim = await fetchSimilarProducts(id);
        setSimilar(sim);
      } catch (e) {
        console.error('Error loading similar products:', e);
        setSimilar([]); 
      }

      try {
        const comms = await fetchProductComments(id);
        setComments(comms);
      } catch (e) {
        console.error('Error loading comments:', e);
        setComments([]);
      }

    } catch (e) {
      console.error('Error loading product:', e);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setCommentLoading(true);
    setCommentError(null);
    try {
      await addComment({ ...commentForm, productId: id });
      setCommentForm({ name: "", email: "", body: "" });
      const comms = await fetchProductComments(id);
      setComments(comms);
    } catch (err: any) {
      setCommentError(err?.response?.data || "Ошибка при добавлении комментария");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="centered-container">
      <button onClick={() => navigate(-1)}>Назад</button>
      <h2>{product.title}</h2>
      <div>Цена: {product.price}₽</div>
      <div>Описание: {product.description}</div>
      <div>
        <h4>Изображения:</h4>
        {product.images && product.images.length > 0 ? (
          <div style={{ display: "flex", gap: 8 }}>
            {product.images.map(img => (
              <img
                key={img.id}
                src={img.url}
                alt="product"
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
              />
            ))}
          </div>
        ) : (
          <div>Нет изображений</div>
        )}
      </div>
      <h3>Похожие товары:</h3>
      <ul>
        {similar.length === 0 && <li>Нет похожих товаров</li>}
        {similar.map(s => (
          <li key={s.id}>
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => navigate(`/products/${s.id}`)}
            >
              {s.title} ({s.price}₽)
            </span>
          </li>
        ))}
      </ul>
      <h3>Комментарии:</h3>
            <ul>
        {Array.isArray(comments) && comments.length === 0 && <li>Нет комментариев</li>}
        {Array.isArray(comments) && comments.map(c => (
          <li key={c.id}>
            <b>{c.name}</b> ({c.email}):<br />
            {c.body}
          </li>
        ))}
      </ul>
      <h4>Добавить комментарий</h4>
      <form onSubmit={handleCommentSubmit} style={{ maxWidth: 400 }}>
        <input
          name="name"
          placeholder="Имя"
          value={commentForm.name}
          onChange={handleCommentChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          name="email"
          placeholder="E-mail"
          value={commentForm.email}
          onChange={handleCommentChange}
          required
          type="email"
          style={{ width: "100%", marginBottom: 8 }}
        />
        <textarea
          name="body"
          placeholder="Комментарий"
          value={commentForm.body}
          onChange={handleCommentChange}
          required
          rows={3}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" disabled={commentLoading}>
          {commentLoading ? "Сохраняем..." : "Сохранить"}
        </button>
        {commentError && (
          <div style={{ color: "red", marginTop: 8 }}>{commentError}</div>
        )}
      </form>
    </div>
  );
};

export default ProductPage;