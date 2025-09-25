
/*! PocketnestSDK-Web v1.0.1
 *  Minimal, framework-agnostic web SDK.
 *  Exposes: iFrame({ url, attributes? }) and open(url).
 *  - iFrame: returns an <iframe> element with 100% width/height and no border.
 *  - open: opens the provided URL in a new browser tab (noopener,noreferrer).
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.PocketnestSDKWeb = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /**
   * Create an iframe element for the given URL.
   * @param {Object|string} options - Either a URL string or an options object.
   * @param {string} options.url - The URL to load in the iframe.
   * @param {string} [options.accessToken] - Optional user session token.
   * @param {Object} [options.attributes] - Optional map of extra iframe attributes (e.g., { allow: "clipboard-write; fullscreen" }).
   * @returns {HTMLIFrameElement} The created iframe element (not yet attached to DOM).
   */
  function iFrame(options) {
    var url = typeof options === "string" ? options : (options && options.url);
    if (!url || typeof url !== "string") {
      throw new Error("PocketnestSDK-Web: iFrame requires a valid URL string.");
    }
    var extra = (options && options.attributes) || {};
    let finalUrl = url;
    if (extra.accessToken?.length > 0) {
      finalUrl = finalUrl + "?token=" + extra.accessToken;
    }

    var frame = document.createElement("iframe");
    frame.src = finalUrl;

    // sensible defaults
    frame.setAttribute("loading", "lazy");
    frame.setAttribute("referrerpolicy", "no-referrer");
    frame.style.width = "100%";
    frame.style.height = "100%";
    frame.style.border = "0";

    // merge attributes
    Object.keys(extra).forEach(function (k) {
      try {
        frame.setAttribute(k, String(extra[k]));
      } catch (e) {
        // ignore invalid attributes
      }
    });

    return frame;
  }

  /**
   * Open a URL in a new tab, with security flags.
   * @param {string} url - The URL to open.
   * @param {string} accessToken - (user session token)
   */
  function open(url, accessToken) {
    if (!url || typeof url !== "string") {
      throw new Error("PocketnestSDK-Web: open requires a valid URL string.");
    }
    let finalUrl = url;
    if (accessToken?.length > 0) {
      finalUrl = finalUrl + "?token=" + accessToken;
    }
    var win = window.open(finalUrl, "_blank", "noopener,noreferrer");
    // Some browsers may block popups; win can be null. No return necessary.
    if (win && win.opener) {
      win.opener = null; // extra safety
    }
  }

  /**
   * PocketnestSDK-Web API
   * @namespace PocketnestSDKWeb
   * @property {function(Object|string): HTMLIFrameElement} iFrame - Create an iframe element for the given URL or options.
   * @property {function(string): void} open - Open a URL in a new tab with security flags.
   */
  // Public API
  return { iFrame: iFrame, open: open };
}));
