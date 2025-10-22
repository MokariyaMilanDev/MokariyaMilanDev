// GSAP Animations for Milan Mokariya Portfolio
import { waitForGSAP } from "./gsap-init.js";

// Initialize GSAP and ScrollTrigger
function initGSAP() {
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    return true;
  }
  return false;
}

// Loading animation
function initLoadingAnimation() {
  const tl = gsap.timeline();

  tl.to("body", {
    duration: 0.5,
    opacity: 1,
  }).to(
    ".navbar",
    {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    },
    "+=0.2"
  );
}

// Navigation animations
function initNavbarAnimations() {
  // Navbar scroll effect
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: { className: "scrolled", targets: ".navbar" },
  });

  // Mobile menu animation
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        // Close animation
        gsap.to(".nav-links li", {
          duration: 0.3,
          y: -20,
          opacity: 0,
          stagger: 0.1,
          onComplete: () => {
            navLinks.classList.remove("active");
          },
        });
      } else {
        // Open animation
        navLinks.classList.add("active");
        gsap.fromTo(
          ".nav-links li",
          { y: -20, opacity: 0 },
          {
            duration: 0.5,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          }
        );
      }
    });
  }
}

// Hero section animations
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.fromTo(
    ".hero-title",
    { y: 100, opacity: 0 },
    {
      duration: 1.2,
      y: 0,
      opacity: 1,
      ease: "power3.out",
    }
  )
    .fromTo(
      ".hero-subtitle",
      { y: 80, opacity: 0 },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .fromTo(
      ".hero-description",
      { y: 60, opacity: 0 },
      {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      },
      "-=0.6"
    )
    .fromTo(
      ".hero-buttons",
      { opacity: 0, scale: 0.8 },
      {
        duration: 0.6,
        //   y: 1,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
}

// Section reveal animations
function initSectionAnimations() {
  // Section headers
  gsap.utils.toArray(".section-header").forEach((header) => {
    const title = header.querySelector(".section-title");
    const subtitle = header.querySelector(".section-subtitle");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      title,
      { y: 50, opacity: 0 },
      {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      }
    ).fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      {
        duration: 0.6,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      },
      "-=0.4"
    );
  });
}

// About section animations
function initAboutAnimations() {
  // Profile card animation
  ScrollTrigger.create({
    trigger: ".profile-card",
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        ".profile-card",
        {
          scale: 0.8,
          rotation: -10,
          opacity: 0,
        },
        {
          duration: 1,
          scale: 1,
          rotation: -2,
          opacity: 1,
          ease: "back.out(1.7)",
        }
      );
    },
  });

  // About text animation
  gsap.utils.toArray(".about-text p").forEach((p, i) => {
    gsap.fromTo(
      p,
      { x: 50, opacity: 0 },
      {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          delay: i * 0.2,
        },
      }
    );
  });

  // Stats animation
  gsap.utils.toArray(".stat-item").forEach((stat, i) => {
    const number = stat.querySelector(".stat-number");

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0, scale: 0.8 },
          {
            duration: 0.6,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "back.out(1.7)",
            delay: i * 0.1,
          }
        );

        // Animate the number counting
        const finalNumber = number.textContent;
        const numericValue = parseInt(finalNumber);
        if (!isNaN(numericValue)) {
          gsap.fromTo(
            number,
            { textContent: 0 },
            {
              duration: 2,
              textContent: numericValue,
              roundProps: "textContent",
              ease: "power2.out",
              delay: i * 0.1 + 0.3,
            }
          );
        }
      },
    });
  });
}

// Skills section animations
function initSkillsAnimations() {
  gsap.utils.toArray(".skill-category").forEach((category, i) => {
    const icon = category.querySelector(".skill-icon");
    const tags = category.querySelectorAll(".skill-tag");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: category,
        start: "top 80%",
        end: "bottom 10%",
      },
    });

    tl.fromTo(
      category,
      { x: -200, opacity: 0 },
      {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.inOut",
        stagger: 0.3,
      }
    )
      .fromTo(
        icon,
        { scale: 0, x: -240, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.in",
        },
        "-=0.6"
      )
      .fromTo(
        tags,
        { x: -260, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3"
      );
  });
}

