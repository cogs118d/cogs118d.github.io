/**
 * COGS 118D bandit task: collect every student's data in this Google Sheet.
 *
 * Setup (once):
 *   1. In the Google Sheet: Extensions > Apps Script. Delete the starter code and paste this whole file. Save.
 *   2. Deploy > New deployment > gear icon > Web app.
 *        Execute as: Me
 *        Who has access: Anyone
 *      Click Deploy, then Authorize access and allow it.
 *   3. Copy the Web app URL (it ends in /exec) into sheet_url in js/config.js.
 *
 * Each finished session adds one row per trial to the "responses" tab, with a timestamp.
 * If you edit this script later, use Deploy > Manage deployments > edit (pencil) > Version: New version,
 * so the URL stays the same.
 */

var SHEET_NAME = "responses";
var COLUMNS = ["participant_id", "session_start", "block", "trial", "choice_type", "image_set",
  "left_option", "right_option", "choice_side", "chosen_option", "chose_better", "reward",
  "reward_prob_chosen", "rt_ms"];
var MAX_ROWS_PER_POST = 1000;   // guards against junk posts

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);          // students finishing at the same moment take turns
  try {
    var payload = JSON.parse(e.postData.contents);
    var rows = (payload.rows || []).slice(0, MAX_ROWS_PER_POST);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["received_at"].concat(COLUMNS));
      sheet.setFrozenRows(1);
    }
    var now = new Date();
    var values = rows.map(function (r) {
      return [now].concat(COLUMNS.map(function (c) {
        return (r[c] === undefined || r[c] === null) ? "" : r[c];
      }));
    });
    if (values.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
    }
    return ContentService.createTextOutput(JSON.stringify({ok: true, rows: values.length}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Visiting the /exec URL in a browser shows this message, a quick check that the deployment works.
function doGet() {
  return ContentService.createTextOutput("The COGS 118D bandit data collector is running.");
}
