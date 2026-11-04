# Symbol cards: a browser version of Lefebvre et al. (2017)

This is a short, browser-based version of the learning task in Lefebvre, Lebreton, Meyniel, Bourgeois-Gironde & Palminteri (2017), "Behavioural and neural characterization of optimistic reinforcement learning", *Nature Human Behaviour* 1, 0067. Students in COGS 118D play it before they work through the paper's model in HW 5 Part B and Mini-Project 2.

**Nothing is recorded.** The task runs entirely in the student's browser. At the end, students see a summary of their own behavior next to the paper's participants, and can download their own data as a CSV if they want to.

## The task

- Four fixed pairs of abstract symbols, one per condition: 25/25, 25/75, 75/25 and 75/75 (the chance that each symbol wins €0.50).
- Each pair is shown 24 times (96 trials, about 5 minutes). The pairs are mixed together, and the side of each symbol varies (balanced within each pair).
- Choose with the left/right arrow keys or by clicking a card. The chosen card is outlined, then the outcome appears: +€0.50 or €0.00 (Experiment 1). Set `outcome_bad: -0.5` in `js/config.js` for Experiment 2 (+€0.50 or −€0.50).
- Each symbol's outcomes come from shuffled runs of 4 with exactly 1 (25%) or 3 (75%) wins, so every player gets the stated chances, in a different order.
- At the end: the symbols and their real chances; the student's correct choice rate in the 25/75 pairs and preferred choice rate in the 25/25 and 75/75 pairs, next to the means for the 50 participants in Experiment 1 (76%, 67% and 87%); and a **Download my data** button.

## Files

| File | What it is |
|---|---|
| `index.html` | the task: symbols, outcome queues, trial list, instructions |
| `js/config.js` | **settings**: trials per pair, probabilities, outcomes, timing |
| `js/plugin-cards.js` | one trial (a jsPsych plugin) |
| `js/data-export.js` | end screen, summary and CSV download |
| `img/symbols/` | 24 card symbols; each player gets 8 at random |

## The data (CSV download)

Same columns as `lefebvre2017_exp1.csv` in the HW 5 files (`trial`, `pair`, `p_option1`, `p_option2`, `choice` (1 or 2), `outcome` in euros, `correct`, empty in the symmetric pairs), plus `participant_id` (random 6-character ID), `session_start`, `option_left` (which option was on the left), `choice_side` and `rt_ms`.

## Differences from the paper

- The paper's participants were in an fMRI scanner, chose with button presses, had trials of about 7 seconds, and were paid. Here, trials are self-paced and take 2–3 seconds, and the money isn't real.
- The symbols are from the same lab's online version of this kind of task (see Credits), not necessarily the exact images used in the paper.
- There is no training session.

## Credits

Task design: Lefebvre et al. (2017), above. The card symbols are from the Human Reinforcement Learning team's online task code (Palminteri lab), <https://github.com/hrl-team/online_exp>, © 2018 Anis Najar, MIT License (`img/symbols/LICENSE.txt`). Everything else was written for COGS 118D (UC San Diego), November 2026, using jsPsych 8 (de Leeuw et al., MIT License), loaded from unpkg.
