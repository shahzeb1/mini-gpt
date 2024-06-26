import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

import "./index.css";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="gpt-shahzeb-theme">
      <App />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>
);
