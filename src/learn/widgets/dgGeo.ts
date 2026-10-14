// @ts-nocheck
// Rysovačky z deskriptívy (Metódy zobrazovania). Geometria sa počíta, nič nie je nakreslené od oka.
// Každá funkcia vracia kúsok SVG ako text; triedy (class="aux" …) sa pred vykreslením
// prevedú na farby kriedovej tabule v dgStyle(). Kód je prenesený z HTML prezentácie
// „Deskriptíva po kúskoch“, preto je bez typov.

// ---------- geometry + svg helpers ----------
const V={add:(a,b)=>[a[0]+b[0],a[1]+b[1]],sub:(a,b)=>[a[0]-b[0],a[1]-b[1]],mul:(a,k)=>[a[0]*k,a[1]*k],
  len:a=>Math.hypot(a[0],a[1]),dot:(a,b)=>a[0]*b[0]+a[1]*b[1],
  unit:a=>{const l=Math.hypot(a[0],a[1]);return[a[0]/l,a[1]/l]},perp:a=>[-a[1],a[0]],
  lerp:(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]};
function LX(p,d,q,e){const c=d[0]*e[1]-d[1]*e[0],w=V.sub(q,p),t=(w[0]*e[1]-w[1]*e[0])/c;return V.add(p,V.mul(d,t))}
function CX(c1,r1,c2,r2){const d=V.len(V.sub(c2,c1)),a=(r1*r1-r2*r2+d*d)/(2*d),h=Math.sqrt(Math.max(0,r1*r1-a*a)),
  u=V.unit(V.sub(c2,c1)),m=V.add(c1,V.mul(u,a)),n=V.perp(u);return[V.add(m,V.mul(n,h)),V.sub(m,V.mul(n,h))]}
const f=n=>Math.round(n*10)/10;
const sk=(n,d=1)=>n.toFixed(d).replace('.',',');
const ln=(a,b,c='aux')=>`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" class="${c}"/>`;
const xl=(a,b,c='aux',k=30)=>{const u=V.unit(V.sub(b,a));return ln(V.sub(a,V.mul(u,k)),V.add(b,V.mul(u,k)),c)};
const ci=(o,r,c='aux')=>`<circle cx="${f(o[0])}" cy="${f(o[1])}" r="${f(r)}" class="${c}"/>`;
const arc=(o,r,p,span=.3,c='aux')=>{const a=Math.atan2(p[1]-o[1],p[0]-o[0]);
  const A=[o[0]+r*Math.cos(a-span),o[1]+r*Math.sin(a-span)],B=[o[0]+r*Math.cos(a+span),o[1]+r*Math.sin(a+span)];
  return `<path d="M${f(A[0])} ${f(A[1])} A${f(r)} ${f(r)} 0 0 1 ${f(B[0])} ${f(B[1])}" class="${c}"/>`};
function angArc(o,r,p,q,c='ang'){const a0=Math.atan2(p[1]-o[1],p[0]-o[0]),a1=Math.atan2(q[1]-o[1],q[0]-o[0]);let d=a1-a0;
  while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
  const A=[o[0]+r*Math.cos(a0),o[1]+r*Math.sin(a0)],B=[o[0]+r*Math.cos(a0+d),o[1]+r*Math.sin(a0+d)];
  return `<path d="M${f(A[0])} ${f(A[1])} A${r} ${r} 0 0 ${d>0?1:0} ${f(B[0])} ${f(B[1])}" class="${c}"/>`}
function tx(x,y,s,c='lab'){let out='',cur=0,m;const re=/([_^])(\{[^}]*\}|.)|([^_^]+)/g;
  while((m=re.exec(s))){let t,tg,sm=false;if(m[3]!==undefined){t=m[3];tg=0}else{t=m[2].replace(/[{}]/g,'');tg=m[1]=='_'?4:-5;sm=true}
    out+=`<tspan dy="${tg-cur}"${sm?' font-size="9.5"':''}>${t}</tspan>`;cur=tg}
  return `<text x="${f(x)}" y="${f(y)}" class="${c}">${out}</text>`}
const H=s=>s.replace(/([_^])(\{[^}]*\}|[^<\s])/g,(m,a,b)=>{b=b.replace(/[{}]/g,'');return a=='_'?`<sub>${b}</sub>`:`<sup>${b}</sup>`});
const pt=(p,l='',dx=7,dy=-7,c='dot',tc='')=>`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="2.8" class="${c}"/>`+(l?tx(p[0]+dx,p[1]+dy,l,tc):'');
const poly=(ps,c='plane')=>`<polygon points="${ps.map(p=>f(p[0])+','+f(p[1])).join(' ')}" class="${c}"/>`;
const pl=(ps,c='cont')=>`<polyline points="${ps.map(p=>f(p[0])+','+f(p[1])).join(' ')}" class="${c}"/>`;
const dbl=(a,b)=>{const n=V.mul(V.perp(V.unit(V.sub(b,a))),1.7);return ln(V.add(a,n),V.add(b,n),'thin')+ln(V.sub(a,n),V.sub(b,n),'thin')};
const tick=(p,d,k=5,c='thin')=>{const n=V.mul(V.perp(V.unit(d)),k);return ln(V.add(p,n),V.sub(p,n),c)};
function arrow(a,b,c='given'){const u=V.unit(V.sub(b,a)),n=V.perp(u),t=V.sub(b,V.mul(u,9));
  return ln(a,b,c)+poly([b,V.add(t,V.mul(n,4)),V.sub(t,V.mul(n,4))],'arr')}
function scaleBar(x,y,u,n){let s=ln([x,y],[x+u*n,y],'thin');for(let i=0;i<=n;i++)s+=ln([x+u*i,y-4],[x+u*i,y+4],'thin')+tx(x+u*i-3,y-8,''+i,'mutl');
  return s+tx(x+u*n+8,y+4,'j','mutl')}
const P3=(x,y,z)=>[30+x+0.45*y,255-z-0.3*y];
const piPlane=(yd=160)=>poly([P3(0,0,0),P3(260,0,0),P3(260,yd,0),P3(0,yd,0)],'plane')+tx(P3(250,8,0)[0]-8,P3(250,8,0)[1]-4,'π','mutl');
const sdir=[0.5,0.25,-1];
const prj=A=>[A[0]+A[2]*sdir[0],A[1]+A[2]*sdir[1],0];
const S3=A=>P3(A[0],A[1],A[2]);

// ---------- figures: kužeľosečky ----------
function figElDef(){const S=[200,150],M=[200+150*Math.cos(-1.05),150+90*Math.sin(-1.05)];
  return ln([50,150],[350,150],'dash')+ln([200,60],[200,240],'dash')+`<ellipse cx="200" cy="150" rx="150" ry="90" class="res"/>`
  +ln([80,150],M)+ln([320,150],M)+pt([80,150],'F_1',-8,18)+pt([320,150],'F_2',-8,18)+pt(S,'S',6,16)+pt([50,150],'A',-16,-6)
  +pt([350,150],'B',8,-6)+pt([200,60],'C',6,-8)+pt([200,240],'D',6,16)+pt(M,'M',8,-8,'rdot')
  +tx(140,100,'r_1','auxl')+tx(305,112,'r_2','auxl')+tx(120,166,'a','mutl')+tx(206,110,'b','mutl')+tx(255,166,'e','mutl')}
const stEl=(()=>{const S=[200,150],F1=[100,150],F2=[300,150],A=[60,150],B=[340,150],R=[170,150];
  const r1=V.len(V.sub(R,A)),r2=V.len(V.sub(R,B)),p=CX(F1,r1,F2,r2),q=CX(F1,r2,F2,r1);
  return[
  {t:'<b>Dané:</b> ohniská F_1, F_2 a dĺžka 2a (úsečka hore).',d:()=>ln([60,24],[340,24],'given')+tick([60,24],[1,0])+tick([340,24],[1,0])+tx(192,18,'2a')+pt(F1,'F_1',-8,18)+pt(F2,'F_2',-8,18)},
  {t:'Nájdi stred S úsečky F_1F_2. Od S nanes na obe strany dĺžku a. Dostaneš hlavné vrcholy A, B.',d:()=>ln([40,150],[360,150],'dash')+pt(S,'S',-4,18)+pt(A,'A',-14,-6)+pt(B,'B',8,-6)},
  {t:'Zvoľ ľubovoľný bod R <b>medzi ohniskami</b>. Odmeraj r_1 = |AR| a r_2 = |BR|. Spolu dávajú 2a.',d:()=>pt(R,'R',-4,-9,'adot','auxl')+tx(105,142,'r_1','auxl')+tx(250,142,'r_2','auxl')},
  {t:'Kružidlom: oblúk so stredom F_1 a polomerom r_1, oblúk so stredom F_2 a polomerom r_2. Pretnú sa v 2 bodoch elipsy.',d:()=>p.map(x=>arc(F1,r1,x,.28)+arc(F2,r2,x,.2)+pt(x,'',0,0,'rdot')).join('')},
  {t:'Vymeň polomery: r_2 okolo F_1 a r_1 okolo F_2. Ďalšie 2 body. Máš 4 body z jednej voľby R.',d:()=>q.map(x=>arc(F1,r2,x,.2)+arc(F2,r1,x,.28)+pt(x,'',0,0,'rdot')).join('')},
  {t:'Kontrola: každý bod má súčet vzdialeností od ohnísk 2a. Elipsa nimi prechádza.',d:()=>`<ellipse cx="200" cy="150" rx="140" ry="${f(Math.sqrt(140*140-100*100))}" class="res"/>`}]})();
