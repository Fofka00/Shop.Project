export interface ICommentEntity {
  comment_id: string;
  name: string;
  email: string;
  body: string;
  product_id: string;
}

export interface IProductEntity {
  product_id: string;
  title: string;
  description: string;
  price: number;
}

export interface IProductImageEntity {
  image_id: string;
  product_id: string;
  main: boolean;
  url: string;
}

export interface IProductSearchFilter {
  title?: string;
  description?: string;
  priceFrom?: number;
  priceTo?: number;
}

export interface ISimilarProductEntity {
  first_product: string;
  second_product: string;
}

export type AddSimilarProductsPayload = [string, string][];
export type ImagesRemovePayload = string[];
export type ProductAddImagesPayload = {
  productId: string;
  images: { url: string; main: boolean }[];
};
export type ProductCreatePayload = {
  title: string;
  description: string;
  price: number;
  images?: { url: string; main: boolean }[];
};
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: IProductImage;
  comments?: IComment[];
  images?: IProductImage[];
}
export type CommentCreatePayload = {
  email: string;
  body: string;
  name: string;
  productId: string;
};
export interface IComment {
  id: string;
  email: string;
  body: string;
  name: string;
  productId: string;
}
export interface IProductImage {
  id: string;
  url: string;
  productId: string;
  main?: boolean;
}