import axios from "axios";
import { IProduct, IComment, IProductEntity } from "../../../Shared/types";


const API_URL = "/api/products";

export const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await axios.get<IProductEntity[]>(API_URL);
  return data.map(p => ({
    id: p.product_id,
    title: p.title,
    description: p.description,
    price: p.price,
  }));
};

export const fetchProductComments = async (productId: string) => {
  const { data } = await axios.get<IComment[]>(`/api/comments?productId=${productId}`);
  return Array.isArray(data) ? data : [];
};

export const addComment = async (payload: {
  productId: string;
  name: string;
  email: string;
  body: string;
}) => {
  await axios.post("/api/comments", payload);
};

export const fetchProduct = async (id: string) => {
  const { data } = await axios.get<IProduct>(`${API_URL}/${id}`);
  return data;
};

export const fetchSimilarProducts = async (id: string) => {
  const { data } = await axios.get<IProduct[]>(`${API_URL}/similar/${id}`);
  return data;
};

export const fetchComments = async (productId: string) => {
  const { data } = await axios.get<IComment[]>(`/api/comments?productId=${productId}`);
  return data;
};