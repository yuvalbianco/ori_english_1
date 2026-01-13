/* Ori – English Words Game (no spelling needed) */
const STORAGE_KEY = "ori_vocab_progress_v1";

function normWord(w){ return w.trim().toLowerCase(); }

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function initProgress(bank) {
  const p = loadProgress();
  let changed = false;
  for (const item of bank) {
    const key = normWord(item.word);
    if (!p[key]) { p[key] = { correct: 0, wrong: 0, seen: 0, lastSeen: 0 }; changed = true; }
  }
  if (changed) saveProgress(p);
  return p;
}

function nowTs(){ return Date.now(); }

function scoreFor(item, stats) {
  // Higher = show sooner
  // Prioritize words with wrong answers, and not seen recently.
  const wrong = stats.wrong || 0;
  const correct = stats.correct || 0;
  const seen = stats.seen || 0;
  const recencyPenalty = Math.min(1, (nowTs() - (stats.lastSeen||0)) / (1000*60*30)); // 0..1 over 30 minutes
  const mastery = correct >= 3 && wrong === 0;
  const base = mastery ? 0.05 : 1.0;
  return base + wrong*2 + (seen===0 ? 2 : 0.5) + recencyPenalty;
}

function pickNext(bank, progress) {
  // Weighted random pick
  const weights = bank.map(it => Math.max(0.01, scoreFor(it, progress[normWord(it.word)])));
  const total = weights.reduce((a,b)=>a+b,0);
  let r = Math.random()*total;
  for (let i=0;i<bank.length;i++){
    r -= weights[i];
    if (r <= 0) return bank[i];
  }
  return bank[bank.length-1];
}

function chooseN(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function buildGapQuestion(item, bank) {
  const example = item.examples[Math.floor(Math.random()*item.examples.length)];
  const w = item.word;
  const re = new RegExp("\\b" + escapeRegExp(w) + "\\b", "i");
  const prompt = example.replace(re, "____");
  // distractors: other words (prefer similar length-ish, but keep simple)
  const pool = bank.filter(x => normWord(x.word) !== normWord(w)).map(x => x.word);
  const distractors = chooseN(pool, 3);
  const choices = chooseN([w, ...distractors], 4);
  return { type:"gap", prompt, answer: w, choices, example };
}

function buildChooseSentenceQuestion(item, bank) {
  // correct sentence from examples + wrong sentence by swapping in another word
  const correct = item.examples[Math.floor(Math.random()*item.examples.length)];
  const w = item.word;

  const pool = bank.filter(x => normWord(x.word) !== normWord(w)).map(x => x.word);
  const other = pool[Math.floor(Math.random()*pool.length)];
  const re = new RegExp("\\b" + escapeRegExp(w) + "\\b", "i");
  let wrong = correct.replace(re, other);

  // If replacement didn't happen (multi-word phrase with punctuation), fallback:
  if (wrong === correct) wrong = "I " + other + " every day.";

  const choices = chooseN([correct, wrong], 2);
  const answer = correct;
  return { type:"choose", prompt: `Which sentence uses “${w}” correctly?`, choices, answer, example: correct };
}

function isMastered(stats){ return (stats.correct >= 3) && (stats.wrong === 0); }
function needsReview(stats){ return stats.wrong > 0 || stats.correct < 3; }

const el = {
  mode: document.getElementById("mode"),
  reset: document.getElementById("reset"),
  pill: document.getElementById("pill"),
  stats: document.getElementById("stats"),
  prompt: document.getElementById("prompt"),
  choices: document.getElementById("choices"),
  nextBtn: document.getElementById("nextBtn"),
  hintBtn: document.getElementById("hintBtn"),
  hint: document.getElementById("hint"),
  masteredCount: document.getElementById("masteredCount"),
  reviewCount: document.getElementById("reviewCount"),
  totalCount: document.getElementById("totalCount"),
  reviewList: document.getElementById("reviewList"),
  exportBtn: document.getElementById("exportBtn"),
  exportOut: document.getElementById("exportOut"),
  importFile: document.getElementById("importFile"),
  importBtn: document.getElementById("importBtn"),
};

let progress = initProgress(WORD_BANK);
let current = null;
let answered = false;

function renderProgress() {
  const keys = Object.keys(progress);
  const mastered = keys.filter(k => isMastered(progress[k])).length;
  const review = keys.filter(k => needsReview(progress[k]) && !isMastered(progress[k])).length;

  el.masteredCount.textContent = String(mastered);
  el.reviewCount.textContent = String(review);
  el.totalCount.textContent = String(WORD_BANK.length);

  // Review list tags
  el.reviewList.innerHTML = "";
  const reviewWords = WORD_BANK
    .map(it => ({ w: it.word, s: progress[normWord(it.word)] }))
    .filter(x => !isMastered(x.s))
    .sort((a,b) => (b.s.wrong - a.s.wrong) || (a.s.correct - b.s.correct));

  for (const item of reviewWords.slice(0, 60)) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.w + ` (✔${item.s.correct} ✖${item.s.wrong})`;
    el.reviewList.appendChild(tag);
  }
}

