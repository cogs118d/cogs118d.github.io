// Trial lists (modified for COGS 118D): built from CONFIG instead of a fixed list of 10 trials.
// Free-choice trials are balanced so each option appears on the left half the time.
// Forced-choice trials show one machine, on the left or right.

function makeRunsheet(image_type) {
  var trials = [];
  for (var i = 0; i < CONFIG.free_trials_per_block; i++) {
    var left = i % 2;  // alternate which option is on the left; jsPsych shuffles the order
    trials.push({choice_type: "free", left_image_type: image_type, left_image_number: left,
                 right_image_type: image_type, right_image_number: 1 - left});
  }
  for (var j = 0; j < CONFIG.forced_trials_per_block; j++) {
    if (j % 2 === 0) {
      trials.push({choice_type: "forced", left_image_type: image_type, left_image_number: null,
                   right_image_type: null, right_image_number: null});
    } else {
      trials.push({choice_type: "forced", left_image_type: null, left_image_number: null,
                   right_image_type: image_type, right_image_number: null});
    }
  }
  return trials;
}

var face_conditioning_stimuli = makeRunsheet("face");
var place_conditioning_stimuli = makeRunsheet("place");
