import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { ProductContext } from "./ProdProvider";

//getting cart from localstorate
const cartFromLocalstorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(cartFromLocalstorage);
  // const [warning, setWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { products } = useContext(ProductContext);

  //storing the cart to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  //toggle the side bar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (toggleMenu) {
      toggleMenubar();
    }
    // console.log(isOpen);
  };
  //Toggle menu
  const toggleMenubar = () => {
    setToggleMenu(!toggleMenu);
    if (isOpen) {
      toggleSidebar();
    }
    // console.log(toggleMenu);
  };

  //function that add to cart when clicked
  const handleAddToCart = (item) => {
    const quantity = 1;
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      handleIncrement(item.id);
      //display a message if it has been added to the cart
      // setWarning(true);
      // setTimeout(() => {
      //   setWarning(false);
      // }, 2000);
      return;
    }
    const { id, price } = item;
    setCart([...cart, { id, price, quantity }]);
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
    const soldOutItem = products.find((p) => p.id === element.id);
    // console.log(soldOutItem);
    if (soldOutItem.soldOut) continue;
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

  const handleDelAllCart = () => {
    const deleteAllCart = confirm(" Are you sure you want to clear the cart");
    if (deleteAllCart) {
      setCart([]);
      alert("Cart cleared successfully");
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
    handleDelAllCart,
    toggleMenubar,
    toggleMenu,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
      {/* {warning && (
        <div className="h-14 w-80 absolute right-0 top-20 z-50 text-center p-5 bg-red-800 font-mono text-md rounded-md">
          Item is already in the cart!
        </div>
      )} */}
    </CartContext.Provider>
  );
}
