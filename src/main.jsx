import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CartProvider from "./contexts/CartProvider";
import PaystackIntegration from "./routes/PaystackIntegration";
import ProdProvider from "./contexts/ProdProvider";
import About from "./routes/About";
import Contact from "./routes/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chechout",
    element: <PaystackIntegration />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProdProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProdProvider>
  </React.StrictMode>
);
