export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'children' | 'teenager';
  type: 'tops' | 'bottoms' | 'jackets' | 'dresses' | 'skirts' | 'accessories' | 'jeans';
  image: string;
  description: string;
  selectedSize?: string;
}

export const CATEGORIES = [
  { name: 'Women', slug: 'women', description: 'Curated elegance for the modern woman.' },
  { name: 'Men', slug: 'men', description: 'Timeless style and contemporary precision.' },
  { name: 'Children', slug: 'children', description: 'Comfort and style for the next generation.' },
  { name: 'Teenager', slug: 'teenager', description: 'Bold and expressive styles for the youth.' },
];

export const PRODUCTS: Product[] = [
  // Women
  {
    id: 'w1',
    name: 'Silk Wrap Blouse',
    price: 185,
    category: 'women',
    type: 'tops',
    image: 'https://picsum.photos/seed/fashion_women_1/800/1000',
    description: 'A luxurious silk wrap blouse with a soft sheen.'
  },
  {
    id: 'w2',
    name: 'Tailored Wool Trousers',
    price: 240,
    category: 'women',
    type: 'bottoms',
    image: 'https://picsum.photos/seed/fashion_women_2/800/1000',
    description: 'Expertly cut from premium Italian wool.'
  },
  {
    id: 'w3',
    name: 'Minimalist Cashmere Sweater',
    price: 320,
    category: 'women',
    type: 'tops',
    image: 'https://picsum.photos/seed/fashion_women_3/800/1000',
    description: 'The softest cashmere for ultimate luxury.'
  },
  {
    id: 'w4',
    name: 'Structured Midi Dress',
    price: 295,
    category: 'women',
    type: 'dresses',
    image: 'https://picsum.photos/seed/fashion_women_4/800/1000',
    description: 'A contemporary silhouette for the evening.'
  },
  {
    id: 'w5',
    name: 'Pleated Satin Skirt',
    price: 160,
    category: 'women',
    type: 'skirts',
    image: 'https://picsum.photos/seed/fashion_women_5/800/1000',
    description: 'Elegant movement with every step.'
  },

  // Men
  {
    id: 'm1',
    name: 'Cotton Oxford Shirt',
    price: 110,
    category: 'men',
    type: 'tops',
    image: 'https://picsum.photos/seed/fashion_men_1/800/1000',
    description: 'A classic Oxford shirt in high-density cotton.'
  },
  {
    id: 'm2',
    name: 'Technical Parka',
    price: 450,
    category: 'men',
    type: 'jackets',
    image: 'https://picsum.photos/seed/fashion_men_2/800/1000',
    description: 'Weather-resistant and stylishly cut.'
  },
  {
    id: 'm3',
    name: 'Slim Fit Chinos',
    price: 145,
    category: 'men',
    type: 'bottoms',
    image: 'https://picsum.photos/seed/fashion_men_3/800/1000',
    description: 'The perfect balance of comfort and precision.'
  },
  {
    id: 'm4',
    name: 'Leather Weekend Bag',
    price: 520,
    category: 'men',
    type: 'accessories',
    image: 'https://picsum.photos/seed/fashion_men_4/800/1000',
    description: 'Full-grain leather with brass hardware.'
  },
  {
    id: 'm5',
    name: 'Denim Trucker Jacket',
    price: 195,
    category: 'men',
    type: 'jackets',
    image: 'https://picsum.photos/seed/fashion_men_5/800/1000',
    description: 'A timeless silhouette in rigid denim.'
  },

  // Children
  {
    id: 'c1',
    name: 'Organic Cotton Onesie',
    price: 45,
    category: 'children',
    type: 'tops',
    image: 'https://picsum.photos/seed/fashion_children_1/800/1000',
    description: 'Ultra-soft organic cotton for delicate skin.'
  },
  {
    id: 'c2',
    name: 'Knitted Wool Cardigan',
    price: 85,
    category: 'children',
    type: 'jackets',
    image: 'https://picsum.photos/seed/fashion_children_2/800/1000',
    description: 'Hand-knitted feel with premium wool.'
  },
  {
    id: 'c3',
    name: 'Denim Overalls',
    price: 65,
    category: 'children',
    type: 'bottoms',
    image: 'https://picsum.photos/seed/fashion_children_3/800/1000',
    description: 'Durable and classic denim for active kids.'
  },
  {
    id: 'c4',
    name: 'Printed Summer Dress',
    price: 55,
    category: 'children',
    type: 'dresses',
    image: 'https://picsum.photos/seed/fashion_children_4/800/1000',
    description: 'Lightweight and colorful for sunny days.'
  },

  // Teenager
  {
    id: 't1',
    name: 'Graphic Boxy Tee',
    price: 35,
    category: 'teenager',
    type: 'tops',
    image: 'https://picsum.photos/seed/fashion_teen_1/800/1000',
    description: 'Oversized fit with street-art inspiration.'
  },
  {
    id: 't2',
    name: 'High-Waist Wide Jeans',
    price: 75,
    category: 'teenager',
    type: 'jeans',
    image: 'https://picsum.photos/seed/fashion_teen_2/800/1000',
    description: 'The defining silhouette of the season.'
  },
  {
    id: 't3',
    name: 'Coach Jacket',
    price: 120,
    category: 'teenager',
    type: 'jackets',
    image: 'https://picsum.photos/seed/fashion_teen_3/800/1000',
    description: 'Lightweight nylon with snap front closure.'
  },
  {
    id: 't4',
    name: 'Canvas Belt Bag',
    price: 45,
    category: 'teenager',
    type: 'accessories',
    image: 'https://picsum.photos/seed/fashion_teen_4/800/1000',
    description: 'Functional and bold for the daily move.'
  },
];
