// One trial of the crab-trap task (written for COGS 118D, after Rutledge et al., 2009).
// Two crab traps, marked by a red and a green buoy, wait under the water. The participant pulls one up
// with the arrow keys (or by clicking it); if a crab was waiting in it, it is caught.

// The scene as an SVG. Each trap has its own group so it can be raised.
function crabScene() {
  var trap = function (side, cx, colour) {
    var mesh = '';
    for (var x = cx - 70; x <= cx + 70; x += 20) { mesh += '<line x1="' + x + '" y1="332" x2="' + x + '" y2="448" class="mesh"/>'; }
    for (var y = 350; y <= 430; y += 20) { mesh += '<line x1="' + (cx - 78) + '" y1="' + y + '" x2="' + (cx + 78) + '" y2="' + y + '" class="mesh"/>'; }
    return '' +
      // buoy (stays at the surface)
      '<g class="buoy" id="buoy-' + side + '">' +
      '  <line x1="' + cx + '" y1="96" x2="' + cx + '" y2="130" stroke="#333" stroke-width="4"/>' +
      '  <path d="M' + (cx) + ' 96 l26 8 l-26 8 z" fill="' + colour + '"/>' +
      '  <ellipse cx="' + cx + '" cy="146" rx="38" ry="22" fill="' + colour + '" stroke="#222" stroke-width="3"/>' +
      '  <rect x="' + (cx - 38) + '" y="140" width="76" height="9" fill="#fff" opacity=".85"/>' +
      '</g>' +
      // trap and rope (raised on choice)
      '<g id="trap-' + side + '" class="trap">' +
      '  <line x1="' + cx + '" y1="160" x2="' + cx + '" y2="330" stroke="#d9c7a3" stroke-width="3"/>' +
      '  <rect x="' + (cx - 82) + '" y="328" width="164" height="124" rx="10" fill="rgba(255,255,255,.07)" stroke="#5d4030" stroke-width="7"/>' +
      '  <use href="#crab" x="' + cx + '" y="404" class="catch" visibility="hidden"/>' +
      mesh +
      '  <rect x="' + (cx - 86) + '" y="322" width="172" height="12" rx="5" fill="' + colour + '" stroke="#222" stroke-width="2"/>' +
      '</g>';
  };
  return '' +
    '<svg id="scene" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f86c2"/><stop offset="1" stop-color="#0a3558"/></linearGradient>' +
    '  <g id="crab">' +
    '    <g stroke="#b5321b" stroke-width="5" stroke-linecap="round" fill="none">' +
    '      <path d="M-26 6 l-20 10 l-6 14"/><path d="M-24 14 l-16 14 l-2 12"/><path d="M-18 18 l-10 16 l2 10"/>' +
    '      <path d="M26 6 l20 10 l6 14"/><path d="M24 14 l16 14 l2 12"/><path d="M18 18 l10 16 l-2 10"/>' +
    '      <path d="M-22 -8 l-18 -18"/><path d="M22 -8 l18 -18"/><path d="M-8 -16 l-2 -14"/><path d="M8 -16 l2 -14"/>' +
    '    </g>' +
    '    <path d="M-46 -40 a14 14 0 1 1 10 22 l-8 -6 l8 -4 a8 8 0 1 0 -10 -12 z" fill="#e4572e" stroke="#b5321b" stroke-width="2"/>' +
    '    <path d="M46 -40 a14 14 0 1 0 -10 22 l8 -6 l-8 -4 a8 8 0 1 1 10 -12 z" fill="#e4572e" stroke="#b5321b" stroke-width="2"/>' +
    '    <ellipse cx="0" cy="2" rx="34" ry="22" fill="#e4572e" stroke="#b5321b" stroke-width="3"/>' +
    '    <circle cx="-10" cy="-31" r="6" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="-10" cy="-31" r="2.5" fill="#222"/>' +
    '    <circle cx="10" cy="-31" r="6" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="10" cy="-31" r="2.5" fill="#222"/>' +
    '    <path d="M-9 8 q9 7 18 0" stroke="#7a1d0c" stroke-width="2.5" fill="none"/>' +
    '  </g>' +
    '</defs>' +
    '<rect x="0" y="0" width="900" height="150" fill="#bfe4f6"/>' +
    '<circle cx="800" cy="52" r="26" fill="#ffd166"/>' +
    '<rect x="0" y="150" width="900" height="350" fill="url(#sea)"/>' +
    '<path d="M0 150 q22 -10 45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 v6 h-900 z" fill="#2f86c2"/>' +
    '<path d="M0 500 v-22 q60 -14 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 v22 z" fill="#c9a66b" opacity=".6"/>' +
    trap('left', 270, '#e63946') + trap('right', 630, '#2f9e44') +
    '<text id="label-left" x="270" y="250" class="label"></text>' +
    '<text id="label-right" x="630" y="250" class="label"></text>' +
    '</svg>';
}

