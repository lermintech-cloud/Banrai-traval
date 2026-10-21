const $=s=>document.querySelector(s);
const IC={
layout:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
plus:'<circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>',
file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
settings:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',
printer:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
eye:'<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
eraser:'<path d="m7 21-4-4a2 2 0 0 1 0-3L14 3a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3L11 21zM22 21H7M5 11l9 9"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24">${IC[n]}</svg>`;
const uid=()=>Math.random().toString(36).slice(2,9);
const today=()=>new Date().toISOString().slice(0,10);
const init=n=>(n.replace(/^(นางสาว|นาง|นาย)\s*/,'')[0]||'?');
const SM=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],TC=['#fb7185','#60a5fa','#34d399'];
let sel=null,S={},L=[],role=null,me=null,view='dash',lf='all',unlocked=false,stab='school',F={mode:'fy',year:fy(today())};
const SG={};
function normS(){if(typeof S.teachers=='string')S.teachers=S.teachers.split('\n').filter(Boolean).map(x=>{const[n,p,t]=x.split('|');return{id:uid(),n:n.trim(),p:(p||'').trim(),t:(t||'').trim()}});
 S.teachers.forEach(t=>t.id=t.id||uid());S.sigs=S.sigs||{};Object.keys(S.sigs).forEach(k=>S.sigs[k]=nsg(S.sigs[k]))}
async function loadFonts(){for(const[k,w]of[['r','400'],['b','700']]){const u=S.fonts&&S.fonts[k];if(!u)continue;try{const f=new FontFace('TH Sarabun New',`url(${u})`,{weight:w});await f.load();document.fonts.add(f)}catch(e){}}}
async function init0(){S=await db.settings();normS();await loadFonts();L=await db.trips();render()}
function toast(m){const e=document.createElement('div');e.className='toast';e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2200)}
/* ---------- โครงหน้า ---------- */
function navFor(){const n=[];
 if(role!='ครู')n.push(['inbox','งานรอดำเนินการ','inbox','k5',{'ธุรการ':'ตรวจความครบถ้วนของเอกสารแนบ','การเงิน':'ตรวจยอดเงินและเงินยืมทดรอง','ผู้อำนวยการ':'พิจารณาอนุมัติการเบิกจ่าย'}[role]]);
 n.push(['dash','ภาพรวม','layout','k1','สรุปยอดเบิกและเงินยืมที่ต้องส่งใช้คืน']);
 if(role=='ครู')n.push(['new','สร้างแฟ้มเบิก','plus','k2','กรอกข้อมูล แนบเอกสาร ตรวจตัวอย่างก่อนพิมพ์']);
 n.push(['list',role=='ครู'?'แฟ้มของฉัน':'แฟ้มทั้งหมด','file','k3','ดูตัวอย่าง พิมพ์ หรือบันทึก PDF รวมทุกหน้า']);
 if(role!='ครู')n.push(['set','ตั้งค่า','settings','k4','โรงเรียน รายชื่อครู และลายเซ็น (ต้องใช้รหัสผู้ดูแล)']);
 return n}
const pendingN=()=>L.filter(l=>l.st===stepOf[role]).length;
function render(){
 const a=$('#app');
 if(!role){a.innerHTML=`<div class="hero"><img src="assets/logo.png"><h1>ระบบเบิกค่าเดินทางไปราชการ</h1><p>${S.school} · ${S.area}</p><div class="roles">${[['ครู','user','สร้างแฟ้มเบิก แนบเอกสาร ติดตามสถานะ','k2'],['ธุรการ','briefcase','ตรวจเอกสารแนบ','k3'],['การเงิน','briefcase','ตรวจยอดเงินและเงินยืม','k1'],['ผู้อำนวยการ','building','พิจารณาอนุมัติ','k4']].map(r=>`<button class="${r[3]}" onclick="login('${r[0]}')">${ic(r[1])}<b>${r[0]}</b><small>${r[2]}</small></button>`).join('')}</div></div><div class="foot">${CREDIT}</div>`;return}
 const nav=navFor(),cur=nav.find(n=>n[0]==view)||nav[0];view=cur[0];
 a.innerHTML=`<div class="shell"><aside class="side"><div class="brand"><img src="assets/logo.png"><div><b>ระบบเบิกค่าเดินทางไปราชการ</b><small>${S.school}</small></div></div>
 <nav>${nav.map(n=>`<button class="ni ${view==n[0]?'on':''}" onclick="go('${n[0]}')"><i class="${n[3]}">${ic(n[2])}</i>${n[1]}${n[0]=='inbox'&&pendingN()?`<em>${pendingN()}</em>`:''}</button>`).join('')}</nav>
 <div class="sfoot"><div class="me"><span class="av">${init(me?me.n:role)}</span><small><b>${role}</b>${me?'<br>'+me.n:''}</small></div><button class="btn l" onclick="switchM()">${ic('logout')} เปลี่ยนบทบาท / ออก</button></div></aside>
 <section class="content"><main><h2>${cur[1]}</h2><p class="sub">${cur[4]}</p>${{inbox,dash,new:newForm,list,set:settings}[view]()}<div class="foot">${CREDIT}</div></main></section></div>`;
 Object.keys(SG).forEach(sgR);view=='new'?(atR(),live()):fitPv()}
function go(v){view=v;sel=null;render()}
function modal(h){$('#modal').innerHTML=h;$('#modal').classList.add('on')}
function closeM(){$('#modal').classList.remove('on');$('#modal').innerHTML='';$('#printRoot').innerHTML=''}
/* ---------- เข้าสู่ระบบ / เลือกครู ---------- */
function login(r){if(r!='ครู'){role=r;me=null;unlocked=false;view=r=='ครู'?'dash':'inbox';return render()}
 if(!S.teachers.length)return alert('ยังไม่มีรายชื่อครู ให้ธุรการหรือผู้อำนวยการเพิ่มในเมนูตั้งค่าก่อน');pickT()}
