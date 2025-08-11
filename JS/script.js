// --- Safe helpers ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// --- Lenis smooth scrolling (init first) ---
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- GSAP plugins ---
gsap.registerPlugin(ScrollTrigger);

// --- Loader timeline (Alyssa-style timing & easing) ---
window.addEventListener('load', () => {
  const loader = $('#loader');
  const loaderBg = document.querySelector('.loader-bg');
  const loaderCat = document.querySelector('.loader-cat');
  const smoothWrapper = $('#smooth-wrapper');

  // ensure main content is hidden until we reveal it
  if (smoothWrapper) smoothWrapper.style.opacity = '0';

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" }
  });

  // 1) fast full-width background wipe-in (cover)
  tl.to(loaderBg, {
    scaleX: 1,
    duration: 0.55,
    ease: "power3.inOut",
    transformOrigin: "left center"
  });

  // 2) reveal the cat (clip-path) + focus (blur -> 0)
  tl.to(loaderCat, {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power2.out"
  }, "-=0.18");

  // 3) subtle pop (bounce)
  tl.to(loaderCat, {
    scale: 1.03,
    duration: 0.45,
    ease: "back.out(1.9)"
  }, "-=0.25");

  // 4) small hold
  tl.to({}, { duration: 0.25 });

  // 5) reveal content: collapse wipe from right -> left (scaleX to 0 from right)
  tl.to(loaderBg, {
    scaleX: 0,
    transformOrigin: "right center",
    duration: 0.75,
    ease: "power3.inOut"
  });

  // 6) slide loader out upward and at the same time show the page
  tl.to(loader, {
    y: "-110%",
    duration: 0.9,
    ease: "power3.inOut"
  }, "-=0.12");

  // 7) reveal main content & hero in a smooth sequence (overlap slightly)
  tl.to(smoothWrapper, { opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.5");

  tl.fromTo(".hero-title",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0 0)", duration: 1.05, ease: "power3.out" },
    "-=0.35"
  );

  tl.from(".fade-text", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.22,
    ease: "power2.out"
  }, "-=0.6");

  // 8) cleanup: remove loader element so it won't block interactions
  tl.call(() => {
    if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    // allow scrolling if you had disabled it elsewhere
    document.body.style.overflow = "";
  });

  // safety: if animation fails, ensure loader is removed after 5s
  setTimeout(() => {
    if ($('#loader')) $('#loader').remove();
    if (smoothWrapper) smoothWrapper.style.opacity = '1';
  }, 6000);
});

// --- reveal projects while scrolling ---
gsap.utils.toArray('.project').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0,
    y: 50,
    duration: 0.9,
    delay: i * 0.08,
    ease: 'power3.out'
  });
});

// --- mobile menu toggle (safe) ---
const menuToggle = $('#menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    if (menu) menu.classList.toggle('open');
  });
}

// --- smooth anchor scrolling for menu links ---
document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) lenis.scrollTo(target);
    const menu = document.querySelector('.menu');
    if (menu) menu.classList.remove('open');
  });
});

// --- dark mode with saved preference + smooth micro-bounce ---
const themeToggle = $('#theme-toggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    gsap.fromTo('#theme-toggle', { scale: 0.86 }, { scale: 1, duration: 0.22, ease: 'back.out(2)' });
  });
}

// --- custom cursor (safe) ---
const cursor = $('#custom-cursor');
if (cursor) {
  // Use requestAnimationFrame smoothing for performance
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    // small immediate set for responsiveness
    cursor.style.left = tx + 'px';
    cursor.style.top = ty + 'px';
  });

  // Optionally enlarge cursor on links
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}
