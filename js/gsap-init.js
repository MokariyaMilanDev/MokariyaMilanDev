// GSAP Initialization and Setup
// This script ensures GSAP is properly loaded and initializes core functionality

// Wait for GSAP to load
function waitForGSAP() {
  return new Promise((resolve) => {
    if (typeof gsap !== "undefined") {
      resolve();
    } else {
      const checkGSAP = setInterval(() => {
        if (typeof gsap !== "undefined") {
          clearInterval(checkGSAP);
          resolve();
        }
      }, 100);
    }
  });
}

// Handle page load
window.addEventListener("load", () => {
  // Ensure all images and resources are loaded before starting animations
  setTimeout(() => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, 100);
});

// Export for use in other modules
export { waitForGSAP };
