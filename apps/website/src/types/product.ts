// <======< Product Domain Types >======>
export interface Product {
  id: string;
  title: string;
  price: number;
  origPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  seller: string;
  image: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}
