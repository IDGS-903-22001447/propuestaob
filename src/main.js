import * as THREE from 'three';

/* =========================================================
   CONFIG — cambia aquí
   ========================================================= */
// ⚠️ PON AQUÍ EL WHATSAPP DE LA MARCA: 521 + lada + número, sin espacios ni signos.
// Ejemplo: '5214771234567'. El valor actual es de relleno.
const WHATSAPP = '5214770000000';
const fmt = n => '$' + Number(n).toLocaleString('es-MX');
const $ = s => document.querySelector(s);

/* íconos para las piezas que todavía no tienen foto */
const ICON = {
 hoodie:'<svg viewBox="0 0 160 160" fill="none" stroke="#1b1b20" stroke-width="2.6"><path d="M55 20q25-18 50 0l35 20 15 60-22 6-8-30v74H35V76l-8 30-22-6 15-60z"/><path d="M60 22q20 30 40 0M80 40v110"/><rect x="62" y="64" width="36" height="34"/></svg>',
 crosses:'<svg viewBox="0 0 160 160" fill="none" stroke="#1b1b20" stroke-width="2.6"><path d="M55 20q25-18 50 0l35 20 15 60-22 6-8-30v74H35V76l-8 30-22-6 15-60z"/><path d="M60 50h8v-6h4v6h8v4h-8v12h-4V54h-8zM95 80h8v-6h4v6h8v4h-8v12h-4V84h-8zM50 104h8v-6h4v6h8v4h-8v12h-4v-12h-8z" fill="#b3121b"/></svg>',
 blouse:'<svg viewBox="0 0 160 160" fill="none" stroke="#1b1b20" stroke-width="2.6"><path d="M50 22l30 10 30-10 34 30-14 18-16-10v70H46V60L30 70 16 52z"/><path d="M60 60q20 14 40 0M58 80q22 14 44 0M56 100q24 14 48 0" stroke="#1d33d6" stroke-dasharray="3 4"/></svg>',
 choker:'<svg viewBox="0 0 160 170" fill="none" stroke="#1b1b20" stroke-width="2.6"><circle cx="80" cy="70" r="58" stroke-dasharray="7 5"/><path d="M76 120h8v14h12v7H84v26h-8v-26H64v-7h12z" fill="#b3121b"/><path d="M28 50l-10-6M132 50l10-6M22 80H10M138 80h12"/></svg>',
 bracelet:'<svg viewBox="0 0 180 120" fill="none" stroke="#1b1b20" stroke-width="2.6"><path d="M10 30q80 30 160 0" stroke-dasharray="9 5"/><path d="M50 40v20M80 46v28M110 46v20M140 40v16"/><path d="M76 74h8v10h8v5h-8v20h-8V89h-8v-5h8z"/></svg>',
 glasses:'<svg viewBox="0 0 200 80" fill="none" stroke="#1b1b20" stroke-width="3.5"><path d="M12 30q40-12 80 0-4 32-40 32T12 30zM108 30q40-12 80 0-4 32-40 32t-40-32z" fill="#3b2a24"/><path d="M92 32q8-6 16 0"/><path d="M30 18h20M40 10v20M150 18h20M160 10v20" stroke="#b9a271"/></svg>',
 mail:'<svg viewBox="0 0 160 160" fill="none" stroke="#1b1b20" stroke-width="1.8"><path d="M50 20h60l30 30-10 90H30L20 50z"/><g opacity=".7">'+Array.from({length:40},(_,i)=>`<circle cx="${42+(i%8)*11}" cy="${40+Math.floor(i/8)*20}" r="5"/>`).join('')+'</g></svg>',
 rosary:'<svg viewBox="0 0 160 170" fill="none" stroke="#1b1b20" stroke-width="2.6"><circle cx="80" cy="60" r="48" stroke-dasharray="2 7" stroke-width="7" stroke-linecap="round"/><path d="M80 108v16"/><path d="M76 124h8v12h10v6H84v22h-8v-22H66v-6h10z"/></svg>',
 medals:'<svg viewBox="0 0 160 170" fill="none" stroke="#1b1b20" stroke-width="2.6"><path d="M18 30q62 90 124 0" stroke-dasharray="8 5"/><ellipse cx="50" cy="78" rx="7" ry="10"/><ellipse cx="80" cy="96" rx="9" ry="13" fill="#1d33d6"/><ellipse cx="110" cy="78" rx="7" ry="10"/><path d="M76 112h8v10h8v5h-8v18h-8v-18h-8v-5h8z"/></svg>'
};

