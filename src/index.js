// src/index.js  (CRA / React 18)
import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </ColorModeProvider>
  </React.StrictMode>
);
