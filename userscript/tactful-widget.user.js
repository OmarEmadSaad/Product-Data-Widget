// ==UserScript==
// @name         Tactful Product Collector Widget
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Collect product data from Amazon & eBay
// @author       Tactful
// @match        https://*.amazon.*/dp/*
// @match        https://*.amazon.*/gp/product/*
// @match        https://*.amazon.*/gp/aw/d/*
// @match        https://*.ebay.*/itm/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  const WIDGET_JS_URL = "https://product-data-widget.vercel.app/Widget.js";

  const WIDGET_CSS_URL = "https://product-data-widget.vercel.app/Widget.css";

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
        element.type = "module";
      }

      element.onload = () => resolve();
      element.onerror = reject;

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
      max-width: 380px;
    `;

    document.body.appendChild(container);
  }

  async function initWidget() {
    try {
      createWidgetContainer();

      await loadResource(WIDGET_CSS_URL, "css");
      await loadResource(WIDGET_JS_URL, "script");

      if (
        window.TactfulWidget &&
        typeof window.TactfulWidget.initWidget === "function"
      ) {
        window.TactfulWidget.initWidget("tactful-widget-root");
      } else {
        console.warn("Widget init not found");
      }
    } catch (error) {
      console.error("Widget failed:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})();
