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

  // Google reviews: one link opens the reviews, the other opens "Write a review".
  googleReviews: "https://www.google.com/search?q=Living+the+Dream+Athletic+Performance#lrd=0xadc6d713fbbe736b:0xe8c08c20f0bcbb87,1,,,,",
  googleWriteReview: "https://www.google.com/search?q=Living+the+Dream+Athletic+Performance#lrd=0xadc6d713fbbe736b:0xe8c08c20f0bcbb87,3,,,,",

  // Client testimonials shown on the home page. Delete all of them to hide the section.
  // Add source: "google" to show a "Google review" link under the quote.
  testimonials: [
    {
      quote: "I've had a great experience with Tristan's personal training! I've seen improvements in my strength and performance in just a few short weeks! And he's answered all of my questions day and night! Would highly recommend.",
      name: "Alex Priscolin",
      detail: "",
      source: "google"
    },
    {
      quote: "Tristan is the best trainer ever! So friendly and encouraging that workouts feel fun whilst learning and growing so much! Highly recommend!!",
      name: "Alyssa",
      detail: "",
      source: "google"
    },
    {
      quote: "Couldn't recommend Tristan more! As someone who has trained with him in the past and competed alongside him in strongman, he genuinely cares and wants to do good and just have fun whilst helping you change your life. Has a killer music taste too!",
      name: "Jordan Cornell",
      detail: "",
      source: "google"
    }
  ]
};
