import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
// import { ToastProvider } from "react-toast-notifications";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