function certificateAnimation() {
  const certifications = document.getElementById("certifications");

  ScrollTrigger.create({
    trigger: certifications,
    start: "top 70%",
    once: true,
    onEnter: () => {
      gsap.to("certifications-section", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1)",
      });

      gsap.to(".certifications-title", {
        delay: 0.5,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.6)",
      });

      gsap.to(".certification-item", {
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.5,
        delay: 1,
        ease: "sine.out(1.6)",
      });
    },
  });
}

// Projects section animations
function initProjectsAnimations() {
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    const image = card.querySelector(".project-image");
    const content = card.querySelector(".project-content");
    const links = card.querySelectorAll(".project-link");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      card,
      { y: 60, opacity: 0, rotationY: 15 },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        rotationY: 0,
        ease: "power3.out",
        delay: i * 0.2,
      }
    )
      .fromTo(
        image,
        { scale: 1.2, opacity: 0 },
        {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          duration: 0.6,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        links,
        { x: -20, opacity: 0 },
        {
          duration: 0.4,
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
  });

  // Project card hover effects
  // gsap.utils.toArray(".project-card").forEach((card) => {
  //   card.addEventListener("mouseenter", () => {
  //     gsap.to(card, {
  //       duration: 0.4,
  //       y: -10,
  //       scale: 1.02,
  //       rotationY: 5,
  //       ease: "power2.out",
  //     });
  //   });

  //   card.addEventListener("mouseleave", () => {
  //     gsap.to(card, {
  //       duration: 0.4,
  //       y: 0,
  //       scale: 1,
  //       rotationY: 0,
  //       ease: "power2.out",
  //     });
  //   });
  // });
}

// Contact section animations
function initContactAnimations() {
  const contactContent = document.querySelector(".contact-content");
  const contactMethods = document.querySelectorAll(".contact-method");
  const contactForm = document.querySelector(".contact-form");

  if (contactContent) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactContent,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      contactContent,
      { scale: 0.9, opacity: 0 },
      {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
      }
    );
  }

  // Contact methods animation
  contactMethods.forEach((method, i) => {
    ScrollTrigger.create({
      trigger: method,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          method,
          { x: -50, opacity: 0 },
          {
            duration: 0.8,
            x: 0,
            opacity: 1,
            ease: "back.out(1.7)",
            delay: i * 0.1,
          }
        );
      },
    });

    // Hover effect
    method.addEventListener("mouseenter", () => {
      gsap.to(method, {
        duration: 0.3,
        x: 10,
        scale: 1.05,
        ease: "power2.out",
      });
    });

    method.addEventListener("mouseleave", () => {
      gsap.to(method, {
        duration: 0.3,
        x: 0,
        scale: 1,
        ease: "power2.out",
      });
    });
  });

  // Contact form icon animation
  if (contactForm) {
    ScrollTrigger.create({
      trigger: contactForm,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          contactForm.querySelector("i"),
          {
            rotation: -180,
            scale: 0,
            opacity: 0,
          },
          {
            duration: 1.2,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1, 0.5)",
          }
        );
      },
    });
  }
}

// Footer animations
function initFooterAnimations() {
  const socialLinks = document.querySelectorAll(".social-link");
  const githubStats = document.querySelector(".github-stats img");

  // Social links animation
  socialLinks.forEach((link, i) => {
    ScrollTrigger.create({
      trigger: link,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          link,
          { y: 30, opacity: 0, scale: 0 },
          {
            duration: 0.6,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "back.out(1.7)",
            delay: i * 0.1,
          }
        );
      },
    });

    // Hover effect
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        duration: 0.1,
        scale: 1.1,
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        duration: 0.1,
        scale: 1,
      });
    });
  });

  // GitHub stats animation
  if (githubStats) {
    ScrollTrigger.create({
      trigger: githubStats,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          githubStats,
          {
            scale: 0.8,
            opacity: 0,
            rotationY: 90,
          },
          {
            duration: 1,
            scale: 1,
            opacity: 1,
            rotationY: 0,
            ease: "power3.out",
          }
        );
      },
    });
  }
}

