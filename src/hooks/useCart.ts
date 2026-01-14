import { createContext, useContext } from "react";
import type { CartContextType } from "../contexts/CartContext";

export function useCart() {
  const CartContext = createContext<CartContextType | undefined>(undefined);
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart는 CartProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
}
