// Loader animation
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.to(".loader-bg", {
    scaleX: 1,
    duration: 0.8,
    ease: "power2.inOut"
  })
  .to(".loader-cat", {
    opacity: 1,
    filter: "blur(0px)",
    rotate: 0,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)"
  }, "-=0.4")
  .to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut"
  }, "+=0.5")
  // Hero text reveal starts AFTER loader leaves
  .fromTo(".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out" }
  )
  .from(".fade-text", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.25,
    ease: "power2.out"
  }, "-=0.8")
  .set("#loader", { display: "none" });
});

// Smooth Scroll with Lenis
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Dark mode toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
