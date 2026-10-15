/* ==========================================================================
   SITE SETTINGS — edit these and they update everywhere on the site.
   Leave a value as "" to hide it.
   ========================================================================== */
window.SITE = {
  name: "Living the Dream",
  tagline: "Athletic Performance",

  instagram: "https://www.instagram.com/tristanwstrongman/",
  instagramHandle: "@tristanwstrongman",
  email: "tristanwstrong@gmail.com",                       // e.g. "tristan@example.com"
  phone: "0450 249 975",                       // e.g. "0400 000 000"

  // Where the "Book a session" buttons go. Leave "" to send people to Instagram.
  bookingUrl: "",

  // Your live website address. Used for the QR code on the printable poster.
  // Leave "" to automatically use whatever address the poster page is opened from.
  siteUrl: "https://www.livingthedreamathleticperformance.com/workout.html",

  // The Google Apps Script web app URL (see google-apps-script/Code.gs for setup).
  // This saves vending machine leads + contact form messages to your Google Sheet,
  // and lets you edit the workouts from the sheet. Leave "" until it's set up.
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbxxCTatGLnyvKyaKT5FHFz38bUBSRSFH6FCsccdSx0h3xdbst3Ivy_kDPvV_qhLgDh4/exec",

  // Client testimonials shown on the home page. Delete all of them to hide the section.
  testimonials: [
    {
      quote: "Placeholder — replace this with a real quote from a client about training with Tristan.",
      name: "Client name",
      detail: "e.g. Lost 10kg in 12 weeks"
    },
    {
      quote: "Placeholder — another client quote goes here. Keep it to two or three sentences.",
      name: "Client name",
      detail: "e.g. First strongman comp"
    },
    {
      quote: "Placeholder — a third client quote. Short and specific works best.",
      name: "Client name",
      detail: "e.g. Training with Tristan since 2024"
    }
  ]
};