// Cursor animations (enhanced)
function initCursorAnimations() {
  // Only enable custom cursor on desktop
  if (window.innerWidth < 768) return;

  // Create custom cursor
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement("div");
  cursorFollower.className = "cursor-follower";
  document.body.appendChild(cursorFollower);

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, {
      duration: 0,
      x: mouseX,
      y: mouseY,
    });
  });

  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    gsap.set(cursorFollower, {
      x: followerX,
      y: followerY,
    });
  });

  // Cursor interactions
  const interactiveElements = document.querySelectorAll(
    "a, button, .skill-category, .project-card, .contact-method"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        duration: 0.3,
        scale: 1.5,
        backgroundColor: "#2563eb",
      });
      gsap.to(cursorFollower, {
        duration: 0.3,
        scale: 2,
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        duration: 0.3,
        scale: 1,
        backgroundColor: "#000000",
      });
      gsap.to(cursorFollower, {
        duration: 0.3,
        scale: 1,
      });
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  // Smooth scroll for navigation
  gsap.utils.toArray('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power3.inOut",
        });
      }
    });
  });
}

// Text reveal animations
function initTextAnimations() {
  // Split text for better animations
  gsap.utils.toArray(".hero-title, .section-title").forEach((title) => {
    const text = title.textContent;
    title.innerHTML = text
      .split("")
      .map((char) => (char === " " ? " " : `<span class="char">${char}</span>`))
      .join("");
  });

  // Animate characters
  gsap.utils.toArray(".section-title .char").forEach((char, i) => {
    ScrollTrigger.create({
      trigger: char.closest(".section-title"),
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          char,
          {
            y: 100,
            opacity: 0,
            rotationX: 90,
          },
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            rotationX: 0,
            ease: "back.out(1.7)",
            delay: i * 0.03,
          }
        );
      },
    });
  });
}

// Responsive animations
function handleResponsiveAnimations() {
  ScrollTrigger.addEventListener("refresh", () => {
    // Refresh all animations on resize
    gsap.set(".char", { clearProps: "all" });
  });

  // Disable certain animations on mobile
  if (window.innerWidth < 768) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.id === "parallax") {
        trigger.kill();
      }
    });
  }
}

// Performance optimization
function optimizeAnimations() {
  // Use will-change property for animated elements
  gsap.set(".hero-content, .section-header, .skill-category, .project-card", {
    willChange: "transform",
  });

  // Clean up after animations
  ScrollTrigger.addEventListener("refresh", () => {
    gsap.set(".hero-content, .section-header, .skill-category, .project-card", {
      clearProps: "will-change",
    });
  });
}

// Initialize all animations
async function initAnimations() {
  // Wait for GSAP to be ready
  await waitForGSAP();

  // Initialize GSAP plugins
  if (!initGSAP()) {
    console.error("GSAP failed to initialize");
    return;
  }

  // Basic setup
  gsap.config({ nullTargetWarn: false });

  initLoadingAnimation();
  initNavbarAnimations();
  initHeroAnimations();
  initSectionAnimations();
  initAboutAnimations();
  initSkillsAnimations();
  certificateAnimation();
  initProjectsAnimations();
  initContactAnimations();
  initFooterAnimations();
  initCursorAnimations();
  initScrollAnimations();
  initTextAnimations();

  // Handle responsive
  handleResponsiveAnimations();
  optimizeAnimations();

  // Refresh ScrollTrigger on load
  ScrollTrigger.refresh();
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

// Handle page visibility for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

// Export for use in other modules
export { initAnimations };
