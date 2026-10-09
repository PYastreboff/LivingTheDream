/* ==========================================================================
   WORKOUT LIBRARY
   --------------------------------------------------------------------------
   HOW TO ADD A WORKOUT
   1. Copy any workout block below — from its opening {  to its closing },
   2. Paste it inside the same list (anywhere between the [ and ] brackets).
   3. Change the text inside the quotes. Keep the commas at the end of lines.

   "category" must match one of the category ids:
     upper · lower · full · core · conditioning · strongman

   "level" should be one of: Beginner · Intermediate · Advanced
   "finisher" and "notes" are optional — delete those lines if not needed.

   Each category picks one workout per day and works through every workout
   before repeating, so the more you add, the more variety members get.
   ========================================================================== */

window.CATEGORIES = [
  { id: "upper",        code: "A1", name: "Upper Body",   blurb: "Chest, back, shoulders & arms", icon: "dumbbell" },
  { id: "lower",        code: "A2", name: "Lower Body",   blurb: "Quads, glutes & hamstrings",    icon: "stairs" },
  { id: "full",         code: "B1", name: "Full Body",    blurb: "Head-to-toe strength",          icon: "body" },
  { id: "core",         code: "B2", name: "Core",         blurb: "Abs, obliques & stability",     icon: "target" },
  { id: "conditioning", code: "C1", name: "Conditioning", blurb: "Engine, sweat & intervals",     icon: "pulse" },
  { id: "strongman",    code: "C2", name: "Strongman",    blurb: "Lift, carry & move heavy stuff", icon: "kettlebell" }
];