const stElOsk=(()=>{const A=[50,150],B=[350,150],C=[200,70],D=[200,250],K=[50,70],a=150,b=90,S=[200,160];
  const Aa=[50,160],Ba=[350,160],Kk=[50,70],dAC=V.sub(C,Aa),n=V.perp(dAC),SA=LX(Kk,n,Aa,[1,0]),SC=LX(Kk,n,C,[0,1]);
  const rA=V.len(V.sub(SA,Aa)),rC=V.len(V.sub(SC,C)),SB=[400-SA[0],160],SD=[200,320-SC[1]];
  return[
  {t:'<b>Dané:</b> hlavná os AB a vedľajšia os CD (kolmé, pretínajú sa v strede S).',d:()=>ln(Aa,Ba,'given')+ln(C,D,'given')+pt(Aa,'A',-14,-6)+pt(Ba,'B',8,-6)+pt(C,'C',6,-8)+pt(D,'D',6,16)+pt(S,'S',6,16)},
  {t:'Doplň obdĺžnik: bod K je roh nad A vo výške C. Spoj A s C (uhlopriečka).',d:()=>ln(Aa,Kk)+ln(Kk,C)+ln(Aa,C)+pt(Kk,'K',-14,-6,'adot','auxl')},
  {t:'Z bodu K spusti <b>kolmicu na AC</b>. Pretne hlavnú os v bode S_A a vedľajšiu os v bode S_C.',d:()=>xl(Kk,SC,'aux',14)+pt(SA,'S_A',6,16,'adot','auxl')+pt(SC,'S_C',8,4,'adot','auxl')},
  {t:'Kružnica so stredom S_A cez A a kružnica so stredom S_C cez C. To sú oskulačné kružnice vo vrcholoch.',d:()=>ci(SA,rA)+arc(SC,rC,C,.5)},
  {t:'Súmerne podľa S to isté pre B a D.',d:()=>ci(SB,rA)+arc(SD,rC,D,.5)+pt(SB,'',0,0,'adot')+pt(SD,'',0,0,'adot')},
  {t:'Elipsu dotiahni: pri vrcholoch ide po oskulačných kružniciach, medzi nimi ju plynulo spoj.',d:()=>`<ellipse cx="200" cy="160" rx="${a}" ry="${b}" class="res"/>`}]})();
function hypPath(S,a,b){let s='';for(const sg of[1,-1]){let d='';for(let t=-1.3;t<=1.301;t+=.1)d+=(d?'L':'M')+f(S[0]+sg*a*Math.cosh(t))+' '+f(S[1]+b*Math.sinh(t));s+=`<path d="${d}" class="res"/>`}return s}
function figHypDef(){const S=[200,150],a=60,b=80,M=[200+60*Math.cosh(.8),150-80*Math.sinh(.8)];
  return ln([30,150],[370,150],'dash')+hypPath(S,a,b)+ln([100,150],M)+ln([300,150],M)+pt([100,150],'F_1',-8,18)+pt([300,150],'F_2',-2,18)
  +pt([140,150],'A',-14,-6)+pt([260,150],'B',-14,-6)+pt(S,'S',-4,18)+pt(M,'M',8,-6,'rdot')+tx(170,100,'r_1','auxl')+tx(296,112,'r_2','auxl')}
const stHyp=(()=>{const S=[200,150],F1=[100,150],F2=[300,150],A=[140,150],B=[260,150],R=[330,150];
  const r1=V.len(V.sub(R,A)),r2=V.len(V.sub(R,B)),p=CX(F1,r1,F2,r2),q=CX(F1,r2,F2,r1);
  return[
  {t:'<b>Dané:</b> ohniská F_1, F_2 a dĺžka 2a.',d:()=>ln([140,24],[260,24],'given')+tick([140,24],[1,0])+tick([260,24],[1,0])+tx(192,18,'2a')+pt(F1,'F_1',-8,18)+pt(F2,'F_2',-8,18)},
  {t:'Stred S, od neho na obe strany dĺžka a. Vrcholy A, B.',d:()=>ln([20,150],[380,150],'dash')+pt(S,'S',-4,18)+pt(A,'A',-14,-6)+pt(B,'B',6,-6)},
  {t:'Zvoľ bod R na osi <b>mimo úsečky F_1F_2</b> (za ohniskom). r_1 = |AR|, r_2 = |BR|. Ich rozdiel je 2a.',d:()=>pt(R,'R',-4,-9,'adot','auxl')},
  {t:'Oblúk okolo F_1 s polomerom r_1 a oblúk okolo F_2 s polomerom r_2. Dva body hyperboly.',d:()=>p.map(x=>arc(F1,r1,x,.18)+arc(F2,r2,x,.45)+pt(x,'',0,0,'rdot')).join('')},
  {t:'Vymeň polomery. Dva body na druhej vetve. Spolu 4 body.',d:()=>q.map(x=>arc(F1,r2,x,.45)+arc(F2,r1,x,.18)+pt(x,'',0,0,'rdot')).join('')},
  {t:'Hyperbola má dve vetvy, každá prechádza svojím vrcholom.',d:()=>hypPath(S,60,80)}]})();
const stHypAs=(()=>{const S=[200,150],a=60,b=80,e=100,A=[140,150],B=[260,150],P=[260,70],u=V.unit([a,-b]),SB=LX(P,V.perp(u),S,[1,0]),r=SB[0]-260,SA=[400-SB[0],150];
  return[
  {t:'<b>Dané:</b> F_1, F_2, 2a. Stred S a vrcholy A, B už vieš (|SA| = a).',d:()=>ln([20,150],[380,150],'dash')+pt([100,150],'F_1',-8,18)+pt([300,150],'F_2',-2,18)+pt(S,'S',-4,18)+pt(A,'A',-14,-6)+pt(B,'B',6,16)},
  {t:'Kružnica so stredom S cez ohniská (polomer e). Vo vrcholoch A, B postav kolmice na os. Priesečníky tvoria obdĺžnik.',d:()=>ci(S,e)+ln([140,60],[140,240])+ln([260,60],[260,240])+ln([140,70],[260,70])+ln([140,230],[260,230])+pt(P,'P',6,-6,'adot','auxl')},
  {t:'<b>Asymptoty</b> sú uhlopriečky tohto obdĺžnika (idú cez S).',d:()=>xl([140,230],[260,70],'given',60)+xl([140,70],[260,230],'given',60)},
  {t:'V bode P postav <b>kolmicu na asymptotu</b>. Pretne os v bode S_B, strede oskulačnej kružnice vrchola B.',d:()=>xl(P,SB,'aux',10)+pt(SB,'S_B',-6,18,'adot','auxl')},
  {t:'Kružnica so stredom S_B cez B. Súmerne S_A pre vrchol A.',d:()=>arc(SB,r,B,.75)+arc(SA,r,A,.75)+pt(SA,'S_A',-10,18,'adot','auxl')},
  {t:'Hyperbola sa vo vrchole drží oskulačnej kružnice a ďalej sa blíži k asymptotám.',d:()=>hypPath(S,a,b)}]})();
function parPath(){let d='';for(let y=-125;y<=125;y+=5)d+=(d?'L':'M')+f(120+y*y/160)+' '+f(150+y);return `<path d="${d}" class="res"/>`}
const stPar=(()=>{const F=[160,150],D=[80,150],Vv=[120,150],O=[200,150];
  const P=r=>{const x=80+r,h=Math.sqrt(r*r-(x-160)*(x-160));return[[x,150-h],[x,150+h]]};
  return[
  {t:'<b>Dané:</b> ohnisko F a riadiaca priamka d.',d:()=>ln([80,15],[80,285],'given')+tx(66,30,'d')+pt(F,'F',6,-8)},
  {t:'Os o ide cez F kolmo na d. Päta je D. <b>Vrchol V</b> je stred úsečky FD. Dĺžka |FD| = p (parameter).',d:()=>ln([40,150],[380,150],'dash')+tx(366,144,'o','mutl')+pt(D,'D',-16,-6)+pt(Vv,'V',-4,18,'rdot')},
  {t:'Zvoľ vzdialenosť r. Narysuj rovnobežku s d vo vzdialenosti r a oblúk okolo F s polomerom r. Priesečníky sú 2 body paraboly.',d:()=>ln([150,40],[150,260])+P(70).map(x=>arc(F,70,x,.3)+pt(x,'',0,0,'rdot')).join('')+tx(108,60,'r','auxl')+ln([80,66],[150,66],'dash')},
  {t:'Zopakuj s iným r. Máš 4 body. Každý je rovnako ďaleko od F aj od d.',d:()=>ln([200,20],[200,280])+P(120).map(x=>arc(F,120,x,.2)+pt(x,'',0,0,'rdot')).join('')},
  {t:'<b>Oskulačná kružnica vo vrchole:</b> stred na osi, polomer p = |FD|. Stred je teda od V ďalej o p.',d:()=>ci(O,80)+pt(O,'S_V',6,16,'adot','auxl')},
  {t:'Parabola ide cez V a všetky 4 body.',d:()=>parPath()}]})();

