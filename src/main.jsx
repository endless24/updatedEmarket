import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CartProvider from "./contexts/CartProvider";
import PaystackIntegration from "./routes/PaystackIntegration";
// import Header from "./routes/header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // children: [],
  },
  {
    path: "/chechout",
    element: <PaystackIntegration />,
  },
]);
// goBackfn={() => setChekOut(!checkout)}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
