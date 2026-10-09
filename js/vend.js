(function () {
  const ICONS = {
    dumbbell: '<rect x="2" y="9.5" width="2.5" height="5" rx="1"/><rect x="4.5" y="7" width="3" height="10" rx="1"/><rect x="16.5" y="7" width="3" height="10" rx="1"/><rect x="19.5" y="9.5" width="2.5" height="5" rx="1"/><path d="M7.5 12h9"/>',
    stairs: '<path d="M3 20h4.5v-4.5H12V11h4.5V6.5H21"/><path d="M3 20h18"/>',
    body: '<circle cx="12" cy="4.5" r="2"/><path d="M4.5 9 12 10.5 19.5 9"/><path d="M12 10.5v4.5l-4 6"/><path d="m12 15 4 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    pulse: '<path d="M2.5 12h4l2.5-6.5 5 13 2.5-6.5h5"/>',
    kettlebell: '<path d="M8.5 10.5 8 7a4 4 0 0 1 8 0l-.5 3.5"/><circle cx="12" cy="15" r="6"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(n, seed) {
    const order = Array.from({ length: n }, (_, i) => i);
    const rand = rng(seed);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  function dayNumber(date) {
    const d = date || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  }

  function workoutsFor(categoryId) {
    return (window.WORKOUTS || []).filter((w) => w.category === categoryId);
  }

  // Same workout for everyone all day; every workout in a category is used once before any repeats.
  function pickToday(categoryId, date) {
    const list = workoutsFor(categoryId);
    if (!list.length) return null;
    const n = list.length;
    const day = dayNumber(date);
    const cycle = Math.floor(day / n);
    const order = shuffled(n, hash(categoryId + ":" + cycle));
    if (n > 1) {
      const prev = shuffled(n, hash(categoryId + ":" + (cycle - 1)));
      if (order[0] === prev[n - 1]) [order[0], order[1]] = [order[1], order[0]];
    }
    return list[order[day % n]];
  }

  function category(id) {
    return (window.CATEGORIES || []).find((c) => c.id === id);
  }

  window.Vend = { icon, pickToday, workoutsFor, category, dayNumber };
})();
