(function () {
  const { icon, pickToday, workoutsFor, category, dayNumber } = window.Vend;
  const cats = window.CATEGORIES || [];

  const $ = (sel) => document.querySelector(sel);
  const machineView = $("#machine-view");
  const resultView = $("#result-view");
  const slots = $("#vm-slots");
  const display = $("#vm-text");
  const tray = $("#vm-tray");
  const item = $("#vm-item");
  const workoutEl = $("#workout");
  const toast = $("#toast");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#today-date").textContent = new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

  /* ---------- Machine ---------- */

  slots.innerHTML = cats.map((c) => {
    const count = workoutsFor(c.id).length;
    return (
      '<button class="slot" type="button" data-id="' + c.id + '"' + (count ? "" : " disabled") + ">" +
        '<span class="slot-code">' + c.code + "</span>" +
        '<span class="slot-icon">' + icon(c.icon) + "</span>" +
        '<span class="slot-name">' + esc(c.name) + "</span>" +
        '<span class="slot-blurb">' + esc(count ? c.blurb : "Coming soon") + "</span>" +
        '<span class="slot-coil" aria-hidden="true"></span>' +
      "</button>"
    );
  }).join("");

  let busy = false;

  slots.addEventListener("click", async (e) => {
    const btn = e.target.closest(".slot");
    if (!btn || busy) return;
    busy = true;
    const cat = category(btn.dataset.id);

    slots.querySelectorAll(".slot").forEach((s) => s.classList.toggle("is-picked", s === btn));
    slots.classList.add("is-busy");
    if (navigator.vibrate) navigator.vibrate(12);
    const trayBox = tray.getBoundingClientRect();
    if (trayBox.bottom > window.innerHeight) {
      window.scrollBy({ top: trayBox.bottom - window.innerHeight + 24, behavior: reduceMotion ? "auto" : "smooth" });
    }

    display.textContent = cat.code;
    await wait(450);
    display.textContent = "Vending…";
    btn.classList.add("is-vending");
    await wait(900);

    item.innerHTML = icon(cat.icon);
    tray.classList.add("has-item");
    if (navigator.vibrate) navigator.vibrate([10, 40, 20]);
    display.textContent = "Enjoy!";
    await wait(900);

    showResult(cat.id, true);
    resetMachine();
    busy = false;
  });

  function resetMachine() {
    slots.classList.remove("is-busy");
    slots.querySelectorAll(".slot").forEach((s) => s.classList.remove("is-picked", "is-vending"));
    tray.classList.remove("has-item");
    display.textContent = "Select a workout";
  }

  /* ---------- Result ---------- */

  const startDay = dayNumber();
  const storeKey = (catId) => "ltd:" + startDay + ":" + catId;
  const loadDone = (catId) => {
    try { return new Set(JSON.parse(localStorage.getItem(storeKey(catId)) || "[]")); } catch (_) { return new Set(); }
  };
  const saveDone = (catId, set) => {
    try { localStorage.setItem(storeKey(catId), JSON.stringify([...set])); } catch (_) {}
  };

  let current = null;

  function showResult(catId, animate) {
    const cat = category(catId);
    const w = pickToday(catId);
    if (!cat || !w) return;
    current = { cat, w };

    const done = loadDone(catId);
    const total = w.exercises.length;

    workoutEl.innerHTML =
      '<header class="w-hero">' +
        '<div class="w-hero-top">' +
          '<span class="w-tag">' + icon(cat.icon) + esc(cat.code + " · " + cat.name) + "</span>" +
          '<span class="w-label">Today\'s workout</span>' +
        "</div>" +
        "<h1>" + esc(w.name) + "</h1>" +
        '<div class="w-meta">' +
          meta('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', w.time + " min") +
          meta('<path d="M4 20V14M10 20V9M16 20V4"/>', w.level) +
          meta('<path d="M4 6h16M4 12h16M4 18h10"/>', w.format) +
        "</div>" +
      "</header>" +

      (w.equipment && w.equipment.length
        ? '<div class="w-block"><h2>Equipment</h2><div class="chips">' + w.equipment.map((e) => '<span class="chip">' + esc(e) + "</span>").join("") + "</div></div>"
        : "") +

      (w.warmup ? '<div class="w-block w-note warm"><h2>Warm-up</h2><p>' + esc(w.warmup) + "</p></div>" : "") +

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

      (w.finisher ? '<div class="w-block w-note fire"><h2>Finisher</h2><p>' + esc(w.finisher) + "</p></div>" : "") +
      (w.notes ? '<div class="w-block w-note"><h2>Coach\'s notes</h2><p>' + esc(w.notes) + "</p></div>" : "") +

      '<div class="complete" id="complete" hidden>' +
        '<div class="complete-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></div>' +
        "<strong>Workout complete!</strong><span>That's living the dream. See you tomorrow.</span>" +
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
        saveDone(catId, done);
        update(true);
      });
    });
    update(false);

    machineView.hidden = true;
    resultView.hidden = false;
    resultView.classList.toggle("enter", !!animate);
    window.scrollTo({ top: 0, behavior: "auto" });

    const url = new URL(window.location.href);
    url.searchParams.set("c", catId);
    history.replaceState(null, "", url);
    document.title = w.name + " · Workout Vending Machine";
  }

  function meta(path, text) {
    return '<span><svg viewBox="0 0 24 24" aria-hidden="true">' + path + "</svg>" + esc(text) + "</span>";
  }

  function showMachine() {
    resultView.hidden = true;
    machineView.hidden = false;
    current = null;
    const url = new URL(window.location.href);
    url.searchParams.delete("c");
    history.replaceState(null, "", url);
    document.title = "Workout Vending Machine · Living the Dream";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  $("#back-btn").addEventListener("click", showMachine);
  $("#another-btn").addEventListener("click", showMachine);

  $("#share-btn").addEventListener("click", async () => {
    if (!current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("c", current.cat.id);
    const data = { title: current.w.name, text: "Today's " + current.cat.name + " workout: " + current.w.name, url: url.toString() };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) {}
      return;
    }
    try {
      await navigator.clipboard.writeText(data.url);
      showToast("Link copied");
    } catch (_) {
      showToast(data.url);
    }
  });

  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- Countdown to midnight ---------- */

  function tick() {
    const now = new Date();
    if (dayNumber(now) !== startDay) {
      if (resultView.hidden) window.location.reload();
      else $("#countdown").textContent = "Now — refresh";
      return;
    }
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const mins = Math.max(0, Math.ceil((midnight - now) / 60000));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    $("#countdown").textContent = (h ? h + "h " : "") + m + "m";
  }
  tick();
  setInterval(tick, 30000);

  /* ---------- Deep link: workout.html?c=upper ---------- */

  const initial = new URLSearchParams(window.location.search).get("c");
  if (initial && category(initial)) showResult(initial, false);
})();