/* =========================================================
   INVENTARIO (img: ruta de la foto, ej. '/fotos/productos/hoodie-kali.webp')
   ========================================================= */
const DEFAULT = [
 {id:1,n:'Hoodie Kali intervenido',c:'ropa',p:1800,i:'hoodie',st:'disponible',mat:'Algodón, pañoleta vintage',d:'Hoodie café con parche de Kali y pañoleta vintage cosida a mano.',img:'/fotos/productos/hoodie-kali.webp'},
 {id:2,n:'Hoodie cruces rosa',c:'ropa',p:1650,i:'crosses',st:'disponible',mat:'Algodón, serigrafía',d:'Hoodie crema con caligrafía rosa y cruces en las mangas.',img:'/fotos/productos/hoodie-cruces-rosa.webp'},
 {id:3,n:'Lentes relicario',c:'lentes',p:950,i:'glasses',st:'disponible',mat:'Armazón metálico, dijes',d:'Lentes de sol con dijes plateados soldados al frente.',img:'/fotos/productos/lentes-dijes-plata.webp'},
 {id:4,n:'Templar chainmail suit',c:'pasarela',p:4800,i:'mail',st:'disponible',mat:'Malla metálica',d:'Pieza de pasarela. Armadura de malla inspirada en los templarios.',img:''},
 {id:5,n:'Collar arcángeles',c:'collares',p:780,i:'medals',st:'disponible',mat:'Cadena de acero, dijes metálicos',d:'Cadena plateada con crucifijo central y dijes de ángeles.',img:'/fotos/productos/collar-arcangeles.webp'},
 {id:6,n:'Choker eslabón trinidad',c:'collares',p:850,i:'choker',st:'disponible',mat:'Eslabones metálicos, medallas',d:'Eslabones oscuros con crucifijo, cruces y medallas azules.',img:'/fotos/productos/collar-eslabon-trinidad.webp'},
 {id:7,n:'Choker crucifijo rojo',c:'collares',p:720,i:'choker',st:'disponible',mat:'Cadena de acero, esmalte',d:'Cadena plateada con crucifijos de esmalte rojo.',img:'/fotos/productos/collar-crucifijo-rojo.webp'},
 {id:8,n:'Collar cruz de cuentas',c:'collares',p:620,i:'rosary',st:'vendido',mat:'Cordón, cuentas',d:'Cordón delgado con cruz de cuentas.',img:'/fotos/productos/collar-cruz-cuentas.webp'}
];
const KEY='obcesive_inv_v2';
let items;
try{items=JSON.parse(localStorage.getItem(KEY))||DEFAULT}catch(e){items=DEFAULT}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}};

const pic=it=>it.img?`<img src="${it.img}" alt="${it.n}" loading="lazy">`:ICON[it.i]||ICON.choker;
const tagFor=st=>st==='vendido'?'<span class="tag sold mono"><i></i>Vendido</span>':st==='apartado'?'<span class="tag hold mono"><i></i>Apartado</span>':'<span class="tag mono"><i></i>Pieza única 1/1</span>';