function pickT(q=''){const p=S.teachers.filter(t=>t.n.includes(q));
 modal(`<div class="mb"><h3>ฉันคือใคร?</h3><div class="srch">${ic('search')}<input id="tq" value="${q}" placeholder="พิมพ์ค้นหาชื่อ" oninput="pickT(this.value)"></div><div class="tl">${p.map(t=>`<button class="tp" onclick="chooseT('${t.id}')"><span class="av">${init(t.n)}</span><span><b>${t.n}</b><small>${t.p}</small></span></button>`).join('')||'<p>ไม่พบรายชื่อ</p>'}</div><p><button class="btn l" onclick="closeM()">ยกเลิก</button></p></div>`);
 const e=$('#tq');e.focus();e.setSelectionRange(q.length,q.length)}
function chooseT(id){me=S.teachers.find(t=>t.id==id);role='ครู';view='dash';unlocked=false;PH='';closeM();render()}
/* ---------- ลายเซ็น: อัปโหลด PNG / เซ็นมือ / ปรับขนาดและตำแหน่ง ---------- */
function sgBox(id,v){SG[id]=nsg(v)?{...nsg(v)}:{img:'',s:100,x:0,y:0};
 return `<div class="sged"><div class="sgp" id="sgp_${id}"></div><div class="sgc"><label class="btn s l">${ic('upload')} อัปโหลด PNG<input type="file" accept="image/*" hidden onchange="sgUp('${id}',this)"></label><button class="btn s l" onclick="sgDraw('${id}')">${ic('pen')} เซ็นด้วยมือ</button><button class="btn s l" onclick="sgWhite('${id}')">${ic('eraser')} ลบพื้นหลังขาว</button><button class="btn s r" onclick="SG['${id}'].img='';sgR('${id}')">${ic('trash')}</button></div>
 ${[['s','ขนาด',30,300,5],['x','ซ้าย–ขวา',-30,30,1],['y','บน–ล่าง',-15,15,1]].map(r=>`<label class="rg"><span>${r[1]}</span><input type="range" min="${r[2]}" max="${r[3]}" step="${r[4]}" value="${SG[id][r[0]]}" oninput="SG['${id}'].${r[0]}=+this.value;sgR('${id}')"></label>`).join('')}</div>`}
function sgR(id){const e=$('#sgp_'+id);if(e)e.innerHTML=sgH(SG[id])+'<span>(ลงชื่อ).............................</span>';if(id=='me')live()}
function loadImg(src,cb){const i=new Image();i.onload=()=>cb(i);i.src=src}
function sgUp(id,inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>loadImg(r.result,i=>{const k=Math.min(1,700/i.width),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);SG[id].img=c.toDataURL('image/png');sgR(id)});r.readAsDataURL(f)}
function sgWhite(id){if(!SG[id].img)return;loadImg(SG[id].img,i=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);const d=x.getImageData(0,0,c.width,c.height),p=d.data;for(let k=0;k<p.length;k+=4){const m=Math.min(p[k],p[k+1],p[k+2]);if(m>225)p[k+3]=0;else if(m>170)p[k+3]=Math.round(p[k+3]*(225-m)/55)}x.putImageData(d,0,0);SG[id].img=c.toDataURL('image/png');sgR(id);toast('ลบพื้นหลังขาวแล้ว')})}
const pads={};
function initPad(id){const c=$('#'+id);c.width=840;c.height=260;const x=c.getContext('2d');x.lineWidth=5;x.lineCap='round';let on=0,dirty=0;
 const p=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 c.onpointerdown=e=>{on=1;dirty=1;x.beginPath();x.moveTo(...p(e));c.setPointerCapture(e.pointerId)};c.onpointermove=e=>{if(on){x.lineTo(...p(e));x.stroke()}};c.onpointerup=()=>on=0;
 pads[id]={get:()=>dirty?c.toDataURL('image/png'):'',clear:()=>{x.clearRect(0,0,c.width,c.height);dirty=0}}}
function modal2(h){$('#modal2').innerHTML=h;$('#modal2').classList.add('on')}
function closeM2(){$('#modal2').classList.remove('on');$('#modal2').innerHTML=''}
function sgDraw(id){modal2(`<div class="mb"><h3>เซ็นชื่อในกรอบ</h3><canvas class="sig" id="dpad"></canvas><p><button class="btn g" onclick="sgSave('${id}')">${ic('check')} ใช้ลายเซ็นนี้</button> <button class="btn l" onclick="pads.dpad.clear()">ล้าง</button> <button class="btn l" onclick="closeM2()">ยกเลิก</button></p></div>`);initPad('dpad')}
function sgSave(id){const d=pads.dpad.get();closeM2();if(d){SG[id].img=d;sgR(id)}}
/* ---------- แฟ้มเบิกค่าเดินทาง: สถานะ ---------- */
const STS=['รอธุรการตรวจ','รอการเงินตรวจ','รอผู้อำนวยการ','อนุมัติแล้ว'],ST={'รอธุรการตรวจ':'k3','รอการเงินตรวจ':'k1','รอผู้อำนวยการ':'k4','อนุมัติแล้ว':'k2','ไม่อนุมัติ':'k5'};
const stepOf={'ธุรการ':0,'การเงิน':1,'ผู้อำนวยการ':2},SIGK=[['clerk','c'],['finance','f'],['director','d']];
const byId=id=>L.find(x=>x.id==id),mine=()=>role=='ครู'?L.filter(x=>x.name==me.n):L;
const out=l=>l.loan&&l.loan.on&&!l.returned&&l.st>=0;
const pill=l=>`<span class="tag ${ST[l.status]}">${l.status}</span>`;
function loanTag(t){if(!t.loan||!t.loan.on)return'-';if(t.returned)return`<span class="tag k2">คืนแล้ว ${thS(t.returned)}</span>`;if(t.st<0)return'-';
 const n=Math.round((Date.parse(dueDate(t)+'T00:00:00Z')-Date.parse(today()+'T00:00:00Z'))/864e5);
 return`<span class="tag ${n<0?'k5':n<=5?'k3':'k1'}">${n<0?'เกินกำหนด '+(-n)+' วัน':'คืนภายใน '+thS(dueDate(t))+' (อีก '+n+' วัน)'}</span>`}
