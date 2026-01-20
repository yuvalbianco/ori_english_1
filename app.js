
const STORE_KEY = "ori_all_games_progress_v2";
let MASTERED_CORRECT = 1;
const WRONG_PENALTY_THRESHOLD = 2;
let CORRECT_FOR_THEME = 5;

// ========== SOUND FX SYSTEM ==========
const SUCCESS_SOUNDS = [
  'background_themes/sound_fx/success/15105%20male%20group%20joy%20win%20shout.wav',
  'background_themes/sound_fx/success/32500%20Cartoon%20group%20shout%20hooray-full.wav',
  'background_themes/sound_fx/success/Approve%20Glow%20Celebratory.wav',
  'background_themes/sound_fx/success/Award%20Happy.wav',
  'background_themes/sound_fx/success/Cartoon%20Cute%20Celebration%20Hee%20Hee%20Hee.wav',
  'background_themes/sound_fx/success/Celebration%20Woohoo.wav',
  'background_themes/sound_fx/success/Character%20Celebrates.wav',
  'background_themes/sound_fx/success/Character%20Happy%20Yeahs.wav',
  'background_themes/sound_fx/success/Female%20Celebrating%20Woohoo.wav',
  'background_themes/sound_fx/success/Happy%20Win%20Game.wav',
  'background_themes/sound_fx/success/Man%20Celebratory%20Yes.wav',
  'background_themes/sound_fx/success/Positive%20Celebration.wav',
  'background_themes/sound_fx/success/wow-423653.mp3'
];

const FAIL_SOUNDS = [
  'background_themes/sound_fx/failed/Access%20Fail.wav',
  'background_themes/sound_fx/failed/App%20Fail.wav',
  'background_themes/sound_fx/failed/Cartoon%20Failure.wav',
  'background_themes/sound_fx/failed/Descending%20Game%20Failure.wav',
  'background_themes/sound_fx/failed/Fail%2005.wav',
  'background_themes/sound_fx/failed/Game%20Fail.wav',
  'background_themes/sound_fx/failed/Musical%20Fail.wav',
  'background_themes/sound_fx/failed/Platform%20Fail.wav',
  'background_themes/sound_fx/failed/Player%20Fail.wav',
  'background_themes/sound_fx/failed/Unfortunate%20Fail.wav'
];

const WINNING_SOUNDS = [
  'background_themes/sound_fx/winning/Congratulations%20Youre%20A%20Winner.wav',
  'background_themes/sound_fx/winning/Victory.wav',
  'background_themes/sound_fx/winning/Winner%20Announcement.wav',
  'background_themes/sound_fx/winning/Winning.wav',
  'background_themes/sound_fx/winning/Winning_2.wav'
];

let currentAudio = null;

// Sound pool system - non-repeating sounds until all played
let soundPools = {
  success: [],
  fail: [],
  winning: []
};

function createSoundPool(soundArray) {
  return [...soundArray].sort(() => Math.random() - 0.5);
}

function playSoundFromPool(poolKey, soundArray) {
  // Stop any currently playing sound
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Refill pool if empty
  if (!soundPools[poolKey] || soundPools[poolKey].length === 0) {
    soundPools[poolKey] = createSoundPool(soundArray);
  }

  // Pick and remove from pool
  const sound = soundPools[poolKey].pop();

  currentAudio = new Audio(sound);
  currentAudio.volume = 0.5;
  currentAudio.play().catch(e => console.log('Audio play failed:', e));
}

function playSuccessSound() { playSoundFromPool('success', SUCCESS_SOUNDS); }
function playFailSound() { playSoundFromPool('fail', FAIL_SOUNDS); }
function playWinningSound() { playSoundFromPool('winning', WINNING_SOUNDS); }

