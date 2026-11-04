# Crab traps: a browser version of Rutledge et al. (2009)

This is a short, browser-based version of the dynamic foraging task in Rutledge, Lazzaro, Lau, Myers, Gluck & Glimcher (2009), "Dopaminergic drugs modulate learning rates and perseveration in Parkinson's patients in a dynamic foraging task", *Journal of Neuroscience* 29(48), 15104–15114. Students in COGS 118D play it before they work through the paper's model in HW 5 Part B and Mini-Project 2.

**Nothing is recorded.** The task runs entirely in the student's browser. At the end, students see a summary of their own behavior next to the paper's groups, and can download their own data as a CSV if they want to.

## The task

- Two crab traps, marked by a red buoy (left arrow) and a green buoy (right arrow). Pull one up per trial, or click it. A caught crab is worth 10 cents (not real money). The screen shows the crabs caught over the last 40 trials, as in the paper.
- **Baited schedule**, as in the paper: on every trial, each empty trap gets a crab with its own probability, and a crab stays in its trap until that trap is pulled up. The two probabilities add up to 0.3.
- **Blocks of 70–90 trials.** In each block, one trap is rich: its probability is 6 or 3 times the other trap's (6:1 or 3:1, drawn at random). The rich trap switches sides at every block change, without warning.
- 240 trials (about 8 minutes), so most players see two or three reversals. The paper used 800 trials.
- At the end: a plot of the student's choices over time against the reward ratio (like the paper's Fig. 1B); the student's p(stay) after no crab and after a crab, next to the means of the paper's four groups; and a **Download my data** button.

## Files

| File | What it is |
|---|---|
| `index.html` | the task: reward schedule, instructions |
| `js/config.js` | **settings**: number of trials, block lengths, ratios, timing |
| `js/plugin-crabs.js` | the scene (SVG) and one trial (a jsPsych plugin) |
| `js/data-export.js` | end screen, plot, summary and CSV download |

## The data (CSV download)

Same columns as `rutledge2009.csv` in the HW 5 files (`trial`, `block`, `choice` (1 = red, 2 = green), `reward`, `ratio_option1`, `ratio_option2`, `rt_ms`), plus `participant_id` (random 6-character ID), `session_start`, `choice_side`, the actual probabilities `p_option1` and `p_option2`, and whether each trap had a crab waiting when the choice was made (`baited_option1`, `baited_option2`).

## Differences from the paper

- 240 trials instead of 800, and no training blocks. Change `n_trials` in `js/config.js`.
- The paper's main task used ratios of 6:1 and 3:1 in both directions; so does this one. Block order and lengths are random for each player.
- The pictures are new drawings, not the paper's animations.

## Credits

Task design: Rutledge et al. (2009), above. Written for COGS 118D (UC San Diego), November 2026, using jsPsych 8 (de Leeuw et al., MIT License), loaded from unpkg.