// ---------- figures: rovnobežné premietanie (3D sketches, computed) ----------
function seg3(A,B,c){return ln(S3(A),S3(B),c)}
function figRPdef(){const A=[70,60,120],B=[160,50,80],A1=prj(A),B1=prj(B),s0=[5,150,120],s1=[5+25,150+12.5,70];
  return piPlane()+arrow(S3(s0),S3(s1))+tx(S3(s0)[0]+10,S3(s0)[1]+6,'s')+seg3(A,A1,'aux')+seg3(B,B1,'aux')
  +pt(S3(A),'A',7,-6)+pt(S3(B),'B',7,-6)+pt(S3(A1),"A'",8,5,'rdot','resl')+pt(S3(B1),"B'",8,5,'rdot','resl')}
function figRPline(){const A=[40,50,120],B=[140,40,70],A1=prj(A),B1=prj(B),C=[205,95,110],D=[205+20,95+10,70],C1=prj(C);
  return piPlane()+seg3(A,A1,'dash')+seg3(B,B1,'dash')+xl(S3(A),S3(B),'given',14)+xl(S3(A1),S3(B1),'res',14)+tx(S3(A)[0]-4,S3(A)[1]-12,'a')+tx(S3(A1)[0]-6,S3(A1)[1]+20,"a'",'resl')
  +ln(S3([C[0]-12,C[1]-6,C[2]+24]),S3(C1),'given')+tx(S3(C)[0]+8,S3(C)[1]-6,'c ∥ s')+pt(S3(C1),"c'",8,5,'rdot','resl')}
function figRPkeep(){const A=[30,40,110],B=[120,30,60],C=[110,115,125],D=[110+72,115-8,125-40],M=V.lerp(A,B,.5);
  const g=(X,Y)=>seg3(X,Y,'given')+seg3(prj(X),prj(Y),'res')+seg3(X,prj(X),'dash')+seg3(Y,prj(Y),'dash');
  const M3=[(A[0]+B[0])/2,(A[1]+B[1])/2,(A[2]+B[2])/2];
  return piPlane()+g(A,B)+g(C,D)+pt(S3(M3),'M',6,-6)+pt(S3(prj(M3)),"M'",6,14,'rdot','resl')+seg3(M3,prj(M3),'dash')
  +tx(S3(A)[0]-14,S3(A)[1]-4,'A')+tx(S3(B)[0]+6,S3(B)[1]-4,'B')+tx(S3(C)[0]-14,S3(C)[1]-4,'C')+tx(S3(D)[0]+6,S3(D)[1]-4,'D')}
function figStopnik(){const Q=[50,30,130],P=[150,70,0],R=[190,86,-52];
  return piPlane()+ln(S3(Q),S3(P),'given')+ln(S3(P),S3(R),'dash')+tx(S3(Q)[0]+8,S3(Q)[1],'a')+pt(S3(P),'P',8,-4,'rdot','resl')}
const PL={P1:[30,120,0],P2:[230,40,0],v:[40,100,110],u:[200,-80,0]};
const pa=(s,t)=>[PL.P1[0]+s*PL.u[0]+t*PL.v[0],PL.P1[1]+s*PL.u[1]+t*PL.v[1],t*PL.v[2]];
function planeBase(){return piPlane(215)+poly([S3(pa(0,0)),S3(pa(1,0)),S3(pa(1,1)),S3(pa(0,1))],'wall')+tx(S3(pa(.93,.9))[0],S3(pa(.93,.9))[1],'α','mutl')
  +ln(S3(pa(-.08,0)),S3(pa(1.08,0)),'res')+tx(S3(pa(1.08,0))[0]-2,S3(pa(1.08,0))[1]+16,'p^α','resl')}
function figStopa(){return planeBase()}
function figHlavne(){return planeBase()+[.33,.66].map(t=>ln(S3(pa(0,t)),S3(pa(1,t)),'aux')).join('')+tx(S3(pa(0,.66))[0]-22,S3(pa(0,.66))[1]+4,'h^α','auxl')
  +ln(S3(pa(.45,0)),S3(pa(.45,1)),'given')+tx(S3(pa(.45,1))[0]+6,S3(pa(.45,1))[1]+14,'s^α')+rAng(pa(.45,.33),PL.u,PL.v)}
function rAng(o,u,v){const k=.045,a=[o[0]+u[0]*k,o[1]+u[1]*k,o[2]],b=[a[0]+v[0]*k*1.6,a[1]+v[1]*k*1.6,a[2]+v[2]*k*1.6],c=[o[0]+v[0]*k*1.6,o[1]+v[1]*k*1.6,o[2]+v[2]*k*1.6];
  return pl([S3(a),S3(b),S3(c)],'ang')}
function figSpadRoviny(){const F=pa(.5,0),T=pa(.5,1),T1=[T[0],T[1],0];
  return planeBase()+ln(S3(F),S3(T),'given')+ln(S3(F),S3(T1),'aux')+ln(S3(T),S3(T1),'dash')+tx(S3(T)[0]+6,S3(T)[1]+14,'s^α')+tx(S3(T1)[0]+6,S3(T1)[1]+4,'s_1^α','auxl')
  +angArc(S3(F),26,S3(T1),S3(T))+tx(S3(F)[0]+30,S3(F)[1]-14,'φ')}
function figSeg(kind){ // kolmé premietanie úsečky: tri polohy
  const z=(A,B,l)=>{const A1=[A[0],A[1],0],B1=[B[0],B[1],0];return seg3(A,A1,'dash')+seg3(B,B1,'dash')+seg3(A,B,'given')+seg3(A1,B1,'res')+pt(S3(A1),'',0,0,'rdot')+pt(S3(B1),'',0,0,'rdot')+tx(S3(A)[0]-4,S3(A)[1]-10,l,'mutl')};
  return piPlane()+z([15,50,90],[85,50,90],'rovnobežná')+z([110,80,50],[170,80,120],'všeobecná')+z([225,60,40],[225,60,120],'kolmá')}
function figKruh(){const el=(cx,k,l)=>{let a='',b='';for(let i=0;i<=36;i++){const t=i/36*2*Math.PI,x=cx+38*Math.cos(t),y=80+38*Math.sin(t)*Math.cos(k),zz=100+38*Math.sin(t)*Math.sin(k);
    a+=(i?'L':'M')+S3([x,y,zz]).map(f).join(' ');b+=(i?'L':'M')+S3([x,y,0]).map(f).join(' ')}
    return `<path d="${a}" class="given"/><path d="${b}" class="res"/>`+tx(S3([cx-30,80,150])[0],S3([cx-30,80,150])[1],l,'mutl')};
  return piPlane()+el(45,0,'kružnica')+el(132,.9,'elipsa')+el(218,Math.PI/2,'úsečka')}

// ---------- figures: kótované ----------
function figKota(){const A=[120,80,100],A1=[120,80,0],B=[200,60,-45],B1=[200,60,0];
  return piPlane()+seg3(A,A1,'aux')+pt(S3(A),'A',7,-6)+pt(S3(A1),'A_1(3)',8,5,'rdot','resl')+tx(S3([120,80,50])[0]-34,S3([120,80,50])[1],'z_A = 3','auxl')
  +seg3(B,B1,'dash')+pt(S3(B),'B',7,6)+pt(S3(B1),'B_1(−1,5)',8,-4,'rdot','resl')}
function figKPriamka(){const P=[30,30,0],st=[58,24,30];let s=piPlane();const pk=k=>[P[0]+k*st[0],P[1]+k*st[1],k*st[2]];
  s+=ln(S3(pk(-.3)),S3(pk(3.5)),'given')+ln(S3([pk(-.3)[0],pk(-.3)[1],0]),S3([pk(3.5)[0],pk(3.5)[1],0]),'res');
  for(let k=0;k<=3;k++){const X=pk(k),X1=[X[0],X[1],0];if(k)s+=seg3(X,X1,'dash')+pt(S3(X),'',0,0);s+=pt(S3(X1),'('+k+')',-6,18,'rdot','resl')}
  const a=pk(1),b=pk(2),c=[b[0],b[1],a[2]];s+=seg3(a,c,'aux')+seg3(c,b,'aux')+tx(S3(c)[0]-30,S3(c)[1]+14,'i','auxl')+tx(S3(c)[0]+5,S3(c)[1]-10,'1','auxl');
  s+=angArc(S3(P),30,S3([pk(1)[0],pk(1)[1],0]),S3(pk(1)))+tx(S3(P)[0]+36,S3(P)[1]-6,'φ')+tx(S3(pk(3.5))[0]-4,S3(pk(3.5))[1]-8,'m')+tx(S3([pk(3.5)[0],pk(3.5)[1],0])[0]+4,S3([pk(3.5)[0],pk(3.5)[1],0])[1]+4,'m_1','resl');
  return s+pt(S3(P),'P',-14,-4)}
