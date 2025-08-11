// Smooth scroll
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);

// Loader animation
window.addEventListener("load", () => {
  const tl = gsap.timeline({
    onComplete: () => document.getElementById("loader").remove()
  });

  tl.to(".loader-cat", {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out"
  })
  .to(".loader-bg", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut"
  }, "+=0.5");

  tl.fromTo(".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0 0)", duration: 1.2, ease: "power3.out" },
    "-=0.5"
  )
  .from(".fade-text", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.25,
    ease: "power2.out"
  }, "-=0.6");
});

// Project fade-ins
gsap.utils.toArray(".project").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 80%" },
    opacity: 0,
    y: 60,
    duration: 1,
    delay: i * 0.1,
    ease: "power3.out"
  });
});

// Mobile menu
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    lenis.scrollTo(link.getAttribute("href"));
    document.querySelector(".menu").classList.remove("open");
  });
});

// Dark mode
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  gsap.fromTo("#theme-toggle", { scale: 0.8 }, { scale: 1, duration: 0.2, ease: "back.out(2)" });
});

// Cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
