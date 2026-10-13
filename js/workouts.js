/* ==========================================================================
   WORKOUT LIBRARY
   --------------------------------------------------------------------------
   Easiest option: edit the workouts in your Google Sheet instead (see
   google-apps-script/Code.gs). If the sheet is set up, it replaces this list.

   To edit here instead:
   - Each workout is a block from { to },
   - "category" must be one of: push · pull · legs · full
   - Each exercise is ["Exercise name", "Sets x Reps"] or
     ["Exercise name", "Sets x Reps", "Optional coaching note"]
   - Keep the commas between lines and blocks.
   ========================================================================== */

window.CATEGORIES = [
  { id: "push",   code: "A1", name: "Push",      blurb: "Chest, shoulders & triceps", icon: "push" },
  { id: "pull",   code: "A2", name: "Pull",      blurb: "Back & biceps",              icon: "pull" },
  { id: "legs",   code: "B1", name: "Legs",      blurb: "Quads, glutes & hamstrings", icon: "stairs" },
  { id: "full",   code: "B2", name: "Full Body", blurb: "Head-to-toe session",        icon: "body" },
  { id: "random", code: "C1", name: "Random",    blurb: "Feeling lucky? Any category", icon: "dice", random: true }
];

window.WORKOUTS = [

  /* ---------------------------------------------------------------- PUSH */
  {
    category: "push",
    exercises: [
      ["Machine Bench Press", "3 x 12"],
      ["Incline Dumbbell Bench", "3 x 12"],
      ["Seated Shoulder Press Machine", "3 x 12"],
      ["Cable Rope Tricep Extension", "2 x 15", "Superset with the next exercise"],
      ["Cable Rope Tricep Pushdown", "2 x 15", "Superset with the previous exercise"]
    ]
  },
  {
    category: "push",
    exercises: [
      ["Dumbbell Bench Press", "3 x 12"],
      ["Barbell Military Press", "3 x 12"],
      ["Pec Deck Machine", "3 x 12"],
      ["Dumbbell Overhead Tricep Extension", "3 x 12"],
      ["Bodyweight Dips", "3 x 8"]
    ]
  },
  {
    category: "push",
    exercises: [
      ["Dumbbell Military Press", "3 x 12"],
      ["Barbell Floor Press", "3 x 12"],
      ["Cable Lateral Raises", "3 x 12"],
      ["Close Grip Bench Press", "3 x 12"],
      ["Cable Chest Flies", "3 x 12"]
    ]
  },
  {
    category: "push",
    exercises: [
      ["Machine Chest Press", "3 x 12"],
      ["Dumbbell Front Raise", "3 x 12"],
      ["Plate Speed Press", "3 x 20"],
      ["Cable Bar Tricep Pushdown", "3 x 15"],
      ["Close Grip Push Up", "3 x 15"]
    ]
  },

  /* ---------------------------------------------------------------- PULL */
  {
    category: "pull",
    exercises: [
      ["Barbell Bent Over Row", "3 x 12"],
      ["Lat Pulldown", "3 x 12"],
      ["Seated Cable Row", "3 x 12"],
      ["Dumbbell Bicep Curl", "3 x 15"],
      ["Rope Hammer Curl", "3 x 15"]
    ]
  },
  {
    category: "pull",
    exercises: [
      ["Assisted Pull Ups", "3 x 12"],
      ["Single Arm Dumbbell Row", "3 x 12"],
      ["Close Grip Lat Pulldown", "3 x 12"],
      ["Straight Arm Cable Pulldown", "3 x 15"],
      ["Incline Dumbbell Bicep Curl", "3 x 15"]
    ]
  },
  {
    category: "pull",
    exercises: [
      ["Chest Supported Dumbbell Row", "3 x 12"],
      ["Wide Grip Lat Pulldown", "3 x 12"],
      ["Cable Face Pull", "3 x 12"],
      ["Reverse Pec Deck", "3 x 12"],
      ["EZ Bar Bicep Curl", "3 x 15"]
    ]
  },
  {
    category: "pull",
    exercises: [
      ["Neutral Grip Lat Pulldown", "3 x 12"],
      ["Chest Supported Machine Row", "3 x 12"],
      ["Single Arm Cable Row", "3 x 12"],
      ["Cable Rear Delt Fly", "3 x 12"],
      ["Cable Bicep Curl", "3 x 15"]
    ]
  },

  /* ---------------------------------------------------------------- LEGS */
  {
    category: "legs",
    exercises: [
      ["Leg Press", "3 x 12"],
      ["Romanian Deadlift", "3 x 8"],
      ["Machine Hip Thrust", "3 x 12"],
      ["Seated Quad Extension", "3 x 12"],
      ["Seated Hamstring Curl", "3 x 12"]
    ]
  },
  {
    category: "legs",
    exercises: [
      ["Hack Press", "3 x 12"],
      ["Glute Kickback Machine", "3 x 12"],
      ["Lying Leg Curl", "3 x 12"],
      ["Walking Bodyweight Lunges", "3 x 8 per leg"],
      ["Weighted Step Up", "3 x 8"],
      ["Machine Calf Raise", "3 x 15"]
    ]
  },
  {
    category: "legs",
    exercises: [
      ["Dumbbell Goblet Squat", "3 x 8"],
      ["Machine Hip Thrust", "3 x 12"],
      ["Heel Elevated Bodyweight Squat", "3 x 12"],
      ["Kettlebell Swing", "3 x 12"],
      ["Dumbbell Calf Raise", "3 x 12"]
    ]
  },
  {
    category: "legs",
    exercises: [
      ["Barbell Hip Thrust", "3 x 8"],
      ["Seated Hamstring Curl", "3 x 12"],
      ["Jump Squat", "3 x 12"],
      ["Seated Abductor", "3 x 10"],
      ["Seated Adductor", "3 x 10"]
    ]
  },

  /* ----------------------------------------------------------- FULL BODY */
  {
    category: "full",
    exercises: [
      ["Barbell Back Squat", "3 x 8"],
      ["Dumbbell Bench Press", "3 x 12"],
      ["Lat Pulldown", "3 x 12"],
      ["Dumbbell Romanian Deadlift", "3 x 10"],
      ["Seated Shoulder Press", "3 x 10"],
      ["Plank", "3 x 30 sec"]
    ]
  },
  {
    category: "full",
    exercises: [
      ["Leg Press", "3 x 10"],
      ["Chest Press Machine", "3 x 12"],
      ["Seated Cable Row", "3 x 12"],
      ["Seated Leg Curl", "3 x 12"],
      ["Machine Shoulder Press", "3 x 12"],
      ["Cable Crunch", "3 x 15"]
    ]
  },
  {
    category: "full",
    exercises: [
      ["Dumbbell Goblet Squat", "3 x 12"],
      ["Dumbbell Romanian Deadlift", "3 x 12"],
      ["Dumbbell Floor Press", "3 x 12"],
      ["Single Arm Dumbbell Row", "3 x 12"],
      ["Dumbbell Lateral Raise", "3 x 12"],
      ["Dead Bug", "3 x 8 each side"]
    ]
  },
  {
    category: "full",
    exercises: [
      ["Dumbbell Thruster", "3 x 12"],
      ["Incline Dumbbell Bench Press", "3 x 12"],
      ["Assisted Pull Up", "3 x 12"],
      ["Dumbbell Step Ups", "3 x 8"],
      ["Cable Face Pull", "3 x 12"],
      ["Walking Lunge", "3 x 10"]
    ]
  }
];