/* ---------- สร้างแฟ้มเบิก ---------- */
let RW=null,AT=[];
const gv=i=>($('#f_'+i)||{}).value||'';
function newForm(){
 const saved=localStorage['sig_'+me.n],iv=saved?JSON.parse(saved):nsg(me.sig),ev='oninput="live()" onchange="live()"',
 fl=(i,l,v='',ty='text')=>`<div><label>${l}</label><input id="f_${i}" type="${ty}" value="${v}" ${ev}></div>`;
 return `<div class="card"><div class="row">${fl('title','เรื่อง / โครงการที่ไปราชการ')}${fl('place','สถานที่')}${fl('phone','โทรศัพท์',me.t)}</div>
 <div class="row">${fl('start','ตั้งแต่วันที่',today(),'date')}${fl('end','ถึงวันที่ (วันกลับมาถึง)',today(),'date')}${fl('date','วันที่ยื่นเบิก',today(),'date')}</div>
 <div class="row">${fl('refNo','บันทึกขออนุมัติ ที่ (เลขที่)')}${fl('refDate','ลงวันที่ (บันทึกขออนุมัติ)',today(),'date')}</div>
 <div class="row"><div><label>ออกเดินทางจาก</label><select id="f_from" ${ev}><option>สำนักงาน</option><option>บ้านพัก</option><option>ประเทศไทย</option></select></div>${fl('tOut','เวลาออกเดินทาง','','time')}<div><label>กลับถึง</label><select id="f_to" ${ev}><option>สำนักงาน</option><option>บ้านพัก</option><option>ประเทศไทย</option></select></div>${fl('tIn','เวลากลับถึง','','time')}</div>
 <div class="row">${fl('with','พร้อมด้วย (ถ้ามี)')}${fl('note8','หมายเหตุ')}${fl('evn','จำนวนฉบับหลักฐานการจ่าย (เว้นว่าง = นับจากใบเสร็จที่แนบ)','','number')}</div>
 <h3 style="margin-top:14px">ประมาณการ / ค่าใช้จ่าย</h3>
 <div class="row">${fl('ad','เบี้ยเลี้ยง: จำนวนวัน','','number')}${fl('ar','อัตราต่อวัน (บาท)','','number')}</div>
 <div class="row">${fl('ht','ที่พัก: ประเภท (เดี่ยว/คู่)')}${fl('hd','จำนวนวัน','','number')}${fl('hr','อัตราต่อวัน (บาท)','','number')}</div>
 <div class="row">${fl('vt','ค่าพาหนะ: รายการ เช่น รถยนต์ส่วนบุคคล (กษ 6911)')}${fl('va','จำนวนเงิน (บาท)','','number')}${fl('veh','ยานพาหนะที่ใช้ (ในบันทึกขออนุมัติ)','รถยนต์ส่วนตัว')}</div>
 <div class="row">${fl('ot','ค่าใช้จ่ายอื่น ๆ (ระบุ)')}${fl('oa','จำนวนเงิน (บาท)','','number')}</div>
 <label class="chk"><input type="checkbox" id="f_nomemo" ${ev}> มีหนังสืออนุมัติฉบับจริงแนบแล้ว (ไม่ต้องสร้างบันทึกขออนุมัติ + ประมาณการ)</label>
 <h3>เงินยืมทดรองจ่าย</h3><label class="chk"><input type="checkbox" id="f_loan" ${ev}> มีการยืมเงินราชการล่วงหน้า (ต้องส่งใช้คืนภายใน 15 วันนับจากวันกลับ)</label>
 <div class="row">${fl('lamt','จำนวนเงินที่ยืม (บาท)','','number')}${fl('ldate','วันที่ยืม',today(),'date')}</div>
 <h3>เอกสารแนบ (รูปภาพหรือ PDF — ระบบเรียงลำดับหน้าให้เอง)</h3><div class="sgc">${Object.keys(AK).map(k=>`<label class="btn s l">${ic('upload')} ${AK[k]}<input type="file" multiple accept="image/*,application/pdf" hidden onchange="addAtt('${k}',this)"></label>`).join('')}</div><div id="atl"></div>
 <label>ลายเซ็นของฉัน${iv&&iv.img?' — ใส่ให้อัตโนมัติแล้ว (แก้ไขได้)':''}</label>${sgBox('me',iv)}
 <p><label class="chk"><input type="checkbox" id="f_keep" ${saved?'checked':''}> จำลายเซ็นไว้ในเครื่องนี้</label></p>
 <button class="btn g big2" onclick="saveTrip()">${ic('check')} ส่งแฟ้มเบิก</button></div>
 <div class="card" style="margin-top:18px"><h3>ตัวอย่างเอกสารรวม (เปลี่ยนตามที่กรอกทันที)</h3><div id="pvs"></div></div>`}
