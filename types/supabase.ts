export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  size?: string;
  category_id?: string;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
}

export interface Order {
  id: string;
  customer_reference?: string;
  total_amount: number;
  status: string;
  shipping_address?: string;
  payment_method?: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  quantity: number;
  price_at_purchase: number;
}

export interface Admin {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export interface Setting {
  id: number;
  site_title?: string;
  site_description?: string;
  hero_title?: string;
  hero_description?: string;
  hero_cta_text?: string;
  hero_cta_url?: string;
  footer_note?: string;
  announcement_text?: string;
}

export interface Menu {
  id: number;
  label: string;
  url: string;
  order: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  url: string;
  alt?: string;
  uploaded_at: string;
}
