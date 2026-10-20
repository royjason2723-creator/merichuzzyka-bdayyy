const $ = (id) => document.getElementById(id);
const screens = ["lockScreen","welcomeScreen","giftScreen","memoriesScreen","letterScreen","cakeScreen","finalScreen"];
function showScreen(id){screens.forEach(s=>$(s).classList.toggle("active",s===id));window.scrollTo({top:0,behavior:"smooth"});}
let entered = "";
const dots = [...document.querySelectorAll("#dots span")];
function updateDots(){dots.forEach((d,i)=>d.classList.toggle("filled",i<entered.length));}
function tryCode(){if(entered==="2008"){showScreen("welcomeScreen");entered="";updateDots();}else{$("lockHint").textContent="Not quite! Try again, birthday detective 💗";entered="";updateDots();}}
document.querySelectorAll("#keypad [data-num]").forEach(b=>b.addEventListener("click",()=>{if(entered.length<4){entered+=b.dataset.num;updateDots();if(entered.length===4)setTimeout(tryCode,220);}}));
document.querySelector('[data-action="clear"]').addEventListener("click",()=>{entered=entered.slice(0,-1);updateDots();});
document.querySelector('[data-action="enter"]').addEventListener("click",tryCode);
$("yesBtn").addEventListener("click",()=>showScreen("giftScreen"));
$("noBtn").addEventListener("click",()=>{$("welcomeHint").textContent="Hehe, the surprise will wait… but it's too cute to miss 🙈💗";});
$("giftBox").addEventListener("click",()=>{$("giftBox").classList.add("hidden");$("giftHint").textContent="Surprise unlocked! A whole scrapbook made just for you 💖";$("memoriesBtn").classList.remove("hidden");confetti();});
$("memoriesBtn").addEventListener("click",()=>showScreen("memoriesScreen"));
$("backGiftBtn").addEventListener("click",()=>showScreen("giftScreen"));
$("letterBtn").addEventListener("click",()=>showScreen("letterScreen"));
$("backMemoriesBtn").addEventListener("click",()=>showScreen("memoriesScreen"));
$("cakeBtn").addEventListener("click",()=>showScreen("cakeScreen"));
document.querySelectorAll(".candle").forEach(c=>c.addEventListener("click",()=>{c.textContent="✨";c.disabled=true;if([...document.querySelectorAll(".candle")].every(x=>x.disabled)){$("wishMessage").textContent="Wish sent to the universe! May this year bring you so much happiness. 💗";confetti();}}));
$("finalBtn").addEventListener("click",()=>{showScreen("finalScreen");confetti();});
$("restartBtn").addEventListener("click",()=>showScreen("lockScreen"));
function confetti(){for(let i=0;i<28;i++){const el=document.createElement("span");el.textContent=["💗","✨","🌸","💕"][Math.floor(Math.random()*4)];el.style.cssText=`position:fixed;z-index:20;left:${Math.random()*100}vw;top:-30px;font-size:${14+Math.random()*18}px;pointer-events:none;transition:transform 2.5s linear,opacity 2.5s linear`;document.body.appendChild(el);requestAnimationFrame(()=>{el.style.transform=`translateY(${70+Math.random()*90}vh) rotate(${Math.random()*260}deg)`;el.style.opacity="0";});setTimeout(()=>el.remove(),2700);}}
const heartLayer=document.querySelector(".floating-hearts");
for(let i=0;i<18;i++){const h=document.createElement("span");h.className="float-heart";h.textContent=["♡","♥","✿"][i%3];h.style.left=(Math.random()*100)+"%";h.style.fontSize=(15+Math.random()*20)+"px";h.style.animationDuration=(9+Math.random()*10)+"s";h.style.animationDelay=(-Math.random()*15)+"s";h.style.color=i%2?"#e36da3":"#c34d83";heartLayer.appendChild(h);}

// Browsers require a user gesture before audio can play. This button uses a gentle built-in tone,
// so no copyrighted music file is bundled. Replace with your own licensed MP3 if preferred.
let audioCtx=null, musicOn=false, musicTimer=null, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
function playNote(){if(!musicOn||!audioCtx)return;const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type="sine";osc.frequency.value=notes[noteIndex++%notes.length];gain.gain.setValueAtTime(0.0001,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(0.045,audioCtx.currentTime+.04);gain.gain.exponentialRampToValueAtTime(0.0001,audioCtx.currentTime+.42);osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+.45);}
$("musicToggle").addEventListener("click",async()=>{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==="suspended")await audioCtx.resume();musicOn=!musicOn;$("musicToggle").textContent=musicOn?"♫ Music: on":"♫ Music: off";if(musicOn){playNote();musicTimer=setInterval(playNote,480);}else{clearInterval(musicTimer);}});
