// End screen and CSV download (COGS 118D). Nothing is sent anywhere: the data stay in the
// student's browser unless they click "Download my data".

var CSV_COLUMNS = ["participant_id", "session_start", "trial", "block", "choice", "choice_side", "reward",
  "ratio_option1", "ratio_option2", "p_option1", "p_option2", "baited_option1", "baited_option2", "rt_ms"];

function makeParticipantId() {
  var chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var id = "";
  for (var i = 0; i < 6; i++) { id += chars.charAt(Math.floor(Math.random() * chars.length)); }
  return id;
}

// One row per trial, with the same columns as rutledge2009.csv (choice 1 = red, 2 = green), plus extras
function tidyRows(jsPsych, participant_id, session_start) {
  return jsPsych.data.get().filter({task: "crabs"}).values().map(function (d) {
    var tot = d.p_option1 + d.p_option2;
    return {
      participant_id: participant_id, session_start: session_start,
      trial: d.trial_number, block: d.block, choice: d.choice, choice_side: d.choice_side, reward: d.reward,
      ratio_option1: +(d.p_option1 / tot).toFixed(4), ratio_option2: +(d.p_option2 / tot).toFixed(4),
      p_option1: +d.p_option1.toFixed(4), p_option2: +d.p_option2.toFixed(4),
      baited_option1: d.baited_option1, baited_option2: d.baited_option2, rt_ms: d.rt
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

// Like Fig. 1B of the paper: the share of your choices that went to the red trap (running average),
// and the red trap's share of the reward probability (dashed)
function choicePlot(rows) {
  var W = 760, H = 230, L = 50, R = 12, T = 12, B = 36;
  var n = rows.length, k = 10;
  var x = function (t) { return L + (W - L - R) * (t - 1) / Math.max(1, n - 1); };
  var y = function (v) { return T + (H - T - B) * (1 - v); };
  var run = rows.map(function (r, i) {
    var w = rows.slice(Math.max(0, i - k + 1), i + 1);
    return mean(w.map(function (q) { return q.choice === 1 ? 1 : 0; }));
  });
  var line = function (vals) { return vals.map(function (v, i) { return (i ? 'L' : 'M') + x(i + 1).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' '); };
  var ticks = [0, 0.5, 1].map(function (v) {
    return '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#ffffff22"/>' +
           '<text x="' + (L - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
  }).join('');
  var dots = rows.map(function (r, i) {
    return r.reward ? '<circle cx="' + x(i + 1).toFixed(1) + '" cy="' + (r.choice === 1 ? y(1.04) : y(-0.04)).toFixed(1) + '" r="2.2" fill="' + (r.choice === 1 ? '#e63946' : '#2f9e44') + '"/>' : '';
  }).join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="plot">' + ticks +
    '<path d="' + line(rows.map(function (r) { return r.ratio_option1; })) + '" stroke="#ffd166" stroke-width="2" stroke-dasharray="6 4" fill="none"/>' +
    '<path d="' + line(run) + '" stroke="#ffffff" stroke-width="2.2" fill="none"/>' + dots +
    '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">trial</text>' +
    '<text transform="translate(14 ' + ((T + H - B) / 2) + ') rotate(-90)" text-anchor="middle">red</text>' +
    '</svg>';
}

function showEndScreen(jsPsych, participant_id, session_start) {
  var rows = tidyRows(jsPsych, participant_id, session_start);
  var crabs = rows.reduce(function (s, r) { return s + r.reward; }, 0);
  var rich = mean(rows.map(function (r) { return ((r.choice === 1) === (r.ratio_option1 > 0.5)) ? 1 : 0; }));
  var stay = function (prev_reward) {
    var v = [];
    for (var i = 1; i < rows.length; i++) {
      if (rows[i - 1].reward === prev_reward) { v.push(rows[i].choice === rows[i - 1].choice ? 1 : 0); }
    }
    return mean(v);
  };

  var el = jsPsych.getDisplayElement();
  el.innerHTML =
    '<div class="endscreen">' +
    '<h2>All done!</h2>' +
    '<p>You caught <b>' + crabs + '</b> crabs (' + money(crabs) + ') and chose the trap that was richer at the time on <b>' + pct(rich) + '</b> of trials.</p>' +
    '<h3>Your choices over time</h3>' +
    choicePlot(rows) +
    '<p class="note">White line: the share of your last 10 choices that went to the red trap. Dashed yellow line: the red trap’s share of the crabs on offer ' +
    '(above 0.5 means red was the rich trap). Dots: crabs you caught (red trap on top, green trap at the bottom). ' +
    'The rich trap switched sides every 70–90 trials, without warning.</p>' +
    '<h3>Staying with the same trap, next to the paper’s groups</h3>' +
    '<table class="summary">' +
    '<tr><th></th><th>You</th><th>Young</th><th>Elderly</th><th>Parkinson’s, off medication</th><th>Parkinson’s, on medication</th></tr>' +
    '<tr><td>p(stay) after <b>no crab</b></td><td>' + pct(stay(0)) + '</td><td>52%</td><td>58%</td><td>67%</td><td>62%</td></tr>' +
    '<tr><td>p(stay) after <b>a crab</b></td><td>' + pct(stay(1)) + '</td><td>87%</td><td>81%</td><td>86%</td><td>87%</td></tr>' +
    '</table>' +
    '<p class="note">Group values are averages over the 26 sessions in each group of the paper’s data (800 trials each). ' +
    'Think about which model parameters would make someone stay after an empty trap: a low learning rate, a tendency to repeat choices (perseveration), or both?</p>' +
    '<p><button id="dl" class="jspsych-btn">Download my data (CSV)</button></p>' +
    '<p class="note">Your choices are not sent or saved anywhere. Your anonymous ID for this session is <b>' + participant_id + '</b>.</p>' +
    '<p class="credit">Task design after Rutledge, Lazzaro, Lau, Myers, Gluck &amp; Glimcher (2009), <i>Journal of Neuroscience</i>: ' +
    'crab traps marked by red and green buoys, a “baited” reward schedule, and reward ratios that reverse in blocks of 70–90 trials. ' +
    'Drawings made for COGS 118D.</p>' +
    '</div>';
  document.getElementById("dl").addEventListener("click", function () { downloadCSV(rows, participant_id); });
}
