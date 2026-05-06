export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id?: string;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
}
