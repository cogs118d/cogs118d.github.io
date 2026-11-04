# Space treasure: a browser version of Kool, Gershman & Cushman (2017)

This is a short, browser-based version of Experiment 1 in Kool, Gershman & Cushman (2017), "Cost-benefit arbitration between multiple reinforcement-learning systems", *Psychological Science* 28(9), 1321–1333. Students in COGS 118D play it before they work through the paper's model in HW 5 Part B and Mini-Project 2.

**Nothing is recorded.** The task runs entirely in the student's browser. At the end, students see their own planning signature next to the paper's participants, and can download their own data as a CSV if they want to.

## The task

1. **Stakes cue** (1 s): a 1× or 5× badge, at random. On 5× trials each piece of treasure is worth 5 points.
2. **Spaceships**: the trial starts at one of two launch pads, at random, each with its own pair of spaceships (sides random). Choose with the left/right arrow keys or by clicking. In each pair, one ship always flies to the purple planet and the other always to the red planet (deterministic transitions). The chosen ship stays highlighted until the time limit is up, as in the paper, so that responding faster doesn't speed up the task.
3. **Planet**: press the space bar (or click the alien) to collect its space treasure.
4. **Treasure**: 0–9 pieces, times the stakes. Each alien's treasure follows a Gaussian random walk (σ = 2, reflecting at 0 and 9); one alien starts between 0 and 4 and the other between 5 and 9.

The instructions include a flight map showing which ship goes where. Then come 10 practice trials without time limits, and 100 trials with time limits (2 s to choose a ship, 2 s to press the space bar; the paper used 1.5 s for the ship). Total about 10 minutes.

At the end: the student's p(same planet as the previous trial), split by the previous trial's treasure (0–4 vs 5–9) and by whether the trial started at the same or the other launch pad, next to the paper's 98 participants; the planning index on low- and high-stakes trials (paper: 0.20 and 0.31); and a **Download my data** button.

## Files

| File | What it is |
|---|---|
| `index.html` | the task: transitions, drifting rewards, trial lists, instructions |
| `js/config.js` | **settings**: number of trials, stakes, drift, time limits, timing |
| `js/art.js` | drawings (spaceships, aliens, planets, treasure, stakes badge), as SVG |
| `js/plugin-spaceships.js` | one trial (a jsPsych plugin) |
| `js/data-export.js` | end screen, plot, summary and CSV download |

## The data (CSV download)

Same columns as `kool2017_exp1.csv` in the HW 5 files: `trial`, `stake` (1 or 5), `start_state` (1 or 2), `spaceship` (1–2 at launch pad 1, 3–4 at launch pad 2; −1 if too slow to choose), `planet` (1 = purple, 2 = red; spaceships 1 and 3 fly to planet 1), `points` (pieces of treasure, before the stakes), `reward_planet1`, `reward_planet2` (what each alien paid on that trial) and `timed_out`. Extra columns: `participant_id` (random 6-character ID), `session_start`, `practice` (1 for practice trials), `timeout_stage` (1 = ship, 2 = space bar), `ship_left`, `ship_right`, `rt1_ms` and `rt2_ms`.

## Differences from the paper

- 100 rewarded trials instead of 200, 10 practice trials instead of 25, and a 2 s time limit for the ship choice instead of 1.5 s. All are settings in `js/config.js`.
- The instructions show the flight map directly, instead of the paper's longer instruction and quiz sequence.
- The pictures are new drawings in the same story (spaceships, purple and red planets, aliens in space mines, space treasure), not the paper's images.

## Credits

Task design: Kool et al. (2017), above. Written for COGS 118D (UC San Diego), November 2026, using jsPsych 8 (de Leeuw et al., MIT License), loaded from unpkg.
