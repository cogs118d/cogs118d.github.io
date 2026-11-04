// One trial of the spaceship task (written for COGS 118D, after Kool, Gershman & Cushman, 2017, Experiment 1).
// 1. A stakes cue (1x or 5x).  2. Two spaceships: choose one (arrow keys or click).
// 3. The ship flies to its planet, where an alien works in a space mine: press the space bar (or click the alien)
//    to collect its space treasure.  4. The treasure, multiplied by the stakes, is added to the score.
var jsPsychSpaceshipTrial = (function (jspsych) {
  'use strict';

  const info = {
    name: 'spaceship-trial',
    version: '1.0.0',
    parameters: { spec: { type: jspsych.ParameterType.OBJECT, default: {} } },
    data: {
      spaceship: { type: jspsych.ParameterType.INT },
      planet: { type: jspsych.ParameterType.INT },
      points: { type: jspsych.ParameterType.INT }
    }
  };

  class SpaceshipTrialPlugin {
    constructor(jsPsych) { this.jsPsych = jsPsych; }

    trial(display_element, trial) {
      var jsPsych = this.jsPsych;
      var s = trial.spec;     // {trial, n_trials, practice, start_state, stake, ships: [left id, right id], t}
      var api = jsPsych.pluginAPI;
      var values = WORLD.values[s.t].map(function (v) { return Math.round(v); });   // what each alien pays this trial
      var data = {
        task: 'spaceships', practice: s.practice ? 1 : 0, trial_number: s.trial, stake: s.stake,
        start_state: s.start_state, ship_left: s.ships[0], ship_right: s.ships[1],
        spaceship: -1, planet: -1, points: '', reward_planet1: values[0], reward_planet2: values[1],
        timed_out: 0, timeout_stage: '', rt1: '', rt2: ''
      };

      var label = s.practice ? 'Practice trial ' + s.trial + ' of ' + s.n_trials : 'Trial ' + s.trial + ' of ' + s.n_trials;
      display_element.innerHTML =
        '<div class="stage">' +
        '  <div class="hud"><span>' + label + '</span><span>' + (s.practice ? 'Practice: points don’t count' : 'Points: <b>' + WORLD.points + '</b>') + '</span></div>' +
        '  <svg id="scene" viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg"></svg>' +
        '  <div class="hint">&nbsp;</div>' +
        '</div>';
      var svg = display_element.querySelector('#scene');
      var hint = display_element.querySelector('.hint');

      // ---- 1. stakes cue ----
      svg.innerHTML = background('earth') + '<g transform="translate(450 250)">' + stakesBadge(s.stake, 1.8) + '</g>' +
        '<text x="450" y="390" class="msg">' + (s.stake > 1 ? 'High stakes: treasure is worth 5 points per piece' : 'Low stakes: treasure is worth 1 point per piece') + '</text>';
      api.setTimeout(showShips, CONFIG.cue_ms);

      // ---- 2. spaceship choice ----
      function showShips() {
        var ship = function (side, id, x) {
          var c = WORLD.ship_colour[id];
          return '<g transform="translate(' + x + ' 300)"><g id="ship-' + side + '" class="ship" data-ship="' + id + '">' + rocket(c[0], c[1]) + '</g></g>';
        };
        svg.innerHTML = background('earth') + '<g transform="translate(450 62)">' + stakesBadge(s.stake, 0.8) + '</g>' +
          ship('left', s.ships[0], 270) + ship('right', s.ships[1], 630);
        hint.innerHTML = '&larr; left spaceship &nbsp;&nbsp;·&nbsp;&nbsp; right spaceship &rarr;';
        var t0 = performance.now(), done = false;
        var listener = api.getKeyboardResponse({
          callback_function: function (k) { choose(k.key === 'ArrowLeft' ? 'left' : 'right'); },
          valid_responses: ['ArrowLeft', 'ArrowRight'], rt_method: 'performance', persist: false, allow_held_key: false
        });
        ['left', 'right'].forEach(function (side) {
          svg.querySelector('#ship-' + side).addEventListener('click', function () { choose(side); });
        });
        var timer = s.practice ? null : api.setTimeout(function () {
          if (done) { return; }
          done = true; api.cancelKeyboardResponse(listener); tooSlow(1);
        }, CONFIG.choice_deadline_ms);

        function choose(side) {
          if (done) { return; }
          done = true; api.cancelKeyboardResponse(listener);
          var rt = performance.now() - t0;
          data.rt1 = Math.round(rt);
          data.spaceship = s.ships[side === 'left' ? 0 : 1];
          data.planet = WORLD.ship_planet[data.spaceship];
          svg.querySelector('#ship-' + side).classList.add('chosen');
          svg.querySelector('#ship-' + (side === 'left' ? 'right' : 'left')).classList.add('faded');
          hint.innerHTML = '&nbsp;';
          // as in the paper, the chosen ship stays highlighted until the response period is over
          var wait = s.practice ? 500 : Math.max(300, CONFIG.choice_deadline_ms - rt);
          api.setTimeout(function () {
            svg.querySelector('#ship-' + side).classList.add('flying');
            api.setTimeout(showPlanet, CONFIG.flight_ms);
          }, wait);
        }
      }

      // ---- 3. the planet and its alien ----
      function showPlanet() {
        var art = PLANET_ART[data.planet];
        svg.innerHTML = background(art.name) + '<g transform="translate(450 62)">' + stakesBadge(s.stake, 0.8) + '</g>' +
          '<g transform="translate(450 290)"><g id="alien" class="alien">' + alien(art.alien[0], art.alien[1]) + '</g></g>' +
          '<g id="treasure"></g><text id="msg" x="450" y="495" class="msg"></text>';
        hint.innerHTML = 'Press the <b>space bar</b> (or click the alien) to collect the treasure';
        var t0 = performance.now(), done = false;
        var listener = api.getKeyboardResponse({
          callback_function: function () { collect(); },
          valid_responses: [' '], rt_method: 'performance', persist: false, allow_held_key: false
        });
        svg.querySelector('#alien').addEventListener('click', function () { collect(); });
        if (!s.practice) {
          api.setTimeout(function () {
            if (done) { return; }
            done = true; api.cancelKeyboardResponse(listener); tooSlow(2);
          }, CONFIG.alien_deadline_ms);
        }

        function collect() {
          if (done) { return; }
          done = true; api.cancelKeyboardResponse(listener);
          var rt = performance.now() - t0;
          data.rt2 = Math.round(rt);
          svg.querySelector('#alien').classList.add('chosen');
          hint.innerHTML = '&nbsp;';
          var wait = s.practice ? 300 : Math.max(200, CONFIG.alien_deadline_ms - rt);
          api.setTimeout(showReward, wait);
        }
      }

      // ---- 4. the reward ----
      function showReward() {
        var n = values[data.planet - 1];
        data.points = n;
        var gems = '';
        for (var i = 0; i < n; i++) { gems += '<g transform="translate(' + (450 + (i - (n - 1) / 2) * 46) + ' 138)">' + treasure() + '</g>'; }
        svg.querySelector('#treasure').innerHTML = gems;
        svg.querySelector('#msg').textContent = n === 0 ? 'No treasure this time' :
          n + (n === 1 ? ' piece' : ' pieces') + ' of treasure × ' + s.stake + ' = ' + (n * s.stake) + ' points';
        if (!s.practice) { WORLD.points += n * s.stake; }
        api.setTimeout(finish, CONFIG.reward_ms);
      }

      function tooSlow(stage) {
        data.timed_out = 1;
        data.timeout_stage = stage;
        hint.innerHTML = '&nbsp;';
        svg.innerHTML = background('earth') + '<text x="450" y="250" class="msg big">Too slow!</text>' +
          '<text x="450" y="300" class="msg">No treasure on this trial. Try to respond faster.</text>';
        api.setTimeout(finish, CONFIG.too_slow_ms);
      }

      function finish() {
        display_element.innerHTML = '<div class="stage"><div class="hud">&nbsp;</div><div class="blank"></div></div>';
        api.setTimeout(function () { jsPsych.finishTrial(data); }, CONFIG.iti_ms);
      }
    }
  }
  SpaceshipTrialPlugin.info = info;
  return SpaceshipTrialPlugin;
})(jsPsychModule);
