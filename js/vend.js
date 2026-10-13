(function () {
  const S = window.SITE || {};

  const ICONS = {
    push: '<path d="M4 20h16"/><path d="M12 16V4"/><path d="m6.5 9.5 5.5-5.5 5.5 5.5"/>',
    pull: '<path d="M4 4h16"/><path d="M12 8v12"/><path d="m6.5 14.5 5.5 5.5 5.5-5.5"/>',
    stairs: '<path d="M3 20h4.5v-4.5H12V11h4.5V6.5H21"/><path d="M3 20h18"/>',
    body: '<circle cx="12" cy="4.5" r="2"/><path d="M4.5 9 12 10.5 19.5 9"/><path d="M12 10.5v4.5l-4 6"/><path d="m12 15 4 6"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/>',
    dumbbell: '<rect x="2" y="9.5" width="2.5" height="5" rx="1"/><rect x="4.5" y="7" width="3" height="10" rx="1"/><rect x="16.5" y="7" width="3" height="10" rx="1"/><rect x="19.5" y="9.5" width="2.5" height="5" rx="1"/><path d="M7.5 12h9"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function category(id) {
    return (window.CATEGORIES || []).find((c) => c.id === id);
  }

  function categoryId(value) {
    const v = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
    if (v === "fullbody") return "full";
    if (v === "leg") return "legs";
    return v;
  }

  function formatReps(value) {
    return String(value == null ? "" : value).trim().replace(/(\d)\s*[xX×]\s*(?=\S)/, "$1 × ");
  }

  function normalise(list) {
    const counts = {};
    return (list || [])
      .map((w) => {
        const catId = categoryId(w && w.category);
        const cat = category(catId);
        if (!cat || cat.random || !Array.isArray(w.exercises)) return null;
        const exercises = w.exercises
          .map((ex) => Array.isArray(ex)
            ? { name: ex[0], reps: formatReps(ex[1]), tip: ex[2] || "" }
            : { name: ex && ex.name, reps: formatReps(ex && ex.reps), tip: (ex && ex.tip) || "" })
          .filter((ex) => ex.name && String(ex.name).trim());
        if (!exercises.length) return null;
        counts[catId] = (counts[catId] || 0) + 1;
        return {
          id: catId + "-" + counts[catId],
          category: catId,
          name: w.name ? String(w.name).trim() : cat.name + " " + String(counts[catId]).padStart(2, "0"),
          exercises
        };
      })
      .filter(Boolean);
  }

  let library = normalise(window.WORKOUTS);
  let loading = null;

  // Pulls the workout list from the Google Sheet if one is connected; otherwise keeps js/workouts.js.
  function loadLibrary() {
    if (loading) return loading;
    if (!S.googleScriptUrl) return (loading = Promise.resolve(library));
    const ctrl = "AbortController" in window ? new AbortController() : null;
    const timer = setTimeout(() => ctrl && ctrl.abort(), 6000);
    loading = fetch(S.googleScriptUrl + "?action=workouts", ctrl ? { signal: ctrl.signal } : {})
      .then((r) => r.json())
      .then((data) => {
        const fresh = normalise(data && data.workouts);
        if (fresh.length) library = fresh;
        return library;
      })
      .catch(() => library)
      .finally(() => clearTimeout(timer));
    return loading;
  }

  function workoutsFor(catId) {
    const cat = category(catId);
    if (cat && cat.random) return library.slice();
    return library.filter((w) => w.category === catId);
  }

  function pickRandom(catId, avoidId) {
    let list = workoutsFor(catId);
    if (list.length > 1 && avoidId) list = list.filter((w) => w.id !== avoidId);
    return list.length ? list[Math.floor(Math.random() * list.length)] : null;
  }

  // Fire-and-forget POST to the Google Apps Script. text/plain avoids a CORS preflight.
  function send(payload) {
    if (!S.googleScriptUrl) return Promise.resolve(false);
    return fetch(S.googleScriptUrl, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(() => true, () => false);
  }

  function dayNumber(date) {
    const d = date || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  }

  window.Vend = { icon, category, workoutsFor, pickRandom, loadLibrary, send, dayNumber };
})();
