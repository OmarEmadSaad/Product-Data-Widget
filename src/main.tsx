import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// تشغيل عادي داخل المشروع (Development Preview)
const defaultRoot = document.getElementById("root");

if (defaultRoot) {
  createRoot(defaultRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// تشغيل widget من TamperMonkey
declare global {
  interface Window {
    TactfulWidget?: {
      initWidget: (containerId: string) => void;
    };
  }
}

window.TactfulWidget = {
  initWidget: (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    createRoot(container).render(<App />);
  },
};
