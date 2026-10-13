/**
 * LIVING THE DREAM — Google Sheet backend (free)
 * ==========================================================================
 * Saves vending machine leads, every workout roll, and contact form messages
 * into a Google Sheet, and lets you edit the vending machine workouts from
 * the same sheet.
 *
 * ONE-TIME SETUP (about 10 minutes)
 * 1. Go to https://sheets.new and name the sheet "Living the Dream".
 * 2. Extensions → Apps Script. Delete everything in Code.gs, paste this whole
 *    file in, and click Save.
 * 3. (Optional) Put your email in NOTIFY_EMAIL below to get an email for every
 *    new lead / contact form message.
 * 4. In the toolbar pick the function "setup" and click Run. Google will ask for
 *    permission: Review permissions → choose your account → Advanced →
 *    "Go to … (unsafe)" → Allow. (It's your own script, this is normal.)
 *    This creates the Leads, Rolls, Enquiries, Workouts and Stats tabs and fills
 *    the Workouts tab with the current workouts.
 * 5. Deploy → New deployment → click the gear → Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy and copy the "Web app" URL (it ends in /exec).
 * 6. Paste that URL into js/config.js → googleScriptUrl, then push to GitHub.
 *
 * EDITING WORKOUTS
 * - Open the "Workouts" tab. One row per exercise.
 * - Category must be Push, Pull, Legs or Full Body.
 * - Rows with the same Workout name are grouped into one workout, in order.
 * - Delete rows to remove workouts, add rows to add them. Changes show on the
 *   site within about a minute — no code needed.
 *
 * IF YOU EVER CHANGE THIS CODE: Deploy → Manage deployments → pencil icon →
 * Version: "New version" → Deploy. (The URL stays the same.)
 * ==========================================================================
 */

const NOTIFY_EMAIL = "";          // e.g. "tristan@example.com" — leave "" for no emails
const NOTIFY_ON_LEADS = true;     // email for each new vending machine lead
const NOTIFY_ON_ENQUIRIES = true; // email for each contact form message

const TABS = {
  Leads: ["Date", "Name", "Phone", "Email", "Consent", "Source", "Device"],
  Rolls: ["Date", "Name", "Phone", "Email", "Picked", "Category", "Workout", "Device"],
  Enquiries: ["Date", "Name", "Phone", "Email", "Interested in", "Message"],
  Workouts: ["Category", "Workout", "Exercise", "Sets x Reps", "Notes"]
};

/* ---------------------------------------------------------------- Web app */

function doPost(e) {
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false }); }

  const now = new Date();
  const ss = SpreadsheetApp.getActive();

  if (data.type === "lead") {
    const sheet = tab(ss, "Leads");
    const phone = digits(data.phone);
    const existing = sheet.getLastRow() > 1
      ? sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().some(r => digits(r[0]) === phone)
      : false;
    if (!existing) {
      sheet.appendRow([now, text(data.name), phoneText(data.phone), text(data.email), text(data.consent), text(data.source), text(data.device)]);
      if (NOTIFY_EMAIL && NOTIFY_ON_LEADS) {
        notify("New vending machine lead: " + clip(data.name),
          "Name: " + clip(data.name) + "\nPhone: " + clip(data.phone) + "\nEmail: " + clip(data.email));
      }
    }
  } else if (data.type === "roll") {
    tab(ss, "Rolls").appendRow([now, text(data.name), phoneText(data.phone), text(data.email), text(data.picked), text(data.category), text(data.workout), text(data.device)]);
  } else if (data.type === "enquiry") {
    tab(ss, "Enquiries").appendRow([now, text(data.name), phoneText(data.phone), text(data.email), text(data.interest), text(data.message, 3000)]);
    if (NOTIFY_EMAIL && NOTIFY_ON_ENQUIRIES) {
      const opts = data.email ? { replyTo: clip(data.email) } : {};
      notify("Website enquiry from " + clip(data.name),
        "Name: " + clip(data.name) + "\nPhone: " + clip(data.phone) + "\nEmail: " + clip(data.email) +
        "\nInterested in: " + clip(data.interest) + "\n\n" + clip(data.message, 3000), opts);
    }
  }
  return json({ ok: true });
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action !== "workouts") return json({ ok: true });

  const cache = CacheService.getScriptCache();
  const cached = cache.get("workouts");
  if (cached) return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);

  const sheet = SpreadsheetApp.getActive().getSheetByName("Workouts");
  const rows = sheet && sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getDisplayValues() : [];

  const workouts = [];
  let current = null;
  let lastCategory = "";
  let lastName = "";
  rows.forEach(r => {
    const category = String(r[0]).trim() || lastCategory;
    const name = String(r[1]).trim() || lastName;
    const exercise = String(r[2]).trim();
    if (!category || !exercise) return;
    if (!current || category !== lastCategory || name !== lastName) {
      current = { category: category, name: name, exercises: [] };
      workouts.push(current);
    }
    current.exercises.push([exercise, String(r[3]).trim(), String(r[4]).trim()]);
    lastCategory = category;
    lastName = name;
  });

  const body = JSON.stringify({ workouts: workouts });
  cache.put("workouts", body, 60);
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------------------------------------------------------- Setup */

