import { createContext, type ReactNode, useState } from "react";
import type { Product, Category, FilterState } from "../types";
import { PRODUCTS } from "../data/products";

export interface ProductContextType {
  products: Product[];
  getProduct: (id: number) => Product | undefined;
  getBestProducts: () => Product[];
  getNewProducts: () => Product[];
  getProductsByCategory: (category: Category | "all") => Product[];
  filterProducts: (filter: FilterState) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products] = useState<Product[]>(PRODUCTS);

  /* id로 product 객체 1개 찾기 */
  const getProduct = (id: number): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  /* 받는 매개변수 없이 isBest 속성이 true인 상품들만 반환 */
  const getBestProducts = (): Product[] => {
    return products.filter((product) => product.isBest);
  };

  const getNewProducts = (): Product[] => {
    return products.filter((product) => product.isNew);
  };

  /* 초깃값 all 인 Category 타입으로 필터링 */
  const getProductsByCategory = (category: Category | "all"): Product[] => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
  };

  const filterProducts = (filter: FilterState): Product[] => {
    let filtered = products;

    if (filter.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filter.category
      );
    }

    /* filter 에서 정의한 범위의 가격 */
    filtered = filtered.filter(
      (product) =>
        product.price >= filter.minPrice && product.price <= filter.maxPrice
    );

    switch (filter.sortBy) {
      /* 가장 기본적인 오름차순 정렬 */
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      /* rating 이 높은 것부터 */
      case "popular":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      /* id 는 Date 로 생성, 최신순부터 보여줘야 하니 내림차순 */
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
    }
    return filtered;
  };

  const value: ProductContextType = {
    products,
    getProduct,
    getBestProducts,
    getNewProducts,
    getProductsByCategory,
    filterProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
