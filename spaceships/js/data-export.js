// End screen and CSV download (COGS 118D). Nothing is sent anywhere: the data stay in the
// student's browser unless they click "Download my data".

var CSV_COLUMNS = ["participant_id", "session_start", "practice", "trial", "stake", "start_state", "spaceship", "planet",
  "points", "reward_planet1", "reward_planet2", "timed_out", "timeout_stage", "ship_left", "ship_right", "rt1_ms", "rt2_ms"];

function makeParticipantId() {
  var chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var id = "";
  for (var i = 0; i < 6; i++) { id += chars.charAt(Math.floor(Math.random() * chars.length)); }
  return id;
}

// One row per trial, with the same columns as kool2017_exp1.csv (spaceships 1-2 start in state 1 and
// 3-4 in state 2; spaceships 1 and 3 fly to planet 1, the purple one), plus extras
function tidyRows(jsPsych, participant_id, session_start) {
  return jsPsych.data.get().filter({task: "spaceships"}).values().map(function (d) {
    return {
      participant_id: participant_id, session_start: session_start, practice: d.practice, trial: d.trial_number,
      stake: d.stake, start_state: d.start_state, spaceship: d.spaceship, planet: d.planet, points: d.points,
      reward_planet1: d.reward_planet1, reward_planet2: d.reward_planet2, timed_out: d.timed_out,
      timeout_stage: d.timeout_stage, ship_left: d.ship_left, ship_right: d.ship_right, rt1_ms: d.rt1, rt2_ms: d.rt2
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

// The planning signature: did you fly to the same planet as on the previous trial, split by how much
// treasure the previous trial paid (0-4 vs 5-9) and whether this trial started with the same spaceships
function signature(rows) {
  var cells = {same_low: [], same_high: [], diff_low: [], diff_high: [], diff_low_1: [], diff_high_1: [], diff_low_5: [], diff_high_5: []};
  for (var i = 1; i < rows.length; i++) {
    var a = rows[i - 1], b = rows[i];
    if (a.timed_out || b.timed_out) { continue; }
    var key = (a.start_state === b.start_state ? 'same' : 'diff') + '_' + (a.points >= 5 ? 'high' : 'low');
    var v = b.planet === a.planet ? 1 : 0;
    cells[key].push(v);
    if (key.indexOf('diff') === 0) { cells[key + '_' + b.stake].push(v); }
  }
  var m = {};
  Object.keys(cells).forEach(function (k) { m[k] = mean(cells[k]); m['n_' + k] = cells[k].length; });
  m.index_1 = m.diff_high_1 - m.diff_low_1;
  m.index_5 = m.diff_high_5 - m.diff_low_5;
  return m;
}

function signaturePlot(m) {
  var paper = {same_low: 0.47, same_high: 0.80, diff_low: 0.46, diff_high: 0.72};
  var W = 560, H = 250, L = 44, B = 40, T = 14;
  var y = function (v) { return T + (H - T - B) * (1 - v); };
  var bars = '', groups = [['low', 'previous treasure 0–4'], ['high', 'previous treasure 5–9']];
  groups.forEach(function (g, gi) {
    [['same', '#4cc9f0'], ['diff', '#ffb703']].forEach(function (c, ci) {
      var k = c[0] + '_' + g[0];
      var x = L + 30 + gi * 250 + ci * 92;
      var v = isNaN(m[k]) ? 0 : m[k];
      bars += '<rect x="' + x + '" y="' + y(v) + '" width="76" height="' + (y(0) - y(v)) + '" fill="' + c[1] + '"/>' +
              '<line x1="' + (x - 4) + '" x2="' + (x + 80) + '" y1="' + y(paper[k]) + '" y2="' + y(paper[k]) + '" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 3"/>' +
              '<text x="' + (x + 38) + '" y="' + (y(v) - 6) + '" text-anchor="middle">' + pct(m[k]) + '</text>';
    });
    bars += '<text x="' + (L + 30 + gi * 250 + 84) + '" y="' + (H - 14) + '" text-anchor="middle">' + g[1] + '</text>';
  });
  var axis = [0, 0.5, 1].map(function (v) {
    return '<line x1="' + L + '" x2="' + (W - 6) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#ffffff22"/><text x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
  }).join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="plot">' + axis + bars + '</svg>';
}

function showEndScreen(jsPsych, participant_id, session_start) {
  var all = tidyRows(jsPsych, participant_id, session_start);
  var rows = all.filter(function (r) { return r.practice === 0; });
  var points = rows.reduce(function (s, r) { return s + (r.timed_out ? 0 : r.points * r.stake); }, 0);
  var m = signature(rows);
  var slow = rows.filter(function (r) { return r.timed_out; }).length;

  var el = jsPsych.getDisplayElement();
  el.innerHTML =
    '<div class="endscreen">' +
    '<h2>Mission complete!</h2>' +
    '<p>You earned <b>' + points + ' points</b> (' + (points / CONFIG.points_per_cent).toFixed(1) + ' cents at the paper’s rate of 1 cent per ' + CONFIG.points_per_cent + ' points)' +
    (slow ? ', and were too slow on ' + slow + ' of ' + rows.length + ' trials' : '') + '.</p>' +
    '<h3>Did you plan?</h3>' +
    '<p class="note">How often you flew to the <b>same planet</b> as on the previous trial, depending on how much treasure that trial paid, ' +
    'and whether the new trial started with the <b style="color:#4cc9f0">same pair of spaceships</b> or the <b style="color:#ffb703">other pair</b>. ' +
    'Dashed lines: the paper’s 98 participants.</p>' +
    signaturePlot(m) +
    '<p class="note">To go back to a good planet from the <i>other</i> pair of spaceships, you have to know which of the new ships flies there: that takes a model of the task. ' +
    'Repeating a rewarded ship only when you see the same pair again needs no model.</p>' +
    '<table class="summary">' +
    '<tr><th>Planning index (other pair: high minus low treasure)</th><th>You</th><th>Paper (n = 98)</th></tr>' +
    '<tr><td>Low-stakes trials (1×)</td><td>' + (isNaN(m.index_1) ? '–' : m.index_1.toFixed(2)) + '</td><td>0.20</td></tr>' +
    '<tr><td>High-stakes trials (5×)</td><td>' + (isNaN(m.index_5) ? '–' : m.index_5.toFixed(2)) + '</td><td>0.31</td></tr>' +
    '</table>' +
    '<p class="note">With ' + rows.length + ' trials, one person’s numbers are noisy (the paper used 200 trials per person).</p>' +
    '<p><button id="dl" class="jspsych-btn">Download my data (CSV)</button></p>' +
    '<p class="note">Your choices are not sent or saved anywhere. Your anonymous ID for this session is <b>' + participant_id + '</b>.</p>' +
    '<p class="credit">Task design after Kool, Gershman &amp; Cushman (2017), <i>Psychological Science</i>, Experiment 1: two pairs of spaceships, ' +
    'deterministic flights to a purple and a red planet, aliens whose space treasure drifts between 0 and 9, and a 1× or 5× stakes cue. ' +
    'Drawings made for COGS 118D.</p>' +
    '</div>';
  document.getElementById("dl").addEventListener("click", function () { downloadCSV(all, participant_id); });
}
