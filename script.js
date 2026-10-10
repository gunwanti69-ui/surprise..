const area = document.getElementById('bookArea');
const cover = document.getElementById('cover');
const openButton = document.getElementById('openBook');
const coverOpen = document.getElementById('coverOpen');
const spreads = [...document.querySelectorAll('.spread')];
const prev = document.getElementById('prevPage');
const next = document.getElementById('nextPage');
const progress = document.getElementById('progress');
const pageCount = document.getElementById('pageCount');
const restart = document.getElementById('restart');
let opened = false;
let page = 0;

function openBook(){
  if(opened) return;
  opened = true;
  area.classList.add('open');
  document.getElementById('book').classList.add('is-open');
  page = 0;
  render();
  document.getElementById('bookArea').scrollIntoView({behavior:'smooth',block:'center'});
}
function render(){
  spreads.forEach((s,i)=>s.classList.toggle('active',i===page));
  prev.disabled = page===0;
  next.disabled = page===spreads.length-1;
  progress.style.width = `${((page+1)/spreads.length)*100}%`;
  pageCount.textContent = `Spread ${page+1} of ${spreads.length}`;
}
function turn(amount){
  page = Math.max(0,Math.min(spreads.length-1,page+amount));
  render();
}
openButton.addEventListener('click',openBook);
coverOpen.addEventListener('click',openBook);
prev.addEventListener('click',()=>turn(-1));
next.addEventListener('click',()=>turn(1));
restart.addEventListener('click',()=>{page=0;render();document.getElementById('bookArea').scrollIntoView({behavior:'smooth',block:'center'});});
document.addEventListener('keydown',e=>{
  if(!opened) return;
  if(e.key==='ArrowRight') turn(1);
  if(e.key==='ArrowLeft') turn(-1);
});
let touchStartX=0;
document.getElementById('pages').addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX},{passive:true});
document.getElementById('pages').addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].screenX-touchStartX;
  if(Math.abs(dx)>45) turn(dx<0?1:-1);
},{passive:true});
render();
