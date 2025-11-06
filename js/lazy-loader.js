// Lazy Loading Script - Load resources only when needed
(function () {
  "use strict";

  // Check if device is mobile
  // function isMobile() {
  //   return (
  //     window.innerWidth < 768 ||
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       navigator.userAgent
  //     )
  //   );
  // }

  // Load cursor animation only on desktop
  function loadCursorAnimation() {
    const cursorCanvas = document.getElementById("cursor-canvas");
    if (cursorCanvas) {
      import("./cursor.js").catch((err) => {
        console.warn("Failed to load cursor animation:", err);
      });
    }
  }

  // Load GSAP animations after initial page load
  function loadAnimations() {
    // Check if GSAP is loaded
    const checkGSAP = setInterval(() => {
      if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        clearInterval(checkGSAP);
        // GSAP animations are loaded via gsap-animations.js
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkGSAP), 5000);
  }

  // Initialize lazy loading
  function init() {
    // Load cursor animation only on desktop, after a slight delay
    if (document.readyState === "complete") {
      setTimeout(loadCursorAnimation, 500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(loadCursorAnimation, 500);
      });
    }

    // Load animations
    loadAnimations();
  }

  // Start initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