// ========== THEME SYSTEM ==========
const THEMES = [
  {
    name: "Stranger Things",
    bgColor: "#0B0B0B",
    bgImage: "url('background_themes/stranger_things/stranger%20things%20wallpaper1.jpg')",
    bgImageiPad: "url('background_themes/stranger_things/stranger_things_ipad.png')",
    cardBg: "rgba(11,11,11,0.85)",
    cardBorder: "#6A040F",
    primary: "#B1060F",
    primaryGlow: "#E50914",
    secondary: "#1F3C88",
    accent: "#2EC4B6",
    text: "#f0e6e6",
    textMuted: "#a89999",
    inputBg: "#1a0a0a",
    success: "#2EC4B6",
    error: "#E50914"
  },
  {
    name: "Simpsons",
    bgColor: "#70D1FE",
    bgImage: "url('background_themes/simpsons/simpsons.jpg')",
    bgImageiPad: "url('background_themes/simpsons/simpsons_ipad.png')",
    cardBg: "rgba(255,217,15,0.9)",
    cardBorder: "#000000",
    primary: "#FFD90F",
    primaryGlow: "#FFEB3B",
    secondary: "#009DDC",
    accent: "#3FAF2A",
    text: "#000000",
    textMuted: "#333333",
    inputBg: "#FFFFFF",
    success: "#3FAF2A",
    error: "#E01B24"
  },
  {
    name: "Powerpuff Girls",
    bgColor: "#FFB6C9",
    bgImage: "url('background_themes/power_puff_girls/power_puff_girls.jpg')",
    bgImageiPad: "url('background_themes/power_puff_girls/power_puff_ipad.png')",
    cardBg: "rgba(255,102,178,0.85)",
    cardBorder: "#000000",
    primary: "#FF66B2",
    primaryGlow: "#FF99CC",
    secondary: "#66CCFF",
    accent: "#66FF66",
    text: "#000000",
    textMuted: "#333333",
    inputBg: "#FFFFFF",
    success: "#66FF66",
    error: "#FF0033"
  },
  {
    name: "99 Nights Forest",
    bgColor: "#1E252B",
    bgImage: "url('background_themes/ninety_nine_nights_in_the_forest/ninety_nine_forest.webp')",
    bgImageiPad: "url('background_themes/ninety_nine_nights_in_the_forest/ninety_nine_ipad.png')",
    cardBg: "rgba(47,62,43,0.85)",
    cardBorder: "#4F6B3A",
    primary: "#4F6B3A",
    primaryGlow: "#6EEB83",
    secondary: "#A33A3A",
    accent: "#D6C36A",
    text: "#E6E6E6",
    textMuted: "#A0A4A0",
    inputBg: "#2F3E2B",
    success: "#6EEB83",
    error: "#A33A3A"
  },
  {
    name: "Dress to Impress",
    bgColor: "#F7F7F7",
    bgImage: "url('background_themes/dress_to_impress/dress-to-impress.jpg')",
    bgImageiPad: "url('background_themes/dress_to_impress/dress_to_impress_ipad.png')",
    cardBg: "rgba(201,183,226,0.9)",
    cardBorder: "#FF4FA3",
    primary: "#FF4FA3",
    primaryGlow: "#FF79B8",
    secondary: "#C9B7E2",
    accent: "#E6C15A",
    text: "#2B2B2B",
    textMuted: "#555555",
    inputBg: "#FFFFFF",
    success: "#BFF0D4",
    error: "#E53935"
  },
  {
    name: "Brawl Stars",
    bgColor: "#1C2B39",
    bgImage: "url('background_themes/brawl_stars/brawl_stars.jpg')",
    bgImageiPad: "url('background_themes/brawl_stars/brawl_stars_ipad.png')",
    cardBg: "rgba(28,43,57,0.9)",
    cardBorder: "#FFD21E",
    primary: "#FFD21E",
    primaryGlow: "#FFEB3B",
    secondary: "#2EA8FF",
    accent: "#FF3B3B",
    text: "#FFFFFF",
    textMuted: "#B0BEC5",
    inputBg: "#1C2B39",
    success: "#00E676",
    error: "#FF3B3B"
  },
  {
    name: "Back to the Future",
    bgColor: "#0A0A0A",
    bgImage: "url('background_themes/back%20to%20the%20future/back_to_the_future.jpg')",
    bgImageiPad: "url('background_themes/back%20to%20the%20future/back_to_the_future_ipad.png')",
    cardBg: "rgba(10,10,10,0.85)",
    cardBorder: "#FF6A00",
    primary: "#FF6A00",
    primaryGlow: "#FFD23F",
    secondary: "#1F5FFF",
    accent: "#00E5FF",
    text: "#F5F7FA",
    textMuted: "#8A8F98",
    inputBg: "#0A0A0A",
    success: "#2FB7A1",
    error: "#C41E3A"
  },
  {
    name: "Harry Potter",
    bgColor: "#0B0D10",
    bgImage: "url('background_themes/harry%20potter/harry_potter.jpg')",
    cardBg: "rgba(28,37,65,0.85)",
    cardBorder: "#C9A24D",
    primary: "#C9A24D",
    primaryGlow: "#F2E6C9",
    secondary: "#1C2541",
    accent: "#6EC6FF",
    text: "#F2E6C9",
    textMuted: "#7A7F85",
    inputBg: "#0B0D10",
    success: "#1A472A",
    error: "#7F0909"
  },
  {
    name: "Kramel",
    bgColor: "#1F2A44",
    bgImage: "url('background_themes/kramel/kramel.avif')",
    bgImageiPad: "url('background_themes/kramel/kramel_ipad.png')",
    cardBg: "rgba(247,238,220,0.9)",
    cardBorder: "#E07A2D",
    primary: "#E07A2D",
    primaryGlow: "#F4D6B0",
    secondary: "#2F5D50",
    accent: "#D4AF37",
    text: "#1F2A44",
    textMuted: "#7A1F2B",
    inputBg: "#F7EEDC",
    success: "#2F5D50",
    error: "#7A1F2B"
  },
  {
    name: "Toca Boca",
    bgColor: "#FFF2D9",
    bgImage: "url('background_themes/toca%20boca/tocal_boca.webp')",
    bgImageiPad: "url('background_themes/toca%20boca/toca_boca_ipad.png')",
    cardBg: "rgba(91,192,255,0.85)",
    cardBorder: "#FF6FAE",
    primary: "#FF6FAE",
    primaryGlow: "#FFD84D",
    secondary: "#5BC0FF",
    accent: "#B084FF",
    text: "#2A2A2A",
    textMuted: "#555555",
    inputBg: "#FFFFFF",
    success: "#7CFFB2",
    error: "#FF4B4B"
  }
];

let currentThemeIndex = 0;

function applyTheme(index) {
  const theme = THEMES[index];
  const root = document.documentElement;

  root.style.setProperty('--bg-color', theme.bgColor);
  root.style.setProperty('--bg-image', theme.bgImage);
  root.style.setProperty('--bg-image-ipad', theme.bgImageiPad || theme.bgImage);
  root.style.setProperty('--card-bg', theme.cardBg);
  root.style.setProperty('--card-border', theme.cardBorder);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-glow', theme.primaryGlow);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--text', theme.text);
  root.style.setProperty('--text-muted', theme.textMuted);
  root.style.setProperty('--input-bg', theme.inputBg);
  root.style.setProperty('--success', theme.success);
  root.style.setProperty('--error', theme.error);

  // Update theme indicator
  let indicator = document.getElementById('themeIndicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'themeIndicator';
    indicator.className = 'theme-indicator';
    document.body.appendChild(indicator);
  }
  indicator.textContent = theme.name;
}

function nextTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  applyTheme(currentThemeIndex);
}

// ========== END THEME SYSTEM ==========

