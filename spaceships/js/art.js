// Drawings for the spaceship task (made for COGS 118D). Everything is SVG, returned as strings.

// A rocket centred on (0, 0), about 100 wide and 200 tall, pointing up
function rocket(body, accent) {
  return '' +
    '<g class="flame"><path d="M-16 78 Q0 128 16 78 Z" fill="#ffb703"/><path d="M-8 78 Q0 108 8 78 Z" fill="#fb5607"/></g>' +
    '<path d="M-30 30 L-52 78 L-24 70 Z" fill="' + accent + '" stroke="#1d1d2b" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M30 30 L52 78 L24 70 Z" fill="' + accent + '" stroke="#1d1d2b" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M0 -98 C34 -66 36 -10 30 74 L-30 74 C-36 -10 -34 -66 0 -98 Z" fill="' + body + '" stroke="#1d1d2b" stroke-width="4"/>' +
    '<path d="M0 -98 C14 -86 22 -72 26 -58 L-26 -58 C-22 -72 -14 -86 0 -98 Z" fill="' + accent + '" stroke="#1d1d2b" stroke-width="3"/>' +
    '<circle cx="0" cy="-18" r="17" fill="#cdeffd" stroke="#1d1d2b" stroke-width="4"/>' +
    '<circle cx="-5" cy="-23" r="5" fill="#ffffff" opacity=".8"/>' +
    '<rect x="-30" y="34" width="60" height="10" fill="' + accent + '" stroke="#1d1d2b" stroke-width="2"/>' +
    '<path d="M0 74 L0 30" stroke="#1d1d2b" stroke-width="3"/>';
}

// An alien centred on (0, 0), about 160 wide
function alien(colour, dark) {
  return '' +
    '<path d="M-48 -54 L-64 -96 L-26 -66 Z" fill="#ffb703" stroke="#1d1d2b" stroke-width="3"/>' +
    '<path d="M48 -54 L64 -96 L26 -66 Z" fill="#ffb703" stroke="#1d1d2b" stroke-width="3"/>' +
    '<path d="M-58 -10 Q-92 20 -78 70" stroke="' + dark + '" stroke-width="18" stroke-linecap="round" fill="none"/>' +
    '<path d="M58 -10 Q92 20 78 70" stroke="' + dark + '" stroke-width="18" stroke-linecap="round" fill="none"/>' +
    '<path d="M-62 -40 C-70 -100 70 -100 62 -40 C76 20 70 92 0 94 C-70 92 -76 20 -62 -40 Z" fill="' + colour + '" stroke="#1d1d2b" stroke-width="4"/>' +
    '<ellipse cx="0" cy="42" rx="30" ry="24" fill="#ffb703" opacity=".9"/>' +
    '<circle cx="-22" cy="-30" r="14" fill="#fff" stroke="#1d1d2b" stroke-width="3"/><circle cx="-19" cy="-28" r="6" fill="#1d1d2b"/>' +
    '<circle cx="22" cy="-30" r="14" fill="#fff" stroke="#1d1d2b" stroke-width="3"/><circle cx="25" cy="-28" r="6" fill="#1d1d2b"/>' +
    '<path d="M-16 0 Q0 14 16 0" stroke="#1d1d2b" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<rect x="-30" y="94" width="18" height="12" rx="4" fill="' + dark + '"/><rect x="12" y="94" width="18" height="12" rx="4" fill="' + dark + '"/>';
}

// A piece of space treasure (a blue crystal), centred on (0, 0), about 36 wide
function treasure() {
  return '<path d="M-14 -16 L14 -16 L22 -4 L0 22 L-22 -4 Z" fill="#6ec6ff" stroke="#0d3b66" stroke-width="3" stroke-linejoin="round"/>' +
         '<path d="M-22 -4 L22 -4 M-6 -16 L-8 -4 L0 22 M6 -16 L8 -4 L0 22" stroke="#0d3b66" stroke-width="1.6" fill="none"/>' +
         '<path d="M-10 -12 L-4 -12 L-6 -6 Z" fill="#fff" opacity=".8"/>';
}

// Backgrounds, 900 x 520. 'earth' for the launch site, 'purple' and 'red' for the planets.
function background(kind) {
  var stars = '';
  var rng = 7;   // fixed pseudo-random star field, so it looks the same on every trial
  for (var i = 0; i < 70; i++) {
    rng = (rng * 9301 + 49297) % 233280;
    var x = Math.round(rng / 233280 * 900);
    rng = (rng * 9301 + 49297) % 233280;
    var y = Math.round(rng / 233280 * 300);
    stars += '<circle cx="' + x + '" cy="' + y + '" r="' + (i % 3 === 0 ? 2 : 1.2) + '" fill="#fff" opacity=".8"/>';
  }
  if (kind === 'earth') {
    return '<defs><linearGradient id="bg-earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03071e"/><stop offset="1" stop-color="#0b2a5b"/></linearGradient>' +
      '<radialGradient id="globe" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#4cc9f0"/><stop offset="1" stop-color="#1d4e89"/></radialGradient></defs>' +
      '<rect width="900" height="520" fill="url(#bg-earth)"/>' + stars +
      '<ellipse cx="450" cy="900" rx="900" ry="470" fill="url(#globe)"/>' +
      '<path d="M120 470 q60 -40 140 -20 t120 10 q30 30 -40 50 h-240 z M560 450 q80 -30 160 -5 t90 30 v45 h-260 z" fill="#52b788" opacity=".85"/>';
  }
  var c = kind === 'purple' ? ['#240046', '#7b2cbf', '#9d4edd', '#c77dff'] : ['#370617', '#9d0208', '#dc2f02', '#f48c06'];
  return '<defs><linearGradient id="bg-' + kind + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs>' +
    '<rect width="900" height="520" fill="url(#bg-' + kind + ')"/>' + stars +
    '<circle cx="760" cy="90" r="46" fill="' + c[3] + '" opacity=".55"/>' +
    '<path d="M0 400 Q120 360 240 392 T480 384 T720 396 T900 380 V520 H0 Z" fill="' + c[2] + '"/>' +
    '<path d="M0 440 Q160 410 320 438 T640 430 T900 444 V520 H0 Z" fill="' + c[1] + '" opacity=".8"/>' +
    '<ellipse cx="180" cy="470" rx="40" ry="9" fill="' + c[0] + '" opacity=".5"/><ellipse cx="690" cy="476" rx="54" ry="11" fill="' + c[0] + '" opacity=".5"/>';
}

// The stakes cue: a gold "5×" or a blue "1×" badge, centred on (0, 0)
function stakesBadge(stake, scale) {
  var hi = stake > 1;
  return '<g transform="scale(' + (scale || 1) + ')">' +
    '<rect x="-56" y="-40" width="112" height="80" rx="16" fill="' + (hi ? '#ffb703' : '#3a86ff') + '" stroke="#fff" stroke-width="5"/>' +
    '<text x="0" y="17" text-anchor="middle" font-size="50" font-weight="bold" font-family="Helvetica, Arial, sans-serif" fill="' + (hi ? '#3d2600' : '#fff') + '">' + stake + '×</text></g>';
}

var SHIP_COLOURS = [['#2ec4b6', '#0b6e66'], ['#ff9f1c', '#b35c00'], ['#90be6d', '#43722a'], ['#ffd60a', '#a68a00']];
var PLANET_ART = {1: {name: 'purple', alien: ['#9d4edd', '#5a189a']}, 2: {name: 'red', alien: ['#e5383b', '#9d0208']}};
