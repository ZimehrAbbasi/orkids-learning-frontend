import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Dynamically create root element
const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

// Render the React app
const root = ReactDOM.createRoot(rootElement);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
