(function () {
  const S = window.SITE || {};
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const links = {
    instagram: S.instagram || "",
    booking: S.bookingUrl || "#contact",
    email: S.email ? "mailto:" + S.email : "",
    phone: S.phone ? "tel:" + S.phone.replace(/[^\d+]/g, "") : "",
    googleReviews: S.googleReviews || "",
    googleWriteReview: S.googleWriteReview || ""
  };

  document.querySelectorAll("[data-site-link]").forEach((el) => {
    const href = links[el.dataset.siteLink];
    if (!href) {
      (el.closest("[data-link-wrap]") || el).hidden = true;
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

  /* Testimonials */
  const GOOGLE_G = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
  const reviews = (S.testimonials || []).filter((t) => t && t.quote);
  const reviewsGrid = document.querySelector("[data-testimonials]");
  if (reviewsGrid) {
    if (reviews.length) {
      reviewsGrid.innerHTML = reviews.map((t) =>
        '<figure class="review reveal">' +
          "<blockquote>" + esc(t.quote) + "</blockquote>" +
          "<figcaption><strong>" + esc(t.name) + "</strong>" + (t.detail ? "<span>" + esc(t.detail) + "</span>" : "") +
            (t.source === "google" && S.googleReviews
              ? '<a class="review-source" href="' + esc(S.googleReviews) + '" target="_blank" rel="noopener">' + GOOGLE_G + "Google review</a>"
              : "") +
          "</figcaption>" +
        "</figure>"
      ).join("");
      reviewsGrid.closest("section").hidden = false;
    } else {
      document.querySelectorAll("[data-reviews-link]").forEach((a) => (a.hidden = true));
    }
  }

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

  /* Home page: preview of the machine */
  document.querySelectorAll("[data-machine-preview]").forEach((grid) => {
    if (!window.CATEGORIES || !window.Vend) return;
    grid.innerHTML = window.CATEGORIES.map(
      (c) =>
        '<a class="mini-slot' + (c.random ? " mini-wide" : "") + '" href="workout.html">' +
        window.Vend.icon(c.icon) +
        "<span>" + esc(c.name) + "</span><em>" + c.code + "</em></a>"
    ).join("");
  });

  /* Contact form → Google Sheet (falls back to email, then Instagram) */
  const form = document.getElementById("contact-form");
  if (form) {
    const status = document.getElementById("form-status");
    const say = (html, type) => {
      status.innerHTML = html;
      status.className = "form-status" + (type ? " is-" + type : "");
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = form.elements;
      const data = {
        type: "enquiry",
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
        email: f.email.value.trim(),
        interest: f.interest.value,
        message: f.message.value.trim()
      };

      if (!data.name) return say("Please add your name.", "error"), f.name.focus();
      if (!data.phone && !data.email) return say("Please add a phone number or email so I can get back to you.", "error"), f.phone.focus();
      if (data.email && !f.email.checkValidity()) return say("That email doesn't look right.", "error"), f.email.focus();
      if (!data.message) return say("Please add a message.", "error"), f.message.focus();

      if (S.googleScriptUrl && window.Vend) {
        const btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        say("Sending…");
        const ok = await window.Vend.send(data);
        btn.disabled = false;
        if (ok) {
          form.reset();
          return say("Thanks " + esc(data.name.split(" ")[0]) + "! Your message is in — I'll be in touch soon.", "success");
        }
      }

      if (S.email) {
        const body = data.message + "\n\n" + data.name + (data.phone ? "\n" + data.phone : "") + (data.email ? "\n" + data.email : "");
        window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Enquiry: " + data.interest) + "&body=" + encodeURIComponent(body);
        return say("Opening your email app…");
      }

      say('Sorry, the form isn\'t connected yet. Please <a href="' + esc(S.instagram) + '" target="_blank" rel="noopener">DM me on Instagram</a> instead.', "error");
    });
  }
})();
