// PERSONALIZE: edit the page titles, messages, captions, and photo URLs below.
const chapters = [
 {title:"A little beginning",kind:"collage",heading:"The little things",sub:"the moments that quietly matter",copy:"Some memories don't need a big occasion. They become special simply because of who was there.",photos:[
  ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80","a little moment"],
  ["https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80","one to keep"]
 ]},
 {title:"The things I notice",kind:"collage",heading:"Little things about you",sub:"the details make the story",copy:"Your laugh. The way a normal day gets better. The random conversations that turn into favourite memories. I notice more than I always say.",photos:[
  ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80","flowers for no reason"],
  ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80","golden-hour feelings"]
 ]},
 {title:"A feeling I can't quite name",kind:"single",heading:"A little bit of magic",sub:"some moments just feel different",copy:"Some moments feel like a deep breath, warm light, and being exactly where you're meant to be.",photo:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",caption:"a little peace, a little wonder"},
 {title:"A note for you",kind:"letter",heading:"If you ever forget",sub:"please remember this",copy:"Hey you,<br><br>I made this because a regular message didn't feel like enough. Thank you for being yourself, for the little moments, the silly laughs, and all the memories still waiting for us.<br><br>You matter more than you might realize, and I'm really glad our paths crossed.",sign:"with warmth, ♡"},
 {title:"One last thing",kind:"final",heading:"The simplest truth",sub:"and the last page… for now",copy:"I hope life gives you a thousand reasons to smile. I hope good things find you, even on ordinary days. And I hope we get to make a few more beautiful memories along the way."}
];
let pageIndex=-1; // -1 means the cover is still closed
const $=id=>document.getElementById(id);
function renderPage(slot,idx){
 const el=$(slot); if(idx<0||idx>=chapters.length){el.innerHTML="";return}
 const p=chapters[idx];
 let out=`<span class="sticker top">${idx===4?"♡":"✷"}</span><h3 class="page-title">${p.heading}</h3><p class="page-sub">${p.sub}</p>`;
 if(p.kind==="collage"){
  out+=`<div class="photo-grid">${p.photos.map(([src,cap])=>`<div class="polaroid"><img src="${src}" alt="Scrapbook memory"><span>${cap}</span></div>`).join("")}</div><p class="page-copy">${p.copy}</p>`;
 }else if(p.kind==="single"){
  out+=`<div class="single-photo"><img src="${p.photo}" alt="A peaceful memory"><span>${p.caption}</span></div><p class="page-copy">${p.copy}</p>`;
 }else if(p.kind==="letter"){
  out+=`<div class="letter">${p.copy}<div class="signature">${p.sign}</div></div>`;
 }else{
  out+=`<div class="big-heart">♡</div><p class="page-copy">${p.copy}</p><div class="big-heart">✿</div>`;
 }
 out+='<span class="sticker bottom">✿</span>';el.innerHTML=out;
}
function update(){
 const shown=Math.max(0,Math.min(pageIndex,chapters.length-1));
 $("counter").textContent=String(Math.max(1,pageIndex+1)).padStart(2,"0")+" / 05";
 $("chapterTitle").textContent=pageIndex<0?"A little beginning":chapters[shown].title;
 $("back").disabled=pageIndex<0;
 $("forward").textContent=pageIndex>=chapters.length-1?"Close the book ↺":"Turn the page →";
 $("progress").innerHTML=chapters.map((_,i)=>`<button aria-label="Go to chapter ${i+1}" class="${i===shown&&pageIndex>=0?"active":""}" data-index="${i}"></button>`).join("");
 document.querySelectorAll("#progress button").forEach(b=>b.onclick=()=>{pageIndex=Number(b.dataset.index);openCoverIfNeeded();renderSpread();update()});
}
function openCoverIfNeeded(){if(pageIndex>=0)$("cover").classList.add("open");else $("cover").classList.remove("open")}
function renderSpread(){
 // Two visible pages: left is the previous page, right is the current page.
 renderPage("leftContent",pageIndex-1);
 renderPage("rightContent",pageIndex);
 $("leftPage").style.opacity=pageIndex>0?"1":".25";
}
$("begin").addEventListener("click",()=>{$("intro").classList.add("hidden");$("reader").classList.remove("hidden");pageIndex=-1;openCoverIfNeeded();renderSpread();update();window.scrollTo({top:0,behavior:"smooth"})});
$("cover").addEventListener("click",()=>{if(pageIndex<0){pageIndex=0;openCoverIfNeeded();renderSpread();update()}});
$("forward").addEventListener("click",()=>{if(pageIndex>=chapters.length-1){pageIndex=-1}else{pageIndex++}openCoverIfNeeded();renderSpread();update()});
$("back").addEventListener("click",()=>{if(pageIndex>0)pageIndex--;else pageIndex=-1;openCoverIfNeeded();renderSpread();update()});
// Optional ambient sound. Put a licensed audio file named music.mp3 next to index.html.
let audio=null,isPlaying=false;
$("soundBtn").addEventListener("click",async()=>{if(!audio)audio=new Audio("music.mp3");audio.loop=true;audio.volume=.22;try{if(!isPlaying){await audio.play();isPlaying=true;$("soundBtn").textContent="♫ Sound: on"}else{audio.pause();isPlaying=false;$("soundBtn").textContent="♫ Sound: off"}}catch(e){$("soundBtn").textContent="♫ Add music.mp3"}});
