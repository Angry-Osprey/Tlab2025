// src/main.jsx 
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Portfolio from "./portfolio"; 
import "./index.css";
import TYDB from "./pages/TYDB";

const router = createBrowserRouter([  //React-router for multiple pages.
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Portfolio /> },
      { path: "TYDB",element: <TYDB/>}, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
