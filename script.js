// ==================================
// SETUP
// ==================================
const stage = document.querySelector('.stage');
const signs = Array.from(document.querySelectorAll('.sign'));
const rand = (min, max) => Math.random() * (max - min) + min;

let recent = []; // avoid picking the same signs back to back

function pickSign() {
  let index;
  do {
    index = Math.floor(Math.random() * signs.length);
  } while (recent.includes(index));
  recent.push(index);
  if (recent.length > 6) recent.shift();
  return signs[index];
}

// ==================================
// ATTENTION EFFECTS
// burst = swell + glow, shout = scale + flash, jolt = quick twitch
// ==================================
const BURST_MIN_LEN = 300;   // ms a burst lasts (min)
const BURST_MAX_LEN = 700;   // ms a burst lasts (max)
const SHOUT_LEN = 550;       // ms a shout lasts (matches the CSS)
const JOLT_LEN = 280;        // ms a jolt lasts (matches the CSS)

function burst(sign) {
  sign.classList.add('is-burst');
  setTimeout(() => sign.classList.remove('is-burst'), rand(BURST_MIN_LEN, BURST_MAX_LEN));
}

function shout(sign) {
  if (sign.matches(':hover')) return; // don't interrupt the sign being hovered
  sign.classList.add('is-shout');
  setTimeout(() => sign.classList.remove('is-shout'), SHOUT_LEN);
}

function jolt(sign) {
  if (sign.matches(':hover')) return;
  sign.classList.add('is-jolt');
  setTimeout(() => sign.classList.remove('is-jolt'), JOLT_LEN);
}

// ==================================
// RANDOM ATTENTION EVENTS
// Every ~0.3–0.65s, 2–4 random signs burst or shout.
// Raise the gaps to calm things down.
// ==================================
const EVENT_MIN_GAP = 300;   // ms between events (min)
const EVENT_MAX_GAP = 650;   // ms between events (max)

function attentionEvent() {
  const howMany = 2 + Math.floor(Math.random() * 3); // 2–4 signs at once
  for (let i = 0; i < howMany; i++) {
    const sign = pickSign();
    if (Math.random() < 0.5) burst(sign);
    else shout(sign);
  }
  setTimeout(attentionEvent, rand(EVENT_MIN_GAP, EVENT_MAX_GAP));
}
setTimeout(attentionEvent, 500);

// ==================================
// CONSTANT TWITCHING
// Every ~0.2–0.45s, 1–2 random signs jolt.
// ==================================
function joltEvent() {
  const howMany = 1 + Math.floor(Math.random() * 2); // 1–2 signs
  for (let i = 0; i < howMany; i++) {
    jolt(signs[Math.floor(Math.random() * signs.length)]);
  }
  setTimeout(joltEvent, rand(200, 450));
}
setTimeout(joltEvent, 800);

// ==================================
// EVERYONE SHOUTS
// Every ~4–6s, all 12 signs shout one after another in random order,
// like a wave of "LOOK AT ME".
// ==================================
function shoutWave() {
  const order = signs.slice().sort(() => Math.random() - 0.5);
  order.forEach((sign, i) => setTimeout(() => shout(sign), i * 100));
  setTimeout(shoutWave, rand(4000, 6000));
}
setTimeout(shoutWave, 2500);

// ==================================
// CHAOTIC VARIATION
// Every ~1.5s, change the animation speed of several signs so the
// motions drift in and out of rhythm. Uses the --speed multiplier
// (1 = original speed, lower = faster), so nothing shifts position.
// ==================================
const SPEED_CHANGE_EVERY = 1500; // ms
const SPEED_RANGE = [0.5, 1.6];

setInterval(() => {
  const howMany = 5 + Math.floor(Math.random() * 4); // 5–8 signs
  for (let i = 0; i < howMany; i++) {
    const sign = signs[Math.floor(Math.random() * signs.length)];
    sign.style.setProperty('--speed', rand(SPEED_RANGE[0], SPEED_RANGE[1]).toFixed(2));
  }
}, SPEED_CHANGE_EVERY);

// ==================================
// CLICK HANDLING
// ==================================

const signNames = {
  1: 'one-way',
  2: 'stop',
  3: 'enter',
  4: 'caution',
  5: 'notice',
  6: 'do-not-enter',
  7: 'exit',
  8: 'wait',
  9: 'walk',
  10: 'keep-left',
  11: 'pull',
  12: 'push'
};

signs.forEach((sign) => {
  sign.addEventListener('click', () => {

    const selectedSign = sign.dataset.sign;
    const signName = signNames[selectedSign];

    console.log(`${signName} clicked`);

    // Highlight selected sign
    signs.forEach((s) => {
      s.classList.remove('is-selected');
    });

    sign.classList.add('is-selected');
    stage.classList.add('has-selection');


    // Go to the ONE interaction page
    // and tell it which sign was clicked
    setTimeout(() => {
  window.location.href =
    `interactions/index.html?sign=${signName}`;
}, 200);

  });
});