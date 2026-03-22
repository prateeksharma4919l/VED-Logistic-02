const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const reveals = [...document.querySelectorAll(".reveal")];
const counters = [...document.querySelectorAll("[data-counter]")];
const sections = [...document.querySelectorAll("main section[id]")];
const progressFill = document.querySelector(".progress-fill");
const floatingCards = [...document.querySelectorAll(".float-card")];

const closeMenu = () => {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

const openMenu = () => {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  siteNav.classList.add("is-open");
  document.body.classList.add("menu-open");
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

const animateCounter = (element) => {
  const target = Number(element.dataset.counter);
  const suffix = element.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.round(target * eased);

    element.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  };

  requestAnimationFrame(updateValue);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  reveals.forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
  counters.forEach((counter) => {
    const suffix = counter.dataset.suffix || "";
    counter.textContent = `${counter.dataset.counter}${suffix}`;
  });
}

const setActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.32;
  let activeSectionId = "";

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      activeSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;
    link.classList.toggle("is-active", isActive);
  });
};

const setScrollProgress = () => {
  if (!progressFill) {
    return;
  }

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressFill.style.width = `${progress * 100}%`;
};

const updateOnScroll = () => {
  setActiveLink();
  setScrollProgress();
};

window.addEventListener("scroll", updateOnScroll, { passive: true });
window.addEventListener("load", updateOnScroll);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && floatingCards.length) {
  window.addEventListener("mousemove", (event) => {
    const { innerWidth, innerHeight } = window;
    const xRatio = event.clientX / innerWidth - 0.5;
    const yRatio = event.clientY / innerHeight - 0.5;

    floatingCards.forEach((card, index) => {
      const depth = index === 0 ? 16 : 10;
      const x = xRatio * depth;
      const y = yRatio * depth;
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });
}