function norm(w){ return w.toLowerCase(); }
function load(){ return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
function save(s){ localStorage.setItem(STORE_KEY, JSON.stringify(s)); }

let state = load();
state.words ||= {};
GAME_DATA.words.forEach(d => state.words[norm(d.word)] ||= { c:0, w:0 });
state.score ||= 0;
state.streak ||= 0;
state.game ||= "gap";
state.correctUntilTheme ||= CORRECT_FOR_THEME;
state.questionsUntilSwitch ||= Math.floor(Math.random() * 2) + 1; // 1 or 2
// Initialize game counts for fair rotation
if(!state.gameCounts){
  state.gameCounts = {};
  ["gap", "two", "builder", "scramble", "translate"].forEach(g => state.gameCounts[g] = 0);
}
save(state);

let current = null;
let answered = false;

function isLearned(key){
  const p = state.words[key];
  return p && p.c >= MASTERED_CORRECT;
}

function remainingToMaster(key){
  const p = state.words[key];
  return Math.max(0, MASTERED_CORRECT - p.c);
}

function setPill(t){ document.getElementById("pill").textContent = t; }
function setFeedback(t){ document.getElementById("feedback").innerHTML = t || ""; }
function setPrompt(t, ltr = false){
  const el = document.getElementById("prompt");
  el.textContent = t || "";
  el.classList.toggle('ltr', ltr);
}
function setAreaHTML(html){ document.getElementById("area").innerHTML = html || ""; }

function showSentenceFeedback(wordHe, sentenceEn, sentenceHe){
  const feedback = document.getElementById("feedback");
  if(!feedback) return;
  const current = feedback.innerHTML;
  const sentenceInfo = `<div class="sentence-feedback">
    <div>המילה <strong>"${wordHe}"</strong> נבחרה בצורה נכונה.</div>
    <div>המשפט המלא: <span dir="ltr">${sentenceEn}</span></div>
    <div>בעברית: ${sentenceHe}</div>
  </div>`;
  feedback.innerHTML = current + sentenceInfo;
}

function updateMeta(){
  document.getElementById("score").textContent = "נקודות: " + (state.score||0);
  document.getElementById("streak").textContent = "רצף: " + (state.streak||0);
}

function updateThemeCounter(){
  const counter = document.getElementById("themeCounter");
  if (!counter) return;
  const left = state.correctUntilTheme || CORRECT_FOR_THEME;
  if (left === 1) {
    counter.textContent = "עוד תשובה נכונה אחת והפתעה מעניינת תופיע";
  } else {
    counter.textContent = `עוד ${left} תשובות נכונות והפתעה מעניינת תופיע`;
  }
}

function setNextButtonEnabled(enabled){
  const btn = document.getElementById("nextBtn");
  if(btn){
    btn.disabled = !enabled;
    btn.style.opacity = enabled ? "1" : "0.5";
    btn.style.cursor = enabled ? "pointer" : "not-allowed";
  }
}

const CELEBRATION_GIFS = [
  'background_themes/gifs/200.gif',
  'background_themes/gifs/200w.gif',
  'background_themes/gifs/3754015qw6uosnxu5.gif',
  'background_themes/gifs/918e4a9a2f47418cba2f16f4ef7282be.gif',
  'background_themes/gifs/f2ab1af79d72d94a114bc9fe5a891835.gif',
  'background_themes/gifs/giphy.gif',
  'background_themes/gifs/giphy%20(1).gif',
  'background_themes/gifs/giphy%20(2).gif',
  'background_themes/gifs/giphy%20(3).gif',
  'background_themes/gifs/love-you.gif',
  'background_themes/gifs/osmo-ion.gif',
  'background_themes/gifs/panda-gemoy.gif',
  'background_themes/gifs/salute-buzz-lightyear.gif',
  'background_themes/gifs/sleepover-hooray.gif',
  'background_themes/gifs/source.gif',
  'background_themes/gifs/source%20(1).gif',
  'background_themes/gifs/woody-woodpecker-twerk.gif'
];

// Surprise pool system - contains both theme indices and GIF paths
function createSurprisePool(){
  // Surprise pool now only contains GIFs (no themes)
  const pool = [...CELEBRATION_GIFS];
  // Shuffle the pool
  return pool.sort(() => Math.random() - 0.5);
}

function triggerSurprise(){
  // Initialize pool if empty, not exists, or contains invalid data (old theme indices)
  if(!state.surprisePool || state.surprisePool.length === 0 ||
     typeof state.surprisePool[0] === 'number' ||
     (typeof state.surprisePool[0] === 'string' && !state.surprisePool[0].includes('/'))){
    state.surprisePool = createSurprisePool();
  }

  // Pick and remove from pool (GIFs only now)
  const gifPath = state.surprisePool.pop();
  save(state);
  showCelebrationGif(gifPath);
}

function showCelebrationGif(gifPath){
  const popup = document.getElementById('gifPopup');
  const img = document.getElementById('gifImage');
  if (!popup || !img) return;

  // Add cache-busting parameter to force reload
  img.src = gifPath + '?t=' + Date.now();

  // Show popup
  popup.classList.remove('hidden', 'hide');
  popup.classList.add('show');

  // Hide after 2.5 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hide');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 300);
  }, 2500);
}

// Check if all words are learned
function allWordsLearned() {
  return GAME_DATA.words.every(d => {
    const key = norm(d.word);
    return isLearned(key);
  });
}

// Show winning screen when all words are learned
function showWinningScreen() {
  playWinningSound();
  const screen = document.getElementById('winningScreen');
  if (!screen) return;

  screen.classList.remove('hidden');
  screen.classList.add('show');

  // Add confetti animation
  createConfetti();
}

function hideWinningScreen() {
  const screen = document.getElementById('winningScreen');
  if (!screen) return;
  screen.classList.remove('show');
  screen.classList.add('hidden');
}

