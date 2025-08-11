// Smooth Scroll with Lenis
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Loader animation
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.to(".loader-cat", {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out"
  })
  .to(".loader-cat", {
    rotate: 0,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.6")
  .to(".loader-bg", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut"
  }, "+=0.5")
  .to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut"
  }, "-=0.8")
  .fromTo(".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out" },
    "-=0.5"
  )
  .from(".fade-text", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.25,
    ease: "power2.out"
  }, "-=0.6")
  .set("#loader", { display: "none" });
});

// Scroll-triggered fade for .project items
gsap.utils.toArray(".project").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 1,
    delay: i * 0.1,
    ease: "power3.out"
  });
});

// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Dark mode with saved preference
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  gsap.fromTo("#theme-toggle", { scale: 0.8 }, { scale: 1, duration: 0.2, ease: "back.out(2)" });
});

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
