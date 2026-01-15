
const STORE_KEY = "ori_all_games_progress_v2";
const MASTERED_CORRECT = 3;
const WRONG_PENALTY_THRESHOLD = 2;
const CORRECT_FOR_THEME = 10;

// ========== THEME SYSTEM ==========
const THEMES = [
  {
    name: "Stranger Things",
    bgColor: "#0B0B0B",
    bgImage: "url('background_themes/stranger_things/stranger%20things%20wallpaper1.jpg')",
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
save(state);

let current = null;
let answered = false;
let memory = { deck: [], open: [], matched: new Set() };

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
function setPrompt(t){ document.getElementById("prompt").textContent = t || ""; }
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

const CELEBRATION_GIFS = [
  'background_themes/gifs/200.gif',
  'background_themes/gifs/200w.gif',
  'background_themes/gifs/3754015qw6uosnxu5.gif',
  'background_themes/gifs/918e4a9a2f47418cba2f16f4ef7282be.gif',
  'background_themes/gifs/f2ab1af79d72d94a114bc9fe5a891835.gif',
  'background_themes/gifs/giphy.gif',
  'background_themes/gifs/giphy (1).gif',
  'background_themes/gifs/giphy (2).gif',
  'background_themes/gifs/giphy (3).gif',
  'background_themes/gifs/love-you.gif',
  'background_themes/gifs/osmo-ion.gif',
  'background_themes/gifs/panda-gemoy.gif',
  'background_themes/gifs/salute-buzz-lightyear.gif',
  'background_themes/gifs/sleepover-hooray.gif',
  'background_themes/gifs/source.gif',
  'background_themes/gifs/source (1).gif',
  'background_themes/gifs/woody-woodpecker-twerk.gif'
];

// Surprise pool system - contains both theme indices and GIF paths
function createSurprisePool(){
  const pool = [];
  // Add all theme indices
  for(let i = 0; i < THEMES.length; i++){
    pool.push({ type: 'theme', value: i });
  }
  // Add all GIFs
  CELEBRATION_GIFS.forEach(gif => {
    pool.push({ type: 'gif', value: gif });
  });
  // Shuffle the pool
  return pool.sort(() => Math.random() - 0.5);
}

function triggerSurprise(){
  // Initialize pool if empty or not exists
  if(!state.surprisePool || state.surprisePool.length === 0){
    state.surprisePool = createSurprisePool();
  }

  // Pick and remove from pool
  const surprise = state.surprisePool.pop();
  save(state);

  if(surprise.type === 'theme'){
    currentThemeIndex = surprise.value;
    applyTheme(currentThemeIndex);
    return 'theme';
  } else {
    showCelebrationGif(surprise.value);
    return 'gif';
  }
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

function updateWordsTable(){
  const container = document.getElementById("wordsTableContainer");
  if (!container) return;

  let html = `<table class="words-table">
    <thead>
      <tr>
        <th>מילה</th>
        <th>נכון</th>
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
      <td class="count-cell">${Math.min(p.c, MASTERED_CORRECT)}/${MASTERED_CORRECT}</td>
      <td class="status-cell">${learned ? '✓' : '✗'}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function instructionsFor(game){
  if(game==="gap") return "A: השלמת משפט — בוחרים את המילה שחסרה במשפט (4 אפשרויות).";
  if(game==="two") return "B: שני משפטים — בוחרים את המשפט שבו המילה משמשת נכון.";
  if(game==="builder") return "C: בניית משפט — לחצו על חלקים כדי לבנות משפט בסדר נכון (בלי הקלדה).";
  if(game==="memory") return "D: זיכרון — פותחים שני קלפים ומנסים להתאים מילה למשפט.";
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

  // Word learned - also trigger surprise
  if(nowLearned && !wasLearned){
    if(!surpriseTriggered){
      triggerSurprise();
    }
    setFeedback(`מצוין! המילה "${originalWord}" נלמדה! 🎉`);
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

function onWrong(wordKey){
  state.words[wordKey].w++;
  state.streak = 0;

  // Reset theme counter on wrong answer
  state.correctUntilTheme = CORRECT_FOR_THEME;

  // Find the original word (with correct casing)
  const originalWord = GAME_DATA.words.find(w => norm(w.word) === wordKey)?.word || wordKey;

  // Check if we need to deduct a correct point
  if(state.words[wordKey].w >= WRONG_PENALTY_THRESHOLD){
    if(state.words[wordKey].c > 0){
      state.words[wordKey].c--;
      setFeedback(`לא נורא. 2 טעויות = -1 נקודת למידה למילה "${originalWord}". ננסה שוב!`);
    } else {
      setFeedback("לא נורא, ננסה שוב בהמשך.");
    }
    state.words[wordKey].w = 0; // Reset wrong counter
  } else {
    const wrongsLeft = WRONG_PENALTY_THRESHOLD - state.words[wordKey].w;
    setFeedback(`לא נורא. עוד ${wrongsLeft} טעויות ותאבד נקודת למידה למילה "${originalWord}".`);
  }

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
  const q = pickGap();
  if(!q){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    return;
  }
  current = { type:"gap", q };
  setPill("בחר תשובה");
  setPrompt(q.question);
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
    onWrong(key);
  }
}

function pickTwo(){
  const unlearned = getUnlearnedWords(GAME_DATA.two);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderTwo(){
  answered=false;
  const item = pickTwo();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    return;
  }
  current = { type:"two", item };
  setPill("בחר תשובה");
  setPrompt("Word: " + item.word);
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
    onWrong(key);
  }
}

function pickBuilder(){
  const unlearned = getUnlearnedWords(GAME_DATA.builder);
  if(unlearned.length === 0) return null;
  return unlearned[Math.floor(Math.random()*unlearned.length)];
}

function renderBuilder(){
  answered=false;
  const item = pickBuilder();
  if(!item){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
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
    onWrong(key);
    setFeedback("לא נורא. המשפט הנכון הוא: " + item.sentence);
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
    deck.push({type:"word", id:p.id, text:p.word, wordKey: norm(p.word), sentence: p.sentence, sentence_he: p.sentence_he, hint_he: p.hint_he});
    deck.push({type:"sentence", id:p.id, text:p.sentence, wordKey: norm(p.word), sentence: p.sentence, sentence_he: p.sentence_he, hint_he: p.hint_he});
  });
  deck.sort(()=>0.5-Math.random());
  memory.deck=deck; memory.open=[]; memory.matched=new Set();
}

function renderMemory(){
  answered=false;
  current={type:"memory"};
  setPill("זיכרון");
  setPrompt("מצאו זוג מתאים: מילה ↔ משפט");
  setFeedback("");

  if(!memory.deck.length) newMemoryGame();

  if(memory.deck.length === 0){
    setPill("כל הכבוד!");
    setPrompt("למדת את כל המילים! 🎉");
    setFeedback("");
    setAreaHTML("");
    return;
  }

  setAreaHTML(`<div class="memoryGrid" id="memGrid"></div>`);
  const grid=document.getElementById("memGrid");

  memory.deck.forEach((card, idx)=>{
    const isMatched = memory.matched.has(idx);
    const isOpen = memory.open.includes(idx);
    const div=document.createElement("div");
    div.className="memCard"+(isOpen?" open":"")+(isMatched?" matched":"");
    div.textContent=(isOpen||isMatched)?card.text:"?";
    div.onclick=()=>{
      if(isMatched) return;
      if(memory.open.includes(idx)) return;
      if(memory.open.length===2) return;
      memory.open.push(idx);
      renderMemory();
      if(memory.open.length===2){
        const [a,b]=memory.open;
        const ca=memory.deck[a], cb=memory.deck[b];
        if(ca.id===cb.id && ca.type!==cb.type){
          memory.matched.add(a); memory.matched.add(b);
          state.score=(state.score||0)+15;
          state.streak=(state.streak||0)+1;

          const wordKey = ca.wordKey;
          const wasLearned = isLearned(wordKey);
          state.words[wordKey].c++;
          state.words[wordKey].w = 0;
          const nowLearned = isLearned(wordKey);

          // Surprise counter - decrement on every correct match
          state.correctUntilTheme = (state.correctUntilTheme || CORRECT_FOR_THEME) - 1;
          let surpriseTriggered = false;
          if(state.correctUntilTheme <= 0){
            triggerSurprise();
            state.correctUntilTheme = CORRECT_FOR_THEME;
            surpriseTriggered = true;
          }

          // Word learned - also trigger surprise
          if(nowLearned && !wasLearned){
            if(!surpriseTriggered){
              triggerSurprise();
            }
            setFeedback("מצוין! המילה נלמדה! 🎉");
          } else {
            if(surpriseTriggered){
              setFeedback("מצוין! זוג נכון. 🎉");
            } else {
              setFeedback("מצוין! זוג נכון.");
            }
          }
          // Show sentence feedback
          showSentenceFeedback(ca.hint_he, ca.sentence, ca.sentence_he);

          save(state); updateMeta(); updateWordsTable(); updateThemeCounter();
          memory.open=[];

          if(memory.matched.size===memory.deck.length){
            setFeedback("כל הכבוד! סיימתם סבב! 🎉");
            setTimeout(()=>{
              newMemoryGame();
              renderMemory();
            }, 1500);
          } else {
            setTimeout(()=>renderMemory(),450);
          }
        } else {
          state.streak=0;
          state.correctUntilTheme = CORRECT_FOR_THEME; // Reset theme counter on wrong
          setFeedback("לא מתאים. נסו שוב.");
          save(state); updateMeta(); updateThemeCounter();
          setTimeout(()=>{ memory.open=[]; renderMemory(); },650);
        }
      }
    };
    grid.appendChild(div);
  });
}

function render(){
  updateMeta(); updateWordsTable(); updateThemeCounter();
  const g=document.getElementById("gameSelect").value;
  state.game=g; save(state);
  document.getElementById("instructions").textContent=instructionsFor(g);

  if(g==="gap") return renderGap();
  if(g==="two") return renderTwo();
  if(g==="builder") return renderBuilder();
  if(g==="memory") return renderMemory();
}

document.getElementById("gameSelect").addEventListener("change", e=>setGame(e.target.value));

document.getElementById("nextBtn").onclick=()=>{
  if(state.game==="builder"){
    if(!answered) return answerBuilder();
  }
  if(state.game==="memory") newMemoryGame();
  render();
};

document.getElementById("resetBtn").onclick=()=>{
  const ok=window.confirm("איפוס ימחק את כל ההתקדמות במכשיר הזה (נקודות, רצף והיסטוריית תשובות). בטוחים שתרצו לאפס?");
  if(!ok) return;
  localStorage.removeItem(STORE_KEY);
  state={score:0, streak:0, game:document.getElementById("gameSelect").value, words:{}, correctUntilTheme: CORRECT_FOR_THEME, surprisePool: createSurprisePool()};
  GAME_DATA.words.forEach(d=> state.words[norm(d.word)]={c:0,w:0});
  memory={deck:[], open:[], matched:new Set()};
  currentThemeIndex = 0;
  applyTheme(0);
  save(state);
  render();
};

// Initialize
document.getElementById("gameSelect").value = state.game || "gap";
applyTheme(currentThemeIndex);
render();
