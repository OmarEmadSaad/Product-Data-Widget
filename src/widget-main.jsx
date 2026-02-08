import React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./components/Widget";
import "./index.css";

export function initWidget(containerId = "tactful-widget-root") {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  createRoot(container).render(<Widget />);
}

// expose globally
window.TactfulWidget = { initWidget };
