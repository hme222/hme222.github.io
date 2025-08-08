// ===== Smooth Scroll with Lenis =====
if (typeof Lenis !== "undefined") {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ===== GSAP Plugins =====
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Title Animation with Clip Path
  gsap.fromTo(
    ".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    }
  );

  // Scroll-triggered animations for .project elements
  gsap.utils.toArray(".project").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 60,
      duration: 1,
      delay: i * 0.1,
      ease: "power3.out",
    });
  });

  // Fade-in staggered text
  gsap.utils.toArray(".fade-text").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.5 + i * 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
    });
  });
}

// ===== Loader Animation =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      onComplete: () => (loader.style.display = "none"),
    });
  }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    if (menu) menu.classList.toggle("open");
  });
}

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ===== Custom Cursor Movement =====
const cursor = document.getElementById("custom-cursor");
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}