// Simple confetti effect
function createConfetti() {
  const screen = document.getElementById('winningScreen');
  if (!screen) return;

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    screen.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Check for game completion after word is learned
function checkGameCompletion() {
  if (allWordsLearned()) {
    setTimeout(() => {
      showWinningScreen();
    }, 1500);
    return true;
  }
  return false;
}

function updateWordsTable(){
  const container = document.getElementById("wordsTableContainer");
  if (!container) return;

  // Hide count column when MASTERED_CORRECT is 1
  const showCountColumn = MASTERED_CORRECT > 1;

  let html = `<table class="words-table">
    <thead>
      <tr>
        <th>מילה</th>
        ${showCountColumn ? '<th>נכון</th>' : ''}
        <th>נלמד</th>
      </tr>
    </thead>
    <tbody>`;

  GAME_DATA.words.forEach(d => {
    const key = norm(d.word);
    const p = state.words[key] || {c:0, w:0};
    const learned = p.c >= MASTERED_CORRECT;
    html += `<tr class="${learned ? 'learned' : ''}">
      <td class="word-cell">${d.word}</td>
      ${showCountColumn ? `<td class="count-cell">${Math.min(p.c, MASTERED_CORRECT)}/${MASTERED_CORRECT}</td>` : ''}
      <td class="status-cell">${learned ? '✓' : '✗'}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function instructionsFor(game){
  if(game==="gap") return "השלמת משפט — בוחרים את המילה שחסרה במשפט (4 אפשרויות).";
  if(game==="two") return "שני משפטים — בוחרים את המשפט שבו המילה משמשת נכון.";
  if(game==="builder") return "בניית משפט — לחצו על חלקים כדי לבנות משפט בסדר נכון (בלי הקלדה).";
  if(game==="scramble") return "אותיות מבולבלות — סדרו את האותיות כדי לאיית את המילה באנגלית.";
  if(game==="translate") return "תרגום נכון — בחרו את המשפט באנגלית שמתאים לתרגום העברי.";
  return "";
}

function setGame(game){
  state.game = game;
  save(state);
  document.getElementById("instructions").textContent = instructionsFor(game);
  setFeedback("");
  render();
}

function onCorrect(wordKey){
  playSuccessSound();
  const wasLearned = isLearned(wordKey);
  state.words[wordKey].c++;
  state.words[wordKey].w = 0; // Reset wrong counter on correct
  state.score = (state.score||0) + 10;
  state.streak = (state.streak||0) + 1;

  const nowLearned = isLearned(wordKey);
  const left = remainingToMaster(wordKey);

  // Find the original word (with correct casing)
  const originalWord = GAME_DATA.words.find(w => norm(w.word) === wordKey)?.word || wordKey;

  // Surprise counter - decrement on every correct answer
  state.correctUntilTheme = (state.correctUntilTheme || CORRECT_FOR_THEME) - 1;
  let surpriseTriggered = false;
  if(state.correctUntilTheme <= 0){
    triggerSurprise();
    state.correctUntilTheme = CORRECT_FOR_THEME;
    surpriseTriggered = true;
  }

  // Word learned - show feedback (no surprise gif here, only from combo counter)
  if(nowLearned && !wasLearned){
    setFeedback(`מצוין! המילה "${originalWord}" נלמדה! 🎉`);
    // Check if all words are learned
    checkGameCompletion();
  } else if(!nowLearned){
    if(surpriseTriggered){
      setFeedback(`מצוין! עוד ${left} תשובות נכונות והמילה "${originalWord}" נלמדת. 🎉`);
    } else {
      setFeedback(`מצוין! עוד ${left} תשובות נכונות והמילה "${originalWord}" נלמדת.`);
    }
  } else {
    if(surpriseTriggered){
      setFeedback("מצוין! 🎉");
    } else {
      setFeedback("מצוין!");
    }
  }

  save(state);
  updateMeta();
  updateWordsTable();
  updateThemeCounter();
}

function onWrong(wordKey, explanation, correctAnswer){
  playFailSound();
  state.words[wordKey].w++;
  state.streak = 0;

  // Don't reset surprise counter on wrong answer - keep progress

  // Build feedback message with explanation
  let feedbackMsg = "לא נכון. ";
  if(explanation){
    feedbackMsg += explanation;
  } else if(correctAnswer){
    feedbackMsg += `התשובה הנכונה היא: ${correctAnswer}`;
  } else {
    feedbackMsg += "ננסה שוב בהמשך.";
  }
  setFeedback(feedbackMsg);

  save(state);
  updateMeta();
  updateWordsTable();
  updateThemeCounter();
}

// Get unlearned words only
function getUnlearnedWords(dataArray, wordField = 'word'){
  return dataArray.filter(item => {
    const key = norm(item[wordField]);
    return !isLearned(key);
  });
}

function pickGap(){
  const unlearned = getUnlearnedWords(GAME_DATA.gap);
  if(unlearned.length === 0){
    return null; // All words learned!
  }
  const pool = [];
  unlearned.forEach(q => {
    const key = norm(q.word);
    const p = state.words[key] || {c:0,w:0};
    const weight = 1 + Math.min(5, p.w);
    for(let i=0;i<weight;i++) pool.push(q);
  });
  return pool[Math.floor(Math.random()*pool.length)];
}

function renderGap(){
  answered=false;
  setNextButtonEnabled(false);
  // Show theme counter in this game
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "";
  const q = pickGap();
  if(!q){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }
  current = { type:"gap", q };
  setPill("בחר תשובה");
  setPrompt(q.question, true);
  setFeedback("");
  setAreaHTML(`<div class="grid2" id="gapChoices"></div>`);
  const box = document.getElementById("gapChoices");
  q.choices.forEach(ch => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = ch;
    b.onclick = () => answerGap(ch, b);
    box.appendChild(b);
  });
}

function answerGap(choice, btn){
  if(answered) return;
  answered=true;
  setNextButtonEnabled(true);
  const q = current.q;
  const key = norm(q.word);
  if(choice === q.answer){
    setPill("נכון");
    btn.classList.add("good");
    onCorrect(key);
    // Show sentence feedback
    const fullSentence = q.question.replace("____", q.answer);
    showSentenceFeedback(q.hint_he, fullSentence, q.question_he);
  } else {
    setPill("לא נכון");
    btn.classList.add("bad");
    [...document.querySelectorAll("#gapChoices .choice")].forEach(b => {
      if(b.textContent === q.answer) b.classList.add("good");
    });
    // Build detailed Hebrew explanation
    // Look up the Hebrew meaning of the wrong word chosen
    const wrongWordData = GAME_DATA.words.find(w => norm(w.word) === norm(choice));
    const wrongWordHe = wrongWordData ? wrongWordData.hint_he : choice;
    const explanation = `המילה הנכונה היא ${q.answer} שאומרת "${q.hint_he}"; והמשפט צריך להיות: "${q.question_he}", אתה בחרת במילה "${choice}" שאומרת "${wrongWordHe}" ולא מתאימה במקרה הזה`;
    onWrong(key, explanation, q.answer);
  }
}

function pickTwo(){
  const unlearned = getUnlearnedWords(GAME_DATA.two);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderTwo(){
  answered=false;
  setNextButtonEnabled(false);
  // Show theme counter in this game
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "";
  const item = pickTwo();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }
  current = { type:"two", item };
  setPill("בחר תשובה");
  setPrompt("Word: " + item.word, true);
  setFeedback("");
  setAreaHTML(`
    <div class="grid2" id="twoChoices">
      <button class="choice" id="twoA"></button>
      <button class="choice" id="twoB"></button>
    </div>
    <div class="instructions" style="margin-top:10px">${item.explain_he}</div>
  `);
  const a = document.getElementById("twoA");
  const b = document.getElementById("twoB");
  const correctFirst = Math.random() < 0.5;
  a.textContent = correctFirst ? item.correct : item.wrong;
  b.textContent = correctFirst ? item.wrong : item.correct;
  a.onclick = ()=>answerTwo(correctFirst, a);
  b.onclick = ()=>answerTwo(!correctFirst, b);
}

function answerTwo(isCorrect, btn){
  if(answered) return;
  answered=true;
  setNextButtonEnabled(true);
  const item = current.item;
  const key = norm(item.word);
  if(isCorrect){
    setPill("נכון");
    btn.classList.add("good");
    onCorrect(key);
    // Show sentence feedback - look up hint_he from words array
    const wordData = GAME_DATA.words.find(w => norm(w.word) === key);
    const hintHe = wordData ? wordData.hint_he : item.word;
    showSentenceFeedback(hintHe, item.correct, item.correct_he);
  } else {
    setPill("לא נכון");
    btn.classList.add("bad");
    [...document.querySelectorAll("#twoChoices .choice")].forEach(b=>{
      if(b.textContent === item.correct) b.classList.add("good");
    });
    // Build detailed Hebrew explanation
    const wrongHe = item.wrong_he || item.wrong;
    const explanation = `בחרת במשפט "${wrongHe}" - זהו משפט לא נכון תחבירית. המשפט הנכון הוא "${item.correct}" שאומר "${item.correct_he}"`;
    onWrong(key, explanation, item.correct);
  }
}

function pickBuilder(){
  const unlearned = getUnlearnedWords(GAME_DATA.builder);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderBuilder(){
  answered=false;
  setNextButtonEnabled(false);
  // Show theme counter in this game
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "";
  const item = pickBuilder();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }
  current = { type:"builder", item, built: [] };
  setPill("בנו משפט");
  setPrompt("סדרו את החלקים כדי ליצור את המשפט:");
  setFeedback("");

  const tokens = [...item.tokens];
  const shuffled = tokens.map(t=>({t,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.t);

  setAreaHTML(`
    <div class="builderSlots" id="slots"></div>
    <div style="height:10px"></div>
    <div class="tileRow" id="tiles"></div>
  `);

  const slots = document.getElementById("slots");
  const tiles = document.getElementById("tiles");

  function countIn(arr,v){ return arr.filter(x=>x===v).length; }

  function renderSlots(){
    slots.innerHTML="";
    current.built.forEach((tok, idx)=>{
      const s=document.createElement("button");
      s.className="slotItem";
      s.textContent=tok;
      s.title="לחצו כדי להחזיר";
      s.onclick=()=>{ current.built.splice(idx,1); renderSlots(); renderTiles(); };
      slots.appendChild(s);
    });
  }
  function renderTiles(){
    tiles.innerHTML="";
    shuffled.forEach(tok=>{
      const used = countIn(current.built,tok) >= countIn(tokens,tok);
      const b=document.createElement("button");
      b.className="tile"+(used?" used":"");
      b.textContent=tok;
      b.disabled=used;
      b.onclick=()=>{ current.built.push(tok); renderSlots(); renderTiles(); };
      tiles.appendChild(b);
    });
    // Enable next button only when all tiles are placed
    setNextButtonEnabled(current.built.length === tokens.length);
  }
  renderSlots(); renderTiles();
}

function answerBuilder(){
  if(answered) return;
  answered=true;
  const item = current.item;
  const built=current.built.join(" ");
  const target=item.tokens.join(" ");
  const key=norm(item.word);
  if(built===target){
    setPill("נכון");
    onCorrect(key);
    // Show sentence feedback - look up hint_he from words array
    const wordData = GAME_DATA.words.find(w => norm(w.word) === key);
    const hintHe = wordData ? wordData.hint_he : item.word;
    showSentenceFeedback(hintHe, item.sentence, item.sentence_he);
  } else {
    setPill("לא נכון");
    // Build detailed Hebrew explanation
    const explanation = `המשפט הנכון הוא "${item.sentence}" שפירושו "${item.sentence_he}", אתה כתבת "${built}" שאינו נכון תחבירית`;
    onWrong(key, explanation, item.sentence);
  }
}

// ========== WORD SCRAMBLE GAME ==========
function pickScramble(){
  const unlearned = getUnlearnedWords(GAME_DATA.words);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderScramble(){
  answered=false;
  setNextButtonEnabled(false);
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "";
  const item = pickScramble();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }
  const word = item.word;
  const letters = word.split("");
  const shuffled = [...letters].sort(() => Math.random() - 0.5);
  // Make sure it's actually shuffled (not same as original)
  if(shuffled.join("") === word && letters.length > 1){
    shuffled.reverse();
  }

  current = { type:"scramble", item, word, letters, built: [] };
  setPill("סדרו אותיות");
  setPrompt(`המילה בעברית: "${item.hint_he}"`);
  setFeedback("");

  setAreaHTML(`
    <div class="builderSlots" id="scrambleSlots"></div>
    <div style="height:10px"></div>
    <div class="tileRow" id="scrambleTiles"></div>
  `);

  const slots = document.getElementById("scrambleSlots");
  const tiles = document.getElementById("scrambleTiles");

  function renderSlots(){
    slots.innerHTML="";
    current.built.forEach((letter, idx)=>{
      const s=document.createElement("button");
      s.className="slotItem";
      s.textContent=letter;
      s.title="לחצו כדי להחזיר";
      s.onclick=()=>{ current.built.splice(idx,1); renderSlots(); renderTiles(); };
      slots.appendChild(s);
    });
  }

  function renderTiles(){
    tiles.innerHTML="";
    // Track which shuffled indices are used
    const usedIndices = [];
    current.built.forEach((letter, builtIdx) => {
      // Find the first unused index in shuffled that matches this letter
      for(let i = 0; i < shuffled.length; i++){
        if(shuffled[i] === letter && !usedIndices.includes(i)){
          usedIndices.push(i);
          break;
        }
      }
    });

    shuffled.forEach((letter, idx)=>{
      const used = usedIndices.includes(idx);
      const b=document.createElement("button");
      b.className="tile"+(used?" used":"");
      b.textContent=letter;
      b.disabled=used;
      b.onclick=()=>{
        current.built.push(letter);
        renderSlots();
        renderTiles();
      };
      tiles.appendChild(b);
    });
    // Enable next button only when all letters are placed
    setNextButtonEnabled(current.built.length === letters.length);
  }
  renderSlots(); renderTiles();
}

function answerScramble(){
  if(answered) return;
  answered=true;
  const item = current.item;
  const built = current.built.join("");
  const target = current.word;
  const key = norm(item.word);
  if(built === target){
    setPill("נכון");
    setNextButtonEnabled(true);
    onCorrect(key);
    // Show feedback with example and Hebrew translation
    const example = item.examples && item.examples[0] ? item.examples[0] : "";
    if(example){
      // Look up Hebrew translation from gap data
      const gapItem = GAME_DATA.gap.find(g => {
        const fullSentence = g.question.replace("____", g.answer);
        return fullSentence.toLowerCase() === example.toLowerCase();
      });
      const exampleHe = gapItem ? gapItem.question_he : "";
      if(exampleHe){
        setFeedback(`המילה ${target} נכתבה נכון. לדוגמא: ${example} שאומרת "${exampleHe}"`);
      } else {
        setFeedback(`המילה ${target} נכתבה נכון. לדוגמא: ${example}`);
      }
    } else {
      setFeedback(`המילה ${target} נכתבה נכון.`);
    }
  } else {
    setPill("לא נכון");
    setNextButtonEnabled(true);
    const explanation = `האיות הנכון הוא "${target}", אתה כתבת "${built}"`;
    onWrong(key, explanation, target);
  }
}

// ========== HEBREW TO ENGLISH TRANSLATION GAME ==========
function pickTranslate(){
  const unlearned = getUnlearnedWords(GAME_DATA.gap);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderTranslate(){
  answered=false;
  setNextButtonEnabled(false);
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "";
  const item = pickTranslate();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }

  // Get the correct sentence
  const correctSentence = item.question.replace("____", item.answer);
  const hebrewSentence = item.question_he;

  // Generate wrong options by finding other sentences (with their Hebrew translations)
  const otherItems = GAME_DATA.gap.filter(g => g.word !== item.word);
  const shuffledOthers = otherItems.sort(() => Math.random() - 0.5);
  const wrongOptionsData = shuffledOthers.slice(0, 2).map(g => ({
    english: g.question.replace("____", g.answer),
    hebrew: g.question_he
  }));

  // Build options map for lookup (english -> hebrew)
  const optionsMap = {};
  optionsMap[correctSentence] = hebrewSentence;
  wrongOptionsData.forEach(opt => {
    optionsMap[opt.english] = opt.hebrew;
  });

  // Combine and shuffle options
  const allOptions = [correctSentence, ...wrongOptionsData.map(o => o.english)];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  current = { type:"translate", item, correctSentence, hebrewSentence, optionsMap };
  setPill("בחר תרגום");
  setPrompt(`תרגמו לאנגלית: "${hebrewSentence}"`);
  setFeedback("");

  setAreaHTML(`<div class="grid1" id="translateChoices"></div>`);
  const box = document.getElementById("translateChoices");
  shuffledOptions.forEach(option => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = option;
    b.onclick = () => answerTranslate(option, b);
    box.appendChild(b);
  });
}

function answerTranslate(choice, btn){
  if(answered) return;
  answered=true;
  setNextButtonEnabled(true);
  const item = current.item;
  const key = norm(item.word);
  if(choice === current.correctSentence){
    setPill("נכון");
    btn.classList.add("good");
    onCorrect(key);
    showSentenceFeedback(item.hint_he, current.correctSentence, current.hebrewSentence);
  } else {
    setPill("לא נכון");
    btn.classList.add("bad");
    [...document.querySelectorAll("#translateChoices .choice")].forEach(b => {
      if(b.textContent === current.correctSentence) b.classList.add("good");
    });
    // Get Hebrew translation for the wrong choice
    const chosenHebrew = current.optionsMap[choice] || choice;
    const explanation = `בחרת "${choice}" שפירושו "${chosenHebrew}". התרגום הנכון הוא "${current.correctSentence}" שפירושו "${current.hebrewSentence}"`;
    onWrong(key, explanation, current.correctSentence);
  }
}

function newMemoryGame(){
  // Only use unlearned words for memory game
  const unlearned = getUnlearnedWords(GAME_DATA.memory);
  if(unlearned.length === 0){
    memory.deck = [];
    return;
  }
  const sampleSize = Math.min(8, unlearned.length);
  const sample = [...unlearned].sort(()=>0.5-Math.random()).slice(0, sampleSize);
  const deck=[];
  sample.forEach(p=>{
    // Look up hint_he from words array
    const wordData = GAME_DATA.words.find(w => norm(w.word) === norm(p.word));
    const hintHe = wordData ? wordData.hint_he : p.word;
    deck.push({type:"word", id:p.id, text:p.word, wordKey: norm(p.word), sentence: p.sentence, sentence_he: p.sentence_he, hint_he: hintHe});
    deck.push({type:"sentence", id:p.id, text:p.sentence, wordKey: norm(p.word), sentence: p.sentence, sentence_he: p.sentence_he, hint_he: hintHe});
  });
  deck.sort(()=>0.5-Math.random());
  memory.deck=deck; memory.open=[]; memory.matched=new Set(); memory.waitingForClick=false;
}

function renderMemory(){
  answered=false;
  current={type:"memory"};
  setPill("זיכרון");
  setPrompt("מצאו זוג מתאים: מילה ↔ משפט");
  setFeedback("");
  // Hide theme counter in memory game (surprise only on puzzle completion)
  const themeCounter = document.getElementById("themeCounter");
  if(themeCounter) themeCounter.style.display = "none";

  if(!memory.deck.length) newMemoryGame();

  if(memory.deck.length === 0){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    setNextButtonEnabled(true);
    return;
  }

  // Disable next button until memory game is complete
  const isComplete = memory.matched.size === memory.deck.length;
  setNextButtonEnabled(isComplete);

  setAreaHTML(`<div class="memoryGrid" id="memGrid"></div>`);
  const grid=document.getElementById("memGrid");

  memory.deck.forEach((card, idx)=>{
    const isMatched = memory.matched.has(idx);
    const isOpen = memory.open.includes(idx);
    const div=document.createElement("div");
    div.className="memCard"+(isOpen?" open":"")+(isMatched?" matched":"");
    div.textContent=(isOpen||isMatched)?card.text:"?";
    div.onclick=()=>{
      if(memory.waitingForClick) return;
      if(isMatched) return;
      if(memory.open.includes(idx)) return;
      if(memory.open.length===2) return;
      memory.open.push(idx);
      renderMemory();
      if(memory.open.length===2){
        const [a,b]=memory.open;
        const ca=memory.deck[a], cb=memory.deck[b];
        if(ca.id===cb.id && ca.type!==cb.type){
          playSuccessSound();
          memory.matched.add(a); memory.matched.add(b);
          state.score=(state.score||0)+15;
          state.streak=(state.streak||0)+1;

          const wordKey = ca.wordKey;
          const wasLearned = isLearned(wordKey);
          state.words[wordKey].c++;
          state.words[wordKey].w = 0;
          const nowLearned = isLearned(wordKey);

          // Show feedback for correct match
          if(nowLearned && !wasLearned){
            setFeedback("מצוין! המילה נלמדה! 🎉");
            // Check if all words are learned
            checkGameCompletion();
          } else {
            setFeedback("מצוין! זוג נכון.");
          }
          // Show sentence feedback
          showSentenceFeedback(ca.hint_he, ca.sentence, ca.sentence_he);

          // Add click instruction and make feedback clickable
          const feedbackEl = document.getElementById("feedback");
          feedbackEl.innerHTML += '<div class="click-to-continue">לחץ כאן או Enter להמשיך</div>';
          feedbackEl.classList.add("clickable");

          save(state); updateMeta(); updateWordsTable(); updateThemeCounter();
          memory.open=[];

          // Check if puzzle is complete - only then trigger surprise
          if(memory.matched.size===memory.deck.length){
            triggerSurprise();
            setFeedback("כל הכבוד! סיימתם סבב! 🎉 לחץ הבא כדי להמשיך");
            setNextButtonEnabled(true);
          } else {
            // Wait for user to click feedback or press Enter to continue
            memory.waitingForClick = true;
            const continueGame = () => {
              feedbackEl.onclick = null;
              feedbackEl.classList.remove("clickable");
              document.removeEventListener("keydown", handleEnter);
              memory.waitingForClick = false;
              renderMemory();
            };
            const handleEnter = (e) => {
              if(e.key === "Enter") continueGame();
            };
            feedbackEl.onclick = continueGame;
            document.addEventListener("keydown", handleEnter);
          }
        } else {
          playFailSound();
          state.streak=0;
          setFeedback("לא מתאים. נסו שוב.");
          save(state); updateMeta();
          setTimeout(()=>{ memory.open=[]; renderMemory(); },650);
        }
      }
    };
    grid.appendChild(div);
  });
}

// Auto game switching logic
const ALL_GAMES = ["gap", "two", "builder", "scramble", "translate"];

function switchGameIfNeeded(){
  // Initialize game play counts if not exists
  if(!state.gameCounts){
    state.gameCounts = {};
    ALL_GAMES.forEach(g => state.gameCounts[g] = 0);
  }

  // Increment count for current game
  state.gameCounts[state.game] = (state.gameCounts[state.game] || 0) + 1;

  // Decrement questions until switch
  state.questionsUntilSwitch = (state.questionsUntilSwitch || 1) - 1;

  // Time to switch games
  if(state.questionsUntilSwitch <= 0){
    // Find games that can be played (not more than 2 ahead of the minimum)
    const counts = ALL_GAMES.map(g => state.gameCounts[g] || 0);
    const minCount = Math.min(...counts);

    // Games that are eligible: played at most minCount + 1 times (allowing 2 consecutive max)
    // But we should switch to a DIFFERENT game
    const currentGame = state.game;
    const eligibleGames = ALL_GAMES.filter(g => {
      const count = state.gameCounts[g] || 0;
      // Can play if not more than 1 ahead of minimum, and it's not the current game
      return count <= minCount + 1 && g !== currentGame;
    });

    // If no eligible games (shouldn't happen), fall back to any other game
    const candidates = eligibleGames.length > 0 ? eligibleGames : ALL_GAMES.filter(g => g !== currentGame);

    // Pick randomly from candidates
    const newGame = candidates[Math.floor(Math.random() * candidates.length)];
    state.game = newGame;
    document.getElementById("gameSelect").value = newGame;

    // Reset counter: next switch in 1 or 2 questions
    state.questionsUntilSwitch = Math.floor(Math.random() * 2) + 1;
  }

  save(state);
}

function render(){
  updateMeta(); updateWordsTable(); updateThemeCounter();
  // Use state.game as the source of truth
  const g = state.game || "gap";
  // Sync dropdown to match state
  document.getElementById("gameSelect").value = g;
  save(state);
  document.getElementById("instructions").textContent=instructionsFor(g);

  if(g==="gap") return renderGap();
  if(g==="two") return renderTwo();
  if(g==="builder") return renderBuilder();
  if(g==="scramble") return renderScramble();
  if(g==="translate") return renderTranslate();
}

document.getElementById("gameSelect").addEventListener("change", e=>setGame(e.target.value));

document.getElementById("nextBtn").onclick=()=>{
  // Handle builder game - click Next to submit answer
  if(state.game==="builder"){
    if(!answered) return answerBuilder();
  }
  // Handle scramble game - click Next to submit answer
  if(state.game==="scramble"){
    if(!answered) return answerScramble();
  }
  // Switch games after an answer was given
  if(answered){
    switchGameIfNeeded();
  }
  render();
};

document.getElementById("resetBtn").onclick=()=>{
  const ok=window.confirm("איפוס ימחק את כל ההתקדמות במכשיר הזה (נקודות, רצף והיסטוריית תשובות). בטוחים שתרצו לאפס?");
  if(!ok) return;
  localStorage.removeItem(STORE_KEY);
  const initialGameCounts = {};
  ALL_GAMES.forEach(g => initialGameCounts[g] = 0);
  state={score:0, streak:0, game: ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)], words:{}, correctUntilTheme: CORRECT_FOR_THEME, surprisePool: createSurprisePool(), questionsUntilSwitch: Math.floor(Math.random() * 2) + 1, gameCounts: initialGameCounts};
  GAME_DATA.words.forEach(d=> state.words[norm(d.word)]={c:0,w:0});
  // Keep current theme on reset (don't change)
  save(state);
  render();
};

// Play again button handler
document.getElementById("playAgainBtn").onclick = () => {
  hideWinningScreen();
  // Reset all progress
  localStorage.removeItem(STORE_KEY);
  const initialGameCounts = {};
  ALL_GAMES.forEach(g => initialGameCounts[g] = 0);
  state = {score:0, streak:0, game: ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)], words:{}, correctUntilTheme: CORRECT_FOR_THEME, surprisePool: createSurprisePool(), questionsUntilSwitch: Math.floor(Math.random() * 2) + 1, gameCounts: initialGameCounts};
  GAME_DATA.words.forEach(d => state.words[norm(d.word)] = {c:0, w:0});
  // Keep current theme on play again (don't change)
  save(state);
  render();
};

// ========== ADMIN HACK - 3 clicks on "אורי" in 5 seconds ==========
let adminClicks = [];
let adminControlsVisible = false;
const ADMIN_CLICK_COUNT = 3;
const ADMIN_CLICK_TIMEOUT = 5000; // 5 seconds

document.getElementById("adminTrigger").onclick = () => {
  const now = Date.now();
  // Remove clicks older than 5 seconds
  adminClicks = adminClicks.filter(t => now - t < ADMIN_CLICK_TIMEOUT);
  adminClicks.push(now);

  if(adminClicks.length >= ADMIN_CLICK_COUNT){
    // Toggle hidden admin controls
    adminControlsVisible = !adminControlsVisible;
    document.getElementById("gameSelect").style.display = adminControlsVisible ? "" : "none";
    document.getElementById("surpriseSelect").style.display = adminControlsVisible ? "" : "none";
    document.getElementById("learnedSelect").style.display = adminControlsVisible ? "" : "none";
    adminClicks = []; // Reset
  }
};

// ========== THEME SELECTOR ==========
const themeSelect = document.getElementById("themeSelect");
THEMES.forEach((theme, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = theme.name;
  themeSelect.appendChild(option);
});
themeSelect.value = currentThemeIndex;
themeSelect.onchange = () => {
  currentThemeIndex = parseInt(themeSelect.value);
  applyTheme(currentThemeIndex);
};

// ========== SURPRISE TIMING SELECTOR (1-15) ==========
const surpriseSelect = document.getElementById("surpriseSelect");
for(let i = 1; i <= 15; i++){
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `הפתעה כל ${i} תשובות`;
  surpriseSelect.appendChild(option);
}
surpriseSelect.value = CORRECT_FOR_THEME;
surpriseSelect.onchange = () => {
  CORRECT_FOR_THEME = parseInt(surpriseSelect.value);
  state.correctUntilTheme = CORRECT_FOR_THEME;
  save(state);
  updateThemeCounter();
};

// ========== LEARNED THRESHOLD SELECTOR (1-10) ==========
function updateLearnedNote(){
  const note = document.getElementById("learnedNote");
  if(note){
    // Hide the note when MASTERED_CORRECT is 1
    if(MASTERED_CORRECT === 1){
      note.textContent = '';
      note.style.display = 'none';
    } else {
      note.textContent = `${MASTERED_CORRECT} תשובות נכונות = המילה נלמדה.`;
      note.style.display = '';
    }
  }
}

const learnedSelect = document.getElementById("learnedSelect");
for(let i = 1; i <= 10; i++){
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `${i} תשובות ללמידה`;
  learnedSelect.appendChild(option);
}
learnedSelect.value = MASTERED_CORRECT;
learnedSelect.onchange = () => {
  MASTERED_CORRECT = parseInt(learnedSelect.value);
  save(state);
  updateLearnedNote();
  updateWordsTable();
};

// Initialize
document.getElementById("gameSelect").value = state.game || "gap";
applyTheme(currentThemeIndex);
updateLearnedNote();
render();