function cardEl(it,delay){
 const el=document.createElement('article');
 el.className='card'+(it.st==='vendido'?' sold':'');
 el.style.animationDelay=delay+'ms';
 el.innerHTML=`<div class="inner"><div class="pimg">${pic(it)}${tagFor(it.st)}<span class="glare"></span>${it.img?'':'<span class="ph-l mono">[ foto ]</span>'}<span class="quick mono">${it.st==='apartado'?'Apartado · pregunta':'Ver pieza'}</span></div>
  <div class="meta"><div><h3>${it.n}</h3><span class="mono">${it.c}</span></div><span class="price">${fmt(it.p)}</span></div></div>`;
 const inner=el.firstElementChild,img=el.querySelector('.pimg');
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  inner.style.transform=`rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg)`;img.style.setProperty('--gx',x*100+'%');img.style.setProperty('--gy',y*100+'%')});
 el.addEventListener('mouseleave',()=>inner.style.transform='');
 if(it.st!=='vendido'){el.addEventListener('click',()=>openModal(it.id));el.dataset.cursor='Ver'}
 else el.dataset.cursor='Vendido';
 bindCursor(el);
 return el;
}
let filter='all';
function renderShop(){
 const g=$('#grid');g.innerHTML='';
 items.filter(x=>x.c!=='collares'&&(filter==='all'||x.c===filter)).forEach((it,i)=>g.appendChild(cardEl(it,i*70)));
 const r=$('#rail');r.innerHTML='';
 items.filter(x=>x.c==='collares').forEach((it,i)=>r.appendChild(cardEl(it,i*70)));
 $('#arch').innerHTML=items.filter(x=>x.st==='vendido').map(x=>`<div>${x.n}</div>`).join('')+
   Array.from({length:6},(_,i)=>`<div>Archivo ${String(i+1).padStart(2,'0')}</div>`).join('');
}
$('#filters').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;
 document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('on'));e.target.classList.add('on');filter=e.target.dataset.f;renderShop()});

/* =========================================================
   PANEL DE INVENTARIO
   ========================================================= */
function renderPanel(flashId){
 const tb=$('#tbody');
 tb.innerHTML=items.map(it=>`<tr data-id="${it.id}"${it.id===flashId?' class="flash"':''}>
  <td class="nm">${it.n}</td><td>${it.c}</td>
  <td><input type="number" min="0" step="10" value="${it.p}" data-k="p"></td>
  <td><select data-k="st">${['disponible','apartado','vendido'].map(s=>`<option ${s===it.st?'selected':''}>${s}</option>`).join('')}</select></td></tr>`).join('');
 const av=items.filter(x=>x.st==='disponible');
 $('#sAv').textContent=av.length;$('#sHo').textContent=items.filter(x=>x.st==='apartado').length;
 $('#sSo').textContent=items.filter(x=>x.st==='vendido').length;$('#sVal').textContent=fmt(av.reduce((a,b)=>a+ +b.p,0));
 if(flashId)setTimeout(()=>{const r=tb.querySelector('tr.flash');r&&r.classList.remove('flash')},900);
}
$('#tbody').addEventListener('change',e=>{
 const tr=e.target.closest('tr'),it=items.find(x=>x.id==tr.dataset.id),k=e.target.dataset.k;
 it[k]=k==='p'?Math.max(0,+e.target.value||0):e.target.value;save();renderPanel(it.id);renderShop();
 toast(`${it.n} → ${k==='p'?fmt(it.p):it.st} · actualizado en la tienda`);
});
const NEW=[{n:'Choker espinas',i:'choker'},{n:'Rosario negro',i:'rosary'},{n:'Pulsera relicario',i:'bracelet'}];let ni=0;
$('#addBtn').addEventListener('click',()=>{const t=NEW[ni++%NEW.length],id=Date.now();
 items.push({id,n:t.n,c:'collares',p:560,i:t.i,st:'disponible',mat:'Cadena, dijes',d:'Pieza nueva agregada desde el panel.',img:''});
 save();renderPanel(id);renderShop();toast(`${t.n} publicada en Collares`)});

/* =========================================================
   MODAL + WHATSAPP
   ========================================================= */
let cur=null;
const modal=$('#modal');
function updateTotal(){
 const r=document.querySelector('#ship input:checked'),tot=cur.p+ +r.value;
 $('#mTotal').textContent=fmt(tot);
 const msg=`Hola Obcesive 🖤 Me interesa la pieza *${cur.n}* (${fmt(cur.p)}).\nEntrega: ${r.dataset.l}\nTotal: ${fmt(tot)}\n¿Sigue disponible?`;
 $('#waBtn').href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
function openModal(id){
 cur=items.find(x=>x.id===id);if(!cur)return;
 $('#mImg').innerHTML=pic(cur)+tagFor(cur.st);$('#mCat').textContent=cur.c+' · '+(cur.st==='apartado'?'apartado':'disponible');
 $('#mName').textContent=cur.n;$('#mPrice').textContent=fmt(cur.p);$('#mDesc').textContent=cur.d;$('#mMat').textContent=cur.mat;
 $('#buyBtn').style.display=cur.st==='apartado'?'none':'';
 document.querySelector('#ship input').checked=true;updateTotal();
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('lock');
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
modal.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('#ship').addEventListener('change',updateTotal);
$('#buyBtn').addEventListener('click',()=>{cur.st='apartado';save();renderShop();renderPanel(cur.id);closeModal();
 toast('Pieza apartada · en la versión final aquí se paga con Mercado Pago')});
$('#notify').href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola Obcesive 🖤 Avísame cuando salga el nuevo drop.')}`;
$('#footWa').href=`https://wa.me/${WHATSAPP}`;

let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2600)}

