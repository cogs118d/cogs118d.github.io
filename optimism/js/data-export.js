// End screen and CSV download (COGS 118D). Nothing is sent anywhere: the data stay in the
// student's browser unless they click "Download my data".

var CSV_COLUMNS = ["participant_id", "session_start", "trial", "pair", "p_option1", "p_option2",
  "option_left", "choice", "choice_side", "outcome", "correct", "rt_ms"];

// A short anonymous ID, e.g. "K7Q2XA", so a student can tell their files apart
function makeParticipantId() {
  var chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var id = "";
  for (var i = 0; i < 6; i++) { id += chars.charAt(Math.floor(Math.random() * chars.length)); }
  return id;
}

// One row per trial, with the same columns as lefebvre2017_exp1.csv (plus a few extras)
function tidyRows(jsPsych, participant_id, session_start) {
  return jsPsych.data.get().filter({task: "cards"}).values().map(function (d) {
    var p = CONFIG.pairs[d.pair_index];
    var correct = (p[0] === p[1]) ? "" : Number(p[d.choice - 1] > p[2 - d.choice]);
    return {
      participant_id: participant_id, session_start: session_start,
      trial: d.trial_number, pair: d.pair, p_option1: p[0], p_option2: p[1],
      option_left: d.option_left, choice: d.choice, choice_side: d.choice_side,
      outcome: d.outcome, correct: correct, rt_ms: d.rt
    };
  });
}

function toCSV(rows) {
  var esc = function (v) {
    var s = (v === null || v === undefined) ? "" : String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  var lines = [CSV_COLUMNS.join(",")];
  rows.forEach(function (r) { lines.push(CSV_COLUMNS.map(function (c) { return esc(r[c]); }).join(",")); });
  return lines.join("\n") + "\n";
}

function downloadCSV(rows, participant_id) {
  var blob = new Blob([toCSV(rows)], {type: "text/csv;charset=utf-8"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = CONFIG.csv_prefix + "_" + participant_id + ".csv";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function pct(x) { return isNaN(x) ? "–" : Math.round(100 * x) + "%"; }
function mean(a) { return a.length ? a.reduce(function (s, v) { return s + v; }, 0) / a.length : NaN; }

// The paper's two behavioral measures, for this player
function summarize(rows) {
  var asym = rows.filter(function (r) { return r.correct !== ""; });
  var preferred = function (label) {
    var c = rows.filter(function (r) { return r.pair === label; }).map(function (r) { return r.choice === 1 ? 1 : 0; });
    var m = mean(c);
    return Math.max(m, 1 - m);
  };
  return {
    won: rows.reduce(function (s, r) { return s + r.outcome; }, 0),
    correct: mean(asym.map(function (r) { return r.correct; })),
    pref_low: preferred("25/25"),
    pref_high: preferred("75/75")
  };
}

function showEndScreen(jsPsych, participant_id, session_start) {
  var rows = tidyRows(jsPsych, participant_id, session_start);
  var S = summarize(rows);

  // the symbols and what they were worth
  var reveal = PAIRS.map(function (pr) {
    return '<div class="reveal-pair">' + [0, 1].map(function (k) {
      return '<div><img src="' + pr.images[k] + '"><div>' + Math.round(100 * pr.p[k]) + '% chance</div></div>';
    }).join('') + '</div>';
  }).join('');

  var el = jsPsych.getDisplayElement();
  el.innerHTML =
    '<div class="endscreen">' +
    '<h2>All done!</h2>' +
    '<p>You won <b>' + (S.won < 0 ? '−' : '') + '€' + Math.abs(S.won).toFixed(2) + '</b>. Here is what each pair of symbols was really worth:</p>' +
    '<div class="reveal">' + reveal + '</div>' +
    '<h3>Your behavior, next to the paper’s participants</h3>' +
    '<table class="summary">' +
    '<tr><th></th><th>You</th><th>Experiment 1 (n = 50)</th></tr>' +
    '<tr><td><b>Correct choice rate</b> in the two pairs with different chances (25/75): how often you chose the 75% symbol</td><td>' + pct(S.correct) + '</td><td>76%</td></tr>' +
    '<tr><td><b>Preferred choice rate in the 25/25 pair</b>: how often you chose whichever symbol you chose more (50% means no preference)</td><td>' + pct(S.pref_low) + '</td><td>67%</td></tr>' +
    '<tr><td><b>Preferred choice rate in the 75/75 pair</b></td><td>' + pct(S.pref_high) + '</td><td>87%</td></tr>' +
    '</table>' +
    '<p class="note">In the 25/25 pair, both symbols win only a quarter of the time, so there is nothing to learn about which is better. ' +
    'Think about what a learner who updates more after good news than after bad news would do there. ' +
    'With only 24 trials per pair, one person’s numbers are noisy.</p>' +
    '<p><button id="dl" class="jspsych-btn">Download my data (CSV)</button></p>' +
    '<p class="note">Your choices are not sent or saved anywhere. Your anonymous ID for this session is <b>' + participant_id + '</b>.</p>' +
    '<p class="credit">Symbol images from the Human Reinforcement Learning team’s online task code (Palminteri lab; ' +
    '<a href="https://github.com/hrl-team/online_exp" target="_blank">github.com/hrl-team/online_exp</a>, MIT License). ' +
    'Task design after Lefebvre, Lebreton, Meyniel, Bourgeois-Gironde &amp; Palminteri (2017), <i>Nature Human Behaviour</i>.</p>' +
    '</div>';
  document.getElementById("dl").addEventListener("click", function () { downloadCSV(rows, participant_id); });
}
