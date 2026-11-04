// One trial of the symbol-card task (written for COGS 118D, after Lefebvre et al., 2017).
// Two cards are shown; the participant picks one with the arrow keys (or by clicking it),
// the chosen card is outlined, and the outcome appears under it.
var jsPsychCardTrial = (function (jspsych) {
  'use strict';

  const info = {
    name: 'card-trial',
    version: '1.0.0',
    parameters: {
      spec: { type: jspsych.ParameterType.OBJECT, default: {} }   // filled in by the timeline (see index.html)
    },
    data: {
      pair: { type: jspsych.ParameterType.STRING },
      choice: { type: jspsych.ParameterType.INT },
      outcome: { type: jspsych.ParameterType.FLOAT },
      rt: { type: jspsych.ParameterType.INT }
    }
  };

  function euros(x) {
    var s = '€' + Math.abs(x).toFixed(2);
    return x > 0 ? '+' + s : (x < 0 ? '−' + s : s);
  }

  class CardTrialPlugin {
    constructor(jsPsych) { this.jsPsych = jsPsych; }

    trial(display_element, trial) {
      var jsPsych = this.jsPsych;
      var s = trial.spec;   // {trial, n_trials, pair_index, pair, images[2], option_left (1 or 2)}
      var opt = {left: s.option_left, right: 3 - s.option_left};

      display_element.innerHTML =
        '<div class="stage">' +
        '  <div class="progress">Trial ' + s.trial + ' of ' + s.n_trials + '</div>' +
        '  <div class="cards">' +
        '    <div class="slot" id="slot-left"><img class="card" src="' + s.images[opt.left - 1] + '" alt="symbol"><div class="outcome"></div></div>' +
        '    <div class="slot" id="slot-right"><img class="card" src="' + s.images[opt.right - 1] + '" alt="symbol"><div class="outcome"></div></div>' +
        '  </div>' +
        '  <div class="hint">&larr; left card &nbsp;&nbsp;·&nbsp;&nbsp; right card &rarr;</div>' +
        '</div>';

      var t0 = performance.now();
      var done = false;

      var listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: function (info) { respond(info.key === 'ArrowLeft' ? 'left' : 'right'); },
        valid_responses: ['ArrowLeft', 'ArrowRight'],
        rt_method: 'performance', persist: false, allow_held_key: false
      });
      ['left', 'right'].forEach(function (side) {
        display_element.querySelector('#slot-' + side).addEventListener('click', function () { respond(side); });
      });

      function respond(side) {
        if (done) { return; }
        done = true;
        jsPsych.pluginAPI.cancelKeyboardResponse(listener);
        var rt = Math.round(performance.now() - t0);
        var choice = opt[side];                          // 1 or 2
        var outcome = drawOutcome(s.pair_index, choice); // from the outcome queues (index.html)
        var slot = display_element.querySelector('#slot-' + side);
        var other = display_element.querySelector('#slot-' + (side === 'left' ? 'right' : 'left'));
        slot.classList.add('chosen');
        other.classList.add('faded');
        display_element.querySelector('.hint').style.visibility = 'hidden';

        jsPsych.pluginAPI.setTimeout(function () {
          var box = slot.querySelector('.outcome');
          box.textContent = euros(outcome);
          box.className = 'outcome show ' + (outcome > 0 ? 'good' : (outcome < 0 ? 'bad' : 'zero'));
          jsPsych.pluginAPI.setTimeout(function () {
            display_element.innerHTML = '<div class="stage"><div class="fixation">+</div></div>';
            jsPsych.pluginAPI.setTimeout(function () {
              jsPsych.finishTrial({
                task: 'cards', trial_number: s.trial, pair: s.pair, pair_index: s.pair_index,
                option_left: s.option_left, choice: choice, choice_side: side, outcome: outcome, rt: rt
              });
            }, CONFIG.iti_ms);
          }, CONFIG.outcome_ms);
        }, CONFIG.choice_highlight_ms);
      }
    }
  }
  CardTrialPlugin.info = info;
  return CardTrialPlugin;
})(jsPsychModule);
