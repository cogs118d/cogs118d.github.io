// =====================================================================
// COGS 118D spaceship task (after Kool, Gershman & Cushman, 2017, Experiment 1): settings you can change
// =====================================================================
var CONFIG = {

  // Length. The paper used 25 practice trials and 200 rewarded trials (Experiment 1).
  practice_trials: 10,     // no time limits; points don't count
  n_trials: 100,           // about 9 minutes

  // Stakes: on each trial, points are multiplied by 1 (low stakes) or 5 (high stakes), at random.
  stakes: [1, 5],
  p_high_stakes: 0.5,

  // Space treasure from each alien drifts between 0 and 9 (Gaussian random walk, reflecting at 0 and 9).
  drift_sd: 2,

  // Time limits (milliseconds) on rewarded trials. The paper used 1500 ms for the spaceship choice.
  choice_deadline_ms: 2000,   // to pick a spaceship; the chosen ship stays highlighted until this time is up
  alien_deadline_ms: 2000,    // to press the space bar on the planet

  // Other timing (milliseconds)
  cue_ms: 1000,               // the stakes cue alone, at the start of each trial
  flight_ms: 500,
  reward_ms: 1500,
  too_slow_ms: 1500,
  iti_ms: 400,

  points_per_cent: 36,        // the paper paid 1 cent for every 36 points (display only)
  csv_prefix: "cogs118d_spaceships"
};