function setPill(text){ el.pill.textContent = text; }

function clearHint(){ el.hint.textContent = ""; }

function setHint(text){
  el.hint.textContent = text || "Try to understand the sentence context.";
}

function renderQuestion() {
  answered = false;
  clearHint();
  el.nextBtn.disabled = true;

  const mode = el.mode.value;
  const item = pickNext(WORD_BANK, progress);
  current = (mode === "choose")
    ? buildChooseSentenceQuestion(item, WORD_BANK)
    : buildGapQuestion(item, WORD_BANK);

  const stats = progress[normWord(item.word)];
  el.stats.textContent = `Word: “${item.word}” | ✔ ${stats.correct}  ✖ ${stats.wrong}`;
  setPill(mode === "choose" ? "Choose" : "Fill the gap");

  el.prompt.textContent = current.prompt;
  el.choices.innerHTML = "";

  current.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(choice, item.word);
    el.choices.appendChild(btn);
  });
}

function handleAnswer(choice, word) {
  if (answered) return;
  answered = true;

  const key = normWord(word);
  const stats = progress[key];
  stats.seen += 1;
  stats.lastSeen = nowTs();

  const isCorrect = (choice === current.answer);
  if (isCorrect) stats.correct += 1;
  else stats.wrong += 1;

  saveProgress(progress);
  renderProgress();

  // mark buttons
  [...el.choices.querySelectorAll("button")].forEach(btn => {
    const txt = btn.textContent;
    if (txt === current.answer) btn.classList.add("good");
    else if (txt === choice) btn.classList.add("bad");
    btn.disabled = true;
  });

  el.nextBtn.disabled = false;

  if (isCorrect) {
    setPill("Correct");
    setHint("Nice. Example: " + current.example);
  } else {
    setPill("Try again");
    setHint("Correct usage: " + current.example);
  }
}

el.nextBtn.onclick = () => renderQuestion();

el.hintBtn.onclick = () => {
  if (!current) return;
  if (current.type === "gap") {
    setHint("Read the sentence and choose the word that fits best.");
  } else {
    setHint("Pick the sentence that sounds natural and correct.");
  }
};

el.reset.onclick = () => {
  localStorage.removeItem(STORAGE_KEY);
  progress = initProgress(WORD_BANK);
  renderProgress();
  renderQuestion();
};

el.exportBtn.onclick = () => {
  el.exportOut.textContent = JSON.stringify(progress, null, 2);
};

el.importBtn.onclick = async () => {
  const f = el.importFile.files?.[0];
  if (!f) return;
  const txt = await f.text();
  try {
    const obj = JSON.parse(txt);
    // basic validation
    for (const item of WORD_BANK) {
      const key = normWord(item.word);
      if (!obj[key]) throw new Error("Missing word: " + item.word);
    }
    progress = obj;
    saveProgress(progress);
    renderProgress();
    renderQuestion();
    el.exportOut.textContent = "Imported successfully.";
  } catch (e) {
    el.exportOut.textContent = "Import failed: " + (e?.message || e);
  }
};

el.mode.onchange = () => renderQuestion();

// boot
renderProgress();
renderQuestion();
