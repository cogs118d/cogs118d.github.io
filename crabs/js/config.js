// =====================================================================
// COGS 118D crab-trap task (after Rutledge et al., 2009): settings you can change
// =====================================================================
var CONFIG = {

  // Length. The paper used 800 trials; 240 trials (about 8 minutes) gives two or three reversals.
  n_trials: 240,

  // Blocks of 70-90 trials. In each block one trap is "rich": its reward probability is
  // ratio times the other trap's. The rich trap switches sides at every block change, without warning.
  block_min: 70,
  block_max: 90,
  ratios: [6, 3],          // each block draws one of these at random (6:1 or 3:1, as in the paper)
  total_p: 0.3,            // the two traps' reward probabilities add up to 0.3

  // Each crab is worth this much (the paper paid 10 cents per crab). Display only.
  cents_per_crab: 10,
  window: 40,              // the display counts crabs caught over the last 40 trials, as in the paper

  // Timing (milliseconds). Choices have no time limit.
  rise_ms: 450,            // the chosen trap is pulled up
  show_ms: 650,            // the catch (or empty trap) is shown
  iti_ms: 250,

  csv_prefix: "cogs118d_crabs"
};
