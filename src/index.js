import React from "react";
import ReactDOM from "react-dom/client";
import "./style/main.css";
import App from "./components";
import { AuthProvider } from "./components/helpers/auth-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  //</React.StrictMode>
);
