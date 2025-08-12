// Smooth Scroll with Lenis
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Animate Loader with Cat Reveal
window.addEventListener("load", () => {
  gsap.timeline({
    defaults: { ease: "power3.out" }
  })
    .to(".loader-cat", { opacity: 1, duration: 0.5 })
    .to("#loader", { opacity: 0, duration: 1, delay: 0.5 })
    .set("#loader", { display: "none" });
});

// Hero Title Animation
gsap.fromTo(
  ".hero-title",
  { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    duration: 1.5,
    ease: "power3.out",
    delay: 1
  }
);

// Fade-in staggered text
gsap.utils.toArray(".fade-text").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.2 + i * 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%"
    }
  });
});

// Projects scroll animation
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".project").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    duration: 1,
    delay: i * 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    }
  });
});

// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Dark mode toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Custom cursor movement
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