const K1=(()=>{const A=[80,200],B=[310,120],u=13,d=V.unit(V.sub(B,A)),n=V.perp(d),Ar=V.add(A,V.mul(n,2.3*u)),Br=V.sub(B,V.mul(n,6.7*u)),P=V.lerp(A,B,2.3/9),
  L=V.len(V.sub(B,A))/u,sp=9/L,T=Math.hypot(L,9),phi=Math.atan(sp)*180/Math.PI,P1=V.add(P,V.mul(d,u/sp));return{A,B,u,d,n,Ar,Br,P,L,sp,T,phi,P1}})();
const stK1=[
  {t:'<b>Dané:</b> A_1(−2,3) a B_1(6,7), jednotka j. Čísla v zátvorke sú kóty (výšky).',d:()=>scaleBar(20,24,K1.u,5)+ln(K1.A,K1.B,'given')+pt(K1.A,'A_1(−2,3)',-30,20)+pt(K1.B,'B_1(6,7)',8,14)},
  {t:'<b>Sklopenie:</b> v A_1 a B_1 postav kolmice na A_1B_1. Nanes na ne kóty. Kóty majú opačné znamienka, preto idú na <b>opačné strany</b>.',d:()=>ln(K1.A,K1.Ar)+ln(K1.B,K1.Br)+pt(K1.Ar,'(A)',8,10,'adot','auxl')+pt(K1.Br,'(B)',8,-4,'adot','auxl')+tx(K1.B[0]+6,(K1.B[1]+K1.Br[1])/2,'6,7 j','mutl')+tx(K1.A[0]-42,K1.A[1]+20,'','mutl')},
  {t:`Spoj (A)(B). Táto úsečka je <b>skutočná dĺžka</b> AB. Tu vychádza asi ${sk(K1.T)} j.`,d:()=>ln(K1.Ar,K1.Br,'res')},
  {t:'Kde (A)(B) pretne priemet A_1B_1, tam je <b>stopník P</b>. Je to bod priamky s kótou 0.',d:()=>pt(K1.P,'P(0)',-12,-10,'rdot','resl')},
  {t:`Uhol pri P medzi priemetom a sklopenou priamkou je <b>spádový uhol φ</b> (tu asi ${sk(K1.phi,0)}°).`,d:()=>angArc(K1.P,30,K1.B,K1.Br)+tx(K1.P[0]+36,K1.P[1]-18,'φ')},
  {t:`<b>Spád</b> s = tg φ = rozdiel kót : dĺžka priemetu = 9 : ${sk(K1.L)} ≈ ${sk(K1.sp,2)}. <b>Interval</b> i = 1 : s ≈ ${sk(1/K1.sp,2)} j. Je to vzdialenosť priemetov bodov s kótami 0 a 1.`,d:()=>pt(K1.P1,'(1)',-4,18,'rdot','resl')+tx((K1.P[0]+K1.P1[0])/2-4,(K1.P[1]+K1.P1[1])/2+16,'i','resl')}];
const stK2=(()=>{const A=[110,80],B=[300,190],w=V.unit([.35,-1]),E=V.add(B,V.mul(w,126)),dir=V.sub(A,E);
  return[
  {t:'<b>Dané:</b> A_1(96), B_1(89). Stupňovať znamená nájsť body s celými kótami 90, 91, … 95.',d:()=>ln(A,B,'given')+pt(A,'A_1(96)',-58,-6)+pt(B,'B_1(89)',8,16)},
  {t:'Rozdiel kót je 96 − 89 = 7. Úsečku A_1B_1 treba rozdeliť na <b>7 rovnakých dielov</b>. Z B_1 veď pomocný lúč ľubovoľným smerom a nanes naň 7 rovnakých dielikov.',d:()=>{let s=ln(B,V.add(B,V.mul(w,140)));for(let k=1;k<=7;k++)s+=tick(V.add(B,V.mul(w,18*k)),w,4,'aux');return s}},
  {t:'Posledný (siedmy) dielik spoj s bodom A_1.',d:()=>ln(E,A)},
  {t:'Ostatnými dielikmi veď rovnobežky s touto spojnicou. Na A_1B_1 vysekávajú body s kótami 90 až 95.',d:()=>{let s='';for(let k=1;k<7;k++){const q=V.lerp(B,A,k/7);s+=ln(V.add(B,V.mul(w,18*k)),q)+pt(q,''+(89+k),-4,-9,'rdot','resl')}return s}},
  {t:'Vzdialenosť dvoch susedných bodov je <b>interval</b> priamky. Malý interval znamená strmú priamku.',d:()=>''}]})();
const stK3=(()=>{const A=[70,210],B=[330,130],u=12,d=V.unit(V.sub(B,A)),n=V.perp(d),M=V.lerp(A,B,.4),Br=V.sub(B,V.mul(n,7*u)),Mr=V.sub(M,V.mul(n,2.8*u));
  return[
  {t:'<b>Dané:</b> A_1(38), B_1(45) a priemet M_1 bodu na priamke. Hľadáme kótu M.',d:()=>scaleBar(20,24,u,5)+xl(A,B,'given',20)+pt(A,'A_1(38)',-20,20)+pt(B,'B_1(45)',-10,20)+pt(M,'M_1',-6,20)},
  {t:'Počítaj od nižšieho bodu. A berieme ako nulu, B je o 7 vyššie. V B_1 postav kolmicu a nanes 7 j. Dostaneš (B).',d:()=>ln(B,Br)+pt(Br,'(B)',8,-2,'adot','auxl')+tx(B[0]+6,(B[1]+Br[1])/2,'7 j','mutl')},
  {t:'Spoj A_1 s (B). To je sklopená priamka.',d:()=>ln(A,Br)},
  {t:'V M_1 postav kolmicu až po sklopenú priamku. Jej dĺžka je výška M nad A.',d:()=>ln(M,Mr)+pt(Mr,'(M)',-30,-4,'adot','auxl')},
  {t:'Odmeraj: |M_1(M)| = 2,8 j. Kóta M = 38 + 2,8 = <b>40,8</b>.',d:()=>ln(M,Mr,'res')+tx(M[0]+8,(M[1]+Mr[1])/2+4,'2,8 j','resl')}]})();
const stK4=(()=>{const A=[110,80],B=[60,200],C=[200,250],N=V.lerp(A,C,.6),h=V.unit(V.sub(N,B)),m=V.perp(h),Q=[300,150];
  const ft=p=>V.add(Q,V.mul(m,V.dot(V.sub(p,Q),m))),fA=ft(A),fB=ft(B),fC=ft(C),st=V.mul(V.sub(fC,fA),1/5);
  return[
  {t:'<b>Dané:</b> rovina α troma bodmi A_1(−1), B_1(2), C_1(4).',d:()=>pt(A,'A_1(−1)',8,-6)+pt(B,'B_1(2)',-10,20)+pt(C,'C_1(4)',8,6)},
  {t:'Hľadáme dva body s <b>rovnakou kótou</b>. B má kótu 2. Na AC (od −1 po 4, teda 5 dielov) je bod N s kótou 2 v troch pätinách od A.',d:()=>{let s=ln(A,C);for(let k=1;k<5;k++)s+=tick(V.lerp(A,C,k/5),V.sub(C,A),3,'aux');return s+pt(N,'N(2)',8,-4,'adot','auxl')}},
  {t:'Spojnica B_1N je <b>hlavná priamka</b> h(2). Všetky jej body majú kótu 2.',d:()=>xl(B,N,'aux',40)+tx(B[0]-34,B[1]+2,'h_1^α(2)','auxl')},
  {t:'<b>Spádové merítko</b> s_1^α je kolmé na hlavné priamky. Rysuje sa dvojitou čiarou. Hlavné priamky cez A_1 a C_1 naň prenesú kóty −1 a 4.',d:()=>dbl(V.sub(fA,V.mul(m,26)),V.add(fC,V.mul(m,26)))+ln(A,fA)+ln(C,fC)+ln(N,fB)+tx(fA[0]-2,fA[1]-34,'s_1^α')+[[fA,'−1'],[fB,'2'],[fC,'4']].map(x=>tick(x[0],m,6)+tx(x[0][0]+10,x[0][1]+4,x[1],'resl')).join('')},
  {t:'Úsek od −1 po 4 rozdeľ na 5 rovnakých dielov. Merítko je vystupňované. Jeden dielik je <b>interval roviny</b>.',d:()=>[1,2,4].map(k=>{const q=V.add(fA,V.mul(st,k));return tick(q,m,5,'aux')+tx(q[0]+10,q[1]+4,''+(k-1),'auxl')}).join('')}]})();
