# Two-armed bandit task for COGS 118D

Students play a two-armed bandit ("the picture game") in their browser, download their own data as a CSV, and fit Rescorla–Wagner and other models to it in Colab. Every student's anonymous data are also sent to the instructor's Google Sheet.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | the task (open this page to play) |
| `js/config.js` | **settings**: the Google Sheet URL, number of blocks and trials, reward probabilities, timing |
| `js/data-export.js` | builds the tidy CSV, the download button, and the upload to the Google Sheet |
| `js/plugin-bandit.js`, `js/bandit-*.js`, `js/init-jspsych.js`, `img/` | the task itself (adapted from the Niv Lab; see below) |
| `apps_script.gs` | Google Apps Script that receives the data and writes it to your Google Sheet |
| `fit_my_bandit_data.ipynb` | Colab notebook: students fit models to their own CSV; the last section fits the whole class |

## Setup

### 1. Make the Google Sheet that collects everyone's data (about 5 minutes)

1. Create a new Google Sheet, for example "COGS 118D bandit data". **Use a personal Google account if you can:** many university Google Workspace accounts don't allow web apps that "Anyone" can reach, and the task needs that.
2. In the sheet: **Extensions → Apps Script**. Delete the starter code, paste in all of `apps_script.gs`, and click **Save**.
3. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, then **Authorize access**, choose your account, and allow it. (Google may show "Google hasn't verified this app": click **Advanced → Go to … (unsafe)**. It's your own script.)
5. Copy the **Web app URL**. It ends in `/exec`.
6. Paste it into `js/config.js`:
   ```js
   sheet_url: "https://script.google.com/macros/s/XXXXXXXX/exec",
   ```
7. Check it: open the `/exec` URL in your browser. You should see "The COGS 118D bandit data collector is running."

If you change `apps_script.gs` later, use **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**, so the URL stays the same.

### 2. Put the task on your website (GitHub Pages)

Either option works. The page only needs to be served as static files.

**Option A: inside the course website repository.** Upload this whole folder (as a folder named `bandit`) to the repository that builds your course site. On GitHub: open the repository → **Add file → Upload files** → drag in the `bandit` folder → **Commit changes**. The task will be at `https://<your-site>/bandit/` (e.g., `https://cogs118d.github.io/bandit/`) a minute or two later.

**Option B: a new repository.** Create a new public repository (e.g., `bandit`), upload the contents of this folder, then **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**. The task will be at `https://<user-or-org>.github.io/bandit/`.

### 3. Test it yourself

Play the task once (it's about 5 minutes; to test faster, temporarily set `free_trials_per_block: 5` in `config.js`). At the end you should see your anonymous ID, a **Download my data (CSV)** button, and "✓ Your anonymous data were sent to the class spreadsheet." Within a few seconds, your rows should appear in the `responses` tab of the sheet.

### 4. Give students the notebook

Put `fit_my_bandit_data.ipynb` somewhere students can open it in Colab, e.g. the course `datasets` repository, and link it with
`https://colab.research.google.com/github/<org>/<repo>/blob/main/<path>/fit_my_bandit_data.ipynb`.
The notebook asks students to upload their CSV. The last section ("instructor") fits everyone: download the `responses` tab as a CSV (**File → Download → Comma-separated values**) and upload it there.

## Settings (`js/config.js`)

| Setting | Default | Notes |
|---|---|---|
| `sheet_url` | `""` | your Apps Script `/exec` URL; leave empty to turn off the upload |
| `n_blocks` | 2 | up to 4 (there are 4 face and 4 place pictures; blocks alternate faces and places) |
| `free_trials_per_block` | 50 | about 100 free choices in total gives reasonable parameter recovery (Lecture 14) |
| `forced_trials_per_block` | 0 | the original task used 4 forced trials per 10; the notebook handles them |
| `reward_probs` | `[0.2, 0.8]` | worse and better option |
| `choice_display_duration`, `feedback_display_duration`, `iti_duration` | 500, 1000, 500 ms | the original used 1500, 2000, 1500 ms |

## The data

One row per trial, in the downloaded CSV and in the sheet (the sheet adds a `received_at` timestamp column first).

| Column | Meaning |
|---|---|
| `participant_id` | random 6-character ID shown at the end; no names or emails are collected |
| `session_start` | when the page was opened (UTC) |
| `block`, `trial` | round (1, 2, …) and trial within the round |
| `choice_type` | `free` (two pictures) or `forced` (one picture) |
| `image_set` | `face` or `place` |
| `left_option`, `right_option` | option shown on each side: 1 = better (80%), 0 = worse (20%); blank if no picture |
| `choice_side` | `left` or `right` |
| `chosen_option` | 1 = chose the better picture, 0 = the worse one |
| `chose_better` | same as `chosen_option` (kept for readability) |
| `reward` | 1 = rewarded, 0 = not |
| `reward_prob_chosen` | reward probability of the chosen option |
| `rt_ms` | response time in milliseconds |

Rewards come from shuffled runs of 10 outcomes per option with exactly 2 (or 8) rewards, so every student experiences the same reward rates in a different order.

## Privacy and good practice

- The task doesn’t record names, emails, or IP addresses; students are identified only by a random ID that only they see.
- Tell students their anonymous data will be shared with the instructor and may be shown in class.
- This is a classroom demonstration, not a research study. Publishing or presenting these data as research would require IRB review.
- Anyone who has the `/exec` URL could post rows to the sheet. After the activity, you can turn collection off with **Deploy → Manage deployments → Archive**.

## Credits and license

The task is adapted from the **two-armed bandit task by Dan Bennett** in the Niv Lab's jsPsych demos, <https://github.com/nivlab/jspsych-demos/tree/main/tasks/bandit>, licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0** (<https://creativecommons.org/licenses/by-nc-sa/4.0/>). The original material is provided as-is, without warranties. Stimulus images are from the same repository.

This adapted version, including the new files (`config.js`, `data-export.js`, `apps_script.gs`, `fit_my_bandit_data.ipynb`), is shared under the same CC BY-NC-SA 4.0 license, for non-commercial teaching use.

**Modifications made for COGS 118D (UC San Diego), October 2026:**
1. Task length, reward probabilities and timing are set in a new `config.js`; trial lists are generated from it (`bandit-runsheet.js`).
2. Payout queues are built for the whole block from shuffled runs of 10 outcomes (`bandit-queues.js`); the plugin falls back to the stated probability if a queue ever runs out.
3. The plugin records `choice_type`, `block` and `trial_in_block` with each trial.
4. New instructions, a preload step, block breaks, anonymous IDs, a tidy CSV download, and an optional upload to a Google Sheet.
5. Blocks get their own picture pairs and fresh payout queues; up to 4 blocks are supported.
