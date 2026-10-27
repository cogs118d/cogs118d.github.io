// Initialize jsPsych (modified for COGS 118D: anonymous ID, tidy CSV and Google Sheet upload at the end).
var PARTICIPANT_ID = makeParticipantId();
var SESSION_START = new Date().toISOString();

var jsPsych = initJsPsych({
  on_finish: function () {
    showEndScreen(jsPsych, PARTICIPANT_ID, SESSION_START);
  }
});
jsPsych.data.addProperties({participant_id: PARTICIPANT_ID});