function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(TABS).forEach(name => tab(ss, name));

  const workouts = ss.getSheetByName("Workouts");
  if (workouts.getLastRow() < 2) {
    const rows = SEED.trim().split("\n").map(line => {
      const p = line.split("|").map(s => s.trim());
      return [p[0], p[1], p[2], p[3], p[4] || ""];
    });
    workouts.getRange(2, 1, rows.length, 5).setValues(rows);
  }
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(["Push", "Pull", "Legs", "Full Body"], true).build();
  workouts.getRange("A2:A1000").setDataValidation(rule);
  workouts.setColumnWidth(2, 110).setColumnWidth(3, 280).setColumnWidth(4, 120).setColumnWidth(5, 280);

  let stats = ss.getSheetByName("Stats");
  if (!stats) {
    stats = ss.insertSheet("Stats");
    stats.getRange(1, 1, 10, 2).setValues([
      ["Total workout rolls", "=COUNTA(Rolls!A2:A)"],
      ["Rolls today", "=COUNTIFS(Rolls!A2:A, \">=\"&TODAY())"],
      ["Rolls last 7 days", "=COUNTIFS(Rolls!A2:A, \">=\"&TODAY()-6)"],
      ["Unique people (devices)", "=IFERROR(COUNTUNIQUE(Rolls!H2:H), 0)"],
      ["Total leads", "=COUNTA(Leads!A2:A)"],
      ["Rolls — Push", "=COUNTIF(Rolls!E2:E, \"Push\")"],
      ["Rolls — Pull", "=COUNTIF(Rolls!E2:E, \"Pull\")"],
      ["Rolls — Legs", "=COUNTIF(Rolls!E2:E, \"Legs\")"],
      ["Rolls — Full Body", "=COUNTIF(Rolls!E2:E, \"Full Body\")"],
      ["Rolls — Random", "=COUNTIF(Rolls!E2:E, \"Random\")"]
    ]);
    stats.getRange("A1:A10").setFontWeight("bold");
    stats.setColumnWidth(1, 220);
  }

  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
}

/* ---------------------------------------------------------------- Helpers */

