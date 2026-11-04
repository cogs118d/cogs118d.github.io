// =====================================================================
// COGS 118D symbol-card task (after Lefebvre et al., 2017): settings you can change
// =====================================================================
var CONFIG = {

  // Four pairs of symbols, one per condition. Each pair is shown this many times (24 in the paper, 96 trials in all).
  trials_per_pair: 24,

  // Reward probabilities [option 1, option 2] for the four pairs, as in the paper.
  pairs: [[0.25, 0.25], [0.25, 0.75], [0.75, 0.25], [0.75, 0.75]],

  // Outcomes in euros. Experiment 1 of the paper: win 0.50 or get nothing.
  // For Experiment 2 (win 0.50 or lose 0.50), set outcome_bad to -0.5.
  outcome_good: 0.5,
  outcome_bad: 0,

  // Timing (milliseconds). Choices have no time limit.
  choice_highlight_ms: 500,   // the chosen card is outlined before the outcome appears
  outcome_ms: 1200,           // how long the outcome stays up
  iti_ms: 500,                // fixation cross between trials

  // Filename prefix for the CSV students can download
  csv_prefix: "cogs118d_symbols"
};