const SM=(()=>{const d=V.unit([110,200]),m12=[200,205],g=34;const mk=k=>V.sub(m12,V.mul(d,(k-12)*g));return{d,mk,g}})();
function smBase(){let s=dbl(SM.mk(16.6),SM.mk(10.6))+tx(SM.mk(16.6)[0]-26,SM.mk(16.6)[1]+4,'s_1^α');for(const k of[12,15])s+=tick(SM.mk(k),SM.d,6)+tx(SM.mk(k)[0]-26,SM.mk(k)[1]+6,''+k);return s}
const stK5=(()=>{const M=[290,110],t=V.dot(V.sub(M,SM.mk(12)),SM.d),ft=V.add(SM.mk(12),V.mul(SM.d,t)),kz=12-t/SM.g;
  return[
  {t:'<b>Dané:</b> rovina α spádovým merítkom (značky 12 a 15) a priemet M_1 bodu roviny.',d:()=>smBase()+pt(M,'M_1',8,-6)},
  {t:'Dostupňuj merítko: úsek 12 až 15 rozdeľ na 3 diely. Máš 13 a 14.',d:()=>[13,14].map(k=>tick(SM.mk(k),SM.d,5,'aux')+tx(SM.mk(k)[0]-26,SM.mk(k)[1]+6,''+k,'auxl')).join('')},
  {t:'Bodom M_1 veď <b>hlavnú priamku</b>: kolmicu na merítko. Všetky jej body majú rovnakú kótu ako M.',d:()=>xl(M,ft,'aux',16)},
  {t:`Prečítaj kótu tam, kde hlavná priamka pretne merítko. Tu medzi 13 a 14, asi <b>${sk(kz)}</b>.`,d:()=>pt(ft,sk(kz),10,18,'rdot','resl')}]})();
const stK6=(()=>{const j=20,a=SM.mk(12),b=SM.mk(15),n=V.perp(SM.d),Br=V.add(b,V.mul(n,3*j)),phi=Math.atan(3*j/(3*SM.g))*180/Math.PI;
  return[
  {t:'<b>Dané:</b> spádové merítko so značkami 12 a 15 a jednotka j.',d:()=>scaleBar(250,30,j,4)+smBase()},
  {t:'Spádový uhol roviny je spádový uhol jej <b>spádovej priamky</b>. Sklopíme ju: v bode 15 postav kolmicu a nanes rozdiel kót 15 − 12 = 3 j.',d:()=>ln(b,Br)+pt(Br,'(15)',8,4,'adot','auxl')+tx((b[0]+Br[0])/2,(b[1]+Br[1])/2-8,'3 j','mutl')},
  {t:'Spoj bod 12 so sklopeným bodom (15).',d:()=>ln(a,Br,'res')},
  {t:`Uhol pri bode 12 je <b>spádový uhol roviny φ</b> (tu asi ${sk(phi,0)}°).`,d:()=>angArc(a,32,b,Br)+tx(a[0]+6,a[1]-40,'φ')},
  {t:`<b>Interval roviny</b> je jeden dielik merítka (tu ${sk(SM.g/j)} j). <b>Spád roviny</b> s = 1 : i = tg φ ≈ ${sk(j/SM.g,2)}.`,d:()=>[13,14].map(k=>tick(SM.mk(k),SM.d,5,'aux')).join('')+tx(SM.mk(13.5)[0]-22,SM.mk(13.5)[1]+6,'i','resl')}]})();
const stK7=(()=>{const u=V.unit([.66,-.75]),n=V.perp(u),p4=[230,200],ha=k=>V.sub(p4,V.mul(V.mul(n,-1),-(k-4)*30));
  const al=k=>V.add(p4,V.mul(n,-(k-4)*30)),v=V.unit([1,.12]),m=V.perp(v),b3=[200,215],be=k=>V.sub(b3,V.mul(m,(k-3)*45));
  const X4=LX(al(4),u,be(4),v),X5=LX(al(5),u,be(5),v);
  const La=(k,c)=>ln(V.sub(al(k),V.mul(u,120)),V.add(al(k),V.mul(u,95)),c),Lb=(k,c)=>ln(V.sub(be(k),V.mul(v,150)),V.add(be(k),V.mul(v,150)),c);
  return[
  {t:'<b>Dané:</b> rovina α hlavnými priamkami h(4), h(7) a rovina β hlavnými priamkami h(3), h(5).',d:()=>La(4,'given')+La(7,'given')+Lb(3,'thin')+Lb(5,'thin')+tx(V.sub(al(4),V.mul(u,120))[0]-4,V.sub(al(4),V.mul(u,120))[1]+16,'h_1^α(4)')+tx(V.sub(al(7),V.mul(u,120))[0]-30,V.sub(al(7),V.mul(u,120))[1]+16,'h_1^α(7)')+tx(352,be(3)[1]+36,'h_1^β(3)')+tx(352,be(5)[1]+36,'h_1^β(5)')},
  {t:'Potrebujeme hlavné priamky s <b>rovnakými kótami</b> v oboch rovinách. V α rozdeľ pás 4 až 7 na 3 diely: h(5), h(6). V β rozpoľ pás 3 až 5: h(4).',d:()=>La(5)+La(6)+Lb(4)},
  {t:'Kde sa pretnú h^α(4) a h^β(4), tam je spoločný bod oboch rovín. To isté pre kótu 5.',d:()=>pt(X4,'4',8,4,'rdot','resl')+pt(X5,'5',8,4,'rdot','resl')},
  {t:'Spojnica týchto dvoch bodov je <b>priesečnica r</b> rovín α a β.',d:()=>xl(X4,X5,'res',70)+tx(X5[0]+6,X5[1]-60,'r_1','resl')}]})();
const stK8=(()=>{const u=V.unit([.98,-.2]),pa0=[200,250],ha1=[200,225],pb0=[200,60],hb1=[200,100],g=V.unit([.3,1]),g0=[150,150],g1=[190,150];
  const a0=LX(g0,g,pa0,u),a1=LX(g1,g,ha1,u),b0=LX(g0,g,pb0,u),b1=LX(g1,g,hb1,u),R=LX(a0,V.sub(a1,a0),b0,V.sub(b1,b0));
  const L=(p,c)=>ln(V.sub(p,V.mul(u,170)),V.add(p,V.mul(u,170)),c);
  return[
  {t:'<b>Dané:</b> α stopou p^α a hlavnou priamkou h(1), β rovnako. Všetky štyri priamky sú <b>rovnobežné</b>, takže sa nepretnú.',d:()=>L(pa0,'given')+L(ha1,'thin')+L(pb0,'given')+L(hb1,'thin')+tx(34,pa0[1]+52,'p_1^α')+tx(34,ha1[1]+26,'h_1^α(1)','mutl')+tx(34,pb0[1]+28,'p_1^β')+tx(34,hb1[1]+52,'h_1^β(1)','mutl')},
  {t:'Priesečnica bude tiež rovnobežná s nimi. Stačí nájsť <b>jeden jej bod</b>. Pomôže tretia, pomocná rovina γ: dve rovnobežky ľubovoľného smeru s kótami 0 a 1.',d:()=>xl(g0,V.add(g0,g),'aux',125)+xl(g1,V.add(g1,g),'aux',125)+tx(V.add(g0,V.mul(g,-128))[0]-22,34,'g(0)','auxl')+tx(V.add(g1,V.mul(g,-128))[0]+8,34,'g(1)','auxl')},
  {t:'Priesečnica γ s α: spoj bod g(0)×p^α s bodom g(1)×h^α(1). Priesečnica γ s β: to isté hore.',d:()=>pt(a0,'',0,0,'adot')+pt(a1,'',0,0,'adot')+pt(b0,'',0,0,'adot')+pt(b1,'',0,0,'adot')+ln(a0,V.add(a0,V.mul(V.sub(a1,a0),3.6)))+ln(b0,V.add(b0,V.mul(V.sub(b1,b0),3.6)))},
  {t:'Tieto dve priamky sa pretnú v bode R. Leží v α aj v β.',d:()=>pt(R,'R',8,-6,'rdot','resl')},
  {t:'Bodom R veď rovnobežku so stopami. To je <b>priesečnica r</b>.',d:()=>L(R,'res')+tx(350,R[1]-40,'r_1','resl')}]})();
function figRovnPriamka(){const M=[70,200],N=[230,130],B=[150,245],C=V.add(B,V.sub(N,M));
  return xl(M,N,'given',20)+pt(M,'M_1(38)',-26,-8)+pt(N,'N_1(45)',-20,-8)+tx(N[0]+34,N[1]-22,'a_1')+xl(B,C,'res',20)+pt(B,'B_1(5)',-10,20)+pt(C,'(12)',-6,20,'rdot','resl')+tx(C[0]+30,C[1]-18,'b_1','resl')}
function figRovnRovina(){const u=V.unit([1,.75]),n=V.perp(u),a=[120,110],b=V.add(a,V.mul(n,60)),B=[300,120],B2=V.add(B,V.mul(n,60));
  const L=(p,c)=>ln(V.sub(p,V.mul(u,90)),V.add(p,V.mul(u,90)),c);
  return L(a,'given')+L(b,'given')+tx(V.add(a,V.mul(u,90))[0]+4,V.add(a,V.mul(u,90))[1]+4,'h_1^α(13)')+tx(V.add(b,V.mul(u,90))[0]-6,V.add(b,V.mul(u,90))[1]+18,'h_1^α(16)')
  +L(B,'res')+L(B2,'res')+pt(B,'B_1(5)',8,-6)+tx(V.sub(B,V.mul(u,90))[0]-6,V.sub(B,V.mul(u,90))[1]-6,'h_1^β(5)','resl')+tx(V.sub(B2,V.mul(u,90))[0]-52,V.sub(B2,V.mul(u,90))[1]+4,'h_1^β(8)','resl')}

