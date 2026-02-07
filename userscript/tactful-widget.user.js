// ==UserScript==
// @name         Tactful Product Collector Widget
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Collects product data from Amazon and eBay product pages (updated for regional domains)
// @author       Tactful Team
// @match        https://*.amazon.*/dp/*
// @match        https://*.amazon.*/gp/product/*
// @match        https://*.amazon.*/gp/aw/d/*
// @match        https://*.ebay.*/itm/*
// @match        http://localhost:5173/*          // ← للـ preview/development فقط (احذفه لاحقًا لو عايز)
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  // ────────────────────────────────────────────────
  // Development URLs (Vite dev server) – غيّر حسب portك
  // ────────────────────────────────────────────────
  const IS_DEV = location.hostname.includes("localhost");

  const WIDGET_JS_URL = IS_DEV
    ? "http://localhost:5173/src/main.jsx" // أو /dist/assets/index-[hash].js لو بعد build
    : "https://your-production-domain.com/dist/bundle.js"; // غيّره لاحقًا

  const WIDGET_CSS_URL = IS_DEV
    ? "http://localhost:5173/src/styles/widget.css" // أو المسار الصح للـ CSS في Vite
    : "https://your-production-domain.com/dist/style.css";

  // لو Vite dev server مش بيخدم الـ CSS كـ file منفصل، ممكن تستخدم inline styles أو GM_addStyle لاحقًا

  function loadResource(url, type = "script") {
    return new Promise((resolve, reject) => {
      let element;
      if (type === "css") {
        element = document.createElement("link");
        element.rel = "stylesheet";
        element.href = url;
      } else {
        element = document.createElement("script");
        element.src = url;
        element.type = "module"; // مهم جدًا لـ Vite/React ESM
      }

      element.onload = () => {
        console.log(`[Tactful Widget] Loaded: ${url}`);
        resolve();
      };
      element.onerror = (err) => {
        console.error(`[Tactful Widget] Failed to load: ${url}`, err);
        reject(err);
      };

      if (type === "css") {
        document.head.appendChild(element);
      } else {
        document.body.appendChild(element);
      }
    });
  }

  function createWidgetContainer() {
    const container = document.createElement("div");
    container.id = "tactful-widget-root";
    container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            pointer-events: auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            border-radius: 12px;
            overflow: hidden;
            max-width: 380px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
    document.body.appendChild(container);
    console.log("[Tactful Widget] Container created");
    return container;
  }

  async function initWidget() {
    try {
      console.log("[Tactful Widget] Starting initialization...");

      if (IS_DEV) {
        console.log(
          "[Tactful Widget] Development mode detected – using localhost URLs",
        );
      }

      createWidgetContainer();

      // Load CSS first
      await loadResource(WIDGET_CSS_URL, "css");

      // Then load JS (React bundle)
      await loadResource(WIDGET_JS_URL, "script");

      // Call the init function from your bundle
      // افترض إن main.jsx بيexport object زي window.TactfulWidget = { initWidget }
      if (
        window.TactfulWidget &&
        typeof window.TactfulWidget.initWidget === "function"
      ) {
        window.TactfulWidget.initWidget("tactful-widget-root");
        console.log("[Tactful Widget] Initialization successful!");
      } else {
        console.warn(
          "[Tactful Widget] initWidget function not found – check your main.jsx export",
        );
      }
    } catch (error) {
      console.error("[Tactful Widget] Init failed:", error);
    }
  }

  // Run init
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})();