function tab(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, TABS[name].length).setValues([TABS[name]]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clip(value, max) {
  return String(value == null ? "" : value).slice(0, max || 200);
}

// Stops values being treated as formulas in the sheet.
function text(value, max) {
  const v = clip(value, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Keeps leading zeros and +61 on phone numbers.
function phoneText(value) {
  const v = clip(value, 40);
  return v ? "'" + v : "";
}

function digits(value) {
  return String(value == null ? "" : value).replace(/\D/g, "");
}

function notify(subject, body, opts) {
  try { MailApp.sendEmail(Object.assign({ to: NOTIFY_EMAIL, subject: subject, body: body }, opts || {})); } catch (err) {}
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------------------------------------------------------- Starting workouts */

const SEED = `
Push | Push 01 | Machine Bench Press | 3 x 12
Push | Push 01 | Incline Dumbbell Bench | 3 x 12
Push | Push 01 | Seated Shoulder Press Machine | 3 x 12
Push | Push 01 | Cable Rope Tricep Extension | 2 x 15 | Superset with the next exercise
Push | Push 01 | Cable Rope Tricep Pushdown | 2 x 15 | Superset with the previous exercise
Push | Push 02 | Dumbbell Bench Press | 3 x 12
Push | Push 02 | Barbell Military Press | 3 x 12
Push | Push 02 | Pec Deck Machine | 3 x 12
Push | Push 02 | Dumbbell Overhead Tricep Extension | 3 x 12
Push | Push 02 | Bodyweight Dips | 3 x 8
Push | Push 03 | Dumbbell Military Press | 3 x 12
Push | Push 03 | Barbell Floor Press | 3 x 12
Push | Push 03 | Cable Lateral Raises | 3 x 12
Push | Push 03 | Close Grip Bench Press | 3 x 12
Push | Push 03 | Cable Chest Flies | 3 x 12
Push | Push 04 | Machine Chest Press | 3 x 12
Push | Push 04 | Dumbbell Front Raise | 3 x 12
Push | Push 04 | Plate Speed Press | 3 x 20
Push | Push 04 | Cable Bar Tricep Pushdown | 3 x 15
Push | Push 04 | Close Grip Push Up | 3 x 15
Pull | Pull 01 | Barbell Bent Over Row | 3 x 12
Pull | Pull 01 | Lat Pulldown | 3 x 12
Pull | Pull 01 | Seated Cable Row | 3 x 12
Pull | Pull 01 | Dumbbell Bicep Curl | 3 x 15
Pull | Pull 01 | Rope Hammer Curl | 3 x 15
Pull | Pull 02 | Assisted Pull Ups | 3 x 12
Pull | Pull 02 | Single Arm Dumbbell Row | 3 x 12
Pull | Pull 02 | Close Grip Lat Pulldown | 3 x 12
Pull | Pull 02 | Straight Arm Cable Pulldown | 3 x 15
Pull | Pull 02 | Incline Dumbbell Bicep Curl | 3 x 15
Pull | Pull 03 | Chest Supported Dumbbell Row | 3 x 12
Pull | Pull 03 | Wide Grip Lat Pulldown | 3 x 12
Pull | Pull 03 | Cable Face Pull | 3 x 12
Pull | Pull 03 | Reverse Pec Deck | 3 x 12
Pull | Pull 03 | EZ Bar Bicep Curl | 3 x 15
Pull | Pull 04 | Neutral Grip Lat Pulldown | 3 x 12
Pull | Pull 04 | Chest Supported Machine Row | 3 x 12
Pull | Pull 04 | Single Arm Cable Row | 3 x 12
Pull | Pull 04 | Cable Rear Delt Fly | 3 x 12
Pull | Pull 04 | Cable Bicep Curl | 3 x 15
Legs | Legs 01 | Leg Press | 3 x 12
Legs | Legs 01 | Romanian Deadlift | 3 x 8
Legs | Legs 01 | Machine Hip Thrust | 3 x 12
Legs | Legs 01 | Seated Quad Extension | 3 x 12
Legs | Legs 01 | Seated Hamstring Curl | 3 x 12
Legs | Legs 02 | Hack Press | 3 x 12
Legs | Legs 02 | Glute Kickback Machine | 3 x 12
Legs | Legs 02 | Lying Leg Curl | 3 x 12
Legs | Legs 02 | Walking Bodyweight Lunges | 3 x 8 per leg
Legs | Legs 02 | Weighted Step Up | 3 x 8
Legs | Legs 02 | Machine Calf Raise | 3 x 15
Legs | Legs 03 | Dumbbell Goblet Squat | 3 x 8
Legs | Legs 03 | Machine Hip Thrust | 3 x 12
Legs | Legs 03 | Heel Elevated Bodyweight Squat | 3 x 12
Legs | Legs 03 | Kettlebell Swing | 3 x 12
Legs | Legs 03 | Dumbbell Calf Raise | 3 x 12
Legs | Legs 04 | Barbell Hip Thrust | 3 x 8
Legs | Legs 04 | Seated Hamstring Curl | 3 x 12
Legs | Legs 04 | Jump Squat | 3 x 12
Legs | Legs 04 | Seated Abductor | 3 x 10
Legs | Legs 04 | Seated Adductor | 3 x 10
Full Body | Full Body 01 | Barbell Back Squat | 3 x 8
Full Body | Full Body 01 | Dumbbell Bench Press | 3 x 12
Full Body | Full Body 01 | Lat Pulldown | 3 x 12
Full Body | Full Body 01 | Dumbbell Romanian Deadlift | 3 x 10
Full Body | Full Body 01 | Seated Shoulder Press | 3 x 10
Full Body | Full Body 01 | Plank | 3 x 30 sec
Full Body | Full Body 02 | Leg Press | 3 x 10
Full Body | Full Body 02 | Chest Press Machine | 3 x 12
Full Body | Full Body 02 | Seated Cable Row | 3 x 12
Full Body | Full Body 02 | Seated Leg Curl | 3 x 12
Full Body | Full Body 02 | Machine Shoulder Press | 3 x 12
Full Body | Full Body 02 | Cable Crunch | 3 x 15
Full Body | Full Body 03 | Dumbbell Goblet Squat | 3 x 12
Full Body | Full Body 03 | Dumbbell Romanian Deadlift | 3 x 12
Full Body | Full Body 03 | Dumbbell Floor Press | 3 x 12
Full Body | Full Body 03 | Single Arm Dumbbell Row | 3 x 12
Full Body | Full Body 03 | Dumbbell Lateral Raise | 3 x 12
Full Body | Full Body 03 | Dead Bug | 3 x 8 each side
Full Body | Full Body 04 | Dumbbell Thruster | 3 x 12
Full Body | Full Body 04 | Incline Dumbbell Bench Press | 3 x 12
Full Body | Full Body 04 | Assisted Pull Up | 3 x 12
Full Body | Full Body 04 | Dumbbell Step Ups | 3 x 8
Full Body | Full Body 04 | Cable Face Pull | 3 x 12
Full Body | Full Body 04 | Walking Lunge | 3 x 10
`;