// ---------- figures: krivky ----------
function figDot(){let d='';for(let x=40;x<=360;x+=6)d+=(d?'L':'M')+x+' '+f(210-.0022*(x-60)*(x-60)-40*Math.sin(x/70));
  const g=x=>210-.0022*(x-60)*(x-60)-40*Math.sin(x/70),x0=190,T=[x0,g(x0)],sl=(g(x0+.5)-g(x0-.5)),u=V.unit([1,sl]),n=V.perp(u);
  return `<path d="${d}" class="given"/>`+ln(V.sub(T,V.mul(u,110)),V.add(T,V.mul(u,110)),'res')+ln(V.sub(T,V.mul(n,70)),V.add(T,V.mul(n,70)),'aux')+pt(T,'T',8,-8)
  +tx(V.add(T,V.mul(u,110))[0]-20,V.add(T,V.mul(u,110))[1]-8,'t','resl')+tx(V.add(T,V.mul(n,70))[0]+6,V.add(T,V.mul(n,70))[1],'n','auxl')+tx(46,200,'k')}
function figInterp(){const P=[[40,110],[110,40],[200,120],[290,50],[360,110]];let s='';
  const cr=(off)=>{let d='';for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
    for(let t=0;t<=1.001;t+=.1){const t2=t*t,t3=t2*t,q=k=>.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3);d+=(d?'L':'M')+f(q(0))+' '+f(q(1)+off)}}return d};
  s+=`<path d="${cr(0)}" class="res"/>`+P.map(p=>pt(p)).join('')+tx(150,150,'interpolačná: ide cez všetky body','mutl');
  const Q=P.map(p=>[p[0],p[1]+150]);let d='';const n=4,C=[1,4,6,4,1];for(let t=0;t<=1.001;t+=.04){let x=0,y=0;for(let i=0;i<=n;i++){const w=C[i]*Math.pow(t,i)*Math.pow(1-t,n-i);x+=w*Q[i][0];y+=w*Q[i][1]}d+=(d?'L':'M')+f(x)+' '+f(y)}
  return s+pl(Q,'dash')+`<path d="${d}" class="res"/>`+Q.map(p=>pt(p)).join('')+tx(110,292,'aproximačná: bodmi je len riadená','mutl')}
function figValec(){let a='',b='',s='';const pts=[];for(let i=0;i<=24;i++){const t=.25+i/24*(Math.PI-.5),p=[150-90*Math.cos(t),225-40*Math.sin(t)];pts.push(p)}
  const v=[70,-120];s+=pl(pts,'given')+pl(pts.map(p=>V.add(p,v)),'thin');for(let i=0;i<=24;i+=3)s+=ln(pts[i],V.add(pts[i],v),'aux');
  return s+tx(pts[24][0]-60,pts[24][1]+18,'k (riadiaca krivka)')+arrow([330,230],[330+35,230-60])+tx(346,236,'s')}

// ---------- figures: topografia ----------
const EL=[[22,175,112],[23,128,82],[24,82,52],[25,36,22]],EC=[205,150];
const ellS=(lab=k=>k)=>EL.map(e=>`<ellipse cx="${EC[0]}" cy="${EC[1]}" rx="${e[1]}" ry="${e[2]}" class="cont"/>`+tx(EC[0]-6,EC[1]+e[2]-4,''+lab(e[0]),'mutl')).join('');
const stT1=(()=>{const y=165,A=[20,y],B=[385,y],base=400,u=28;const cr=[];
  for(const e of EL){const w=e[1]*Math.sqrt(1-Math.pow((y-EC[1])/e[2],2));cr.push([EC[0]-w,e[0]],[EC[0]+w,e[0]])}
  cr.push([EC[0],25.35]);cr.sort((a,b)=>a[0]-b[0]);const Y=z=>base-(z-22)*u,prof=cr.map(c=>[c[0],Y(c[1])]);
  const lz=x=>25-2*(x-20)/365;const X=[];
  for(let i=0;i<cr.length-1;i++){const f0=cr[i][1]-lz(cr[i][0]),f1=cr[i+1][1]-lz(cr[i+1][0]);if(f0*f1<0){const t=f0/(f0-f1),x=cr[i][0]+t*(cr[i+1][0]-cr[i][0]);X.push([x,lz(x)])}}
  return[
  {t:'<b>Dané:</b> vrstevnicový plán (kóty 22 až 25) a priamka a_1 s bodmi A_1(25), B_1(23).',d:()=>ellS()+ln(A,B,'given')+pt(A,'A_1(25)',2,-8)+pt(B,'B_1(23)',-52,-8)},
  {t:'Priamkou preložíme zvislú rovinu a nakreslíme <b>profil</b> (rez terénu). Dole si priprav rovnobežné čiary výšok 22 až 25 v mierke.',d:()=>[22,23,24,25].map(z=>ln([14,Y(z)],[390,Y(z)],'dash')+tx(2,Y(z)+4,''+z,'mutl')).join('')},
  {t:'Z každého priesečníka a_1 s vrstevnicou spusti ordinálu až na čiaru s tou istou výškou. Body spoj. To je profil terénu.',d:()=>cr.filter(c=>c[1]<25.3).map(c=>ln([c[0],y],[c[0],Y(c[1])])).join('')+pl(prof,'given')},
  {t:'Do profilu nakresli aj priamku: nad A_1 vo výške 25, nad B_1 vo výške 23.',d:()=>ln(A,[A[0],Y(25)])+ln(B,[B[0],Y(23)])+ln([A[0],Y(25)],[B[0],Y(23)],'res')+tx(A[0]+4,Y(25)-6,'(A)','resl')+tx(B[0]-22,Y(23)-6,'(B)','resl')},
  {t:'Kde priamka pretne profil, tam prebodáva terén. Tieto body vráť ordinálou späť na a_1. Sú to <b>priesečníky</b> X, Y.',d:()=>X.map((p,i)=>pt([p[0],Y(p[1])],'',0,0,'rdot')+ln([p[0],Y(p[1])],[p[0],y])+pt([p[0],y],'XY'[i]+'_1',6,-8,'rdot','resl')).join('')}]})();
const stT2=(()=>{const e1=EL[1],e0=EL[0],t=.7,M=[EC[0]+e1[1]*Math.cos(t),EC[1]+e1[2]*Math.sin(t)],g=V.unit([Math.cos(t)/e1[1],Math.sin(t)/e1[2]]);
  let lo=0,hi=200;for(let i=0;i<40;i++){const m=(lo+hi)/2,p=V.add(M,V.mul(g,m));(Math.pow((p[0]-EC[0])/e0[1],2)+Math.pow((p[1]-EC[1])/e0[2],2)<1)?lo=m:hi=m}
  const N=V.add(M,V.mul(g,lo)),j=30,Mr=V.add(M,V.mul(V.perp(g),-j)),phi=Math.atan(j/lo)*180/Math.PI;
  return[
  {t:'<b>Dané:</b> vrstevnicový plán (rozdiel kót susedných vrstevníc je 1 m), mierka j a bod M na vrstevnici 4.',d:()=>scaleBar(14,22,j,3)+ellS(k=>k-19)+pt(M,'M_1(4)',-46,-4)},
  {t:'Spád plochy v bode M je spád <b>spádnice</b>. Jej priemet je kolmý na vrstevnice. Z M_1 veď najkratšiu spojnicu na susednú nižšiu vrstevnicu. Dostaneš N_1(3).',d:()=>ln(M,N,'given')+pt(N,'N_1(3)',8,12,'adot','auxl')},
  {t:'Sklopenie: v M_1 postav kolmicu na M_1N_1 a nanes výškový rozdiel 1 m v mierke (1 j).',d:()=>ln(M,Mr)+pt(Mr,'(M)',8,-4,'adot','auxl')},
  {t:`Spoj (M) s N_1. Uhol pri N_1 je <b>spádový uhol φ</b> plochy v bode M (tu asi ${sk(phi,0)}°). Spád s = tg φ.`,d:()=>ln(Mr,N,'res')+angArc(N,20,M,Mr)+tx(N[0]-8,N[1]-24,'φ')}]})();