const rdURL=f=>new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});
const shrink=(src,max=1400)=>new Promise(res=>loadImg(src,i=>{const s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0,c.width,c.height);res({img:c.toDataURL('image/jpeg',.65),w:c.width,h:c.height})}));
const needPdfJs=()=>window.pdfjsLib?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';s.onload=()=>{pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';ok()};s.onerror=no;document.head.appendChild(s)});
async function fileImgs(f){if(f.type!='application/pdf')return[await shrink(await rdURL(f))];await needPdfJs();
 const d=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise,o=[];
 for(let n=1;n<=d.numPages;n++){const p=await d.getPage(n),v=p.getViewport({scale:1.6}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;await p.render({canvasContext:c.getContext('2d'),viewport:v}).promise;o.push(await shrink(c.toDataURL('image/jpeg',.9)))}return o}
async function addAtt(k,inp){toast('กำลังประมวลผลไฟล์...');for(const f of inp.files){try{for(const im of await fileImgs(f))AT.push({k,...im,name:f.name})}catch(e){alert('อ่านไฟล์ไม่ได้: '+f.name)}}inp.value='';atR();live()}
function atR(){const e=$('#atl');if(!e)return;const kb=Math.round(JSON.stringify(AT).length/1024);e.innerHTML=AT.map((a,i)=>`<div class="ch" style="margin-top:6px"><img src="${a.img}" style="height:46px"><div>${AK[a.k]}<small>${esc(a.name)}</small></div><button class="btn s r" onclick="AT.splice(${i},1);atR();live()">${ic('trash')}</button></div>`).join('')+(AT.length?`<p class="mut">แนบ ${AT.length} หน้า · ขนาดรวม ${kb.toLocaleString()} KB (ไม่ควรเกิน ~1,700 KB ต่อแฟ้ม)</p>`:'')}
function draft(){return{id:'draft',name:me.n,pos:me.p,phone:gv('phone'),title:gv('title')||'……………',place:gv('place')||'……………',start:gv('start')||today(),end:gv('end')||today(),date:gv('date')||today(),refNo:gv('refNo'),refDate:gv('refDate'),from:gv('from'),tOut:gv('tOut'),to:gv('to'),tIn:gv('tIn'),with:gv('with'),note8:gv('note8'),evn:gv('evn'),v:2,ad:gv('ad'),ar:gv('ar'),ht:gv('ht'),hd:gv('hd'),hr:gv('hr'),vt:gv('vt'),va:gv('va'),ot:gv('ot'),oa:gv('oa'),veh:gv('veh')||'รถยนต์ส่วนตัว',nomemo:!!($('#f_nomemo')&&$('#f_nomemo').checked),loan:{on:!!($('#f_loan')&&$('#f_loan').checked),amt:gv('lamt'),date:gv('ldate')||today()},atts:AT,sig:SG.me,st:0,status:'ร่าง'}}
function live(){if(view!='new'||!me)return;const e=$('#pvs');if(!e)return;e.innerHTML=pagesHTML(pagesOf(draft(),S));fitPv()}
function fitPv(){document.querySelectorAll('.pv').forEach(pv=>{const p=pv.firstChild;if(!p||!p.classList)return;const l=p.classList.contains('l'),w=l?1123:794,h=l?794:1123,sc=Math.min(1,pv.clientWidth/w);p.style.transform=`scale(${sc})`;pv.style.height=h*sc+'px'})}
async function saveTrip(){if(!gv('title').trim())return alert('กรุณากรอกเรื่อง');if(!SG.me.img)return alert('กรุณาเพิ่มลายเซ็น (อัปโหลดหรือเซ็นด้วยมือ)');
 const t=draft();if(t.end<t.start)return alert('วันที่สิ้นสุดต้องไม่ก่อนวันเริ่ม');if(t.loan.on&&!+t.loan.amt)return alert('กรุณากรอกจำนวนเงินยืม');
 if($('#f_keep').checked)localStorage['sig_'+me.n]=JSON.stringify(SG.me);else delete localStorage['sig_'+me.n];
 t.id=Date.now();t.status=STS[0];t.sig={...SG.me};
 if(JSON.stringify(t).length>1.9e6)return alert('ไฟล์แนบรวมใหญ่เกินไป (เกิน ~1.9 MB) กรุณาลดจำนวนหน้า');
 await db.save(t);L=await db.trips();RW=null;AT=[];preview(t.id)}
/* ---------- รายการแฟ้ม + ตัวอย่าง/พิมพ์/PDF ---------- */
function preview(id){sel=id;view='list';render();const c=$('#pvCard');if(c)c.scrollIntoView({behavior:'smooth'})}
function list(){const mt=(l,s)=>s=='all'||(s=='ค้างคืนเงินยืม'?out(l):l.status==s),a0=[...mine()].sort((x,y)=>y.id-x.id),a=a0.filter(l=>mt(l,lf));
 return `<div class="chips">${['all',...STS,'ไม่อนุมัติ','ค้างคืนเงินยืม'].map(s=>`<button class="chip ${lf==s?'on':''}" onclick="lf='${s}';render()">${s=='all'?'ทั้งหมด':s} <em>${a0.filter(l=>mt(l,s)).length}</em></button>`).join('')}</div>
 <div class="wrap"><table class="t"><tr><th>วันที่ไป</th><th>ชื่อ</th><th>เรื่อง</th><th>ยอดเบิก</th><th>สถานะ</th><th>เงินยืม</th><th></th></tr>
 ${a.map(l=>`<tr><td>${thS(l.start)}</td><td>${l.name}</td><td>${esc(l.title)}</td><td>${num(tot(l).all)}</td><td>${pill(l)}</td><td>${loanTag(l)}</td><td class="act"><button class="btn s" title="ดู/พิมพ์" onclick="preview(${l.id})">${ic('eye')}</button><button class="btn s p" title="PDF" onclick="doPDF(${l.id})">${ic('download')}</button>${role=='การเงิน'&&out(l)?`<button class="btn s g" onclick="retLoan(${l.id})">รับคืนเงินยืม</button>`:''}</td></tr>`).join('')||'<tr><td colspan=7>ยังไม่มีแฟ้มเบิก</td></tr>'}</table></div>
 ${sel&&byId(sel)?`<div class="card" id="pvCard" style="margin-top:18px"><div class="mbar"><b style="flex:1;align-self:center">เอกสารรวม — ${byId(sel).name}</b><button class="btn o" onclick="doPrint(${sel})">${ic('printer')} พิมพ์</button><button class="btn p" onclick="doPDF(${sel})">${ic('download')} PDF</button><button class="btn l" onclick="sel=null;render()">${ic('x')} ปิด</button></div><p class="sub" style="margin:0 0 10px">พิมพ์: เลือก A4 ไม่ต้องติ๊ก “ส่วนหัวและส่วนท้าย” หน้าแนวตั้ง/แนวนอนจะสลับให้เอง · PDF: รวมทุกหน้าเป็นไฟล์เดียว</p>${byId(sel).note?`<p class="mut">หมายเหตุ: ${esc(byId(sel).note)}</p>`:''}${pagesHTML(pagesOf(byId(sel),S))}</div>`:''}`}
function doPrint(id){$('#printRoot').innerHTML=pagesOf(byId(id),S).map(p=>p.html).join('');setTimeout(()=>print(),200)}
async function doPDF(id){modal('<div class="mb"><p>กำลังสร้าง PDF...</p></div>');const r=await makePDF(byId(id),S);window._pdf=r;
 modal(`<div class="mb"><div class="mbar"><button class="btn g" onclick="_pdf.pdf.save(_pdf.name)">${ic('download')} ดาวน์โหลด</button><button class="btn l" onclick="closeM()">${ic('x')} ปิด</button></div><p>${r.name}</p>${r.pages.map((p,i)=>`<p>หน้า ${i+1}/${r.pages.length}</p><img class="pdfimg" src="${p}">`).join('')}</div>`)}
async function retLoan(id){if(!confirm('บันทึกว่ารับคืนเงินยืมแล้ว?'))return;const l=byId(id);l.returned=today();await db.save(l);L=await db.trips();render();toast('บันทึกแล้ว')}
/* ---------- งานรอดำเนินการ (ธุรการ → การเงิน → ผู้อำนวยการ) ---------- */
function inbox(){const a=L.filter(l=>l.st===stepOf[role]).sort((x,y)=>x.id-y.id),dir=role=='ผู้อำนวยการ';
 if(!a.length)return `<div class="card empty">${ic('check')}<h3>ไม่มีงานค้าง</h3><p>เมื่อมีแฟ้มส่งมา จะแสดงที่นี่ทันที</p></div>`;
 return `<div class="bulk"><label class="chk"><input type="checkbox" onchange="document.querySelectorAll('.sk').forEach(x=>x.checked=this.checked)"> เลือกทั้งหมด (${a.length})</label><button class="btn g" onclick="bulk()">${ic('check')} ${dir?'อนุมัติ':'ตรวจแล้ว'}ที่เลือก</button></div>
 <div class="ib">${a.map(l=>`<div class="ic2"><div class="ch"><input type="checkbox" class="sk" value="${l.id}"><span class="av">${init(l.name)}</span><div><b>${l.name}</b><small>${l.pos}</small></div></div>
 <div class="cm"><b>${esc(l.title)}</b><br>${ic('calendar')} ${thS(l.start)} – ${thS(l.end)}</div><div class="cs">ยอดเบิก <b>${num(tot(l).all)}</b> บาท · แนบ ${l.atts.length} หน้า${l.loan.on?` · ยืม ${num(l.loan.amt)} บาท`:''}</div>
 <div class="ca"><button class="btn s l" onclick="preview(${l.id})">${ic('eye')} ดูเอกสาร</button><button class="btn s r" onclick="reject(${l.id})">${ic('x')} ส่งกลับ/ไม่อนุมัติ</button><button class="btn s g" onclick="step([${l.id}])">${ic('check')} ${dir?'อนุมัติ':'ตรวจแล้ว'}</button></div></div>`).join('')}</div>`}
const sigOk=k=>S.sigs[k]&&S.sigs[k].img;
const warnSig=ks=>ks.every(sigOk)||confirm('ยังไม่ได้ตั้งลายเซ็นในเมนูตั้งค่า ต้องการดำเนินการต่อโดยไม่มีลายเซ็นหรือไม่?');
async function step(ids){if(!ids.length)return alert('กรุณาเลือกแฟ้มก่อน');const[k,p]=SIGK[stepOf[role]];if(!warnSig([k]))return;
 for(const id of ids){const l=byId(id);if(l.st!==stepOf[role])continue;l[p+'Sig']=S.sigs[k];l[p+'Date']=today();l.st++;l.status=STS[l.st];await db.save(l)}L=await db.trips();render();toast('ดำเนินการแล้ว')}
async function bulk(){const ids=[...document.querySelectorAll('.sk:checked')].map(x=>+x.value);if(ids.length&&!confirm(`ดำเนินการ ${ids.length} แฟ้ม? (ระบบแทรกลายเซ็นให้อัตโนมัติ)`))return;step(ids)}
async function reject(id){const r=prompt('เหตุผลที่ส่งกลับ/ไม่อนุมัติ (ครูต้องสร้างแฟ้มใหม่)');if(r===null)return;const l=byId(id);l.st=-1;l.status='ไม่อนุมัติ';l.note=r;await db.save(l);L=await db.trips();render()}
/* ---------- ภาพรวม ---------- */
const filt=a=>a.filter(l=>F.mode=='all'||fy(l.start)==F.year);
function setF(k,v){F[k]=k=='mode'?v:+v;render()}
function dash(){const all=mine(),a=filt(all),ys=[...new Set([F.year,...L.map(l=>fy(l.start))])].sort().reverse(),ok=a.filter(l=>l.st>=0),sum=ok.reduce((s,l)=>s+tot(l).all,0),ol=all.filter(out).sort((x,y)=>dueDate(x).localeCompare(dueDate(y)));
 const rank=[...new Set(ok.map(l=>l.name))].map(n=>[n,ok.filter(l=>l.name==n).reduce((s,l)=>s+tot(l).all,0)]).sort((x,y)=>y[1]-x[1]).slice(0,8),rm=Math.max(1,...rank.map(r=>r[1]));
 const kp=[['file','k1',a.length,'แฟ้มทั้งหมด'],['download','k2',num(sum),'ยอดเบิกรวม (บาท)'],['inbox','k3',a.filter(l=>l.st>=0&&l.st<3).length,'รอดำเนินการ'],['calendar','k5',ol.length,'เงินยืมค้างคืน']];
 return `<div class="card"><div class="row"><div><label>สรุปตาม</label><select onchange="setF('mode',this.value)"><option value="fy" ${F.mode=='fy'?'selected':''}>ปีงบประมาณ</option><option value="all" ${F.mode=='all'?'selected':''}>ทั้งหมด</option></select></div>${F.mode=='fy'?`<div><label>ปี พ.ศ.</label><select onchange="setF('year',this.value)">${ys.map(y=>`<option ${y==F.year?'selected':''}>${y}</option>`).join('')}</select></div>`:''}</div></div>
 <div class="grid">${kp.map(k=>`<div class="card kpi ${k[1]}"><i>${ic(k[0])}</i><div><div class="big">${k[2]}</div>${k[3]}</div></div>`).join('')}</div>
 <div class="g2"><div class="card"><h3>เงินยืมที่ต้องส่งใช้คืน (ภายใน 15 วันหลังกลับ)</h3>${ol.map(l=>`<div class="wl"><span class="av">${init(l.name)}</span><div><b>${l.name}</b><small>${num(l.loan.amt)} บาท</small></div>${loanTag(l)}</div>`).join('')||'<p class="mut">ไม่มีเงินยืมค้างคืน</p>'}</div>
 ${role!='ครู'?`<div class="card"><h3>ยอดเบิกรายบุคคล (บาท)</h3>${rank.map(r=>`<div class="rk"><span>${r[0]}</span><div class="bar" style="width:${r[1]/rm*100}%"></div><b>${num(r[1]).replace('.00','')}</b></div>`).join('')||'<p class="mut">ยังไม่มีข้อมูล</p>'}</div>`:''}</div>`}
function tStaff(){const g=(k,l,x)=>`<div class="card"><h3>${l}</h3><div class="row">${x}</div>${sgBox(k,S.sigs[k])}</div>`;
 return `${g('director','ผู้อำนวยการ (ผู้อนุมัติ)',fld('director','ชื่อ-สกุล'))}${g('clerk','ธุรการ (ผู้ตรวจเอกสาร)',fld('clerk','ชื่อ-สกุล')+fld('clerkPos','ตำแหน่ง'))}${g('finance','เจ้าหน้าที่การเงิน',fld('finance','ชื่อ-สกุล')+fld('financePos','ตำแหน่ง'))}<p class="sub">ลายเซ็นใช้ไฟล์ PNG พื้นโปร่งใสได้ ปรับขนาด/ตำแหน่งได้</p><button class="btn g" onclick="saveStaff()">${ic('check')} บันทึกทั้งหมด</button>`}
function saveStaff(){rd(['director','clerk','clerkPos','finance','financePos']);['director','clerk','finance'].forEach(k=>S.sigs[k]={...SG[k]});persist()}
function tLeaves(){const a=[...L].sort((x,y)=>y.id-x.id);return `<div class="card k5"><div class="bulk" style="margin:0"><p class="sub" style="margin:0">ลบแฟ้มได้เฉพาะที่นี่ กู้คืนไม่ได้ — แนะนำสำรองข้อมูลก่อน</p><button class="btn r" onclick="delSel()">${ic('trash')} ลบที่เลือก</button></div></div>
 <div class="wrap" style="margin-top:12px"><table class="t"><tr><th><input type="checkbox" onchange="document.querySelectorAll('.dk').forEach(x=>x.checked=this.checked)"></th><th>วันที่ไป</th><th>ชื่อ</th><th>เรื่อง</th><th>ยอด</th><th>สถานะ</th><th></th></tr>${a.map(l=>`<tr><td><input type="checkbox" class="dk" value="${l.id}"></td><td>${thS(l.start)}</td><td>${l.name}</td><td>${esc(l.title)}</td><td>${num(tot(l).all)}</td><td>${pill(l)}</td><td><button class="btn s" onclick="preview(${l.id})">${ic('eye')}</button></td></tr>`).join('')||'<tr><td colspan=7>ยังไม่มีแฟ้ม</td></tr>'}</table></div>`}
function exportCSV(){const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';dl('\ufeff'+['วันที่ยื่น,ชื่อ,เรื่อง,สถานที่,ตั้งแต่,ถึง,ยอดเบิก,เงินยืม,ครบกำหนดคืน,คืนเมื่อ,สถานะ',...L.map(l=>[l.date,l.name,l.title,l.place,l.start,l.end,tot(l).all,l.loan.on?l.loan.amt:'',l.loan.on?dueDate(l):'',l.returned||'',l.status].map(q).join(','))].join('\n'),'ตารางเบิก_'+today()+'.csv','text/csv')}
/* ---------- ตั้งค่า (ต้องใช้รหัส) ---------- */
function settings(){if(!unlocked)return `<div class="card lockc">${ic('lock')}<h3>ส่วนนี้สำหรับผู้ดูแลระบบ</h3><p class="sub">กรอกรหัสผู้ดูแลเพื่อเข้าตั้งค่า${S.pinSet?'':'<br>รหัสเริ่มต้นคือ <b>1234</b> — เปลี่ยนทันทีหลังเข้าใช้'}</p><input id="pin" type="password" inputmode="numeric" placeholder="รหัสผู้ดูแล" onkeydown="if(event.key=='Enter')unlock()"><p><button class="btn g" onclick="unlock()">${ic('lock')} ปลดล็อก</button></p></div>`;
 const tabs=[['school','โรงเรียน','building'],['teachers','รายชื่อครู','users'],['staff','ผู้ลงนามและลายเซ็น','pen'],['trips','จัดการแฟ้มเบิก','file'],['sys','ระบบและสำรองข้อมูล','settings'],['sec','รหัสผ่าน','shield']];
 return `<div class="chips">${tabs.map(t=>`<button class="chip ${stab==t[0]?'on':''}" onclick="stab='${t[0]}';render()">${ic(t[2])} ${t[1]}</button>`).join('')}</div>${{school:tSchool,teachers:tTeachers,staff:tStaff,trips:tLeaves,sys:tSys,sec:tSec}[stab]()}`}
async function unlock(){const h=await sha($('#pin').value);if(await db.auth(h)){PH=h;unlocked=true;render()}else alert('รหัสไม่ถูกต้อง')}
async function persist(m){try{await db.saveSettings(S);toast(m||'บันทึกแล้ว')}catch{alert('บันทึกไม่สำเร็จ กรุณาปลดล็อกใหม่');unlocked=false;render()}}
const fld=(k,l)=>`<div><label>${l}</label><input id="s_${k}" value="${S[k]||''}"></div>`;
const rd=ks=>ks.forEach(k=>S[k]=$('#s_'+k).value);
function tSchool(){return `<div class="card k1"><div class="row">${fld('school','ชื่อโรงเรียน')}${fld('area','สังกัด')}${fld('fileFmt','ชื่อไฟล์ PDF ({name} {date})')}</div><p><button class="btn g" onclick="rd(['school','area','fileFmt']);persist()">${ic('check')} บันทึก</button></p></div>`}
function tTeachers(){return `<div class="card k2"><h3>เพิ่มครูทีละคน</h3><div class="row"><div><label>ชื่อ-สกุล</label><input id="nt_n"></div><div><label>ตำแหน่ง</label><input id="nt_p" placeholder="ครู / ครูชำนาญการ"></div><div><label>โทรศัพท์</label><input id="nt_t"></div></div><p><button class="btn g" onclick="addT()">${ic('plus')} เพิ่มครู</button></p></div>
 <div class="card k4" style="margin-top:14px"><h3>เพิ่มทีละหลายคน</h3><p class="sub">วางรายชื่อบรรทัดละคน รูปแบบ <b>ชื่อ|ตำแหน่ง|เบอร์โทร</b> (เว้นตำแหน่งหรือเบอร์ได้) วางจาก Excel ได้เลย</p><textarea id="nt_bulk" rows="5" placeholder="นายสมชาย ใจดี|ครู|0812345678"></textarea><p><button class="btn p" onclick="addBulk()">${ic('users')} เพิ่มทั้งหมด</button></p></div>
 <h3 style="margin-top:18px">รายชื่อครู (${S.teachers.length} คน)</h3><div class="wrap"><table class="t"><tr><th>#</th><th>ชื่อ-สกุล</th><th>ตำแหน่ง</th><th>โทรศัพท์</th><th>ลายเซ็น/ลบ</th></tr>${S.teachers.map((t,i)=>`<tr><td>${i+1}</td><td><input value="${t.n}" onchange="editT(${i},'n',this.value)"></td><td><input value="${t.p}" onchange="editT(${i},'p',this.value)"></td><td><input value="${t.t}" onchange="editT(${i},'t',this.value)"></td><td class="act"><button class="btn s ${t.sig&&t.sig.img?'g':'p'}" title="ลายเซ็นครู" onclick="tSigM(${i})">${ic('pen')}</button><button class="btn s r" onclick="delT(${i})">${ic('trash')}</button></td></tr>`).join('')}</table></div>`}
async function addT(){const n=$('#nt_n').value.trim();if(!n)return alert('กรุณากรอกชื่อ');S.teachers.push({id:uid(),n,p:$('#nt_p').value.trim(),t:$('#nt_t').value.trim()});await persist('เพิ่มครูแล้ว');render()}
async function addBulk(){const rows=$('#nt_bulk').value.split('\n').map(x=>x.trim()).filter(Boolean);if(!rows.length)return;rows.forEach(r=>{const[n,p,t]=r.split(/\||\t/);S.teachers.push({id:uid(),n:n.trim(),p:(p||'').trim(),t:(t||'').trim()})});await persist(`เพิ่ม ${rows.length} คนแล้ว`);render()}
function editT(i,k,v){S.teachers[i][k]=v.trim();persist('แก้ไขแล้ว')}
async function delT(i){if(confirm('ลบ '+S.teachers[i].n+' ?')){S.teachers.splice(i,1);await persist('ลบแล้ว');render()}}
function tSec(){return `<div class="card k5"><h3>เปลี่ยนรหัสผู้ดูแล</h3><div class="row"><div><label>รหัสใหม่ (อย่างน้อย 4 ตัว)</label><input id="np1" type="password"></div><div><label>ยืนยันรหัสใหม่</label><input id="np2" type="password"></div></div><p><button class="btn g" onclick="chPin()">${ic('shield')} เปลี่ยนรหัส</button></p><p class="sub">รหัสเก็บแบบเข้ารหัส (SHA-256) และเซิร์ฟเวอร์จะไม่ยอมให้แก้ตั้งค่าหากรหัสไม่ถูกต้อง</p></div>`}
async function chPin(){const a=$('#np1').value;if(a.length<4)return alert('รหัสต้องมีอย่างน้อย 4 ตัว');if(a!=$('#np2').value)return alert('รหัสยืนยันไม่ตรงกัน');S.pinHash=await sha(a);await persist('เปลี่ยนรหัสแล้ว');PH=S.pinHash;S.pinSet=true}
function tSigM(i){const t=S.teachers[i];modal(`<div class="mb"><h3>ลายเซ็นของ ${t.n}</h3><p class="sub">ตั้งไว้แล้วระบบจะใส่ในแฟ้มเบิกของครูท่านนี้ให้อัตโนมัติ</p>${sgBox('ts',t.sig)}<p><button class="btn g" onclick="t=S.teachers[${i}];t.sig={...SG.ts};persist();closeM();render()">${ic('check')} บันทึก</button> <button class="btn l" onclick="closeM()">ยกเลิก</button></p></div>`);sgR('ts')}
async function delSel(){const ids=[...document.querySelectorAll('.dk:checked')].map(x=>x.value);if(!ids.length)return alert('กรุณาเลือกแฟ้มเบิกก่อน');if(!confirm(`ลบ ${ids.length} แฟ้มเบิก? กู้คืนไม่ได้`))return;
 try{for(const id of ids)await db.del(id)}catch{alert('รหัสหมดอายุ กรุณาปลดล็อกใหม่');unlocked=false}L=await db.trips();render();toast('ลบแล้ว')}
function tSys(){ return `<div class="card k1" style="margin-top:14px"><h3>ฟอนต์ TH Sarabun New (ฝังในระบบ)</h3><p class="sub">อัปโหลดครั้งเดียว ระบบจะเก็บในฐานข้อมูลและโหลดให้ทุกเครื่อง (มือถือ แท็บเล็ต คอมพิวเตอร์) รวมถึงใน PDF</p>
 <div class="sgc"><label class="btn ${S.fonts&&S.fonts.r?'g':'p'}">${ic('upload')} ตัวปกติ THSarabunNew.ttf ${S.fonts&&S.fonts.r?'✓':''}<input type="file" accept=".ttf,.otf,.woff,.woff2" hidden onchange="fontUp('r',this)"></label>
 <label class="btn ${S.fonts&&S.fonts.b?'g':'p'}">${ic('upload')} ตัวหนา THSarabunNew-Bold.ttf ${S.fonts&&S.fonts.b?'✓':''}<input type="file" accept=".ttf,.otf,.woff,.woff2" hidden onchange="fontUp('b',this)"></label>
 ${S.fonts&&(S.fonts.r||S.fonts.b)?`<button class="btn s r" onclick="delFont()">${ic('trash')} ลบฟอนต์</button>`:''}</div></div>
 <div class="card" style="margin-top:14px"><h3>สำรองและส่งออกข้อมูล</h3><div class="sgc"><button class="btn p" onclick="exportJSON()">${ic('download')} สำรองข้อมูล (JSON)</button><button class="btn" onclick="exportCSV()">${ic('file')} ส่งออกตารางเบิก (CSV)</button><label class="btn l">${ic('upload')} นำเข้าข้อมูลสำรอง<input type="file" accept=".json" hidden onchange="importJSON(this)"></label></div></div>`}
function fontUp(k,inp){const f=inp.files[0];if(!f)return;if(f.size>900e3)return alert('ไฟล์ใหญ่เกินไป (เกิน 900 KB)');const r=new FileReader();r.onload=async()=>{S.fonts={...(S.fonts||{}),[k]:r.result};await persist('ฝังฟอนต์แล้ว');await loadFonts();render()};r.readAsDataURL(f)}
async function delFont(){if(!confirm('ลบฟอนต์ที่ฝังไว้?'))return;S.fonts={};await persist('ลบแล้ว');location.reload()}
function dl(txt,name,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type}));a.download=name;a.click()}
function exportJSON(){dl(JSON.stringify({settings:{...S,pinHash:undefined,pinSet:undefined,fonts:undefined},trips:L}),'สำรองระบบเบิก_'+today()+'.json','application/json')}
function importJSON(inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=async()=>{try{const d=JSON.parse(r.result);if(!confirm('นำเข้าข้อมูลสำรอง? ข้อมูลที่ id ซ้ำจะถูกแทนที่'))return;
 if(d.settings){delete d.settings.pinHash;Object.assign(S,d.settings);normS();await persist()}for(const l of d.trips||[])await db.save(l);L=await db.trips();render();toast('นำเข้าแล้ว')}catch{alert('ไฟล์ไม่ถูกต้อง')}};r.readAsText(f)}
function switchM(){modal(`<div class="mb"><h3>เปลี่ยนบทบาทหรือออก</h3><div class="sw">${[['ครู','user','k2'],['ธุรการ','briefcase','k3'],['การเงิน','briefcase','k1'],['ผู้อำนวยการ','building','k4']].filter(r=>r[0]!=role).map(r=>`<button class="${r[2]}" onclick="closeM();login('${r[0]}')">${ic(r[1])} เปลี่ยนเป็น${r[0]}</button>`).join('')}<button class="k5" onclick="closeM();role=null;me=null;unlocked=false;PH='';render()">${ic('logout')} ออกจากระบบ</button></div><p><button class="btn l" onclick="closeM()">ยกเลิก</button></p></div>`)}
init0();
