const nsg=x=>!x?null:typeof x=='string'?{img:x,s:100,x:0,y:0}:x;
const sgH=x=>{x=nsg(x);return`<div class="sgw">${x&&x.img?`<img src="${x.img}" style="height:${11*x.s/100}mm;left:calc(50% + ${x.x}mm);bottom:${-1-x.y}mm">`:''}</div>`};
const pd=s=>{const [y,m,d]=s.split('-').map(Number);return{d,m:MONTHS[m-1],y:y+543}};
const thS=s=>{if(!s)return'-';const x=pd(s);return`${x.d} ${x.m} ${x.y}`};
const fy=s=>{const [y,m]=s.split('-').map(Number);return m>=10?y+544:y+543};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num=n=>{n=+n||0;return n%1?n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):n.toLocaleString('en-US')};
const nz=n=>+n?num(n):'-';
function bahtText(v){let n=Math.round((+v||0)*100);if(!n)return'ศูนย์บาทถ้วน';const D=['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า'],P=['','สิบ','ร้อย','พัน','หมื่น','แสน'];
 const rd=s=>{let r='';const L=s.length;for(let i=0;i<L;i++){const d=+s[i],p=L-i-1;if(!d)continue;if(p==0&&d==1&&L>1)r+='เอ็ด';else if(p==1&&d==2)r+='ยี่สิบ';else if(p==1&&d==1)r+='สิบ';else r+=D[d]+P[p]}return r};
 const f=x=>x>=1e6?f(Math.floor(x/1e6))+'ล้าน'+(x%1e6?rd(String(x%1e6)):''):rd(String(x));
 const b=Math.floor(n/100),s=n%100;return(b?f(b)+'บาท':'')+(s?rd(String(s))+'สตางค์':'ถ้วน')}