const WY=(k,x)=>52+46*k+8*Math.sin(x/48+k*.9);
const wav=(labs)=>{let s='';for(let k=0;k<5;k++){const ps=[];for(let x=20;x<=380;x+=6)ps.push([x,WY(k,x)]);s+=pl(ps,'cont')+tx(4,WY(k,20)+4,''+labs[k],'mutl')}return s};
const stT3=(()=>{const R=55,pts=[[100,WY(0,100)]];
  for(let k=1;k<5;k++){const P=pts[k-1];let x=P[0]+R;while(x>P[0]&&V.len(V.sub([x,WY(k,x)],P))>R)x-=.25;pts.push([x,WY(k,x)])}
  return[
  {t:'<b>Dané:</b> vrstevnice po 1 m, mierka j = 1 m, bod A na vrstevnici 19. Krivka má mať všade spád s = 2/5.',d:()=>scaleBar(250,16,22,3)+wav([19,18,17,16,15])+pt(pts[0],'A_1',-4,-9)},
  {t:'Spád 2/5 znamená: na 2 m výšky pripadá 5 m vodorovne. Na 1 m výšky (jedna vrstevnica) teda <b>2,5 m</b> vodorovne. To je interval krivky.',d:()=>ln([250,34],[250+55,34],'res')+tx(262,48,'2,5 j','resl')},
  {t:'Do kružidla zober 2,5 j. Zapichni do A_1 a pretni susednú vrstevnicu 18.',d:()=>arc(pts[0],R,pts[1],.35)+pt(pts[1],'',0,0,'rdot')},
  {t:'Z nového bodu pretni ďalšiu vrstevnicu. Opakuj až dole.',d:()=>pts.slice(2).map((p,i)=>arc(pts[i+1],R,p,.35)+pt(p,'',0,0,'rdot')).join('')},
  {t:'Body spoj. Každý úsek má priemet 2,5 m a výškový rozdiel 1 m, takže spád je všade 2/5. (Oblúk pretína vrstevnicu v dvoch bodoch, preto sú možné dve riešenia.)',d:()=>pl(pts,'res')}]})();
const stT4=(()=>{const pts=[[150,WY(0,150)]];
  for(let k=1;k<5;k++){const P=pts[k-1];let bx=P[0],bd=1e9;for(let x=P[0]-60;x<=P[0]+60;x+=.25){const d=V.len(V.sub([x,WY(k,x)],P));if(d<bd){bd=d;bx=x}}pts.push([bx,WY(k,bx)])}
  return[
  {t:'<b>Dané:</b> vrstevnicový plán a bod A na vrstevnici 23.',d:()=>wav([23,22,21,20,19])+pt(pts[0],'A_1',-4,-9)},
  {t:'<b>Spádnica</b> je krivka najväčšieho spádu. Tadiaľ by stekala voda. Jej priemet pretína vrstevnice <b>kolmo</b>.',d:()=>''},
  {t:'Z A_1 nájdi najkratšiu vzdialenosť k susednej vrstevnici: kružnica so stredom A_1, ktorá sa vrstevnice 22 práve dotkne.',d:()=>ci(pts[0],V.len(V.sub(pts[1],pts[0])))+pt(pts[1],'',0,0,'rdot')},
  {t:'Z bodu dotyku to isté k ďalšej vrstevnici. Opakuj.',d:()=>pts.slice(2).map((p,i)=>arc(pts[i+1],V.len(V.sub(p,pts[i+1])),p,.5)+pt(p,'',0,0,'rdot')).join('')},
  {t:'Body spoj plynulou krivkou. To je spádnica bodom A.',d:()=>pl(pts,'res')}]})();
const stT5=(()=>{const cs=[330,275,220,165],d=V.unit([1,-2]),X=[];
  for(let k=0;k<4;k++){let lo=0,hi=400;for(let i=0;i<40;i++){const m=(lo+hi)/2;(m+.5*WY(k,m)<cs[k])?lo=m:hi=m}X.push([lo,WY(k,lo)])}
  const sd=V.unit([2,1]),s0=[40,40],mk=c=>V.add(s0,V.mul(sd,(c-60)/1.118));
  const Lc=c=>{const p=[c-.5*20,20],q=[c-.5*215,215];return ln(p,q,'aux')};
  return[
  {t:'<b>Dané:</b> vrstevnice 11 až 14 a rovina α spádovým merítkom s_1^α so značkami 11 až 14.',d:()=>wav([11,12,13,14,'']).replace(/<polyline[^>]*\/><text[^>]*><tspan[^>]*><\/tspan><\/text>$/,'')+dbl(mk(120),mk(370))+cs.map((c,k)=>tick(mk(c),sd,6)+tx(mk(c)[0]-4,mk(c)[1]-10,''+(11+k))).join('')+tx(mk(370)[0]-6,mk(370)[1]+20,'s_1^α')},
  {t:'V každej značke merítka narysuj <b>hlavnú priamku</b> roviny: kolmicu na merítko. Má kótu tej značky.',d:()=>cs.map(Lc).join('')},
  {t:'Hlavná priamka 11 pretne vrstevnicu 11 v spoločnom bode roviny a terénu. To isté pre 12, 13, 14.',d:()=>X.map((p,k)=>pt(p,''+(11+k),8,-6,'rdot','resl')).join('')},
  {t:'Body spoj krivkou. To je <b>rez</b> topografickej plochy rovinou α.',d:()=>pl(X,'res')}]})();

// ---------- figures: Monge ----------
function figMonge3D(){const A=[120,70,100],A1=[120,70,0],A2=[120,170,100],Ax=[120,170,0];
  return poly([P3(0,0,0),P3(240,0,0),P3(240,170,0),P3(0,170,0)],'plane')+poly([P3(0,170,0),P3(240,170,0),P3(240,170,150),P3(0,170,150)],'wall')
  +tx(P3(226,10,0)[0],P3(226,10,0)[1]-4,'π','mutl')+tx(P3(222,170,140)[0],P3(222,170,140)[1]+6,'ν','mutl')+ln(P3(0,170,0),P3(240,170,0),'given')+tx(P3(0,170,0)[0]-26,P3(0,170,0)[1]+4,'x_{1,2}')
  +seg3(A,A1,'aux')+seg3(A,A2,'aux')+seg3(A1,Ax,'dash')+seg3(A2,Ax,'dash')+pt(S3(A),'A',-14,-4)+pt(S3(A1),'A_1',8,8,'rdot','resl')+pt(S3(A2),'A_2',8,-4,'rdot','resl')}
function figMonge2D(){const A2=[190,60],A1=[190,220];
  return ln([30,150],[370,150],'given')+tx(34,142,'x_{1,2}')+ln(A1,A2,'aux')+pt(A2,'A_2',8,-4,'rdot','resl')+pt(A1,'A_1',8,8,'rdot','resl')
  +tx(110,108,'z (výška)','mutl')+tx(92,192,'y (pred nárysňou)','mutl')+tx(200,140,'ordinála','auxl')+tx(250,60,'nárys (pohľad spredu)','mutl')+tx(250,224,'pôdorys (pohľad zhora)','mutl')}
const stM=(()=>{const O=[240,160],A2=[110,80],A1=[110,220],Y1=[240,220],Y3=[300,160],A3=[300,80];
  return[
  {t:'<b>Dané:</b> pôdorys A_1 a nárys A_2 bodu. Osi: x_{1,2} vodorovne, z_2 zvislo hore, y_1 dole, y_3 vpravo.',d:()=>ln([20,160],[380,160],'given')+ln([240,20],[240,285],'given')+tx(24,152,'x_{1,2}')+tx(246,32,'z_2')+tx(246,282,'y_1')+tx(364,152,'y_3')+ln(A1,A2,'dash')+pt(A2,'A_2',-22,-6)+pt(A1,'A_1',-22,14)+pt(O,'O',6,16)},
  {t:'Bokorys má <b>rovnakú výšku</b> ako nárys. Z A_2 veď vodorovnú ordinálu doprava.',d:()=>ln(A2,[380,80])},
  {t:'Vzdialenosť y treba preniesť z pôdorysu. Z A_1 veď vodorovnú čiaru na os y_1.',d:()=>ln(A1,Y1)+pt(Y1,'',0,0,'adot')},
  {t:'Štvrťkružnicou so stredom O ju otoč na os y_3.',d:()=>`<path d="M${Y1[0]} ${Y1[1]} A60 60 0 0 0 ${Y3[0]} ${Y3[1]}" class="aux"/>`+pt(Y3,'',0,0,'adot')},
  {t:'Odtiaľ zvislo hore až po ordinálu z A_2. Priesečník je <b>bokorys A_3</b>.',d:()=>ln(Y3,A3)+pt(A3,'A_3',8,-6,'rdot','resl')}]})();
const ISO=(x,y,z)=>[200+(x-y)*26,150+(x+y)*15-z*30];
function figBody(){const q=(a)=>poly(a.map(p=>ISO(p[0],p[1],p[2])),'face');
  return q([[0,3,0],[4,3,0],[4,3,1],[2,3,1],[2,3,3],[0,3,3]])+q([[4,0,0],[4,3,0],[4,3,1],[4,0,1]])+q([[2,0,1],[2,3,1],[2,3,3],[2,0,3]])
  +q([[2,0,1],[4,0,1],[4,3,1],[2,3,1]])+q([[0,0,3],[2,0,3],[2,3,3],[0,3,3]])+pt(ISO(3,1,1),'Q',6,-6,'rdot','resl')
  +arrow(ISO(6.2,1.5,.5),ISO(4.7,1.5,.5),'aux')+tx(ISO(6.2,1.5,.5)[0]-20,ISO(6.2,1.5,.5)[1]+18,'bokorys','mutl')
  +arrow(ISO(1,6,.5),ISO(1,4.6,.5),'aux')+tx(ISO(1,6,.5)[0]-30,ISO(1,6,.5)[1]+18,'nárys','mutl')+arrow([230,8],[230,34],'aux')+tx(238,20,'pôdorys','mutl')}