var jsPsychCrabTrial = (function (jspsych) {
  'use strict';

  const info = {
    name: 'crab-trial',
    version: '1.0.0',
    parameters: { spec: { type: jspsych.ParameterType.OBJECT, default: {} } },
    data: {
      choice: { type: jspsych.ParameterType.INT },
      reward: { type: jspsych.ParameterType.INT },
      rt: { type: jspsych.ParameterType.INT }
    }
  };

  class CrabTrialPlugin {
    constructor(jsPsych) { this.jsPsych = jsPsych; }

    trial(display_element, trial) {
      var jsPsych = this.jsPsych;
      var s = trial.spec;   // {trial, n_trials}
      var t = s.trial - 1;
      var p = WORLD.probs[t];   // [red, green] reward probabilities on this trial

      // bait: each empty trap gets a crab with its probability; a crab stays until its trap is pulled up
      for (var k = 0; k < 2; k++) { if (!WORLD.bait[k] && Math.random() < p[k]) { WORLD.bait[k] = 1; } }
      var baited = WORLD.bait.slice();

      var recent = WORLD.rewards.slice(-CONFIG.window).reduce(function (a, b) { return a + b; }, 0);
      display_element.innerHTML =
        '<div class="stage">' +
        '  <div class="hud"><span>Trial ' + s.trial + ' of ' + s.n_trials + '</span>' +
        '  <span>Crabs in the last ' + CONFIG.window + ' trials: <b>' + recent + '</b> &nbsp;(' + money(recent) + ')</span></div>' +
        crabScene() +
        '  <div class="hint">&larr; red trap &nbsp;&nbsp;·&nbsp;&nbsp; green trap &rarr;</div>' +
        '</div>';

      var t0 = performance.now();
      var done = false;
      var listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: function (info) { respond(info.key === 'ArrowLeft' ? 'left' : 'right'); },
        valid_responses: ['ArrowLeft', 'ArrowRight'],
        rt_method: 'performance', persist: false, allow_held_key: false
      });
      ['left', 'right'].forEach(function (side) {
        display_element.querySelector('#trap-' + side).addEventListener('click', function () { respond(side); });
      });

      function respond(side) {
        if (done) { return; }
        done = true;
        jsPsych.pluginAPI.cancelKeyboardResponse(listener);
        var rt = Math.round(performance.now() - t0);
        var c = side === 'left' ? 0 : 1;
        var reward = WORLD.bait[c];
        WORLD.bait[c] = 0;
        WORLD.rewards.push(reward);
        display_element.querySelector('.hint').style.visibility = 'hidden';

        var g = display_element.querySelector('#trap-' + side);
        g.classList.add('raised');
        display_element.querySelector('#buoy-' + side).classList.add('hidden');
        jsPsych.pluginAPI.setTimeout(function () {
          var label = display_element.querySelector('#label-' + side);
          if (reward) {
            g.querySelector('.catch').setAttribute('visibility', 'visible');
            label.textContent = '+1 crab!';
            label.classList.add('good');
          } else {
            label.textContent = 'empty';
          }
          jsPsych.pluginAPI.setTimeout(function () {
            jsPsych.pluginAPI.setTimeout(function () {
              jsPsych.finishTrial({
                task: 'crabs', trial_number: s.trial, block: WORLD.blocks[t],
                choice: c + 1, choice_side: side, reward: reward,
                p_option1: p[0], p_option2: p[1], baited_option1: baited[0], baited_option2: baited[1], rt: rt
              });
            }, CONFIG.iti_ms);
          }, CONFIG.show_ms);
        }, CONFIG.rise_ms);
      }
    }
  }
  CrabTrialPlugin.info = info;
  return CrabTrialPlugin;
})(jsPsychModule);

function money(n) { return '$' + (n * CONFIG.cents_per_crab / 100).toFixed(2); }
