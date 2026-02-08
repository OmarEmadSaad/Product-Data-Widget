// ==UserScript==
// @name         Tactful Product Collector Widget
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  Collect product data from Amazon & eBay
// @match        https://*.amazon.*/dp/*
// @match        https://*.amazon.*/gp/*
// @match        https://*.ebay.*/itm/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  const WIDGET_JS = "https://product-data-widget.vercel.app/widget.js";
  const WIDGET_CSS = "https://product-data-widget.vercel.app/widget.css";

  function loadJS(url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function loadCSS(url) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = url;
    document.head.appendChild(l);
  }

  function createContainer() {
    const div = document.createElement("div");
    div.id = "tactful-widget-root";
    div.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      max-width: 380px;
    `;
    document.body.appendChild(div);
  }

  async function init() {
    createContainer();
    loadCSS(WIDGET_CSS);
    await loadJS(WIDGET_JS);

    if (window.TactfulWidget?.initWidget) {
      window.TactfulWidget.initWidget("tactful-widget-root");
    } else {
      console.error("TactfulWidget not found on window");
    }
  }

  init();
})();