const stB=(()=>{const O=[215,150],u=26,N=(x,z)=>[O[0]-x*u,O[1]-z*u],Pd=(x,y)=>[O[0]-x*u,O[1]+y*u],Bk=(y,z)=>[O[0]+y*u,O[1]-z*u];
  return[
  {t:'Osi: základnica x_{1,2}, zvislá os z. Nárys príde vľavo hore, pôdorys pod neho, bokorys vpravo hore.',d:()=>ln([60,150],[340,150],'thin')+ln([215,20],[215,280],'thin')+tx(62,144,'x_{1,2}','mutl')+tx(220,30,'z','mutl')},
  {t:'<b>Nárys</b> (spredu): vidíš obrys schodu. Vysoká časť je bližšie k osi z.',d:()=>poly([N(0,0),N(4,0),N(4,1),N(2,1),N(2,3),N(0,3)],'face')+tx(N(4,3)[0],N(4,3)[1]+12,'nárys','mutl')},
  {t:'<b>Pôdorys</b> (zhora): obdĺžnik 4 × 3. Hrana schodu je viditeľná ako čiara. Leží presne pod nárysom (ordinály).',d:()=>poly([Pd(0,0),Pd(4,0),Pd(4,3),Pd(0,3)],'face')+ln(Pd(2,0),Pd(2,3),'given')+ln(N(2,0),Pd(2,0),'dash')+ln(N(4,0),Pd(4,0),'dash')+tx(Pd(4,3)[0],Pd(4,3)[1]+16,'pôdorys','mutl')},
  {t:'<b>Bokorys</b> (pohľad v smere šípky „bokorys“): obdĺžnik 3 × 3. Nižší stupeň je vpredu, jeho horná hrana je viditeľná čiara vo výške 1.',d:()=>poly([Bk(0,0),Bk(3,0),Bk(3,3),Bk(0,3)],'face')+ln(Bk(0,1),Bk(3,1),'given')+ln(N(0,3),Bk(0,3),'dash')+ln(N(0,1),Bk(0,1),'dash')+tx(Bk(3,3)[0]-44,Bk(3,3)[1]-6,'bokorys','mutl')},
  {t:'Bod Q leží na nižšom stupni. Jeho tri priemety: Q_2 a Q_1 pod sebou na zvislej ordinále, Q_3 v rovnakej výške ako Q_2.',d:()=>pt(N(3,1),'Q_2',-8,-8,'rdot','resl')+pt(Pd(3,1),'Q_1',6,14,'rdot','resl')+pt(Bk(1,1),'Q_3',6,-8,'rdot','resl')+ln(N(3,1),Pd(3,1),'aux')+ln(N(3,1),Bk(1,1),'aux')}]})();

function figOsi(){const O=[200,170,0],q=(a)=>poly(a.map(S3),'wall');
  return poly([P3(0,0,0),P3(200,0,0),P3(200,170,0),P3(0,170,0)],'plane')+q([[0,170,0],[200,170,0],[200,170,150],[0,170,150]])+q([[200,0,0],[200,170,0],[200,170,150],[200,0,150]])
  +arrow(S3(O),P3(-25,170,0))+arrow(S3(O),P3(200,-25,0))+arrow(S3(O),P3(200,170,175))+pt(S3(O),'O',8,14)
  +tx(P3(-25,170,0)[0]-4,P3(-25,170,0)[1]-8,'x')+tx(P3(200,-25,0)[0]+8,P3(200,-25,0)[1]+4,'y')+tx(P3(200,170,175)[0]+8,P3(200,170,175)[1]+4,'z')
  +tx(P3(40,30,0)[0],P3(40,30,0)[1],'π pôdorysňa','mutl')+tx(P3(20,170,120)[0],P3(20,170,120)[1],'ν nárysňa','mutl')+tx(P3(200,40,120)[0]+4,P3(200,40,120)[1],'μ bokorysňa','mutl')}

export type RysStep = { t: string; d: () => string };
export type Rys = { vb: string; steps: RysStep[] };
const one = (d, vb = '0 0 400 300') => ({ vb, steps: [{ t: '', d }] });

/** konštrukcie krok po kroku */
export const RYS: Record<string, Rys> = {
  'dg-elipsa': { vb: '0 0 400 300', steps: stEl },
  'dg-elipsa-osk': { vb: '0 0 400 330', steps: stElOsk },
  'dg-hyp': { vb: '0 0 400 300', steps: stHyp },
  'dg-hyp-as': { vb: '0 0 400 300', steps: stHypAs },
  'dg-par': { vb: '0 0 400 300', steps: stPar },
  'dg-k1': { vb: '0 0 400 300', steps: stK1 },
  'dg-k2': { vb: '0 0 400 300', steps: stK2 },
  'dg-k3': { vb: '0 0 400 300', steps: stK3 },
  'dg-k4': { vb: '0 0 400 300', steps: stK4 },
  'dg-k5': { vb: '0 0 400 300', steps: stK5 },
  'dg-k6': { vb: '0 0 400 300', steps: stK6 },
  'dg-k7': { vb: '0 0 400 300', steps: stK7 },
  'dg-k8': { vb: '0 0 400 300', steps: stK8 },
  'dg-t1': { vb: '0 0 400 420', steps: stT1 },
  'dg-t2': { vb: '0 0 400 300', steps: stT2 },
  'dg-t3': { vb: '0 0 400 260', steps: stT3 },
  'dg-t4': { vb: '0 0 400 260', steps: stT4 },
  'dg-t5': { vb: '0 0 400 240', steps: stT5 },
  'dg-m': { vb: '0 0 400 300', steps: stM },
  'dg-b': { vb: '0 0 400 300', steps: stB },
};

/** statické obrázky */
export const DG_PICS: Record<string, Rys> = {
  'dg-eldef': one(figElDef),
  'dg-hypdef': one(figHypDef),
  'dg-rpdef': one(figRPdef),
  'dg-rpline': one(figRPline),
  'dg-rpkeep': one(figRPkeep),
  'dg-stopnik': one(figStopnik),
  'dg-stopa': one(figStopa),
  'dg-hlavne': one(figHlavne),
  'dg-seg': one(() => figSeg()),
  'dg-kruh': one(figKruh),
  'dg-kota': one(figKota),
  'dg-kpriamka': one(figKPriamka),
  'dg-spadrov': one(figSpadRoviny),
  'dg-rovnpriamka': one(figRovnPriamka),
  'dg-rovnrovina': one(figRovnRovina),
  'dg-dot': one(figDot),
  'dg-interp': one(figInterp),
  'dg-valec': one(figValec),
  'dg-vrstevnice': one(() => ellS()),
  'dg-monge3d': one(figMonge3D),
  'dg-monge2d': one(figMonge2D),
  'dg-body': one(figBody, '0 0 400 290'),
  'dg-osi': one(figOsi),
};

// kriedová tabuľa: farby podľa CH v learn/kit.tsx
const CHALK = '#F3F0E6', DIM = '#A7B7AE', BLUE = '#7CC8F2', PINK = '#F59AC0', YEL = '#FFD25E';
const STY = {
  given: `stroke="${CHALK}" stroke-width="2" fill="none"`,
  thin: `stroke="${CHALK}" stroke-width="1" fill="none"`,
  aux: `stroke="${BLUE}" stroke-width="1.2" fill="none"`,
  dash: `stroke="${DIM}" stroke-width="1" stroke-dasharray="4 3" fill="none"`,
  res: `stroke="${PINK}" stroke-width="2.6" fill="none"`,
  ang: `stroke="${YEL}" stroke-width="1.8" fill="none"`,
  cont: `stroke="${DIM}" stroke-width="1.3" fill="none"`,
  plane: `fill="${CHALK}" fill-opacity="0.07" stroke="${DIM}" stroke-width="1"`,
  wall: `fill="${CHALK}" fill-opacity="0.05" stroke="${DIM}" stroke-width="1"`,
  face: `fill="#2C4A42" stroke="${CHALK}" stroke-width="1.6" stroke-linejoin="round"`,
  dot: `fill="${CHALK}"`,
  rdot: `fill="${PINK}"`,
  adot: `fill="${BLUE}"`,
  arr: `fill="${CHALK}"`,
  lab: `fill="${CHALK}" font-size="13"`,
  mutl: `fill="${DIM}" font-size="12"`,
  resl: `fill="${PINK}" font-size="13" font-weight="bold"`,
  auxl: `fill="${BLUE}" font-size="13"`,
};
const CUR = { aux: `stroke="${YEL}" stroke-width="1.8" fill="none"`, dash: `stroke="${YEL}" stroke-width="1.2" stroke-dasharray="4 3" fill="none"` };

/** triedy → farby; `cur` zvýrazní pomocné čiary práve kresleného kroku */
export function dgStyle(svg: string, cur = false): string {
  return svg.replace(/class="([a-z]*)"/g, (_, c) => (cur && CUR[c]) || STY[c] || STY.lab);
}

/** celé SVG pre krok `upTo` (vrátane) */
export function rysXml(r: Rys, upTo: number): string {
  const inner = r.steps.slice(0, upTo + 1).map((s, i) => `<g>${dgStyle(s.d(), i === upTo && i > 0)}</g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r.vb}" font-family="sans-serif">${inner}</svg>`;
}
