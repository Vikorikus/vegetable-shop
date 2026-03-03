import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </MantineProvider>
  </StrictMode>,
);