/* =========================================================
   CURSOR MAGNÉTICO
   ========================================================= */
const ring=$('#cRing'),dot=$('#cDot'),lab=$('#cLabel');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;lab.style.left=rx+'px';lab.style.top=ry+'px';requestAnimationFrame(loop)})();
function bindCursor(el){
 el.addEventListener('mouseenter',()=>{ring.classList.add('hov');if(el.dataset.cursor){lab.textContent=el.dataset.cursor;lab.classList.add('on')}});
 el.addEventListener('mouseleave',()=>{ring.classList.remove('hov');lab.classList.remove('on')});
}
function magnet(el){
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.25}px,${y*.35}px)`});
 el.addEventListener('mouseleave',()=>{el.style.transition='transform .6s cubic-bezier(.16,1,.3,1)';el.style.transform='';setTimeout(()=>el.style.transition='',600)});
}
document.querySelectorAll('[data-mag]').forEach(el=>{magnet(el);bindCursor(el)});
document.querySelectorAll('a:not([data-mag]),.filters button').forEach(bindCursor);

/* =========================================================
   SCROLL: header, reveal, parallax
   ========================================================= */
const hdr=$('#hdr');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv,.popup').forEach(el=>io.observe(el));
const par=[...document.querySelectorAll('[data-par]')];
addEventListener('scroll',()=>{
 hdr.classList.toggle('solid',scrollY>innerHeight*.6);
 par.forEach(p=>{const r=p.parentElement.getBoundingClientRect();p.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*-.08}px)`});
},{passive:true});

/* =========================================================
   COUNTDOWN (demo)
   ========================================================= */
let left=3*86400+12*3600+40*60;const pad=x=>String(x).padStart(2,'0');
setInterval(()=>{left=Math.max(0,left-1);cd.textContent=pad(left/86400|0);ch.textContent=pad(left%86400/3600|0);cm.textContent=pad(left%3600/60|0);cs.textContent=pad(left%60)},1000);

/* =========================================================
   INTRO
   ========================================================= */
document.getElementById('mq').innerHTML=Array(4).fill(['Piezas 1/1','León Gto only','Música, moda y dios','Envíos a todo México','Nuevo drop pronto'].map(w=>`<span>${w}</span><span>✝</span>`).join('')).join('');
renderShop();renderPanel();
addEventListener('load',()=>setTimeout(()=>{$('#intro').classList.add('open');document.body.classList.remove('lock');setTimeout(()=>$('#intro').style.display='none',1800)},500));
setTimeout(()=>{$('#intro').classList.add('open');document.body.classList.remove('lock')},3500); // por si tarda

/* =========================================================
   HERO 3D — cruz cromada, cadena orbitando, polvo + flash
   ========================================================= */
