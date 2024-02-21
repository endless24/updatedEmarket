import { useState, useEffect } from "react";
import { createContext } from "react";
//getting cart from localstorate
const cartFromLocalstorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(cartFromLocalstorage);
  //storing the cart to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const [warning, setWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [checkout, setChekOut] = useState(true);

  //toggle the side bar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  //function that add to cart when clicked
  const handleAddToCart = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      //display a message if it has been added to the cart
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, item]);
  };
  //function to decrement /increment quantity
  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
  };

  let totalPrice = 0;
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    totalPrice += element.quantity * element.price;
  }

  //getting the props and functions that is needed in the components
  const value = {
    cart,
    setCart,
    toggleSidebar,
    isOpen,
    // toggleCheckout={() => {
    //   setChekOut(!checkout);
    //   toggleSidebar();
    // }}
    // checkout={checkout},
    handleIncrement,
    handleDecrement,
    totalPrice,
    handleAddToCart,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
      {warning && (
        <div className="h-14 w-80 absolute right-0 top-20 z-50 text-center p-5 bg-red-800 font-mono text-md rounded-md">
          Item is already in the cart!
        </div>
      )}
    </CartContext.Provider>
  );
}
