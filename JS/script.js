// SMOOTH SCROLL
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// LOADER ANIMATION
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.to(".loader-cat", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" })
    .to("#loader", { y: "-100%", duration: 1, delay: 0.5, ease: "power4.inOut" })
    .set("#loader", { display: "none" });
});

// HERO ANIMATION
gsap.fromTo(".hero-title",
  { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power3.out", delay: 1 }
);

// FADE TEXT ON SCROLL
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".fade-text").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3 * i,
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
    }
  });
});

// PROJECTS FADE IN
gsap.utils.toArray(".project").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    }
  });
});

// MOBILE MENU
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// DARK MODE TOGGLE
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// CUSTOM CURSOR
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});
