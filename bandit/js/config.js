// =====================================================================
// COGS 118D two-armed bandit: settings you can change
// =====================================================================
var CONFIG = {

  // Paste the URL of your Google Apps Script web app here (it ends in /exec).
  // Leave it as "" to turn off sending data to the class spreadsheet.
  sheet_url: "https://script.google.com/macros/s/AKfycbw1HvkDJwDqvEthc9KYyvCXFdBGtFHwaxJrrekfoYFDfOZCMgDPtAJUEqd6SST_Ns4W/exec",

  // Task length. Each round (block) uses a new pair of slot machines.
  n_blocks: 2,
  free_trials_per_block: 30,    // spins: choose between two machines (was 50; see README for why 30 at 70/30 is enough)
  forced_trials_per_block: 0,   // only one machine shown (the original Niv lab task used 4 per 10 trials)

  // Probability that each option pays out: [worse option, better option]
  reward_probs: [0.3, 0.7],   // was [0.2, 0.8]; 70/30 keeps people learning longer, so fewer spins are needed

  // Timing (milliseconds). The original task used 1500, 2000 and 1500.
  choice_display_duration: 500,     // how long the choice is highlighted before feedback
  feedback_display_duration: 1000,  // how long the reward / no-reward feedback stays up
  iti_duration: 500,                // blank screen between trials

  // Filename prefix for the CSV students download
  csv_prefix: "cogs118d_bandit"
};
