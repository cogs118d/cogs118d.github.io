// Payout queues (modified for COGS 118D).
// The original task used fixed 16-item queues (3/16 and 13/16 rewards), which run out in long blocks.
// Here each option gets a queue long enough for the whole block, built from shuffled runs of 10
// outcomes that contain exactly round(10 * p) rewards. So in every 10 picks of an option, the
// reward rate matches CONFIG.reward_probs exactly, but the order is unpredictable.

function makePayoutQueue(p, length) {
  var queue = [];
  var n_reward = Math.round(10 * p);
  while (queue.length < length) {
    var run = [];
    for (var i = 0; i < 10; i++) { run.push(i < n_reward ? 1 : 0); }
    queue = queue.concat(jsPsych.randomization.shuffle(run));
  }
  return queue;
}

function makeQueues() {
  var len = CONFIG.free_trials_per_block + CONFIG.forced_trials_per_block;
  return CONFIG.reward_probs.map(function (p) { return makePayoutQueue(p, len); });
}

// kept for compatibility with the original code's variable names
var face_queues = makeQueues();
var place_queues = makeQueues();
