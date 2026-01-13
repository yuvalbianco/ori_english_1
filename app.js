
const STORAGE_KEY = "ori_vocab_progress_v3";
const MASTERED_CORRECT = 3;      // כמה תשובות נכונות צריך כדי להיחשב "נלמד"
const MASTERED_WRONG_MAX = 0;    // כמה טעויות מותר (0 = בלי טעויות)

function norm(w){ return w.toLowerCase(); }
function load(){ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
function save(p){ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

let progress = load();
WORD_BANK.forEach(w => {
  progress[norm(w.word)] ||= { c: 0, w: 0 };
});

let current = null;
let answered = false;

function masteredFor(key){
  const p = progress[key];
  return (p.c >= MASTERED_CORRECT) && (p.w <= MASTERED_WRONG_MAX);
}

function remainingToMaster(key){
  const p = progress[key];
  return Math.max(0, MASTERED_CORRECT - p.c);
}

function pickWord(){
  // simple bias: words with mistakes appear more often
  const pool = [];
  WORD_BANK.forEach(w => {
    const key = norm(w.word);
    const p = progress[key] || {c:0,w:0};
    const weight = 1 + Math.min(5, p.w); // 1..6
    for(let i=0;i<weight;i++) pool.push(w);
  });
  return pool[Math.floor(Math.random()*pool.length)];
}

function buildGapPrompt(example, word){
  // replace first case-insensitive occurrence with blank
  const re = new RegExp("\\b" + escapeRegExp(word) + "\\b", "i");
  return example.replace(re, "____");
}

function escapeRegExp(s){
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setFeedback(text){
  document.getElementById("feedback").textContent = text || "";
}

function render(){
  answered = false;
  current = pickWord();
  document.getElementById("pill").textContent = "בחר תשובה";
  document.getElementById("stats").textContent = "מילה: " + current.word;
  setFeedback("");

  const mode = document.getElementById("mode").value;
  const ex = current.examples[0];

  if(mode === "gap"){
    document.getElementById("prompt").textContent = buildGapPrompt(ex, current.word);
  } else {
    // choose: show full sentence, ask which word belongs (still multiple choice word selection)
    document.getElementById("prompt").textContent = ex;
  }

  const choices = [current.word, ...WORD_BANK.filter(w => w.word !== current.word).slice(0,3).map(w => w.word)]
    .sort(() => 0.5 - Math.random());

  const cdiv = document.getElementById("choices");
  cdiv.innerHTML = "";
  choices.forEach(ch => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = ch;
    b.onclick = () => answer(ch, b);
    cdiv.appendChild(b);
  });

  updateProgress();
}

function answer(ch, btn){
  if(answered) return;
  answered = true;

  const key = norm(current.word);
  const wasMastered = masteredFor(key);

  if(ch === current.word){
    progress[key].c++;
    document.getElementById("pill").textContent = "נכון";
    btn.classList.add("good");

    const nowMastered = masteredFor(key);
    const left = remainingToMaster(key);

    if(!wasMastered && nowMastered){
      setFeedback("מצוין! המילה נלמדה.");
    } else if(!nowMastered){
      setFeedback(`מצוין! עוד ${left} תשובות נכונות והמילה נלמדת.`);
    } else {
      setFeedback("מצוין!");
    }
  } else {
    progress[key].w++;
    document.getElementById("pill").textContent = "לא נכון";

    // mark chosen wrong and also highlight the correct option
    btn.classList.add("bad");
    [...document.querySelectorAll("#choices .choice")].forEach(b => {
      if(b.textContent === current.word) b.classList.add("good");
    });

    setFeedback("לא נורא, ננסה שוב בהמשך.");
  }

  save(progress);
  updateProgress();
}

function updateProgress(){
  let mastered = 0;
  let review = 0;
  Object.keys(progress).forEach(k => {
    if(masteredFor(k)) mastered++;
    else review++;
  });
  document.getElementById("masteredCount").textContent = mastered;
  document.getElementById("reviewCount").textContent = review;
  document.getElementById("totalCount").textContent = WORD_BANK.length;
}

document.getElementById("nextBtn").onclick = render;

document.getElementById("reset").onclick = () => {
  const ok = window.confirm("איפוס ימחק את כל ההתקדמות במכשיר הזה. בטוחים שתרצו לאפס?");
  if(!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  progress = {};
  WORD_BANK.forEach(w => { progress[norm(w.word)] = { c: 0, w: 0 }; });
  render();
};

render();