// ยอดตามหมวดแบบ 8708: เบี้ยเลี้ยง = วัน×อัตรา, ที่พัก = วัน×อัตรา, พาหนะ, อื่น ๆ
const tot=t=>{const a=(+t.ad||0)*(+t.ar||0),h=(+t.hd||0)*(+t.hr||0),v=+t.va||0,o=+t.oa||0;return{a,h,v,o,all:a+h+v+o}};
const dueDate=t=>new Date(Date.parse(t.end+'T00:00:00Z')+15*864e5).toISOString().slice(0,10); // กลับถึง + 15 วัน
const dayN=t=>Math.round((Date.parse(t.end)-Date.parse(t.start))/864e5)+1;
const AK={approve:'หนังสืออนุมัติเดินทาง (ฉบับจริง)',invite:'หนังสือเชิญ/คำสั่ง/กำหนดการ',receipt:'ใบเสร็จ/หลักฐานจ่ายเงิน',other:'เอกสารอื่น ๆ'};
const TH=h=>h.replace(/>([^<]+)</g,(m,x)=>'>'+x.replace(/\d/g,d=>'๐๑๒๓๔๕๖๗๘๙'[d])+'<'); // เลขไทยเฉพาะข้อความ
const u=s=>esc(s)?`<span class="u">${esc(s)}</span>`:'<span class="u" style="display:inline-block;min-width:20mm">&nbsp;</span>';
const cbx=(on,r)=>`<span class="cbx${r?' r':''}${on?' on':''}"></span>`;
const dsh=x=>x?thS(x):'..........';
const sb=(lab,sig,name,pos,date)=>`<div><b>${lab}</b>${sgH(sig)}(ลงชื่อ).........................<br>(${esc(name)||'.........................'})<br>${esc(pos)}<br>วันที่ ${date?thS(date):'....../....../......'}</div>`;
const sg3=(sig,name,pos,date)=>`${sgH(sig)}ลงชื่อ..............................<br>(${esc(name)||'..........................'})<br>ตำแหน่ง ${esc(pos)}<br>วันที่ ${date?thS(date):'..........................'}`;
// ① บันทึกข้อความขออนุมัติไปราชการ
function memo(t,S){const ok=t.st==3;return `<div class="page p mm"><img class="logo" src="assets/logo.png" style="margin:0 0 1mm;height:20mm"><div class="t1" style="font-size:24pt">บันทึกข้อความ</div>
<p><b>ส่วนราชการ</b> ${u(S.school+' '+S.area)}</p><p><b>ที่</b> ${u(t.refNo)} &nbsp; <b>วันที่</b> ${u(dsh(t.refDate))}</p><p><b>เรื่อง</b> ${u('ขออนุมัติไปราชการ')}</p>
<p>เรียน ผู้อำนวยการ${esc(S.school)}</p><p>สิ่งที่ส่งมาด้วย &nbsp; ๑. ประมาณการค่าใช้จ่าย &nbsp; จำนวน ๑ ฉบับ</p>
<p class="in">ข้าพเจ้า ${u(t.name)} ตำแหน่ง ${u(t.pos)} สังกัด ${u(S.school+' '+S.area)} พร้อมด้วย ${u(t.with||'-')} ขออนุมัติไปราชการเพื่อ ${u(t.title)} ณ ${u(t.place)} ตั้งแต่วันที่ ${u(thS(t.start))} ถึงวันที่ ${u(thS(t.end))} มีกำหนด ${u(dayN(t))} วัน (รวมวันเดินทาง)</p>
<p class="in">ในการเดินทางไปราชการครั้งนี้ ข้าพเจ้าขออนุมัติเดินทางไปราชการ โดยยานพาหนะ ${u(t.veh||'รถยนต์ส่วนตัว')} และมีความประสงค์ขอเบิกค่าใช้จ่ายในการเดินทางไปราชการ ตามประมาณการค่าใช้จ่ายที่ส่งมาด้วยนี้</p>
<p class="in">ทั้งนี้ ข้าพเจ้าจะถือปฏิบัติตามระเบียบกระทรวงการคลังว่าด้วยการเบิกค่าใช้จ่ายในการเดินทางไปราชการ (ฉบับที่ ๓) พ.ศ. ๒๕๖๕ และ อื่น ๆ ที่เกี่ยวข้องทุกประการ</p><p class="in">จึงเรียนมาเพื่อโปรดพิจารณา</p>
<div class="sb" style="margin-left:85mm">${sg3(t.sig,t.name,t.pos,t.refDate||t.date)}</div>
<p style="margin-top:4mm"><b>คำสั่งผู้อำนวยการ${esc(S.school)}</b></p><p>${cbx(0,1)} ไม่อนุมัติให้ไปราชการ &nbsp;&nbsp;&nbsp; ${cbx(ok,1)} อนุมัติให้ไปราชการ</p>
<p style="margin-left:10mm">${cbx(0,1)} โดยไม่ผูกพันงบประมาณ</p><p style="margin-left:10mm">${cbx(0,1)} โดยเบิกจ่ายค่าเบี้ยเลี้ยง ค่าพาหนะ และค่าที่พัก ตามวงเงินงบประมาณที่ได้รับจัดสรร</p><p style="margin-left:10mm">${cbx(0,1)} อื่น ๆ ${u('')}</p>
<div class="sb" style="margin-left:85mm;margin-top:2mm">${sg3(t.dSig,S.director,'ผู้อำนวยการ'+S.school,t.dDate)}</div></div>`}
// ② ประมาณการค่าใช้จ่าย
function est(t,S){const T=tot(t),r=(n,b,a)=>`<tr><td style="text-align:center;font-weight:400">${n}</td><td style="text-align:left;line-height:1.15">${b}</td><td style="text-align:right">${a}</td><td></td></tr>`,rg=`ตั้งแต่วันที่ ${thS(t.start)} ถึงวันที่ ${thS(t.end)}`;
return `<div class="page p"><div class="t1">ประมาณการค่าใช้จ่ายในการเดินทางไปราชการ</div><p><b>เรื่อง</b> ${esc(t.title)} ณ ${esc(t.place)}</p><p>ของ ${esc(t.name)} ตำแหน่ง ${esc(t.pos)}</p><p>ระหว่างวันที่ ${thS(t.start)} ถึงวันที่ ${thS(t.end)}</p><p>ณ ${esc(t.place)}</p>
<table class="tb" style="margin-top:3mm"><tr><th style="width:12mm">ที่</th><th>รายการ</th><th style="width:32mm">จำนวนเงิน</th><th style="width:28mm">หมายเหตุ</th></tr>
${r(1,`ค่าเบี้ยเลี้ยงครู ประเภท ${cbx(0)}ก ${cbx(0)}ข<br>${rg}<br>รวม ${t.ad||'......'} วัน ๆ ละ ${t.ar||'......'} บาท`,nz(T.a))}
${r(2,`ค่าเบี้ยเลี้ยงนักเรียน ประเภท ${cbx(0)}ก ${cbx(0)}ข<br>ตั้งแต่วันที่ ........... ถึงวันที่ ...........<br>รวม ...... วัน ๆ ละ ...... บาท`,'-')}
${r(3,`ค่าเช่าที่พัก ${rg}<br>รวม ${t.hd||'......'} วัน ๆ ละ ${t.hr||'......'} บาท`,nz(T.h))}
${r(4,`ค่าพาหนะเดินทางไปราชการ (ระบุประเภทยานพาหนะ)<br>${esc(t.vt)||'-'}`,nz(T.v))}
${r(5,`ค่าใช้จ่ายอื่น ๆ (ระบุ)<br>${esc(t.ot)||'-'}`,nz(T.o))}
<tr><td colspan="2" style="text-align:right"><b>รวม</b></td><td style="text-align:right"><b>${num(T.all)}</b></td><td></td></tr></table>
<p style="margin-top:2mm">ตัวอักษร ( ${bahtText(T.all)} )</p><p class="in">ข้าพเจ้าขอรับรองว่าประมาณการค่าใช้จ่ายในการเดินทางไปราชการ ครั้งนี้ เป็นความจริงทุกประการ</p>
<div class="sb" style="margin-left:85mm">${sgH(t.sig)}ลงชื่อ.......................... ผู้ประมาณการ<br>(${esc(t.name)})<br>ตำแหน่ง ${esc(t.pos)}<br>วันที่ ${thS(t.date)}</div></div>`}
// ③ แบบ 8708 ส่วนที่ 1 (หน้า)
function f1(t,S){const T=tot(t),lo=t.loan&&t.loan.on,cs=v=>['บ้านพัก','สำนักงาน','ประเทศไทย'].map(x=>`${cbx(v==x)}${x}`).join(' '),n=t.evn||(t.atts||[]).filter(a=>a.k=='receipt').length||'......';
return `<div class="page p f8"><div class="fr"><span>สัญญายืมเงินเลขที่ ${u('')} วันที่ ${u(lo?thS(t.loan.date):'')}</span><b>ส่วนที่ 1</b></div><div class="fr"><span>ชื่อผู้ยืม ${u(lo?t.name:'')} จำนวนเงิน ${u(lo?num(t.loan.amt):'')} บาท</span><b>แบบ 8708</b></div>
<div class="t1" style="margin:4mm 0">ใบเบิกค่าใช้จ่ายในการเดินทางไปราชการ</div><div class="r">ที่ทำการ ${u(S.school)}<br>วันที่ ${u(thS(t.date))}</div>
<p><b>เรื่อง</b> &nbsp; ขออนุมัติเบิกค่าใช้จ่ายในการเดินทางไปราชการ</p><p><b>เรียน</b> &nbsp; ผู้อำนวยการ${esc(S.school)}</p>
<p class="in">ตามบันทึก ${u(t.refNo)} ลงวันที่ ${u(dsh(t.refDate))} ซึ่ง ${u('ผู้อำนวยการ'+S.school)} ได้อนุมัติให้ข้าพเจ้า ${u(t.name)} ตำแหน่ง ${u(t.pos)} สังกัด ${u(S.school+' '+S.area)} พร้อมด้วย ${u(t.with||'-')} เดินทางไปปฏิบัติราชการ ${u(t.title)} ณ ${u(t.place)}</p>
<p class="in">โดยออกเดินทางจาก ${cs(t.from||'สำนักงาน')} ตั้งแต่วันที่ ${u(thS(t.start))} เวลา ${u(t.tOut)} น. และกลับถึง ${cs(t.to||'สำนักงาน')} ตั้งแต่วันที่ ${u(thS(t.end))} เวลา ${u(t.tIn)} น. รวมเวลาไปราชการครั้งนี้ ${u(dayN(t))} วัน ${u('')} ชั่วโมง ${u('')} นาที</p>
<p class="in">ข้าพเจ้าขอเบิกค่าใช้จ่ายในการเดินทางไปราชการสำหรับ ${cbx(1)}ข้าพเจ้า ${cbx(0)}คณะเดินทาง ดังนี้</p>
<p>ค่าเบี้ยเลี้ยงเดินทาง ${u('-')} จำนวน ${u(t.ad||'-')} วัน รวม ${u(nz(T.a))} บาท</p><p>ค่าเช่าที่พักประเภท ${u(t.ht||'-')} จำนวน ${u(t.hd||'-')} วัน รวม ${u(nz(T.h))} บาท</p>
<p>ค่าพาหนะ ${u(t.vt||'-')} รวม ${u(nz(T.v))} บาท</p><p>ค่าใช้จ่ายอื่น ${u(t.ot||'-')} รวม ${u(nz(T.o))} บาท</p>
<p>จำนวนเงิน (ตัวอักษร) ${u(bahtText(T.all))} รวมเงินทั้งสิ้น ${u(num(T.all))} บาท</p>
<p class="in">ข้าพเจ้าขอรับรองว่ารายการที่กล่าวมาข้างต้นเป็นความจริง และหลักฐานการจ่ายที่ส่งมาด้วย จำนวน ${u(n)} ฉบับ รวมทั้งจำนวนเงินที่ขอเบิกถูกต้องตามกฎหมายทุกประการ</p>
<div class="sb" style="margin-left:70mm;margin-top:10mm">${sgH(t.sig)}ลงชื่อ.............................. ผู้ขอรับเงิน<br>(${esc(t.name)})<br>ตำแหน่ง ${esc(t.pos)}</div></div>`}
// ③ แบบ 8708 (หลัง): ตรวจสอบ/อนุมัติ/รับเงิน/หมายเหตุ/คำชี้แจง
function f2(t,S){const T=tot(t),lo=t.loan&&t.loan.on,paid=t.st==3;
return `<div class="page p f8"><div class="bx"><div><div style="min-height:19mm">ได้ตรวจสอบหลักฐานการเบิกจ่ายเงินที่แนบถูกต้อง<br>เห็นควรอนุมัติให้เบิกจ่ายได้</div><div>${sg3(t.fSig,S.finance,S.financePos,t.fDate)}</div></div><div><div style="min-height:19mm">อนุมัติให้จ่ายได้</div><div>${sg3(t.dSig,S.director,'ผู้อำนวยการ'+S.school,t.dDate)}</div></div></div>
<p class="in" style="margin-top:6mm">ได้รับเงินค่าใช้จ่ายในการเดินทางไปราชการ จำนวน ${u(num(T.all))} บาท ( ${bahtText(T.all)} ) ไว้เป็นการถูกต้องแล้ว</p>
<div class="fr" style="text-align:center;margin-top:3mm"><div style="flex:1">${sg3(paid?t.sig:null,t.name,t.pos,'')}<br>(ผู้รับเงิน)</div><div style="flex:1">${sg3(paid?t.fSig:null,S.finance,S.financePos,paid?t.fDate:'')}<br>(ผู้จ่ายเงิน)</div></div>
<p style="margin-top:4mm">จากเงินยืม ตามสัญญาเลขที่ ${u('')} วันที่ ${u(lo?thS(t.loan.date):'')}</p><hr style="border-top:.4mm solid #000">
<p><b><u>หมายเหตุ</u></b></p><p>${u(t.note8)}</p><p>${u('')}</p>
<p class="cm" style="margin-top:4mm"><b><u>คำชี้แจง</u></b> &nbsp; ๑. กรณีเดินทางเป็นหมู่คณะและจัดทำใบเบิกค่าใช้จ่ายรวมฉบับเดียวกัน หากระยะเวลาในการเริ่มต้นและสิ้นสุดการเดินทางของแต่ละบุคคลแตกต่างกัน ให้แสดงรายละเอียดของวันที่แตกต่างกันของบุคคลนั้นในช่องหมายเหตุ</p>
<p class="cm" style="margin-left:17mm">๒. กรณียื่นขอเบิกค่าใช้จ่ายรายบุคคล ให้ผู้ขอรับเงินเป็นผู้ลงลายมือชื่อผู้รับเงินและวันเดือนปีที่รับเงิน กรณีที่มีการยืมเงินให้ระบุวันที่ที่ได้รับเงินยืม เลขที่สัญญายืมและวันที่อนุมัติเงินยืมด้วย</p>
<p class="cm" style="margin-left:17mm">๓. กรณีที่ยื่นขอเบิกค่าใช้จ่ายรวมเป็นหมู่คณะ ผู้ขอรับเงินมิต้องลงลายมือชื่อในช่องผู้รับเงิน ทั้งนี้ ให้ผู้มีสิทธิแต่ละคนลงลายมือชื่อผู้รับเงินในหลักฐานการจ่ายเงิน (ส่วนที่ ๒)</p></div>`}
// ④ แบบ 8708 ส่วนที่ 2 (แนวนอน)
function p2(t,S){const T=tot(t),paid=t.st==3;return `<div class="page l f8"><div style="text-align:right"><b>ส่วนที่ 2</b><br><b>แบบ 8708</b></div><div class="t1" style="margin-top:0">หลักฐานการจ่ายเงินค่าใช้จ่ายในการเดินทางไปราชการ</div>
<div class="c"><b>ชื่อส่วนราชการ</b> ${u(S.school)}</div><p>ประกอบใบเบิกค่าใช้จ่ายในการเดินทางของ ${u(t.name)} ลงวันที่ ${u(thS(t.date))}</p>
<table class="tb"><tr><th rowspan="2" style="width:9mm">ที่</th><th rowspan="2">ชื่อ - สกุล</th><th rowspan="2">ตำแหน่ง</th><th colspan="4">ค่าใช้จ่าย</th><th rowspan="2">รวม</th><th rowspan="2" style="width:30mm">ลายมือชื่อผู้รับเงิน</th><th rowspan="2" style="width:22mm">วัน เดือน ปี ที่รับเงิน</th><th rowspan="2" style="width:22mm">หมายเหตุ</th></tr><tr><th>ค่าเบี้ยเลี้ยง</th><th>ค่าเช่าที่พัก</th><th>ค่าพาหนะ</th><th>ค่าใช้จ่ายอื่น</th></tr>
<tr><td>1.</td><td style="text-align:left">${esc(t.name)}</td><td>${esc(t.pos)}</td><td>${nz(T.a)}</td><td>${nz(T.h)}</td><td>${nz(T.v)}</td><td>${nz(T.o)}</td><td>${num(T.all)}</td><td>${paid?sgH(t.sig):''}</td><td></td><td></td></tr>
${('<tr>'+'<td>&nbsp;</td>'.repeat(11)+'</tr>').repeat(6)}
<tr><td colspan="3" style="text-align:right!important"><b>รวมเงิน</b></td><td>${nz(T.a)}</td><td>${nz(T.h)}</td><td>${nz(T.v)}</td><td>${nz(T.o)}</td><td>${num(T.all)}</td><td colspan="3" style="text-align:left;font-weight:400">ตามสัญญาเงินยืมเลขที่ ..........<br>วันที่ ..........</td></tr></table>
<div class="fr" style="margin-top:2mm"><div>จำนวนเงินรวมทั้งสิ้น (ตัวอักษร) ${u(bahtText(T.all))}</div><div style="text-align:center;width:90mm">${sg3(paid?t.fSig:null,S.finance,S.financePos,paid?t.fDate:'')}<br>(ผู้จ่ายเงิน)</div></div>
<p class="cm"><b>คำชี้แจง</b> ๑. ค่าเบี้ยเลี้ยงและค่าเช่าที่พักให้ระบุอัตราวันและจำนวนวันที่ขอเบิกของแต่ละบุคคลในช่องหมายเหตุ ๒. ให้ผู้มีสิทธิแต่ละคนเป็นผู้ลงลายมือชื่อผู้รับเงินและวันเดือนปีที่ได้รับเงิน กรณีเป็นการรับจากเงินยืม ให้ระบุวันที่ที่ได้รับจากเงินยืม ๓. ผู้จ่ายเงิน หมายถึง ผู้ที่ขอยืมเงินจากทางราชการ และจ่ายเงินยืมนั้นให้แก่ผู้เดินทางแต่ละคน เป็นผู้ลงลายมือชื่อผู้จ่ายเงิน</p></div>`}
// สัญญายืมเงิน (ร่างโดยระบบ — แนวตั้ง)
function loanDoc(t,S){const a=+t.loan.amt||0;return `<div class="page p"><img class="logo" src="assets/logo.png"><div class="t1">สัญญาการยืมเงิน</div><div class="r">เลขที่ ................<br>วันที่ ${thS(t.loan.date||t.date)}</div>
<p><b>ส่วนราชการ</b> ${esc(S.school)} ${esc(S.area)}</p><p><b>เรียน</b> ผู้อำนวยการ${esc(S.school)}</p>
<p class="in">ข้าพเจ้า ${esc(t.name)} ตำแหน่ง ${esc(t.pos)} สังกัด ${esc(S.school)} ขอยืมเงินราชการเพื่อเป็นค่าใช้จ่ายในการเดินทางไปราชการ เรื่อง ${esc(t.title)} ณ ${esc(t.place)} ตั้งแต่วันที่ ${thS(t.start)} ถึงวันที่ ${thS(t.end)} เป็นจำนวนเงิน ${num(a)} บาท ( ${bahtText(a)} )</p>
<p class="in">ข้าพเจ้าสัญญาว่าจะใช้เงินยืมตามวัตถุประสงค์ข้างต้น และจะส่งใช้คืนเงินยืมพร้อมหลักฐานการจ่ายภายใน ๑๕ วัน นับตั้งแต่วันที่เดินทางกลับมาถึง คือภายในวันที่ ${thS(dueDate(t))} หากไม่ส่งใช้คืนตามกำหนด ข้าพเจ้ายินยอมให้หักเงินเดือนหรือเงินอื่นใดที่ข้าพเจ้าพึงได้รับ เพื่อชดใช้เงินยืมได้ทันที</p>
<div class="sb">${sgH(t.sig)}(ลงชื่อ)............................ ผู้ยืม<br>(${esc(t.name)})</div>
<div class="sg3">${sb('เจ้าหน้าที่การเงิน (ตรวจสอบ)',t.fSig,S.finance,S.financePos,t.fDate)}${sb('ผู้อนุมัติ',t.dSig,S.director,'ผู้อำนวยการ'+S.school,t.dDate)}</div>
<p style="margin-top:10mm"><b>ใบรับเงิน</b> ข้าพเจ้าได้รับเงินยืมจำนวน ${num(a)} บาท ไปถูกต้องแล้ว</p><div class="sb">${sgH(t.sig)}(ลงชื่อ)............................ ผู้รับเงิน<br>วันที่ ........../........../..........</div></div>`}
const attPg=a=>{const o=a.w>a.h?'l':'p';return{o,html:`<div class="page ${o} att"><img src="${a.img}"></div>`}};
// ลำดับหน้า: บันทึกขออนุมัติ+ประมาณการ (หรือไฟล์จริงที่แนบ) → หนังสือเชิญ → 8708 ส่วน 1 หน้า-หลัง → ส่วน 2 → ใบเสร็จ → สัญญายืมเงิน → อื่น ๆ
function pagesOf(t,S){const A=k=>(t.atts||[]).filter(a=>a.k==k).map(attPg),G=(o,h)=>({o,html:S.thaiNum===false?h:TH(h)});
 return[...(t.nomemo?[]:[G('p',memo(t,S)),G('p',est(t,S))]),...A('approve'),...A('invite'),G('p',f1(t,S)),G('p',f2(t,S)),G('l',p2(t,S)),...A('receipt'),...(t.loan&&t.loan.on?[G('p',loanDoc(t,S))]:[]),...A('other')]}
