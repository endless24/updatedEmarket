import { useState, useEffect } from "react";
import { createContext } from "react";
import { productData } from "../productData";

//getting cart from localstorate
const cartFromLocalstorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(cartFromLocalstorage);
  const [warning, setWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //storing the cart to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  //toggle the side bar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  //function that add to cart when clicked
  const handleAddToCart = (item) => {
    const quantity = 1;
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      //display a message if it has been added to the cart
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    // checking if cart id match the product id
    productData.find((product) => {
      if (product.id === item.id) {
        setCart([...cart, { id: item.id, quantity, ...product }]);
      }
    });
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

  //calculating the total price of the item in the cart
  let totalPrice = 0;
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    totalPrice += element.quantity * element.price;
  }

  //delete function
  const handleDeleteItem = (id) => {
    //getting a perticular item
    const cartNameObj = cart.find((item) => item.id === id);
    const deleteCart = confirm(
      `Are you sure you want to delete this ${cartNameObj.name}?`
    );
    if (deleteCart) {
      const deleteArr = cart.filter((dItem) => dItem.id !== id);
      setCart(deleteArr);
      alert("cart deleted successfully");
    }
  };

  //getting the props and functions that is needed in the components
  const value = {
    cart,
    setCart,
    toggleSidebar,
    isOpen,
    handleIncrement,
    handleDecrement,
    totalPrice,
    handleAddToCart,
    handleDeleteItem,
    productData,
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
