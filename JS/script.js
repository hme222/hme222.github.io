// Smooth Scroll with Lenis
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Loader Animation
window.addEventListener("load", () => {
  gsap.fromTo(".loader-cat",
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
  );
  gsap.to("#loader", {
    delay: 1.5,
    opacity: 0,
    duration: 0.8,
    onComplete: () => document.getElementById("loader").style.display = "none"
  });
  animateContent();
});

function animateContent() {
  gsap.fromTo(".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power3.out", delay: 0.5 }
  );
  gsap.utils.toArray(".fade-text").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 1, delay: 0.5 + i * 0.3,
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });
  gsap.utils.toArray(".project").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 60, duration: 1, delay: i * 0.1,
      scrollTrigger: { trigger: el, start: "top 80%" }
    });
  });
}

// Mobile menu toggle
document.getElementById("menu-toggle")?.addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Dark mode toggle
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Custom Cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