let burst=0;
$('#hero').addEventListener('click',e=>{if(e.target.closest('a'))return;$('#flash').animate([{opacity:.95},{opacity:0}],{duration:650,easing:'ease-out'});burst=1});
(function(){
 const canvas=$('#gl');
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(34,1,.1,100);cam.position.z=13;

 function matcap(tint){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
  let gr=g.createRadialGradient(94,82,4,128,128,128);
  [[0,'#fff'],[.2,'#ececf2'],[.42,'#73737f'],[.6,'#121216'],[.78,'#3c3c46'],[.92,'#d0d0da'],[1,'#fff']].forEach(s=>gr.addColorStop(s[0],s[1]));
  g.fillStyle=gr;g.fillRect(0,0,256,256);
  gr=g.createLinearGradient(0,256,0,130);gr.addColorStop(0,tint);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,256,256);
  return new THREE.MeshMatcapMaterial({matcap:new THREE.CanvasTexture(c)})}
 const chrome=matcap('rgba(215,22,34,.75)'),chromeB=matcap('rgba(243,167,207,.5)');

 const w=.4,arm=1.42,top=1.9,bot=3.3,ay=.85,s=new THREE.Shape();
 [[-w,top],[w,top],[w,ay+w],[arm,ay+w],[arm,ay-w],[w,ay-w],[w,-bot],[-w,-bot],[-w,ay-w],[-arm,ay-w],[-arm,ay+w],[-w,ay+w]].forEach((p,i)=>i?s.lineTo(...p):s.moveTo(...p));
 const cg=new THREE.ExtrudeGeometry(s,{depth:.42,bevelEnabled:true,bevelThickness:.15,bevelSize:.12,bevelSegments:6});cg.center();
 const cross=new THREE.Mesh(cg,chrome);scene.add(cross);

 const chain=new THREE.Group(),N=44,R=4.5,lg=new THREE.TorusGeometry(.26,.07,14,40);
 for(let i=0;i<N;i++){const a=i/N*Math.PI*2,l=new THREE.Mesh(lg,i%2?chromeB:chrome);l.scale.set(1.55,1,1);
  l.position.set(Math.cos(a)*R,Math.sin(a)*R,0);l.rotation.z=a+Math.PI/2;if(i%2)l.rotateX(Math.PI/2);chain.add(l)}
 chain.rotation.x=1.15;scene.add(chain);

 // pequeñas cruces flotando
 const minis=[],mg=new THREE.ExtrudeGeometry(s,{depth:.2,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:2});mg.center();
 for(let i=0;i<9;i++){const m=new THREE.Mesh(mg,chromeB);const sc=.08+Math.random()*.1;m.scale.setScalar(sc);
  m.position.set((Math.random()-.5)*16,(Math.random()-.5)*9,-2-Math.random()*5);m.userData={sp:.2+Math.random()*.5,ph:Math.random()*6};scene.add(m);minis.push(m)}

 const P=600,pos=new Float32Array(P*3);for(let i=0;i<P*3;i++)pos[i]=(Math.random()-.5)*(i%3==2?8:24);
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
 const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffd9de,size:.032,transparent:true,opacity:.7,depthWrite:false}));scene.add(dust);

 let tx=0,ty=0,ax=0,ay2=0,vis=true;
 addEventListener('mousemove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1});
 addEventListener('deviceorientation',e=>{if(e.gamma!=null){tx=Math.max(-1,Math.min(1,e.gamma/30));ty=Math.max(-1,Math.min(1,(e.beta-45)/30))}});
 new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(canvas);
 function size(){const W=canvas.clientWidth,H=canvas.clientHeight;renderer.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();
  const k=W<H?.6:1;cross.scale.setScalar(k);chain.scale.setScalar(k)}
 addEventListener('resize',size);size();

 const clock=new THREE.Clock();let spin=0,intro=0;
 (function loop(){requestAnimationFrame(loop);if(!vis)return;
  const t=clock.getElapsedTime();ax+=(tx-ax)*.05;ay2+=(ty-ay2)*.05;burst*=.94;intro+=(1-intro)*.025;
  spin+=.007+burst*.22;
  cross.rotation.y=spin+ax*.7;cross.rotation.x=ay2*.35;cross.position.y=Math.sin(t*1.1)*.16+(1-intro)*-3;
  chain.rotation.z=t*.16+burst*1.2;chain.rotation.y=ax*.25;chain.scale.setScalar((canvas.clientWidth<canvas.clientHeight?.6:1)*(0.6+intro*.4));
  minis.forEach(m=>{m.rotation.y+=.01*m.userData.sp*3;m.position.y+=Math.sin(t*m.userData.sp+m.userData.ph)*.004});
  dust.rotation.y=t*.02;dust.position.y=(t*.12)%2;
  const sc=Math.min(scrollY/innerHeight,1);cam.position.z=13+sc*5;cross.rotation.z=sc*.7;
  renderer.render(scene,cam)})();
})();
