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

const splitTypeElements = document.querySelectorAll("[text-split]");
splitTypeElements.forEach((splitTypeElement) => {
  const text = splitTypeElement.textContent;
  splitTypeElement.innerHTML = text
    .split("")
    .map((char) => (char === " " ? " " : `<span class="char">${char}</span>`))
    .join("");
});

const lettersFadeInRandomElements = document.querySelectorAll(
  "[letters-fade-in-random]"
);
lettersFadeInRandomElements.forEach((element) => {
  const tl = gsap.timeline({ paused: true });
  const chars = element.querySelectorAll(".char");
  if (!chars || chars.length === 0) return;

  tl.from(chars, {
    opacity: 0,
    duration: 0.8,
    ease: "power1.out",
    stagger: { amount: 0.4, from: "random" },
  });

  // Properly create a ScrollTrigger that controls the timeline
  ScrollTrigger.create({
    trigger: element,
    animation: tl,
    start: "top 90%",
    once: true,
  });
});

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
      gsap.fromTo(
        ".certifications-section",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1)",
        }
      );

      gsap.fromTo(
        ".certifications-title",
        {
          scale: 0,
          opacity: 0,
        },
        {
          delay: 0.5,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.6)",
        }
      );

      gsap.fromTo(
        ".certification-item",
        {
          y: 30,
          scale: 0,
        },
        {
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.5,
          delay: 1,
          ease: "sine.out(1.6)",
        }
      );
    },
  });
}

function infrastructureArchitectureAnimation() {
  const architectureDiagram = document.querySelector(".architecture-diagram");

  ScrollTrigger.create({
    trigger: architectureDiagram,
    start: "top 95%",
    once: true,
    onEnter: () => {
      gsap.to(architectureDiagram, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.6)",
      });
    },
  });

  const cards = document.querySelectorAll(".devops-card");

  ScrollTrigger.create({
    trigger: cards,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(".devops-card", {
        scale: 1,
        duration: 1,
        stagger: 0.6,
        ease: "back.out(1.6)",
      });
    },
  });

  const stackBadge = document.querySelectorAll(".stack-badge");

  ScrollTrigger.create({
    trigger: stackBadge,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(stackBadge, {
        y: 0,
        duration: 1,
        stagger: 0.4,
        ease: "back.out(1.6)",
      });
    },
  });
}

function achievementsAnimation() {
  const achievements = document.querySelectorAll(".devops-achievements");

  ScrollTrigger.create({
    once: true,
    start: "top 90%",
    trigger: achievements,
    onEnter: () => {
      gsap.to(".devops-achievements", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1)",
      });

      gsap.to(".achievements-title", {
        scale: 1,
        delay: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.6)",
      });

      gsap.fromTo(
        ".achievement-item",
        {
          y: -300,
        },
        {
          y: 0,
          delay: 1,
          duration: 1,
          stagger: 0.5,
          ease: "sine.out(1.6)",
        }
      );
    },
  });
}

function testimonialsAnimation() {
  const testimonials = document.querySelectorAll(".testimonials-section");

  ScrollTrigger.create({
    once: true,
    start: "top 90%",
    trigger: testimonials,
    onEnter: () => {
      gsap.to(".testimonial-card", {
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.5,
        ease: "sine.out(1.6)",
      });
    },
  });
}

function roadMapAnimation() {
  const roadMap = document.querySelectorAll(".roadmap-category");

  roadMap.forEach((section) => {
    ScrollTrigger.create({
      once: true,
      start: "top 60%",
      trigger: section,
      onEnter: () => {
        gsap.to(".roadmap-category", {
          x: 0,
          scale: 1,
          duration: 1,
          ease: "sine.out(1.6)",
        });
      },
    });
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
}

// Contact section animations
function contactAnimations() {
  const contactBox = document.querySelector(".contact");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contactBox,
      start: "top 80%",
      end: "bottom 20%",
      once: true,
    },
  });

  tl.fromTo(
    contactBox,
    { x: -800 },
    {
      x: 0,
      duration: 0.8,
      ease: "back.out(1.6)",
    }
  );

  tl.fromTo(
    ".contact-form",
    { x: 400 },
    {
      x: 0,
      duration: 0.4,
      ease: "back.out(1.4)",
    }
  );

  // tl.fromTo(
  //   contactBox,
  //   { borderRadius: "0rem" },
  //   {
  //     duration: 0.6,
  //     borderRadius: "1rem",
  //     ease: "back.out(1.4)",
  //   }
  // );

  tl.fromTo(
    ".contact-method",
    { opacity: 0, x: -200 },
    {
      x: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 0.6,
      ease: "back.out(1.4)",
    }
  );
}

// Footer animations
function initFooterAnimations() {
  ScrollTrigger.create({
    trigger: ".social-link",
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(".social-link", {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".github-stats",
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(".github-stats", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    },
  });
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
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(char, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: i * 0.03,
        });
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
  initAboutAnimations();
  initSkillsAnimations();
  certificateAnimation();
  infrastructureArchitectureAnimation();
  achievementsAnimation();
  testimonialsAnimation();
  roadMapAnimation();
  initProjectsAnimations();
  initFooterAnimations();
  initCursorAnimations();
  initScrollAnimations();
  initTextAnimations();
  contactAnimations();

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