window.WORKOUTS = [

  /* ---------------------------------------------------------------- UPPER */
  {
    category: "upper",
    name: "Push Day Builder",
    format: "Straight sets",
    time: 50,
    level: "Intermediate",
    equipment: ["Barbell", "Dumbbells", "Cable"],
    warmup: "Band pull-aparts 2×15 · Push-ups 2×10 · 2 light bench sets",
    exercises: [
      { name: "Barbell Bench Press", reps: "4 × 6–8", tip: "Rest 2 min. Last set 1–2 reps shy of failure" },
      { name: "Seated DB Shoulder Press", reps: "3 × 10", tip: "Rest 90 sec" },
      { name: "Incline DB Press", reps: "3 × 10", tip: "Slow 3 sec lower" },
      { name: "Cable Lateral Raise", reps: "3 × 15 / side", tip: "Lead with the elbow" },
      { name: "Rope Triceps Pushdown", reps: "3 × 12", tip: "Spread the rope at the bottom" }
    ],
    finisher: "Max push-ups in 60 sec × 2 rounds"
  },
  {
    category: "upper",
    name: "Pull Power",
    format: "Straight sets",
    time: 45,
    level: "Intermediate",
    equipment: ["Pull-up bar", "Barbell", "Dumbbells", "Cable"],
    warmup: "Scap pull-ups 2×8 · Band face pulls 2×15 · Light rows 2×10",
    exercises: [
      { name: "Pull-ups (or Lat Pulldown)", reps: "4 × 6–10", tip: "Full hang to chin over bar" },
      { name: "Barbell Bent-Over Row", reps: "4 × 8", tip: "Torso ~45°, pull to belly button" },
      { name: "Single-Arm DB Row", reps: "3 × 10 / side", tip: "Pause at the top" },
      { name: "Cable Face Pull", reps: "3 × 15", tip: "Pull to eye level, thumbs back" },
      { name: "Hammer Curl", reps: "3 × 12", tip: "No swinging" }
    ],
    finisher: "Dead hang — max time × 2"
  },
  {
    category: "upper",
    name: "Superset Sculpt",
    format: "Supersets",
    time: 40,
    level: "Intermediate",
    equipment: ["Dumbbells", "Bench", "Pull-up bar"],
    warmup: "Arm circles · Band dislocates 2×10 · Incline push-ups 2×10",
    exercises: [
      { name: "A1 · DB Bench Press", reps: "4 × 10", tip: "Straight into A2" },
      { name: "A2 · Chest-Supported DB Row", reps: "4 × 10", tip: "Rest 90 sec after the pair" },
      { name: "B1 · Standing DB Press", reps: "3 × 10", tip: "Squeeze glutes, ribs down" },
      { name: "B2 · Chin-ups", reps: "3 × max", tip: "Use a band if needed" },
      { name: "C1 · DB Curl", reps: "3 × 12", tip: "" },
      { name: "C2 · Bench Dips", reps: "3 × 12", tip: "Rest 60 sec after the pair" }
    ]
  },
  {
    category: "upper",
    name: "Shoulder Shred",
    format: "Straight sets + drop set",
    time: 45,
    level: "Intermediate",
    equipment: ["Barbell", "Dumbbells", "Cable"],
    warmup: "Band pull-aparts 2×20 · Light DB press 2×12",
    exercises: [
      { name: "Standing Barbell Overhead Press", reps: "4 × 6", tip: "Rest 2 min" },
      { name: "Arnold Press", reps: "3 × 10", tip: "Rotate smoothly" },
      { name: "DB Lateral Raise", reps: "3 × 12 + drop set", tip: "Final set: drop weight twice to failure" },
      { name: "Reverse Pec Deck / Rear Delt Fly", reps: "3 × 15", tip: "" },
      { name: "Cable Upright Row", reps: "3 × 12", tip: "Elbows to shoulder height only" }
    ]
  },
  {
    category: "upper",
    name: "Arm Pump",
    format: "Supersets",
    time: 35,
    level: "Beginner",
    equipment: ["EZ bar", "Dumbbells", "Cable"],
    warmup: "Light curls & pushdowns 2×15",
    exercises: [
      { name: "A1 · EZ Bar Curl", reps: "4 × 10", tip: "" },
      { name: "A2 · EZ Bar Skull Crusher", reps: "4 × 10", tip: "Elbows in" },
      { name: "B1 · Incline DB Curl", reps: "3 × 12", tip: "Full stretch at the bottom" },
      { name: "B2 · Close-Grip Push-ups", reps: "3 × max", tip: "" },
      { name: "C1 · Cable Curl", reps: "3 × 15", tip: "" },
      { name: "C2 · Overhead Cable Extension", reps: "3 × 15", tip: "Rest 60 sec after each pair" }
    ],
    finisher: "21s — 7 bottom-half, 7 top-half, 7 full curls"
  },
  {
    category: "upper",
    name: "Upper EMOM 24",
    format: "EMOM — every minute on the minute",
    time: 24,
    level: "Intermediate",
    equipment: ["Dumbbells", "TRX / rings"],
    warmup: "2 rounds: 10 push-ups, 10 band pull-aparts, 10 arm circles each way",
    exercises: [
      { name: "Minute 1 · Push-ups", reps: "12", tip: "" },
      { name: "Minute 2 · TRX / Ring Rows", reps: "12", tip: "" },
      { name: "Minute 3 · DB Push Press", reps: "10", tip: "" },
      { name: "Minute 4 · Renegade Rows", reps: "8 / side", tip: "Feet wide for balance" }
    ],
    notes: "Repeat the 4-minute cycle 6 times. Rest for whatever is left of each minute."
  },
  {
    category: "upper",
    name: "Bench Strength",
    format: "Strength + accessories",
    time: 55,
    level: "Advanced",
    equipment: ["Barbell", "Bench", "Dumbbells", "Bands"],
    warmup: "Band pull-aparts 3×15 · Bar-only bench 2×10 · Build up in 3–4 sets",
    exercises: [
      { name: "Bench Press", reps: "5 × 5", tip: "Work up to a heavy-but-clean top set" },
      { name: "Paused Bench Press", reps: "3 × 3", tip: "2 sec pause on the chest, ~75% of top set" },
      { name: "Weighted Dips", reps: "3 × 8", tip: "" },
      { name: "Pendlay Row", reps: "4 × 6", tip: "Bar returns to the floor each rep" },
      { name: "JM Press or Close-Grip Bench", reps: "3 × 8", tip: "" }
    ]
  },
  {
    category: "upper",
    name: "Back & Biceps Volume",
    format: "Straight sets",
    time: 50,
    level: "Intermediate",
    equipment: ["Pull-up bar", "Machines", "Cable", "EZ bar"],
    warmup: "Scap pull-ups 2×10 · Light pulldowns 2×12",
    exercises: [
      { name: "Pull-ups", reps: "5 × max", tip: "Stop 1 rep before form breaks" },
      { name: "T-Bar Row", reps: "4 × 10", tip: "" },
      { name: "Straight-Arm Pulldown", reps: "3 × 15", tip: "Squeeze lats at the bottom" },
      { name: "Seated Cable Row", reps: "3 × 12", tip: "Chest tall" },
      { name: "Preacher Curl", reps: "3 × 10", tip: "Slow lower" }
    ]
  },
  {
    category: "upper",
    name: "Bodyweight Upper",
    format: "Circuit — 3 rounds",
    time: 25,
    level: "Beginner",
    equipment: ["Bench", "Bar or TRX"],
    warmup: "Arm circles · Cat-cow · 10 wall push-ups",
    exercises: [
      { name: "Incline Push-ups", reps: "10", tip: "Hands on a bench" },
      { name: "Inverted Rows", reps: "8", tip: "Body straight like a plank" },
      { name: "Pike Push-ups", reps: "8", tip: "" },
      { name: "Bench Dips", reps: "10", tip: "" },
      { name: "Plank Shoulder Taps", reps: "20", tip: "Keep hips still" }
    ],
    notes: "Rest 90 sec between rounds."
  },
  {
    category: "upper",
    name: "Landmine & Cable",
    format: "Straight sets",
    time: 40,
    level: "Intermediate",
    equipment: ["Landmine", "Barbell", "Cable"],
    warmup: "Band pull-aparts 2×15 · Half-kneeling light landmine press 2×8",
    exercises: [
      { name: "Half-Kneeling Landmine Press", reps: "4 × 8 / side", tip: "" },
      { name: "Meadows Row", reps: "4 × 10 / side", tip: "" },
      { name: "Cable Fly (high to low)", reps: "3 × 12", tip: "" },
      { name: "Cable Face Pull", reps: "3 × 15", tip: "" },
      { name: "Cable Triceps Kickback", reps: "3 × 12 / side", tip: "" }
    ]
  },

  /* ---------------------------------------------------------------- LOWER */
  {
    category: "lower",
    name: "Squat Day",
    format: "Strength + accessories",
    time: 55,
    level: "Intermediate",
    equipment: ["Barbell", "Rack", "Dumbbells", "Machines"],
    warmup: "Bike 5 min · Bodyweight squats 2×15 · Build up squats over 3–4 sets",
    exercises: [
      { name: "Back Squat", reps: "5 × 5", tip: "Rest 2–3 min" },
      { name: "Romanian Deadlift", reps: "3 × 8", tip: "Soft knees, push hips back" },
      { name: "DB Walking Lunges", reps: "3 × 12 / leg", tip: "" },
      { name: "Leg Extension", reps: "3 × 15", tip: "Pause at the top" },
      { name: "Standing Calf Raise", reps: "4 × 15", tip: "Full stretch" }
    ]
  },
  {
    category: "lower",
    name: "Deadlift Focus",
    format: "Strength + accessories",
    time: 55,
    level: "Advanced",
    equipment: ["Barbell", "Dumbbells", "Bench", "Machines"],
    warmup: "Glute bridges 2×15 · KB deadlifts 2×10 · Build up deadlifts",
    exercises: [
      { name: "Deadlift", reps: "5 × 3", tip: "Work up to a heavy triple. Reset each rep" },
      { name: "Bulgarian Split Squat", reps: "3 × 8 / leg", tip: "" },
      { name: "Barbell Hip Thrust", reps: "3 × 10", tip: "Chin tucked, ribs down" },
      { name: "Lying Hamstring Curl", reps: "3 × 12", tip: "" },
      { name: "45° Back Extension", reps: "3 × 15", tip: "" }
    ]
  },
  {
    category: "lower",
    name: "Glute Builder",
    format: "Straight sets",
    time: 45,
    level: "Beginner",
    equipment: ["Barbell", "Bench", "Cable", "Bands"],
    warmup: "Banded glute bridges 2×20 · Banded lateral walks 2×10 / side",
    exercises: [
      { name: "Barbell Hip Thrust", reps: "4 × 10", tip: "2 sec squeeze at the top" },
      { name: "Sumo Romanian Deadlift", reps: "3 × 10", tip: "" },
      { name: "DB Step-ups", reps: "3 × 10 / leg", tip: "Drive through the heel" },
      { name: "Cable Glute Kickback", reps: "3 × 12 / leg", tip: "" },
      { name: "Banded Seated Abduction", reps: "3 × 25", tip: "" }
    ]
  },
  {
    category: "lower",
    name: "Leg Day Ladder",
    format: "Descending ladder",
    time: 30,
    level: "Intermediate",
    equipment: ["Kettlebell", "Dumbbells"],
    warmup: "Bike 5 min · Leg swings · 10 goblet squats",
    exercises: [
      { name: "Goblet Squat", reps: "10-8-6-4-2", tip: "" },
      { name: "KB Swing", reps: "20-16-12-8-4", tip: "Hips snap, arms relaxed" },
      { name: "Reverse Lunge", reps: "10-8-6-4-2 / leg", tip: "" }
    ],
    notes: "Do round of 10/20/10, then 8/16/8, and so on down to 2. Move fast, rest only when needed."
  },
  {
    category: "lower",
    name: "Single-Leg Strength",
    format: "Straight sets",
    time: 45,
    level: "Intermediate",
    equipment: ["Dumbbells", "Bench", "Box"],
    warmup: "Glute bridges 2×12 · Cossack squats 2×6 / side",
    exercises: [
      { name: "Rear-Foot Elevated Split Squat", reps: "4 × 8 / leg", tip: "" },
      { name: "Single-Leg RDL", reps: "3 × 10 / leg", tip: "Reach the free leg long" },
      { name: "DB Step-ups", reps: "3 × 10 / leg", tip: "" },
      { name: "Cossack Squat", reps: "3 × 6 / side", tip: "" },
      { name: "Single-Leg Calf Raise", reps: "3 × 15 / leg", tip: "" }
    ]
  },
  {
    category: "lower",
    name: "Front Squat & Posterior",
    format: "Strength + accessories",
    time: 50,
    level: "Advanced",
    equipment: ["Barbell", "Rack", "Machines"],
    warmup: "Bike 5 min · Front rack stretch · Build up front squats",
    exercises: [
      { name: "Front Squat", reps: "4 × 6", tip: "Elbows high" },
      { name: "Good Morning", reps: "3 × 8", tip: "Light — feel the hamstrings" },
      { name: "Nordic Curl (or Hamstring Curl)", reps: "3 × 6", tip: "" },
      { name: "Reverse Lunges", reps: "3 × 10 / leg", tip: "" }
    ],
    finisher: "Wall sit — max hold × 2"
  },
  {
    category: "lower",
    name: "Lower EMOM 20",
    format: "EMOM — every minute on the minute",
    time: 20,
    level: "Intermediate",
    equipment: ["Kettlebell"],
    warmup: "2 rounds: 10 air squats, 10 glute bridges, 5 inchworms",
    exercises: [
      { name: "Minute 1 · KB Swings", reps: "15", tip: "" },
      { name: "Minute 2 · Goblet Squats", reps: "10", tip: "" },
      { name: "Minute 3 · Alternating Reverse Lunges", reps: "12", tip: "" },
      { name: "Minute 4 · Jump Squats", reps: "10", tip: "Land softly" },
      { name: "Minute 5 · Rest", reps: "—", tip: "" }
    ],
    notes: "Repeat the 5-minute cycle 4 times."
  },
  {
    category: "lower",
    name: "Quad Burner",
    format: "Straight sets",
    time: 45,
    level: "Intermediate",
    equipment: ["Leg press", "Machines", "Dumbbells"],
    warmup: "Bike 5 min · Bodyweight squats 2×15",
    exercises: [
      { name: "Leg Press (or Hack Squat)", reps: "4 × 12", tip: "Full depth, no lockout" },
      { name: "Heels-Elevated Goblet Squat", reps: "3 × 12", tip: "" },
      { name: "Leg Extension", reps: "3 × 15 + drop set", tip: "" },
      { name: "DB Walking Lunges", reps: "3 × 20 steps", tip: "" }
    ],
    finisher: "Wall sit — 3 × 45 sec"
  },
  {
    category: "lower",
    name: "Beginner Legs",
    format: "Straight sets",
    time: 35,
    level: "Beginner",
    equipment: ["Dumbbells", "Bench", "Bands"],
    warmup: "Bike 5 min · Leg swings 10 / side",
    exercises: [
      { name: "DB Box Squat (to bench)", reps: "3 × 10", tip: "Tap the bench, stand tall" },
      { name: "Glute Bridge", reps: "3 × 12", tip: "" },
      { name: "DB Step-ups", reps: "3 × 8 / leg", tip: "" },
      { name: "Banded Lateral Walks", reps: "3 × 10 / side", tip: "" },
      { name: "Calf Raises", reps: "3 × 15", tip: "" }
    ]
  },
  {
    category: "lower",
    name: "Posterior Chain Power",
    format: "Power + strength",
    time: 50,
    level: "Advanced",
    equipment: ["Trap bar", "Kettlebell", "Machines"],
    warmup: "Glute bridges 2×12 · Pogo hops 2×20 · Build up trap bar",
    exercises: [
      { name: "Broad Jumps", reps: "4 × 3", tip: "Full reset between jumps" },
      { name: "Trap Bar Deadlift", reps: "5 × 3", tip: "Explosive off the floor" },
      { name: "KB Swings", reps: "4 × 15", tip: "Heavy" },
      { name: "Seated Hamstring Curl", reps: "3 × 12", tip: "" },
      { name: "Reverse Hyper / Back Extension", reps: "3 × 15", tip: "" }
    ]
  },

  /* ------------------------------------------------------------ FULL BODY */
  {
    category: "full",
    name: "The Daily Dream",
    format: "5 rounds for time",
    time: 30,
    level: "Intermediate",
    equipment: ["Dumbbells", "Kettlebell", "Rower", "Pull-up bar"],
    warmup: "Row 3 min · 2 rounds: 5 inchworms, 10 air squats, 10 band pull-aparts",
    exercises: [
      { name: "DB Thrusters", reps: "10", tip: "" },
      { name: "Pull-ups (or Ring Rows)", reps: "10", tip: "" },
      { name: "KB Swings", reps: "15", tip: "" },
      { name: "Row", reps: "250 m", tip: "" }
    ],
    notes: "Write down your time — beat it next time this one comes up."
  },
  {
    category: "full",
    name: "Total Body Strength",
    format: "Straight sets",
    time: 55,
    level: "Intermediate",
    equipment: ["Trap bar", "Barbell", "Dumbbells"],
    warmup: "Bike 5 min · World's greatest stretch 5 / side · Light trap bar 2×8",
    exercises: [
      { name: "Trap Bar Deadlift", reps: "4 × 5", tip: "" },
      { name: "Bench Press", reps: "4 × 6", tip: "" },
      { name: "DB Split Squat", reps: "3 × 8 / leg", tip: "" },
      { name: "Chest-Supported Row", reps: "3 × 10", tip: "" },
      { name: "Farmer's Carry", reps: "3 × 30 m", tip: "Heavy, tall posture" }
    ]
  },
  {
    category: "full",
    name: "Dumbbell Complex",
    format: "Complex — 6 rounds",
    time: 30,
    level: "Intermediate",
    equipment: ["Dumbbells"],
    warmup: "Complex with very light DBs × 2",
    exercises: [
      { name: "DB Romanian Deadlift", reps: "6", tip: "" },
      { name: "DB Hang Clean", reps: "6", tip: "" },
      { name: "DB Front Squat", reps: "6", tip: "" },
      { name: "DB Push Press", reps: "6", tip: "" },
      { name: "DB Bent-Over Row", reps: "6", tip: "" }
    ],
    notes: "Don't put the dumbbells down until all 5 moves are done. Rest 90 sec between rounds."
  },
  {
    category: "full",
    name: "The Chipper",
    format: "For time",
    time: 35,
    level: "Advanced",
    equipment: ["Wall ball", "Kettlebell", "Box", "Pull-up bar"],
    warmup: "Row 5 min · 2 rounds: 5 burpees, 10 wall balls (light), 5 box step-ups",
    exercises: [
      { name: "Wall Balls", reps: "50", tip: "" },
      { name: "KB Swings", reps: "40", tip: "" },
      { name: "Box Jumps", reps: "30", tip: "Step down" },
      { name: "Burpees", reps: "20", tip: "" },
      { name: "Pull-ups", reps: "10", tip: "" }
    ],
    notes: "Work through top to bottom. Break the reps up however you need. Time cap 30 min."
  },
  {
    category: "full",
    name: "Beginner Full Body",
    format: "Straight sets",
    time: 40,
    level: "Beginner",
    equipment: ["Dumbbells", "Machines"],
    warmup: "Bike 5 min · 10 bodyweight squats · 10 incline push-ups",
    exercises: [
      { name: "Goblet Squat", reps: "3 × 10", tip: "" },
      { name: "DB Bench Press", reps: "3 × 10", tip: "" },
      { name: "Lat Pulldown", reps: "3 × 10", tip: "" },
      { name: "DB Romanian Deadlift", reps: "3 × 10", tip: "" },
      { name: "Plank", reps: "3 × 30 sec", tip: "" }
    ]
  },
  {
    category: "full",
    name: "Upper / Lower Pairs",
    format: "Supersets",
    time: 45,
    level: "Intermediate",
    equipment: ["Barbell", "Dumbbells", "Pull-up bar"],
    warmup: "Bike 5 min · Light front squats 2×8 · Scap pull-ups 2×8",
    exercises: [
      { name: "A1 · Front Squat", reps: "4 × 6", tip: "" },
      { name: "A2 · Chin-ups", reps: "4 × 6–8", tip: "Rest 2 min after the pair" },
      { name: "B1 · Romanian Deadlift", reps: "3 × 8", tip: "" },
      { name: "B2 · DB Incline Press", reps: "3 × 10", tip: "Rest 90 sec after the pair" },
      { name: "C1 · Walking Lunges", reps: "3 × 10 / leg", tip: "" },
      { name: "C2 · Single-Arm DB Row", reps: "3 × 10 / side", tip: "" }
    ]
  },
  {
    category: "full",
    name: "Athlete Day",
    format: "Power + strength",
    time: 55,
    level: "Advanced",
    equipment: ["Barbell", "Box", "Sled", "Pull-up bar"],
    warmup: "Bike 5 min · Skips & strides · Empty bar clean drills",
    exercises: [
      { name: "Hang Power Clean", reps: "5 × 3", tip: "Fast elbows" },
      { name: "Box Jump", reps: "4 × 4", tip: "Step down" },
      { name: "Push Press", reps: "4 × 5", tip: "" },
      { name: "Weighted Chin-ups", reps: "3 × 6", tip: "" },
      { name: "Sled Push", reps: "4 × 20 m", tip: "Heavy, drive low" }
    ]
  },
  {
    category: "full",
    name: "Bodyweight Anywhere",
    format: "Circuit — 4 rounds",
    time: 25,
    level: "Beginner",
    equipment: ["None"],
    warmup: "Jumping jacks 60 sec · Inchworms × 5 · Hip circles",
    exercises: [
      { name: "Air Squats", reps: "15", tip: "" },
      { name: "Push-ups", reps: "10", tip: "Knees down is fine" },
      { name: "Alternating Lunges", reps: "10 / leg", tip: "" },
      { name: "Burpees", reps: "8", tip: "" },
      { name: "Plank", reps: "30 sec", tip: "" }
    ],
    notes: "Rest 60 sec between rounds."
  },
  {
    category: "full",
    name: "Kettlebell Flow",
    format: "Circuit — 5 rounds",
    time: 35,
    level: "Intermediate",
    equipment: ["Kettlebell"],
    warmup: "Halos 10 each way · KB deadlifts 2×10",
    exercises: [
      { name: "KB Swings", reps: "15", tip: "" },
      { name: "Goblet Squat", reps: "10", tip: "" },
      { name: "Single-Arm KB Press", reps: "8 / side", tip: "" },
      { name: "KB Gorilla Row", reps: "8 / side", tip: "" },
      { name: "Turkish Get-up", reps: "1 / side", tip: "Slow and controlled" }
    ],
    notes: "Rest 60–90 sec between rounds."
  },
  {
    category: "full",
    name: "Three Tens",
    format: "3 × 10-min AMRAPs",
    time: 36,
    level: "Intermediate",
    equipment: ["Dumbbells", "Rower", "Box"],
    warmup: "Row 4 min easy · 10 air squats · 10 push-ups",
    exercises: [
      { name: "Block 1 · DB Goblet Squat + Push-ups", reps: "10 + 10", tip: "AMRAP 10 min" },
      { name: "Block 2 · Row + DB Renegade Row", reps: "12 cal + 8", tip: "AMRAP 10 min" },
      { name: "Block 3 · Box Step-ups + DB Push Press", reps: "12 + 10", tip: "AMRAP 10 min" }
    ],
    notes: "AMRAP = as many rounds as possible. Rest 2 min between blocks."
  },

  /* ----------------------------------------------------------------- CORE */
  {
    category: "core",
    name: "Core Foundations",
    format: "Circuit — 3 rounds",
    time: 20,
    level: "Beginner",
    equipment: ["Mat"],
    warmup: "Cat-cow × 10 · Glute bridges × 10",
    exercises: [
      { name: "Dead Bug", reps: "10 / side", tip: "Low back glued to the floor" },
      { name: "Bird Dog", reps: "8 / side", tip: "2 sec hold" },
      { name: "Side Plank", reps: "20 sec / side", tip: "" },
      { name: "Glute Bridge", reps: "12", tip: "" },
      { name: "Front Plank", reps: "30 sec", tip: "" }
    ],
    notes: "Rest 60 sec between rounds."
  },
  {
    category: "core",
    name: "Anti-Rotation",
    format: "Straight sets",
    time: 25,
    level: "Intermediate",
    equipment: ["Cable", "Dumbbell"],
    warmup: "Dead bugs 2×8 / side",
    exercises: [
      { name: "Pallof Press", reps: "3 × 10 / side", tip: "Don't let the cable twist you" },
      { name: "Suitcase Carry", reps: "3 × 30 m / side", tip: "Heavy, stay level" },
      { name: "Half-Kneeling Cable Chop", reps: "3 × 10 / side", tip: "" },
      { name: "Side Plank with Reach-Through", reps: "3 × 8 / side", tip: "" }
    ]
  },
  {
    category: "core",
    name: "Abs Burner",
    format: "Circuit — 4 rounds",
    time: 20,
    level: "Intermediate",
    equipment: ["Pull-up bar", "Mat"],
    warmup: "Mountain climbers 30 sec · Dead bugs × 10",
    exercises: [
      { name: "Hanging Knee Raises", reps: "12", tip: "" },
      { name: "V-ups", reps: "15", tip: "" },
      { name: "Russian Twists", reps: "20", tip: "" },
      { name: "Mountain Climbers", reps: "30", tip: "" },
      { name: "Plank", reps: "45 sec", tip: "" }
    ],
    notes: "Minimal rest between moves, 60 sec between rounds."
  },
  {
    category: "core",
    name: "Strongman Core",
    format: "Straight sets",
    time: 30,
    level: "Advanced",
    equipment: ["Ab wheel", "Plate", "Dumbbell", "Landmine"],
    warmup: "Dead bugs 2×10 · Bird dogs 2×8",
    exercises: [
      { name: "Ab Wheel Rollout", reps: "4 × 10", tip: "Ribs down" },
      { name: "Weighted Plank", reps: "3 × 45 sec", tip: "Plate on upper back" },
      { name: "Heavy Suitcase Carry", reps: "4 × 20 m / side", tip: "" },
      { name: "Landmine Rotation", reps: "3 × 8 / side", tip: "" },
      { name: "Hanging Leg Raise", reps: "3 × 10", tip: "" }
    ]
  },
  {
    category: "core",
    name: "Core EMOM 15",
    format: "EMOM — every minute on the minute",
    time: 15,
    level: "Intermediate",
    equipment: ["Cable", "Mat"],
    warmup: "Cat-cow · Dead bugs × 10",
    exercises: [
      { name: "Minute 1 · Hollow Hold", reps: "30 sec", tip: "" },
      { name: "Minute 2 · Kneeling Cable Crunch", reps: "15", tip: "" },
      { name: "Minute 3 · Side Plank", reps: "20 sec / side", tip: "" }
    ],
    notes: "Repeat the 3-minute cycle 5 times."
  },
  {
    category: "core",
    name: "Hanging Abs",
    format: "Straight sets",
    time: 25,
    level: "Advanced",
    equipment: ["Pull-up bar", "Parallettes"],
    warmup: "Dead hang 30 sec · Scap pull-ups × 10",
    exercises: [
      { name: "Toes-to-Bar", reps: "4 × 8", tip: "Controlled, no swinging" },
      { name: "Hanging Windshield Wipers", reps: "3 × 6 / side", tip: "Bend knees to make easier" },
      { name: "L-Sit Hold", reps: "4 × 15 sec", tip: "" },
      { name: "Hollow Body Rocks", reps: "3 × 20", tip: "" }
    ]
  },
  {
    category: "core",
    name: "Med Ball Power",
    format: "Straight sets",
    time: 25,
    level: "Intermediate",
    equipment: ["Medicine ball", "Wall"],
    warmup: "Torso twists · Light ball slams × 10",
    exercises: [
      { name: "Med Ball Slams", reps: "4 × 10", tip: "Max effort" },
      { name: "Rotational Wall Throw", reps: "3 × 8 / side", tip: "" },
      { name: "Sit-up to Throw", reps: "3 × 10", tip: "" },
      { name: "Med Ball Plank Hold", reps: "3 × 30 sec", tip: "Hands on the ball" }
    ]
  },
  {
    category: "core",
    name: "Plank Ladder",
    format: "Circuit — 3 rounds",
    time: 18,
    level: "Beginner",
    equipment: ["Mat"],
    warmup: "Cat-cow · Bird dogs × 8",
    exercises: [
      { name: "Front Plank", reps: "40 sec", tip: "" },
      { name: "Side Plank (left)", reps: "30 sec", tip: "" },
      { name: "Side Plank (right)", reps: "30 sec", tip: "" },
      { name: "Plank Up-Downs", reps: "10", tip: "" },
      { name: "Plank Jacks", reps: "20", tip: "" }
    ],
    notes: "Rest 60 sec between rounds."
  },
  {
    category: "core",
    name: "Back-Friendly Core",
    format: "Straight sets",
    time: 20,
    level: "Beginner",
    equipment: ["Mat", "Bench"],
    warmup: "Walk 5 min · Cat-cow × 10",
    exercises: [
      { name: "McGill Curl-up", reps: "3 × 8 (10 sec holds)", tip: "One knee bent, hands under low back" },
      { name: "Side Plank (knees)", reps: "3 × 20 sec / side", tip: "" },
      { name: "Bird Dog", reps: "3 × 6 / side (10 sec holds)", tip: "" },
      { name: "Glute Bridge March", reps: "3 × 10 / side", tip: "" }
    ]
  },
  {
    category: "core",
    name: "10-Minute Finisher",
    format: "Tabata — 20 sec on / 10 sec off",
    time: 10,
    level: "Intermediate",
    equipment: ["Mat"],
    warmup: "Do this after any session",
    exercises: [
      { name: "Bicycle Crunches", reps: "20s on / 10s off × 4", tip: "" },
      { name: "Mountain Climbers", reps: "20s on / 10s off × 4", tip: "" },
      { name: "Flutter Kicks", reps: "20s on / 10s off × 4", tip: "" },
      { name: "Plank Hold", reps: "20s on / 10s off × 4", tip: "" }
    ],
    notes: "Rest 1 min between each 2-minute tabata."
  },

  /* --------------------------------------------------------- CONDITIONING */
  {
    category: "conditioning",
    name: "Tabata Torch",
    format: "4 × Tabata",
    time: 25,
    level: "Intermediate",
    equipment: ["Air bike", "Kettlebell"],
    warmup: "Bike 5 min building pace",
    exercises: [
      { name: "Air Bike", reps: "8 × 20s on / 10s off", tip: "All out" },
      { name: "Burpees", reps: "8 × 20s on / 10s off", tip: "" },
      { name: "KB Swings", reps: "8 × 20s on / 10s off", tip: "" },
      { name: "Mountain Climbers", reps: "8 × 20s on / 10s off", tip: "" }
    ],
    notes: "Rest 1 min between each tabata."
  },
  {
    category: "conditioning",
    name: "Row Intervals",
    format: "Intervals",
    time: 35,
    level: "Intermediate",
    equipment: ["Rower"],
    warmup: "Row 5 min easy · 3 × 10 hard strokes",
    exercises: [
      { name: "Row 500 m", reps: "6 rounds", tip: "Hold the same split every round" },
      { name: "Rest", reps: "1:30 between", tip: "" }
    ],
    finisher: "Row 1 km easy cool-down",
    notes: "Write down your average 500 m split."
  },
  {
    category: "conditioning",
    name: "Bike Sprints",
    format: "Intervals",
    time: 25,
    level: "Beginner",
    equipment: ["Air bike"],
    warmup: "Bike 5 min easy",
    exercises: [
      { name: "Sprint", reps: "15 sec × 10", tip: "Max effort" },
      { name: "Easy spin", reps: "45 sec between", tip: "" },
      { name: "Steady ride", reps: "10 min", tip: "Conversational pace" }
    ]
  },
  {
    category: "conditioning",
    name: "30-20-10",
    format: "For time",
    time: 20,
    level: "Intermediate",
    equipment: ["Rower", "Wall ball"],
    warmup: "Row 3 min · 10 light wall balls · 5 burpees",
    exercises: [
      { name: "Row (calories)", reps: "30 / 20 / 10", tip: "" },
      { name: "Wall Balls", reps: "30 / 20 / 10", tip: "" },
      { name: "Burpees", reps: "30 / 20 / 10", tip: "" }
    ],
    notes: "Do 30 of each, then 20 of each, then 10 of each."
  },
  {
    category: "conditioning",
    name: "Sled & Carry Medley",
    format: "6 rounds",
    time: 30,
    level: "Intermediate",
    equipment: ["Sled", "Farmer's handles or DBs"],
    warmup: "Bike 5 min · Light sled push 2 × 20 m",
    exercises: [
      { name: "Sled Push", reps: "20 m", tip: "" },
      { name: "Farmer's Carry", reps: "40 m", tip: "" },
      { name: "Backwards Sled Drag", reps: "20 m", tip: "" }
    ],
    notes: "Rest 90 sec between rounds."
  },
  {
    category: "conditioning",
    name: "EMOM 30",
    format: "EMOM — every minute on the minute",
    time: 30,
    level: "Advanced",
    equipment: ["Rower", "Kettlebell", "SkiErg or Air bike"],
    warmup: "Row 5 min · 2 rounds: 5 burpees, 10 KB swings",
    exercises: [
      { name: "Minute 1 · Row", reps: "14 / 12 cal", tip: "" },
      { name: "Minute 2 · Burpees", reps: "12", tip: "" },
      { name: "Minute 3 · KB Swings", reps: "15", tip: "" },
      { name: "Minute 4 · Ski or Bike", reps: "12 / 10 cal", tip: "" },
      { name: "Minute 5 · Rest", reps: "—", tip: "" }
    ],
    notes: "Repeat the 5-minute cycle 6 times."
  },
  {
    category: "conditioning",
    name: "Zone 2 Builder",
    format: "Steady state",
    time: 45,
    level: "Beginner",
    equipment: ["Treadmill, rower or bike"],
    warmup: "5 min easy",
    exercises: [
      { name: "Steady cardio", reps: "40 min", tip: "You should be able to hold a conversation" },
      { name: "Cool-down walk", reps: "5 min", tip: "" }
    ],
    notes: "Swap machines every 10–15 min if you get bored."
  },
  {
    category: "conditioning",
    name: "Climb the Ladder",
    format: "Ascending ladder",
    time: 20,
    level: "Intermediate",
    equipment: ["Kettlebell"],
    warmup: "Jumping jacks 60 sec · KB deadlifts × 10",
    exercises: [
      { name: "Burpees", reps: "1, 2, 3 … 10", tip: "" },
      { name: "KB Swings", reps: "2, 4, 6 … 20", tip: "" }
    ],
    notes: "Round 1: 1 burpee + 2 swings. Round 2: 2 burpees + 4 swings. Keep going to 10. Rest as needed."
  },
  {
    category: "conditioning",
    name: "40/20 Circuit",
    format: "Circuit — 3 rounds",
    time: 30,
    level: "Intermediate",
    equipment: ["Dumbbells", "Box", "Battle ropes", "Skipping rope"],
    warmup: "Skip 2 min · Dynamic stretches",
    exercises: [
      { name: "Battle Ropes", reps: "40s on / 20s off", tip: "" },
      { name: "DB Thrusters", reps: "40s on / 20s off", tip: "" },
      { name: "Box Step-ups", reps: "40s on / 20s off", tip: "" },
      { name: "Skipping", reps: "40s on / 20s off", tip: "" },
      { name: "Push-ups", reps: "40s on / 20s off", tip: "" },
      { name: "Jump Squats", reps: "40s on / 20s off", tip: "" },
      { name: "Plank", reps: "40s on / 20s off", tip: "" },
      { name: "Mountain Climbers", reps: "40s on / 20s off", tip: "" }
    ],
    notes: "Rest 2 min between rounds."
  },
  {
    category: "conditioning",
    name: "Race Day Sim",
    format: "For time",
    time: 45,
    level: "Advanced",
    equipment: ["Treadmill or rower", "Sled", "Wall ball", "Sandbag"],
    warmup: "Run/row 5 min easy · Dynamic stretches",
    exercises: [
      { name: "Run 1 km (or Row 1 km)", reps: "Between every station", tip: "" },
      { name: "Sled Push", reps: "50 m", tip: "" },
      { name: "Burpee Broad Jumps", reps: "40 m", tip: "" },
      { name: "Sandbag Lunges", reps: "50 m", tip: "" },
      { name: "Wall Balls", reps: "50", tip: "" }
    ],
    notes: "Run → station → run → station… Hyrox-style. Pace it, don't sprint."
  },

  /* ------------------------------------------------------------ STRONGMAN */
  {
    category: "strongman",
    name: "Log Press Day",
    format: "Strength + accessories",
    time: 55,
    level: "Advanced",
    equipment: ["Log (or barbell)", "Dumbbells", "Farmer's handles"],
    warmup: "Band pull-aparts 2×15 · Empty log cleans 2×5 · Build up in 4–5 sets",
    exercises: [
      { name: "Log Clean & Press", reps: "5 × 3", tip: "Clean every rep. Barbell works too" },
      { name: "Push Press", reps: "3 × 5", tip: "" },
      { name: "Seated DB Press", reps: "3 × 10", tip: "" },
      { name: "Close-Grip Bench", reps: "3 × 8", tip: "" },
      { name: "Farmer's Carry", reps: "3 × 30 m", tip: "" }
    ]
  },
  {
    category: "strongman",
    name: "Yoke & Carries",
    format: "Event training",
    time: 45,
    level: "Advanced",
    equipment: ["Yoke (or loaded barbell)", "Farmer's handles", "Sandbag"],
    warmup: "Bike 5 min · Light yoke pick-ups × 3 · Light carry 2 × 20 m",
    exercises: [
      { name: "Yoke Walk", reps: "5 × 20 m", tip: "Short, fast steps" },
      { name: "Farmer's Walk", reps: "4 × 30 m", tip: "" },
      { name: "Sandbag Bear-Hug Carry", reps: "3 × 30 m", tip: "" },
      { name: "Suitcase Carry", reps: "2 × 30 m / side", tip: "" }
    ],
    notes: "No yoke? Do heavy barbell walkouts in the rack."
  },
  {
    category: "strongman",
    name: "Stone Day",
    format: "Event training",
    time: 45,
    level: "Advanced",
    equipment: ["Atlas stones (or sandbag)", "Barbell", "Kettlebell"],
    warmup: "Glute bridges 2×12 · Light stone/sandbag lap 2×3",
    exercises: [
      { name: "Stone to Shoulder (or Sandbag)", reps: "6 × 2", tip: "Tacky on, forearms tight" },
      { name: "Stone Load Over Bar", reps: "4 × 3", tip: "" },
      { name: "Romanian Deadlift", reps: "3 × 8", tip: "" },
      { name: "Heavy KB Swings", reps: "3 × 15", tip: "" }
    ]
  },
  {
    category: "strongman",
    name: "Deadlift, Strongman Style",
    format: "Strength + grip",
    time: 50,
    level: "Advanced",
    equipment: ["Axle or barbell", "Blocks", "Plates"],
    warmup: "Glute bridges · KB deadlifts · Build up in 4–5 sets",
    exercises: [
      { name: "18\" Block / Rack Pull", reps: "5 × 3", tip: "Heavy, no straps on first sets" },
      { name: "Deficit Deadlift", reps: "3 × 5", tip: "Stand on a 5 cm plate" },
      { name: "Axle Deadlift (double overhand)", reps: "3 × 5", tip: "Grip focus" },
      { name: "Plate Pinch Hold", reps: "3 × max time", tip: "" }
    ]
  },
  {
    category: "strongman",
    name: "Medley Madness",
    format: "5 rounds for time",
    time: 30,
    level: "Intermediate",
    equipment: ["Sandbag", "Sled", "Farmer's handles"],
    warmup: "Bike 5 min · Light run-through of each station",
    exercises: [
      { name: "Sandbag Carry", reps: "20 m", tip: "" },
      { name: "Sled Drag (hand over hand)", reps: "20 m", tip: "" },
      { name: "Farmer's Walk", reps: "20 m", tip: "" }
    ],
    notes: "Go straight through. Rest 2 min between rounds."
  },
  {
    category: "strongman",
    name: "Sandbag Strength",
    format: "Straight sets",
    time: 40,
    level: "Intermediate",
    equipment: ["Sandbag"],
    warmup: "Light sandbag cleans 2×5 · Bear-hug squats 2×8",
    exercises: [
      { name: "Sandbag to Shoulder", reps: "5 × 3 / side", tip: "" },
      { name: "Bear-Hug Squat", reps: "4 × 8", tip: "" },
      { name: "Sandbag Over Bar / Shoulder", reps: "4 × 5", tip: "" },
      { name: "Zercher Carry", reps: "3 × 30 m", tip: "" }
    ]
  },
  {
    category: "strongman",
    name: "Axle & Grip",
    format: "Strength + grip",
    time: 45,
    level: "Intermediate",
    equipment: ["Axle (or fat grips)", "Plates", "Wrist roller"],
    warmup: "Wrist circles · Empty axle cleans 2×5",
    exercises: [
      { name: "Axle Clean & Press", reps: "5 × 3", tip: "Continental clean is fine" },
      { name: "Axle Deadlift Hold", reps: "3 × 20 sec", tip: "" },
      { name: "Fat Grip DB Row", reps: "3 × 10 / side", tip: "" },
      { name: "Wrist Roller", reps: "3 × up & down", tip: "" },
      { name: "Plate Pinch Carry", reps: "3 × 20 m", tip: "" }
    ]
  },
  {
    category: "strongman",
    name: "Overhead Medley",
    format: "Event training",
    time: 50,
    level: "Advanced",
    equipment: ["Log", "Axle", "Dumbbell"],
    warmup: "Band pull-aparts · Light presses with each implement",
    exercises: [
      { name: "Log Clean & Press", reps: "3 × 2", tip: "Heavy" },
      { name: "Axle Push Press", reps: "3 × 3", tip: "" },
      { name: "Single-Arm DB Clean & Press", reps: "3 × 3 / side", tip: "Circus DB if you have one" },
      { name: "Medley: Log → Axle → DB", reps: "3 rounds", tip: "1 rep each, light, for speed" }
    ]
  },
  {
    category: "strongman",
    name: "Strongman 101",
    format: "Event intro",
    time: 40,
    level: "Beginner",
    equipment: ["Farmer's handles or DBs", "Sandbag", "Sled"],
    warmup: "Bike 5 min · Glute bridges 2×10 · Light carries",
    exercises: [
      { name: "Farmer's Walk", reps: "4 × 20 m", tip: "Tall chest, quick steps" },
      { name: "Sandbag Over Shoulder (light)", reps: "4 × 3", tip: "Learn the hip drive" },
      { name: "Sled Push", reps: "4 × 20 m", tip: "" },
      { name: "DB Overhead Press", reps: "3 × 8", tip: "" }
    ],
    notes: "Light weights, focus on technique. Ask a coach if you're unsure."
  },
  {
    category: "strongman",
    name: "Strongman Conditioning",
    format: "EMOM — every minute on the minute",
    time: 20,
    level: "Intermediate",
    equipment: ["Sandbag", "Sled", "Farmer's handles"],
    warmup: "Bike 5 min · One light run-through of each station",
    exercises: [
      { name: "Minute 1 · Sandbag Over Shoulder", reps: "4", tip: "" },
      { name: "Minute 2 · Sled Push", reps: "20 m", tip: "" },
      { name: "Minute 3 · Farmer's Walk", reps: "30 m", tip: "" },
      { name: "Minute 4 · Rest", reps: "—", tip: "" }
    ],
    notes: "Repeat the 4-minute cycle 5 times."
  }
];