const pagesHTML=pg=>pg.map(p=>`<div class="pv">${p.html}</div>`).join('');
function fname(t,S){return(S.fileFmt||DEFAULTS.fileFmt).replace('{name}',t.name).replace('{date}',t.start)+'.pdf'}
async function makePDF(t,S){await document.fonts.ready;const pg=pagesOf(t,S),host=document.createElement('div');host.style.cssText='position:fixed;left:-10000px;top:0';host.innerHTML=pg.map(p=>p.html).join('');document.body.appendChild(host);
 try{await Promise.all([...host.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>i.onload=i.onerror=r)));
 let pdf;const imgs=[],els=[...host.children];
 for(let i=0;i<els.length;i++){const l=pg[i].o=='l',cv=await html2canvas(els[i],{scale:innerWidth<700?1.3:1.8,useCORS:true,backgroundColor:'#fff'}),u=cv.toDataURL('image/jpeg',.9);
  if(!pdf)pdf=new jspdf.jsPDF({orientation:l?'l':'p',unit:'mm',format:'a4'});else pdf.addPage('a4',l?'l':'p');
  pdf.addImage(u,'JPEG',0,0,l?297:210,l?210:297);imgs.push(u)}
 return{pdf,pages:imgs,name:fname(t,S)}}finally{host.remove()}}
