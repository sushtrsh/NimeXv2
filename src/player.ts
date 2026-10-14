export const PLAYER_HTML = `<!doctype html>
<html lang="id"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0b0b0f">
<title>NimeXv2</title>
<style>
:root{--bg:#0b0b0f;--surf:#16161d;--card:#1c1c25;--line:#2a2a35;--text:#f5f5f7;--muted:#9a9aa8;--red:#e50914;--red2:#ff3b46;color-scheme:dark}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
[hidden]{display:none!important}
html,body{margin:0}
body{background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding-bottom:calc(30px + env(safe-area-inset-bottom))}
body.lock{overflow:hidden}
button,input,a.btn{font:inherit;color:inherit}
button{cursor:pointer;background:none;border:0;padding:0}
img{display:block}
.wrap{max-width:820px;margin-inline:auto}

.top{position:fixed;top:0;left:0;right:0;z-index:10;padding:calc(8px + env(safe-area-inset-top)) 14px 6px;background:linear-gradient(rgba(0,0,0,.85),rgba(0,0,0,0));transition:background .25s}
.top.solid{background:rgba(11,11,15,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.bar{display:flex;align-items:center;justify-content:space-between;max-width:820px;margin-inline:auto}
.logo{margin:0;font-size:24px;font-weight:900;letter-spacing:-.5px;line-height:1;display:flex;align-items:flex-start}
.logo .n{background:linear-gradient(180deg,var(--red2),var(--red));-webkit-background-clip:text;background-clip:text;color:transparent}
.logo .x{color:#fff}
.logo small{font-size:11px;font-weight:800;color:var(--red2);margin:1px 0 0 3px;letter-spacing:0}
.ibtn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%}
.ibtn:active{background:rgba(255,255,255,.12)}
.ibtn svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round}
.srcs{display:flex;gap:8px;max-width:820px;margin:4px auto 0;overflow-x:auto;scrollbar-width:none}
.srcs::-webkit-scrollbar{display:none}
.chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:5px 14px;font-size:13.5px;white-space:nowrap}
.chip.on{background:#fff;color:#000;border-color:#fff;font-weight:700}

.hero{position:relative;width:100%;max-width:820px;margin-inline:auto;aspect-ratio:3/4;max-height:80vh;overflow:hidden;background:var(--card)}
.hero.sk{background:linear-gradient(90deg,var(--card),var(--line),var(--card));background-size:200% 100%;animation:sh 1.3s infinite}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .7s;pointer-events:none}
.slide.on{opacity:1;pointer-events:auto}
.hbg{width:100%;height:100%;object-fit:cover;object-position:top}
.hshade{position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 3%,rgba(11,11,15,.55) 38%,rgba(11,11,15,0) 62%),linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0) 28%)}
.hc{position:absolute;left:0;right:0;bottom:26px;padding:0 16px;text-align:center}
.hc h2{margin:0 0 6px;font-size:25px;line-height:1.2;text-shadow:0 2px 14px rgba(0,0,0,.8);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.hm{color:#d6d6de;font-size:13px;margin-bottom:12px}
.play{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#000;font-weight:800;border-radius:8px;padding:11px 26px;font-size:16px}
.play:active{opacity:.8}
.play.wide{width:100%;margin-top:4px}
.dots{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;gap:6px}
.dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.35)}
.dots i.on{background:#fff;width:16px;border-radius:3px}

.row{margin:20px 0 0}
.rh{display:flex;align-items:baseline;justify-content:space-between;padding:0 14px;max-width:820px;margin-inline:auto}
.rh h2{margin:0;font-size:17px;font-weight:800}
.all{color:var(--muted);font-size:13px}
.rail{display:flex;gap:8px;overflow-x:auto;padding:10px 14px 4px;scroll-snap-type:x proximity;scrollbar-width:none}
.rail::-webkit-scrollbar{display:none}
.rail .card{flex:0 0 112px;scroll-snap-align:start}
.card{text-align:left;display:block}
.poster{position:relative;aspect-ratio:2/3;border-radius:7px;overflow:hidden;background:var(--card);transition:transform .15s}
.poster img{width:100%;height:100%;object-fit:cover}
.card:active .poster{transform:scale(.96)}
@media (hover:hover){.card:hover .poster{transform:scale(1.05)}}
.badge{position:absolute;left:0;bottom:0;background:var(--red);color:#fff;font-size:11px;font-weight:800;padding:2px 7px;border-radius:0 6px 0 0}
.ct{margin-top:5px;font-size:12.5px;line-height:1.3;color:#d9d9e0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card.sk .poster{background:linear-gradient(90deg,var(--card),var(--line),var(--card));background-size:200% 100%;animation:sh 1.3s infinite}
@keyframes sh{to{background-position:-200% 0}}
.empty{color:var(--muted);font-size:14px;padding:18px 4px}
.retry{margin-left:8px;background:var(--surf);border:1px solid var(--line);border-radius:8px;padding:5px 12px}

.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media (min-width:600px){.grid{grid-template-columns:repeat(4,1fr)}}
.more{display:block;margin:18px auto;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 26px}

.view{position:fixed;inset:0;z-index:20;background:var(--bg);overflow-y:auto;overscroll-behavior:contain}
.vbar{position:sticky;top:0;z-index:4;display:flex;align-items:center;gap:8px;padding:calc(8px + env(safe-area-inset-top)) 10px 8px;background:rgba(11,11,15,.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.vbar .bt{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.vbody{padding:0 14px 40px}
.sbox{display:flex;gap:8px;flex:1}
.sbox input{flex:1;min-width:0;background:var(--surf);border:1px solid var(--line);border-radius:10px;padding:10px 14px;outline:none}
.sbox input:focus{border-color:#fff}
.sbox button{background:var(--red);border-radius:10px;padding:0 16px;font-weight:700}
.smsg{color:var(--muted);font-size:13px;margin:6px 0 12px}

.dhead{position:relative;overflow:hidden;padding:30px 14px 20px;margin-top:-56px}
.dbg{position:absolute;inset:0}
.dbg img{width:100%;height:100%;object-fit:cover;filter:blur(26px) brightness(.5);transform:scale(1.3)}
.dfade{position:absolute;inset:0;background:linear-gradient(rgba(11,11,15,.2),var(--bg))}
.dwrap{position:relative;display:flex;gap:14px;align-items:flex-end;padding-top:60px}
.dposter{width:112px;flex:none;aspect-ratio:2/3;border-radius:8px;overflow:hidden;background:var(--card);box-shadow:0 8px 30px rgba(0,0,0,.6)}
.dposter img{width:100%;height:100%;object-fit:cover}
.dinfo h2{margin:0 0 8px;font-size:20px;line-height:1.25}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.tag{border:1px solid var(--line);border-radius:999px;padding:3px 10px;font-size:12px;color:var(--muted)}
.tag.red{background:var(--red);border-color:var(--red);color:#fff;font-weight:700}
.plot{color:#c9c9d3;font-size:14px;line-height:1.55;margin:14px 0 12px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.plot.open{display:block}
.vbody h3{margin:22px 0 8px;font-size:16px}
.eplist{display:flex;flex-direction:column}
.eprow{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--line);text-align:left;width:100%}
.eprow .en{width:34px;text-align:center;font-size:18px;font-weight:800;color:var(--muted)}
.eprow .et{flex:1;min-width:0;font-size:14.5px}
.eprow .ep-play{width:30px;height:30px;border:1.5px solid #8a8a96;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;padding-left:2px;flex:none}
.eprow.seen .et,.eprow.seen .en{color:var(--muted)}
.eprow.seen .ep-play{background:var(--red);border-color:var(--red);color:#fff}
.eprow:active{background:var(--card)}

.sheet{position:fixed;inset:0;z-index:40;display:flex;align-items:flex-end}
.backdrop{position:absolute;inset:0;background:rgba(0,0,0,.65);animation:fade .2s}
.panel{position:relative;width:100%;max-width:820px;margin-inline:auto;max-height:82vh;overflow-y:auto;background:var(--surf);border-radius:20px 20px 0 0;border:1px solid var(--line);border-bottom:0;padding:8px 16px calc(20px + env(safe-area-inset-bottom));animation:up .25s ease-out}
@keyframes up{from{transform:translateY(40px);opacity:0}}
@keyframes fade{from{opacity:0}}
.grab{width:40px;height:4px;border-radius:2px;background:var(--line);margin:4px auto 10px}
.sh{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.sh h3{margin:0;font-size:16px}
.qchips{display:flex;flex-wrap:wrap;gap:8px}
.qchips .chip{background:var(--card);border-color:var(--line)}
.qchips .chip.on{background:#fff}
.srv{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:11px 12px;margin-top:8px}
.sn b{display:block;font-size:14.5px}
.sn small{color:var(--muted);font-size:12px}
.act{display:flex;gap:6px;flex:none}
.btn{display:inline-flex;align-items:center;justify-content:center;background:var(--surf);border:1px solid var(--line);border-radius:9px;padding:8px 13px;font-size:13.5px;text-decoration:none}
.btn.pri{background:var(--red);border-color:var(--red);color:#fff;font-weight:700}
.hint{color:var(--muted);font-size:12px;line-height:1.5;margin:14px 2px 0}
.toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom));transform:translateX(-50%);background:#fff;color:#000;padding:9px 16px;border-radius:999px;font-size:13.5px;font-weight:600;z-index:60;opacity:0;pointer-events:none;transition:opacity .2s}
.toast.on{opacity:.95}
</style></head><body>

<header id="top" class="top">
  <div class="bar">
    <h1 class="logo"><span class="n">NIME</span><span class="x">X</span><small>v2</small></h1>
    <button id="sbtn" class="ibtn" aria-label="Cari"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg></button>
  </div>
</header>

<main>
  <section id="hero" class="hero sk"></section>
  <div id="rows"></div>
</main>

<section id="all" class="view" hidden>
  <div class="vbar"><button id="allBack" class="ibtn" aria-label="Kembali"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"></path></svg></button><div id="allT" class="bt"></div></div>
  <div class="vbody wrap"><div id="allG" class="grid"></div><button id="allMore" class="more" hidden>Muat lagi</button></div>
</section>

<section id="search" class="view" hidden>
  <div class="vbar">
    <button id="sBack" class="ibtn" aria-label="Kembali"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"></path></svg></button>
    <div class="sbox"><input id="sq" type="search" placeholder="Cari anime..." enterkeyhint="search"><button id="sGo">Cari</button></div>
  </div>
  <div class="vbody wrap"><div id="sMsg" class="smsg"></div><div id="sG" class="grid"></div></div>
</section>

<section id="detail" class="view" hidden>
  <div class="vbar"><button id="dBack" class="ibtn" aria-label="Kembali"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"></path></svg></button><div id="dBar" class="bt"></div></div>
  <div class="dhead">
    <div id="dBg" class="dbg"></div><div class="dfade"></div>
    <div class="dwrap wrap"><div id="dPoster" class="dposter"></div><div class="dinfo"><h2 id="dTitle"></h2><div id="dChips" class="chips"></div></div></div>
  </div>
  <div class="vbody wrap">
    <button id="dPlay" class="play wide" hidden></button>
    <p id="dPlot" class="plot"></p>
    <div id="dGen" class="chips"></div>
    <h3>Episode</h3>
    <div id="dEps" class="eplist"></div>
  </div>
</section>

<div id="sheet" class="sheet" hidden>
  <div id="bd" class="backdrop"></div>
  <div class="panel">
    <div class="grab"></div>
    <div class="sh"><h3 id="sTitle"></h3><button id="sClose" class="ibtn" aria-label="Tutup"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button></div>
    <div id="qChips" class="qchips"></div>
    <div id="sList"></div>
    <p class="hint">Link langsung diputar lewat VLC atau MX Player (tombol VLC, atau Salin lalu tempel di pemutar).</p>
  </div>
</div>
<div id="toast" class="toast"></div>

<script>
var SRC = "otakudesu", SEARCH = null;
function $(id){ return document.getElementById(id); }
function mk(t,c,x){ var e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; }
function api(p){
  return fetch(p).then(function(r){ return r.json().then(function(j){
    if(!r.ok) throw new Error(j.error || r.status);
    return j;
  }); });
}
function store(k,v){
  try{
    if(v===undefined) return JSON.parse(localStorage.getItem(k)||"null");
    localStorage.setItem(k,JSON.stringify(v));
  }catch(e){ return null; }
}
var watched = store("watched") || {};
var recent = store("recent") || [];
var last = store("last") || {};

function big(u){ return u ? u.replace(/-[0-9]+x[0-9]+([.][a-z0-9]+)$/i,"$1") : u; }
function pimg(url, cls, small){
  var i=mk("img",cls||""); i.alt=""; i.referrerPolicy="no-referrer";
  if(!url) return i;
  var b = small ? url : big(url);
  i.src=b;
  if(b!==url){ i.onerror=function(){ i.onerror=null; i.src=url; }; }
  return i;
}
function toast(t){
  var e=$("toast"); e.textContent=t; e.classList.add("on");
  clearTimeout(toast.t); toast.t=setTimeout(function(){ e.classList.remove("on"); },1400);
}
function clean(n){ return (n||"").replace(/ Subtitle Indonesia$/i,""); }

/* ---------- overlay stack + tombol back ---------- */
var STACK = [];
function show(id){
  $(id).hidden=false; STACK.push(id);
  history.pushState({n:STACK.length},"");
  document.body.classList.add("lock");
}
window.onpopstate=function(){
  if(!STACK.length) return;
  $(STACK.pop()).hidden=true;
  if(!STACK.length) document.body.classList.remove("lock");
};
function back(){ history.back(); }
["allBack","sBack","dBack","sClose","bd"].forEach(function(id){ $(id).onclick=back; });
window.addEventListener("scroll",function(){ $("top").classList.toggle("solid", window.scrollY>30); });

/* ---------- kartu + baris ---------- */
function card(it, src, quick){
  var b=mk("button","card");
  var p=mk("div","poster");
  p.appendChild(pimg(it.poster,"",true));
  if(it.episode) p.appendChild(mk("span","badge","Ep "+it.episode));
  b.appendChild(p); b.appendChild(mk("div","ct",it.title));
  b.onclick=function(){ openDetail(it, src, quick); };
  return b;
}
function makeRow(title, onAll){
  var row=mk("section","row"), h=mk("div","rh");
  h.appendChild(mk("h2",null,title));
  if(onAll){ var a=mk("button","all","Semua \u203A"); a.onclick=onAll; h.appendChild(a); }
  var rail=mk("div","rail"); row.appendChild(h); row.appendChild(rail);
  return {el:row, rail:rail};
}
function skel(rail,n){
  for(var i=0;i<n;i++){ var c=mk("div","card sk"); c.appendChild(mk("div","poster")); rail.appendChild(c); }
}

/* ---------- hero ---------- */
var heroItems=[], heroI=0, heroT=null;
function goHero(n){
  var s=document.querySelectorAll("#hero .slide"), d=document.querySelectorAll("#hero .dots i");
  s[heroI].classList.remove("on"); d[heroI].classList.remove("on");
  heroI=n; s[n].classList.add("on"); d[n].classList.add("on");
}
function setHero(items, src){
  heroItems=items.filter(function(i){ return i.poster; }).slice(0,5);
  var h=$("hero"); h.className="hero"; h.replaceChildren();
  clearInterval(heroT);
  if(!heroItems.length){ h.hidden=true; return; }
  h.hidden=false;
  var dots=mk("div","dots");
  heroItems.forEach(function(it,i){
    var s=mk("div","slide"+(i===0 ? " on" : ""));
    s.appendChild(pimg(it.poster,"hbg"));
    s.appendChild(mk("div","hshade"));
    var c=mk("div","hc");
    c.appendChild(mk("h2",null,it.title));
    if(it.episode) c.appendChild(mk("div","hm","Episode "+it.episode));
    var b=mk("button","play","\u25B6  Tonton"); b.onclick=function(){ openDetail(it, src); };
    c.appendChild(b); s.appendChild(c); h.appendChild(s);
    dots.appendChild(mk("i", i===0 ? "on" : ""));
  });
  h.appendChild(dots);
  heroI=0;
  if(heroItems.length>1) heroT=setInterval(function(){ if(!STACK.length) goHero((heroI+1)%heroItems.length); },6000);
}

/* ---------- beranda ---------- */
var homeTok=0;
function loadHome(){
  var tok=++homeTok, src=SRC;
  clearInterval(heroT);
  var hero=$("hero"); hero.hidden=false; hero.className="hero sk"; hero.replaceChildren();
  var rows=$("rows"); rows.replaceChildren();
  if(recent.length){
    var rr=makeRow("Lanjutkan menonton", null);
    recent.forEach(function(it){ rr.rail.appendChild(card(it, it.src || src)); });
    rows.appendChild(rr.el);
  }
  var rNew=makeRow("Episode terbaru", function(){ openAll(src,"ongoing","Episode terbaru"); });
  var rOn=makeRow("Anime Ongoing", function(){ openAll(src,"ongoing","Anime Ongoing"); });
  var rDone=makeRow("Anime Completed", function(){ openAll(src,"complete","Anime Completed"); });
  [rNew,rOn,rDone].forEach(function(r){ rows.appendChild(r.el); skel(r.rail,6); });

  function fill(r, items, quick){
    r.rail.replaceChildren();
    items.forEach(function(it){ r.rail.appendChild(card(it, src, quick)); });
    if(!items.length) r.rail.appendChild(mk("div","empty","Kosong"));
  }
  function fail(r, e){
    r.rail.replaceChildren();
    var m=mk("div","empty","Gagal memuat: "+e.message+" ");
    var b=mk("button","retry","Coba lagi"); b.onclick=loadHome; m.appendChild(b);
    r.rail.appendChild(m);
  }
  // Satu permintaan untuk dua baris: daftar ongoing Otakudesu sudah urut dari episode terbaru
  api("/"+src+"/home?section=ongoing&page=1").then(function(j){
    if(tok!==homeTok) return;
    fill(rNew, j.items.slice(0,10), true);
    fill(rOn, j.items, false);
    if(j.items.length) setHero(j.items, src); else hero.hidden=true;
  }).catch(function(e){
    if(tok!==homeTok) return;
    fail(rNew, e); fail(rOn, e); hero.hidden=true;
  });
  api("/"+src+"/home?section=complete&page=1").then(function(j){
    if(tok!==homeTok) return;
    fill(rDone, j.items, false);
  }).catch(function(e){ if(tok===homeTok) fail(rDone, e); });
}

/* ---------- semua (grid) ---------- */
var ALL={src:"",key:"",page:1,busy:false};
function openAll(src,key,label){
  ALL={src:src,key:key,page:1,busy:false};
  $("allT").textContent=label; $("allG").replaceChildren(); $("allMore").hidden=true;
  show("all"); loadAll();
}
function loadAll(){
  if(ALL.busy) return;
  var a=ALL; a.busy=true;
  api("/"+a.src+"/home?section="+a.key+"&page="+a.page).then(function(j){
    if(a!==ALL) return;
    var g=$("allG");
    j.items.forEach(function(it){ g.appendChild(card(it, a.src)); });
    $("allMore").hidden=!j.items.length;
    if(!g.children.length) g.appendChild(mk("div","empty","Kosong"));
  }).catch(function(e){ toast("Gagal: "+e.message); }).then(function(){ a.busy=false; });
}
$("allMore").onclick=function(){ ALL.page++; loadAll(); };

/* ---------- cari ---------- */
$("sbtn").onclick=function(){ show("search"); setTimeout(function(){ $("sq").focus(); },60); };
function doSearch(){
  var q=$("sq").value.trim(); if(!q) return;
  var g=$("sG"), tok={}; SEARCH=tok;
  $("sMsg").textContent=""; g.replaceChildren(); skel(g,9);
  $("sq").blur();
  api("/"+SRC+"/search?q="+encodeURIComponent(q)).then(function(j){
    if(SEARCH!==tok) return;
    g.replaceChildren();
    if(!j.items.length){ $("sMsg").textContent="Tidak ada hasil untuk "+q; return; }
    j.items.forEach(function(it){ g.appendChild(card(it, SRC)); });
  }).catch(function(e){
    if(SEARCH!==tok) return;
    g.replaceChildren(); $("sMsg").textContent="Gagal: "+e.message;
  });
}
$("sGo").onclick=doSearch;
$("sq").onkeydown=function(e){ if(e.key==="Enter"){ e.preventDefault(); doSearch(); } };

/* ---------- detail ---------- */
var D=null;
function openDetail(it, src, auto){
  var tok={}; D=tok;
  $("dBg").replaceChildren(); $("dBg").appendChild(pimg(it.poster,"",true));
  $("dPoster").replaceChildren(); $("dPoster").appendChild(pimg(it.poster,""));
  $("dTitle").textContent=it.title; $("dBar").textContent=it.title;
  $("dChips").replaceChildren(); $("dGen").replaceChildren(); $("dEps").replaceChildren();
  $("dPlot").textContent="Memuat..."; $("dPlot").classList.remove("open"); $("dPlay").hidden=true;
  $("detail").scrollTop=0;
  show("detail");
  api("/"+src+"/detail?url="+encodeURIComponent(it.url)).then(function(d){
    if(D!==tok) return;
    var c=$("dChips");
    if(d.status) c.appendChild(mk("span","tag red", d.status==="ongoing" ? "Ongoing" : "Selesai"));
    if(d.year) c.appendChild(mk("span","tag",String(d.year)));
    c.appendChild(mk("span","tag",d.episodes.length+" episode"));
    d.genres.slice(0,8).forEach(function(g){ $("dGen").appendChild(mk("span","tag",g)); });
    $("dPlot").textContent=d.plot || "Belum ada sinopsis.";
    var list=$("dEps"), btns={};
    d.episodes.slice().reverse().forEach(function(ep){
      var b=mk("button","eprow"+(watched[ep.url] ? " seen" : ""));
      b.appendChild(mk("span","en", ep.number!=null ? String(ep.number) : "\u2022"));
      b.appendChild(mk("span","et",clean(ep.name)));
      b.appendChild(mk("span","ep-play","\u25B6"));
      b.onclick=function(){ openEp(ep, d, src, b); };
      btns[ep.url]=b;
      list.appendChild(b);
    });
    if(!d.episodes.length){ list.appendChild(mk("div","empty","Belum ada episode.")); return; }
    var target=d.episodes[0], resume=false;
    d.episodes.forEach(function(ep){ if(ep.url===last[d.url]){ target=ep; resume=true; } });
    var pb=$("dPlay");
    pb.textContent="\u25B6  "+(resume ? "Lanjut " : "Mulai nonton ")+(target.number!=null ? "Ep "+target.number : clean(target.name));
    pb.onclick=function(){ openEp(target, d, src, null); };
    pb.hidden=false;
    // Dari baris "Episode terbaru": langsung buka link episode terbarunya
    if(auto && STACK.indexOf("detail")>=0){
      var latest=d.episodes[d.episodes.length-1];
      if(it.episode!=null){ d.episodes.forEach(function(ep){ if(ep.number===it.episode) latest=ep; }); }
      openEp(latest, d, src, btns[latest.url]);
    }
  }).catch(function(e){ if(D===tok) $("dPlot").textContent="Gagal memuat: "+e.message; });
}
$("dPlot").onclick=function(){ $("dPlot").classList.toggle("open"); };

/* ---------- link episode ---------- */
function vlcIntent(url){
  var u=new URL(url);
  return "intent://"+u.host+u.pathname+u.search+"#Intent;scheme="+u.protocol.replace(":","")+";package=org.videolan.vlc;type=video/*;end";
}
function copy(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){ toast("Link disalin"); }, function(){ prompt("Salin link:", text); });
  } else prompt("Salin link:", text);
}
function srvRow(l){
  var r=mk("div","srv");
  var n=mk("div","sn"); n.appendChild(mk("b",null,l.server));
  n.appendChild(mk("small",null,l.type==="direct" ? "Link langsung" : "Halaman download / embed")); r.appendChild(n);
  var act=mk("div","act");
  if(l.type==="direct"){
    var v=mk("a","btn pri","VLC"); v.href=vlcIntent(l.url); act.appendChild(v);
  } else {
    var o=mk("a","btn pri","Buka"); o.href=l.url; o.target="_blank"; o.rel="noopener noreferrer"; act.appendChild(o);
  }
  var c=mk("button","btn","Salin"); c.onclick=function(){ copy(l.url); }; act.appendChild(c);
  r.appendChild(act); return r;
}
function openEp(ep, d, src, btn){
  watched[ep.url]=1; store("watched",watched); if(btn) btn.classList.add("seen");
  last[d.url]=ep.url; store("last",last);
  recent=recent.filter(function(r){ return r.url!==d.url; });
  recent.unshift({src:src, title:d.title, url:d.url, poster:d.poster});
  recent=recent.slice(0,15); store("recent",recent);

  $("sTitle").textContent = d.title+" - "+(ep.number!=null ? "Ep "+ep.number : clean(ep.name));
  $("qChips").replaceChildren(); $("sList").replaceChildren();
  $("sList").appendChild(mk("div","empty","Memuat link..."));
  show("sheet");
  api("/"+src+"/links?url="+encodeURIComponent(ep.url)).then(function(j){
    var groups={}, order=[];
    j.links.filter(function(l){ return /^https?:/.test(l.url); }).forEach(function(l){
      var k=(l.quality||0)+"|"+(l.format||"");
      if(!groups[k]){ groups[k]={q:l.quality||0, f:l.format||"", items:[]}; order.push(k); }
      groups[k].items.push(l);
    });
    order.sort(function(a,b){ return (groups[b].q-groups[a].q) || groups[a].f.localeCompare(groups[b].f); });
    var list=$("sList"); list.replaceChildren();
    if(!order.length){ list.appendChild(mk("div","empty","Tidak ada link untuk episode ini.")); return; }
    function hasDirect(k){ return groups[k].items.some(function(l){ return l.type==="direct"; }); }
    var pick=order[0];
    order.forEach(function(k){ if(hasDirect(k) && groups[k].f==="mp4" && groups[k].q===720) pick=k; });
    if(!hasDirect(pick)){
      for(var i=0;i<order.length;i++){ if(hasDirect(order[i])){ pick=order[i]; break; } }
    }
    var chips=$("qChips");
    function render(k){
      Array.prototype.forEach.call(chips.children,function(c){ c.classList.toggle("on", c.getAttribute("data-k")===k); });
      list.replaceChildren();
      groups[k].items.slice().sort(function(a,b){ return (a.type==="direct" ? 0 : 1)-(b.type==="direct" ? 0 : 1); })
        .forEach(function(l){ list.appendChild(srvRow(l)); });
    }
    order.forEach(function(k){
      var g=groups[k];
      var label = (g.q ? g.q+"p" : "")+(g.f ? (g.q ? " " : "")+g.f.toUpperCase() : "");
      var c=mk("button","chip",label || "Server");
      c.setAttribute("data-k",k); c.onclick=function(){ render(k); }; chips.appendChild(c);
    });
    render(pick);
  }).catch(function(e){
    var list=$("sList"); list.replaceChildren(); list.appendChild(mk("div","empty","Gagal memuat: "+e.message));
  });
}

/* ---------- mulai ---------- */
loadHome();
</script></body></html>`;
