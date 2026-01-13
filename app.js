
const STORE_KEY = "ori_all_games_progress_v1";
const MASTERED_CORRECT = 3;
const MASTERED_WRONG_MAX = 0;

function norm(w){ return w.toLowerCase(); }
function load(){ return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
function save(s){ localStorage.setItem(STORE_KEY, JSON.stringify(s)); }

let state = load();
state.words ||= {};
GAME_DATA.words.forEach(d => state.words[norm(d.word)] ||= { c:0, w:0 });
state.score ||= 0;
state.streak ||= 0;
state.game ||= "gap";
save(state);

let current = null;
let answered = false;
let memory = { deck: [], open: [], matched: new Set() };

function masteredFor(key){
  const p = state.words[key];
  return (p.c >= MASTERED_CORRECT) && (p.w <= MASTERED_WRONG_MAX);
}
function remainingToMaster(key){
  const p = state.words[key];
  return Math.max(0, MASTERED_CORRECT - p.c);
}

function setPill(t){ document.getElementById("pill").textContent = t; }
function setFeedback(t){ document.getElementById("feedback").textContent = t || ""; }
function setHint(t){ document.getElementById("hint").textContent = t || ""; }
function setPrompt(t){ document.getElementById("prompt").textContent = t || ""; }
function setAreaHTML(html){ document.getElementById("area").innerHTML = html || ""; }

function updateMeta(){
  document.getElementById("score").textContent = "נקודות: " + (state.score||0);
  document.getElementById("streak").textContent = "רצף: " + (state.streak||0);
}
function updateProgressBox(){
  const keys = Object.keys(state.words);
  let mastered=0, review=0;
  keys.forEach(k => masteredFor(k) ? mastered++ : review++);
  document.getElementById("masteredCount").textContent = mastered;
  document.getElementById("reviewCount").textContent = review;
  document.getElementById("totalCount").textContent = GAME_DATA.words.length;
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
  setHint("");
  setFeedback("");
  render();
}

function onCorrect(wordKey){
  state.score = (state.score||0) + 10;
  state.streak = (state.streak||0) + 1;
  const left = remainingToMaster(wordKey);
  const nowMastered = masteredFor(wordKey);
  if(nowMastered && left===0 && state.words[wordKey].w===0 && state.words[wordKey].c===MASTERED_CORRECT){
    setFeedback("מצוין! המילה נלמדה.");
  } else if(!nowMastered){
    setFeedback(`מצוין! עוד ${left} תשובות נכונות והמילה נלמדת.`);
  } else {
    setFeedback("מצוין!");
  }
}
function onWrong(){
  state.streak = 0;
  setFeedback("לא נורא, ננסה שוב בהמשך.");
}

function pickGap(){
  const pool = [];
  GAME_DATA.gap.forEach(q => {
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
  current = { type:"gap", q };
  setPill("בחר תשובה");
  setPrompt(q.question);
  setHint("");
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
    state.words[key].c++;
    setPill("נכון");
    btn.classList.add("good");
    onCorrect(key);
  } else {
    state.words[key].w++;
    setPill("לא נכון");
    btn.classList.add("bad");
    [...document.querySelectorAll("#gapChoices .choice")].forEach(b => {
      if(b.textContent === q.answer) b.classList.add("good");
    });
    onWrong();
  }
  save(state);
  updateMeta();
  updateProgressBox();
}

function renderTwo(){
  answered=false;
  const item = GAME_DATA.two[Math.floor(Math.random()*GAME_DATA.two.length)];
  current = { type:"two", item };
  setPill("בחר תשובה");
  setPrompt("Word: " + item.word);
  setHint("");
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
  const key = norm(current.item.word);
  if(isCorrect){
    state.words[key].c++;
    setPill("נכון");
    btn.classList.add("good");
    onCorrect(key);
  } else {
    state.words[key].w++;
    setPill("לא נכון");
    btn.classList.add("bad");
    [...document.querySelectorAll("#twoChoices .choice")].forEach(b=>{
      if(b.textContent === current.item.correct) b.classList.add("good");
    });
    onWrong();
  }
  save(state);
  updateMeta();
  updateProgressBox();
}

function pickBuilder(){
  return GAME_DATA.builder[Math.floor(Math.random()*GAME_DATA.builder.length)];
}

function renderBuilder(){
  answered=false;
  const item = pickBuilder();
  current = { type:"builder", item, built: [] };
  setPill("בנו משפט");
  setPrompt("סדרו את החלקים כדי ליצור את המשפט:");
  setHint("");
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
  const built=current.built.join(" ");
  const target=current.item.tokens.join(" ");
  const key=norm(current.item.word);
  if(built===target){
    state.words[key].c++;
    setPill("נכון");
    onCorrect(key);
  } else {
    state.words[key].w++;
    setPill("לא נכון");
    onWrong();
    setFeedback("לא נורא. המשפט הנכון הוא: " + current.item.sentence);
  }
  save(state); updateMeta(); updateProgressBox();
}

function newMemoryGame(){
  const sample=[...GAME_DATA.memory].sort(()=>0.5-Math.random()).slice(0,8);
  const deck=[];
  sample.forEach(p=>{
    deck.push({type:"word", id:p.id, text:p.word});
    deck.push({type:"sentence", id:p.id, text:p.sentence});
  });
  deck.sort(()=>0.5-Math.random());
  memory.deck=deck; memory.open=[]; memory.matched=new Set();
}

function renderMemory(){
  answered=false;
  current={type:"memory"};
  setPill("זיכרון");
  setPrompt("מצאו זוג מתאים: מילה ↔ משפט");
  setHint(""); setFeedback("");
  if(!memory.deck.length) newMemoryGame();
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
          setFeedback("מצוין! זוג נכון.");
          const word=(ca.type==="word")?ca.text:cb.text;
          const key=norm(word);
          state.words[key].c++;
          save(state); updateMeta(); updateProgressBox();
          memory.open=[];
          if(memory.matched.size===memory.deck.length){
            setFeedback("כל הכבוד! סיימתם סבב. מתחילים סבב חדש.");
            newMemoryGame();
          }
          setTimeout(()=>renderMemory(),450);
        } else {
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

function render(){
  updateMeta(); updateProgressBox();
  const g=document.getElementById("gameSelect").value;
  state.game=g; save(state);
  document.getElementById("instructions").textContent=instructionsFor(g);

  if(g==="gap") return renderGap();
  if(g==="two") return renderTwo();
  if(g==="builder") return renderBuilder();
  if(g==="memory") return renderMemory();
}

document.getElementById("gameSelect").addEventListener("change", e=>setGame(e.target.value));

document.getElementById("hintBtn").onclick=()=>{
  if(!current) return;
  let word="";
  if(current.type==="gap") word=current.q.word;
  if(current.type==="two") word=current.item.word;
  if(current.type==="builder") word=current.item.word;
  if(current.type==="memory") { setHint("נסו לזכור: מילה מתאימה למשפט שמשתמש בה."); return; }
  const h=GAME_DATA.words.find(x=>x.word===word)?.hint_he || "";
  setHint(h ? ("רמז: " + h) : "אין רמז למילה הזו.");
};

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
  state={score:0, streak:0, game:document.getElementById("gameSelect").value, words:{}};
  GAME_DATA.words.forEach(d=> state.words[norm(d.word)]={c:0,w:0});
  memory={deck:[], open:[], matched:new Set()};
  save(state);
  render();
};

document.getElementById("gameSelect").value = state.game || "gap";
render();
