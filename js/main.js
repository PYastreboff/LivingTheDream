(function () {
  const S = window.SITE || {};

  const links = {
    instagram: S.instagram || "",
    booking: S.bookingUrl || S.instagram || ""
  };

  document.querySelectorAll("[data-site-link]").forEach((el) => {
    const href = links[el.dataset.siteLink];
    if (!href) {
      el.hidden = true;
      return;
    }
    el.setAttribute("href", href);
    if (/^https?:/.test(href)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  document.querySelectorAll("[data-site-text]").forEach((el) => {
    const value = S[el.dataset.siteText];
    if (value) el.textContent = value;
    else if (el.hasAttribute("data-hide-empty")) el.hidden = true;
  });

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* Header + mobile menu */
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (toggle && header) {
    const setOpen = (open) => {
      header.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
    };
    toggle.addEventListener("click", () => setOpen(!header.classList.contains("menu-open")));
    header.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* Home page: preview of today's pick from the machine */
  const ticket = document.querySelector("[data-today-ticket]");
  if (ticket && window.Vend && window.CATEGORIES) {
    const cats = window.CATEGORIES;
    const cat = cats[window.Vend.dayNumber() % cats.length];
    const w = window.Vend.pickToday(cat.id);
    if (w) {
      ticket.href = "workout.html?c=" + cat.id;
      ticket.querySelector("[data-t-name]").textContent = w.name;
      ticket.querySelector("[data-t-cat]").textContent = cat.name;
      ticket.querySelector("[data-t-time]").textContent = w.time + " min";
    }
  }

  document.querySelectorAll("[data-machine-preview]").forEach((grid) => {
    if (!window.CATEGORIES || !window.Vend) return;
    grid.innerHTML = window.CATEGORIES.map(
      (c) =>
        '<a class="mini-slot" href="workout.html?c=' + c.id + '">' +
        window.Vend.icon(c.icon) +
        "<span>" + c.name + "</span><em>" + c.code + "</em></a>"
    ).join("");
  });
})();
