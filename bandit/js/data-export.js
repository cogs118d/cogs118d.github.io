// Data export for COGS 118D: a tidy CSV for students, and an optional copy sent to the
// instructor's Google Sheet through a Google Apps Script web app (see apps_script.gs).

var CSV_COLUMNS = ["participant_id", "session_start", "block", "trial", "choice_type", "image_set",
  "left_option", "right_option", "choice_side", "chosen_option", "chose_better", "reward",
  "reward_prob_chosen", "rt_ms"];

// A short anonymous ID, e.g. "K7Q2XA" (no letters or digits that are easy to confuse)
function makeParticipantId() {
  var chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var id = "";
  for (var i = 0; i < 6; i++) { id += chars.charAt(Math.floor(Math.random() * chars.length)); }
  return id;
}

// One row per bandit trial. Options are coded by their payout: 0 = worse (20%), 1 = better (80%).
function tidyRows(jsPsych, participant_id, session_start) {
  var trials = jsPsych.data.get().filter({task: "bandit"}).values();
  return trials.map(function (d) {
    var left = (d.left_image_type === null || d.ur_left_image < 0) ? "" : d.ur_left_image;
    var right = (d.right_image_type === null || d.ur_right_image < 0) ? "" : d.ur_right_image;
    var chosen = (d.choice === null || d.choice === undefined) ? "" : d.ur_chosen_image;
    var reward = (chosen === "") ? "" : Number(d.feedback);
    return {
      participant_id: participant_id,
      session_start: session_start,
      block: d.block,
      trial: d.trial_in_block,
      choice_type: d.choice_type,
      image_set: (d.left_image_type || d.right_image_type) === "face" ? "machines_A" : "machines_B",   // which set of 4 slot machines
      left_option: left,
      right_option: right,
      choice_side: d.choice || "",
      chosen_option: chosen,
      chose_better: (chosen === "") ? "" : Number(chosen === 1),
      reward: reward,
      reward_prob_chosen: (chosen === "") ? "" : CONFIG.reward_probs[chosen],
      rt_ms: (d.rt === null || d.rt === undefined) ? "" : Math.round(d.rt)
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

// Sends the rows to the Apps Script web app. The response can't be read (no-cors), so a resolved
// promise means "sent", not "confirmed written". Check the sheet when testing.
function sendToSheet(rows, participant_id) {
  if (!CONFIG.sheet_url) { return Promise.reject(new Error("no sheet_url set")); }
  return fetch(CONFIG.sheet_url, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "text/plain;charset=utf-8"},
    body: JSON.stringify({participant_id: participant_id, rows: rows})
  });
}

// End screen: summary, CSV download button, and the status of the upload to the class sheet
function showEndScreen(jsPsych, participant_id, session_start) {
  var rows = tidyRows(jsPsych, participant_id, session_start);
  var free = rows.filter(function (r) { return r.choice_type === "free" && r.chosen_option !== ""; });
  var n_reward = rows.reduce(function (s, r) { return s + (r.reward === 1 ? 1 : 0); }, 0);
  var p_better = free.length ? Math.round(100 * free.filter(function (r) { return r.chose_better === 1; }).length / free.length) : 0;

  var el = jsPsych.getDisplayElement();
  el.innerHTML =
    '<div style="max-width:700px;margin:40px auto;text-align:left;font-size:20px;line-height:1.5">' +
    '<h2>All done, thank you!</h2>' +
    '<p>You won <b>' + n_reward + '</b> coins and played the better machine on <b>' + p_better + '%</b> of your spins.</p>' +
    '<p>Your anonymous ID is <b style="font-size:26px;letter-spacing:2px">' + participant_id + '</b>. ' +
    'Write it down: it is the only way to find your rows in the class data.</p>' +
    '<p><button id="dl" class="jspsych-btn" style="font-size:20px">Download my data (CSV)</button></p>' +
    '<p id="sheet_status" style="color:#555"></p>' +
    '<p style="font-size:14px;color:#777;margin-top:40px">Task adapted from the Niv Lab jsPsych demos ' +
    '(Dan Bennett; CC BY-NC-SA 4.0).</p></div>';

  document.getElementById("dl").addEventListener("click", function () { downloadCSV(rows, participant_id); });

  var status = document.getElementById("sheet_status");
  if (!CONFIG.sheet_url) { status.textContent = ""; return; }
  status.textContent = "Sending your anonymous data to the class spreadsheet…";
  sendToSheet(rows, participant_id).then(function () {
    status.textContent = "✓ Your anonymous data were sent to the class spreadsheet. You can close this page after downloading your CSV.";
  }).catch(function () {
    status.innerHTML = 'We couldn’t reach the class spreadsheet. Please download your CSV and upload it where your instructor asks. ' +
      '<button id="retry" class="jspsych-btn">Try again</button>';
    document.getElementById("retry").addEventListener("click", function () { showEndScreen(jsPsych, participant_id, session_start); });
  });
}
