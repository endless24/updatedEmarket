import { useState, useEffect } from "react";
import { createContext } from "react";
//getting cart from localstorate
const cartFromLocalstorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(cartFromLocalstorage);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const value = {
    cart,
    setCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
