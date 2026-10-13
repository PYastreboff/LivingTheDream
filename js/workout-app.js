(function () {
  const { icon, category, workoutsFor, pickRandom, loadLibrary, send, dayNumber } = window.Vend;
  const cats = window.CATEGORIES || [];

  const $ = (sel) => document.querySelector(sel);
  const machineView = $("#machine-view");
  const resultView = $("#result-view");
  const slots = $("#vm-slots");
  const display = $("#vm-text");
  const tray = $("#vm-tray");
  const item = $("#vm-item");
  const workoutEl = $("#workout");
  const lockedEl = $("#locked");
  const hintEl = $("#hint");
  const sheet = $("#lead-sheet");
  const leadForm = $("#lead-form");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const today = dayNumber();
  $("#today-date").textContent = new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

  /* ---------- Storage ---------- */

  const store = {
    get(key) {
      try { return JSON.parse(localStorage.getItem("ltd:" + key)); } catch (_) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem("ltd:" + key, JSON.stringify(value)); } catch (_) {}
    }
  };

  let device = store.get("device");
  if (!device) {
    device = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    store.set("device", device);
  }

  let lead = store.get("lead");
  let roll = store.get("roll");
  const rolledToday = () => !!(roll && roll.day === today && roll.workout);

  loadLibrary();

  /* ---------- Machine ---------- */

  slots.innerHTML = cats.map((c) => {
    const count = workoutsFor(c.id).length;
    return (
      '<button class="slot' + (c.random ? " slot-wide" : "") + '" type="button" data-id="' + c.id + '"' + (count ? "" : " disabled") + ">" +
        '<span class="slot-code">' + c.code + "</span>" +
        '<span class="slot-icon">' + icon(c.icon) + "</span>" +
        '<span class="slot-name">' + esc(c.name) + "</span>" +
        '<span class="slot-blurb">' + esc(count ? c.blurb : "Coming soon") + "</span>" +
        '<span class="slot-coil" aria-hidden="true"></span>' +
      "</button>"
    );
  }).join("");

  function setLocked(locked) {
    machineView.classList.toggle("is-locked", locked);
    slots.querySelectorAll(".slot").forEach((s) => {
      s.disabled = locked || !workoutsFor(s.dataset.id).length;
      s.classList.toggle("is-picked", locked && roll && s.dataset.id === roll.slot);
    });
    lockedEl.hidden = !locked;
    hintEl.hidden = locked;
    display.textContent = locked ? "See you tomorrow" : "Select a workout";
  }

  let busy = false;

  slots.addEventListener("click", (e) => {
    const btn = e.target.closest(".slot");
    if (!btn || busy) return;
    if (rolledToday()) return showResult(false);
    const cat = category(btn.dataset.id);
    if (!lead) return openLeadSheet(cat);
    vend(cat, btn);
  });

  async function vend(cat, btn) {
    busy = true;
    await loadLibrary();
    const w = pickRandom(cat.id, roll && roll.workout && roll.workout.id);
    if (!w) {
      display.textContent = "Sold out — pick another";
      busy = false;
      return;
    }

    slots.querySelectorAll(".slot").forEach((s) => s.classList.toggle("is-picked", s === btn));
    slots.classList.add("is-busy");
    if (navigator.vibrate) navigator.vibrate(12);
    const trayBox = tray.getBoundingClientRect();
    if (trayBox.bottom > window.innerHeight) {
      window.scrollBy({ top: trayBox.bottom - window.innerHeight + 24, behavior: reduceMotion ? "auto" : "smooth" });
    }

    const landed = category(w.category);
    display.textContent = cat.code;
    await wait(450);
    if (cat.random && !reduceMotion) {
      const names = cats.filter((c) => !c.random).map((c) => c.name);
      for (let i = 0; i < 9; i++) {
        display.textContent = names[i % names.length] + "?";
        await wait(90 + i * 18);
      }
      display.textContent = landed.name + "!";
      await wait(450);
    }
    display.textContent = "Vending…";
    btn.classList.add("is-vending");
    await wait(900);

    item.innerHTML = icon(landed.icon);
    tray.classList.add("has-item");
    if (navigator.vibrate) navigator.vibrate([10, 40, 20]);
    display.textContent = "Enjoy!";

    roll = { day: today, slot: cat.id, workout: w, at: new Date().toISOString() };
    store.set("roll", roll);
    send({
      type: "roll",
      device,
      name: lead ? lead.name : "",
      phone: lead ? lead.phone : "",
      email: lead ? lead.email : "",
      picked: cat.name,
      category: landed.name,
      workout: w.name
    });

    await wait(900);
    slots.classList.remove("is-busy");
    slots.querySelectorAll(".slot").forEach((s) => s.classList.remove("is-vending"));
    tray.classList.remove("has-item");
    setLocked(true);
    showResult(true);
    busy = false;
  }

  /* ---------- Lead form ---------- */

  let pendingCat = null;
  let lastFocus = null;

  function openLeadSheet(cat) {
    pendingCat = cat;
    lastFocus = document.activeElement;
    $("#lead-tag").innerHTML = icon(cat.icon) + esc(cat.code + " · " + cat.name);
    sheet.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => {
      sheet.classList.add("open");
      if (window.matchMedia("(hover: hover)").matches) leadForm.elements.name.focus();
    });
  }

  function closeLeadSheet() {
    sheet.classList.remove("open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { sheet.hidden = true; }, reduceMotion ? 0 : 250);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  $("#lead-close").addEventListener("click", closeLeadSheet);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeLeadSheet(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) closeLeadSheet(); });

  leadForm.elements.phone.addEventListener("input", (e) => e.target.setCustomValidity(""));

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = leadForm.elements;
    const phone = f.phone.value.trim();
    if (phone.replace(/\D/g, "").length < 8) {
      f.phone.setCustomValidity("Please enter a valid phone number.");
      f.phone.reportValidity();
      return;
    }
    lead = {
      name: f.name.value.trim(),
      phone,
      email: f.email.value.trim(),
      at: new Date().toISOString()
    };
    store.set("lead", lead);
    send({ type: "lead", device, name: lead.name, phone: lead.phone, email: lead.email, consent: "Yes", source: "Vending machine" });

    closeLeadSheet();
    const cat = pendingCat;
    pendingCat = null;
    if (cat) vend(cat, slots.querySelector('.slot[data-id="' + cat.id + '"]'));
  });

  /* ---------- Result ---------- */

  const doneKey = "done:" + today;
  const loadDone = () => new Set(store.get(doneKey) || []);

  function showResult(animate) {
    if (!rolledToday()) return;
    const w = roll.workout;
    const cat = category(w.category) || { code: "", name: w.category, icon: "dumbbell" };
    const slot = category(roll.slot);
    const done = loadDone();
    const total = w.exercises.length;
    const sets = w.exercises.reduce((sum, ex) => sum + (parseInt(ex.reps, 10) || 0), 0);
    const firstName = lead && lead.name ? lead.name.split(" ")[0] : "";

    workoutEl.innerHTML =
      '<header class="w-hero">' +
        '<div class="w-hero-top">' +
          '<span class="w-tag">' + icon(cat.icon) + esc(cat.code + " · " + cat.name) + "</span>" +
          '<span class="w-label">' + (slot && slot.random ? "Random roll" : "Today's roll") + "</span>" +
        "</div>" +
        "<h1>" + esc(w.name) + "</h1>" +
        '<div class="w-meta">' +
          meta('<path d="M4 6h16M4 12h16M4 18h10"/>', total + " exercises") +
          (sets ? meta('<path d="M4 20V14M10 20V9M16 20V4"/>', sets + " sets") : "") +
          (firstName ? meta('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', "Rolled by " + firstName) : "") +
        "</div>" +
      "</header>" +

      '<div class="w-block">' +
        '<div class="w-list-head"><h2>The workout</h2><span class="w-count" id="w-count"></span></div>' +
        '<div class="progress"><span id="w-progress"></span></div>' +
        '<ol class="ex-list">' +
          w.exercises.map((ex, i) =>
            '<li><button class="ex' + (done.has(i) ? " done" : "") + '" type="button" data-i="' + i + '" aria-pressed="' + done.has(i) + '">' +
              '<span class="ex-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-8"/></svg></span>' +
              '<span class="ex-body"><span class="ex-name">' + esc(ex.name) + "</span>" +
                (ex.tip ? '<span class="ex-tip">' + esc(ex.tip) + "</span>" : "") +
              "</span>" +
              '<span class="ex-reps">' + esc(ex.reps) + "</span>" +
            "</button></li>"
          ).join("") +
        "</ol>" +
      "</div>" +

      '<div class="complete" id="complete" hidden>' +
        '<div class="complete-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></div>' +
        "<strong>Workout complete!</strong><span>That's living the dream. Come back tomorrow for another roll.</span>" +
      "</div>";

    const update = (celebrate) => {
      const n = done.size;
      $("#w-count").textContent = n + " / " + total + " done";
      $("#w-progress").style.width = (total ? (n / total) * 100 : 0) + "%";
      const finished = n === total && total > 0;
      const complete = $("#complete");
      const wasHidden = complete.hidden;
      complete.hidden = !finished;
      if (finished && wasHidden && celebrate) {
        complete.classList.add("pop");
        complete.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        if (navigator.vibrate) navigator.vibrate([20, 60, 20, 60, 40]);
      }
    };

    workoutEl.querySelectorAll(".ex").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        if (done.has(i)) done.delete(i); else done.add(i);
        btn.classList.toggle("done", done.has(i));
        btn.setAttribute("aria-pressed", String(done.has(i)));
        store.set(doneKey, [...done]);
        update(true);
      });
    });
    update(false);

    machineView.hidden = true;
    resultView.hidden = false;
    resultView.classList.toggle("enter", !!animate);
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = w.name + " · Workout Vending Machine";
  }

  function meta(path, text) {
    return '<span><svg viewBox="0 0 24 24" aria-hidden="true">' + path + "</svg>" + esc(text) + "</span>";
  }

  function showMachine() {
    resultView.hidden = true;
    machineView.hidden = false;
    document.title = "Workout Vending Machine · Living the Dream";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  $("#back-btn").addEventListener("click", showMachine);
  $("#view-today").addEventListener("click", () => showResult(true));

  /* ---------- Countdown to midnight ---------- */

  function tick() {
    const now = new Date();
    if (dayNumber(now) !== today) {
      window.location.reload();
      return;
    }
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const mins = Math.max(1, Math.ceil((midnight - now) / 60000));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const text = (h ? h + "h " : "") + m + "m";
    document.querySelectorAll("[data-countdown]").forEach((el) => { el.textContent = text; });
  }
  tick();
  setInterval(tick, 30000);

  /* ---------- Start ---------- */

  setLocked(rolledToday());
  if (rolledToday()) showResult(false);
})();
