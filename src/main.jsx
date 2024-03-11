import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CartProvider from "./contexts/CartProvider";
import PaystackIntegration from "./routes/PaystackIntegration";
import ProdProvider from "./contexts/ProdProvider";

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
