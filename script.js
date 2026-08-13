const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const pageContent = [document.querySelector("main"), document.querySelector("footer")];

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  header.classList.remove("menu-open");
  document.body.style.overflow = "";
  pageContent.forEach((element) => element.toggleAttribute("inert", false));
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  header.classList.toggle("menu-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
  pageContent.forEach((element) => element.toggleAttribute("inert", !isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -60%", threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

const journey = document.querySelector("[data-journey]");
const updateOnScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);

  if (!journey || reducedMotion) return;
  const rect = journey.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.55)));
  journey.style.setProperty("--journey-progress", String(1 - progress));
};

updateOnScroll();
window.addEventListener("scroll", updateOnScroll, { passive: true });

const counter = document.querySelector("[data-count]");
if (counter && !reducedMotion) {
  const target = Number(counter.dataset.count);
  counter.textContent = "0";
  const countObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1100);
      counter.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.disconnect();
  });
  countObserver.observe(counter);
}

const parallax = document.querySelector("[data-parallax]");
if (parallax && !reducedMotion) {
  parallax.addEventListener("pointermove", (event) => {
    const rect = parallax.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    parallax.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
  });
  parallax.addEventListener("pointerleave", () => {
    parallax.style.transform = "translate3d(0, 0, 0)";
  });
}

document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
