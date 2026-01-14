import { createContext, useContext } from "react";
import type { ProductContextType } from "../contexts/ProductContext";

export function useProducts() {
  const ProductContext = createContext<ProductContextType | undefined>(
    undefined
  );
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      "useProducts는 ProductProvider 안에서만 사용할 수 있습니다"
    );
  }
  return context;
}
