/* ══════════ Background games: shared games ══════════
   Factories for games more than one course uses. Each returns a GAMES entry.
   Transform Match (MHF4U, MCR3U), Circle Click (both, radians or degrees),
   Mirror (both, inverses) and Tangent Tap (MHF4U rates, MCV4U derivatives). */
const GSHARED=(function(){
"use strict";
const TAU=Math.PI*2;
/* ── parent functions for Transform Match ── */
const PARENTS={
  sq:{name:"x²",f:x=>x*x,eq:(A,K,D,C)=>A+"("+inner(K,D)+")²"+C},
  rt:{name:"√x",f:x=>x<0?NaN:Math.sqrt(x),eq:(A,K,D,C)=>A+"√("+inner(K,D)+")"+C},
  ab:{name:"|x|",f:x=>Math.abs(x),eq:(A,K,D,C)=>A+"|"+inner(K,D)+"|"+C},
  cu:{name:"x³",f:x=>x*x*x,eq:(A,K,D,C)=>A+"("+inner(K,D)+")³"+C},
  ex:{name:"2ˣ",f:x=>Math.pow(2,x),eq:(A,K,D,C)=>(A?A+"·":"")+(inner(K,D)==="x"?"2ˣ":"2^("+inner(K,D)+")")+C},
  sinr:{name:"sin x",f:x=>Math.sin(x),eq:(A,K,D,C)=>A+"sin("+inner(K,D)+")"+C,xr:[-7,7]},
  sind:{name:"sin x",f:x=>Math.sin(x*Math.PI/180),eq:(A,K,D,C)=>A+"sin("+inner(K,D,true)+")"+C,deg:true},
  re:{name:"1/x",f:x=>1/x,eq:(A,K,D,C)=>(A||"1")+"/("+inner(K,D)+")"+C},
  lg:{name:"log₂x",f:x=>x<=0?NaN:Math.log2(x),eq:(A,K,D,C)=>A+"log₂("+inner(K,D)+")"+C},
};
function inner(K,D,deg){const d=D?(D<0?" + "+(-D):" − "+D)+(deg?"°":""):"";return K===1?"x"+d:D?K+"(x"+d+")":K+"x"}
function astr(a){return a===1?"":a===-1?"−":String(a).replace("-","−")}
function cstr(c){return c?(c<0?" − "+(-c):" + "+c):""}
function kstr(k){return k===.5?"½":k===.25?"¼":String(k)}
function eqn(P,a,k,d,c){return "y = "+P.eq(astr(a),k===1?1:kstr(k),d,cstr(c))}
function gTransform(o){
  const keys=o.parents,deg=!!o.deg;
  return{id:"transform",title:"Transform Match",how:"Slide a, k, d and c until your curve lies on the target. The dashed curve is the parent.",h:270,
    kinds:o.kinds||["transform"],
    round(api){
      const P=PARENTS[api.pick(keys)],n=Math.min(1+Math.floor((api.i-1)/3),3);
      const tgt={a:1,k:1,d:0,c:0},which=api.shuffle(["a","k","d","c"]).slice(0,n);
      which.forEach(w=>{if(w==="a")tgt.a=api.pick([-3,-2,-1,-.5,.5,2,3]);if(w==="k")tgt.k=api.pick(P.deg?[.5,2]:[.5,2,3]);if(w==="d")tgt.d=api.pick(P.deg?[-90,-60,-30,30,60,90]:[-3,-2,-1,1,2,3]);if(w==="c")tgt.c=api.pick([-3,-2,-1,1,2,3])});
      const T=x=>tgt.a*P.f(tgt.k*(x-tgt.d))+tgt.c,xr=P.deg?[-360,360]:(P.xr||[-6,6]),yr=[-5,5];
      let g,cur={a:1,k:1,d:0,c:0};
      const C=api.C;
      function redraw(v,done){
        api.clear();g=api.grid({xr,yr,step:P.deg?30:1,lab:P.deg?90:1,square:false});
        api.plot(P.f,g,C.t3,1.4,[4,4]);api.plot(T,g,C.acc,2.6,null,null,null,P.deg?240:200);
        if(v)api.plot(x=>v.a*P.f(v.k*(x-v.d))+v.c,g,done?C.ok:C.ink,2.2,null,null,null,P.deg?240:200);
        api.text("y = "+P.name,10,14,{size:11,color:C.t3,italic:true});
        if(v)api.text(eqn(P,v.a,v.k,v.d,v.c),10,api.H-8,{size:11,color:done?C.ok:C.ink,halo:C.halo});
        if(done)api.text("target "+eqn(P,tgt.a,tgt.k,tgt.d,tgt.c),api.W-10,14,{size:11,color:C.acc,align:"right"});
      }
      api.q(`Match the <b>bold</b> curve. ${n===1?"One":n===2?"Two":"Three"} of a, k, d, c changed.`);
      const ks=P.deg?[.5,1,2]:[.5,1,2,3];
      api.sliders({params:[
        {k:"a",label:"a (stretch, flip)",min:-3,max:3,step:.5,val:1,fmt:v=>api.neg(v)},
        {k:"ki",label:"k (horizontal)",min:0,max:ks.length-1,step:1,val:ks.indexOf(1),fmt:v=>kstr(ks[v])},
        {k:"d",label:"d (shift right)",min:P.deg?-90:-3,max:P.deg?90:3,step:P.deg?30:1,val:0,fmt:v=>api.neg(v)+(P.deg?"°":"")},
        {k:"c",label:"c (shift up)",min:-3,max:3,step:1,val:0,fmt:v=>api.neg(v)}],
        on(v){cur={a:v.a,k:ks[v.ki],d:v.d,c:v.c};redraw(cur,false)},
        score(v){const u={a:v.a,k:ks[v.ki],d:v.d,c:v.c};let err=0,m=0;
          for(let i=0;i<=60;i++){const x=xr[0]+(xr[1]-xr[0])*i/60,y1=T(x),y2=u.a*P.f(u.k*(x-u.d))+u.c;if(!isFinite(y1)||!isFinite(y2)||Math.abs(y1)>6||Math.abs(y2)>6)continue;err+=Math.abs(y1-y2);m++}
          if(!m)return 0;err/=m;return err<.04?1:api.clamp((.6-err),0,.6)},
        msg(v,sc){return sc>=.999?"":"target: <b>"+eqn(P,tgt.a,tgt.k,tgt.d,tgt.c)+"</b>"},
        reveal(){redraw(cur,true)}});
    }};
}
/* ── Circle Click: click the point on the unit circle ── */
const RAD=[[0,"0"],[1,"π/6"],[2,"π/4"],[3,"π/3"],[4,"π/2"],[5,"2π/3"],[6,"3π/4"],[7,"5π/6"],[8,"π"],[9,"7π/6"],[10,"5π/4"],[11,"4π/3"],[12,"3π/2"],[13,"5π/3"],[14,"7π/4"],[15,"11π/6"]];
const ANG=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
const EXACT={0:["1","0"],30:["√3/2","1/2"],45:["√2/2","√2/2"],60:["1/2","√3/2"],90:["0","1"]};
function exact(deg){const r=((deg%360)+360)%360,q=r%90,base=q===0&&r%180===0?EXACT[0]:q===0?EXACT[90]:EXACT[q]||null;
  if(!base)return null;const c=Math.cos(r*Math.PI/180),s=Math.sin(r*Math.PI/180);
  let cs=r%180===0?base[0]:r%90===0?"0":base[0],ss=r%180===0?"0":r%90===0?base[1]:base[1];
  if(c<-1e-9&&cs!=="0")cs="−"+cs;if(s<-1e-9&&ss!=="0")ss="−"+ss;return[cs,ss]}
function gCircle(o){
  const deg=!!o.deg;
  return{id:"circle",title:deg?"Angle Click":"Radian Click",how:"Click the point on the unit circle the clue describes. Within about 10° counts.",h:280,kinds:o.kinds||["circle"],
    round(api){
      const C=api.C,i=api.pick([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]),a=ANG[i],lab=deg?a+"°":RAD[i][1];
      const kind=api.i<=3?"angle":api.pick(["angle","exact","exact","neg"]);
      let ta=a,q;
      if(kind==="angle")q=`Click the point at θ = <b>${lab}</b>.`;
      else if(kind==="neg")q=`Click the point at θ = <b>−${deg?(360-a)+"°":RAD[16-i][1]}</b>.`;
      else{const ex=exact(a);const which=api.pick(["sin","cos"]);const v=which==="sin"?ex[1]:ex[0];const other=which==="sin"?(Math.cos(a*Math.PI/180)>=0?"cos θ ≥ 0":"cos θ < 0"):(Math.sin(a*Math.PI/180)>=0?"sin θ ≥ 0":"sin θ < 0");
        q=`Click the point where <b>${which} θ = ${v}</b> and ${other}${a%90===0?"":""}.`;if(a%180===0&&which==="sin")q=`Click the point where <b>sin θ = 0</b> and ${Math.cos(a*Math.PI/180)>0?"cos θ > 0":"cos θ < 0"}.`;if(a%180===90&&which==="cos")q=`Click the point where <b>cos θ = 0</b> and ${Math.sin(a*Math.PI/180)>0?"sin θ > 0":"sin θ < 0"}.`}
      api.q(q);
      const R=Math.min(api.H/2-24,api.W/2-24),X=api.W/2,Y=api.H/2;
      function base(){api.clear();api.line(X-R-14,Y,X+R+14,Y,C.t3,1.2);api.line(X,Y-R-14,X,Y+R+14,C.t3,1.2);api.ring(X,Y,R,C.t2,1.6);
        for(let k=0;k<24;k++){const t=k*15*Math.PI/180,big=k%6===0;api.line(X+(R-(big?8:4))*Math.cos(t),Y-(R-(big?8:4))*Math.sin(t),X+R*Math.cos(t),Y-R*Math.sin(t),C.t4,1)}
        api.text(deg?"0°":"0",X+R+4,Y+12,{size:9,color:C.t3});api.text(deg?"90°":"π/2",X+4,Y-R-4,{size:9,color:C.t3});api.text(deg?"180°":"π",X-R-4,Y+12,{size:9,color:C.t3,align:"right"});api.text(deg?"270°":"3π/2",X+4,Y+R+12,{size:9,color:C.t3})}
      base();
      api.tap((x,y)=>{
        const th=Math.atan2(Y-y,x-X)*180/Math.PI,err=Math.abs(((th-ta)%360+540)%360-180),frac=err<=10?1:err<=20?.5:0;
        const t=ta*Math.PI/180,ex=exact(a);
        base();api.line(X,Y,X+R*Math.cos(Math.atan2(Y-y,x-X)),Y-R*Math.sin(Math.atan2(Y-y,x-X)),frac?C.ok:C.no,1.6,[3,4]);
        api.line(X,Y,X+R*Math.cos(t),Y-R*Math.sin(t),C.acc,2.2);api.dot(X+R*Math.cos(t),Y-R*Math.sin(t),5,C.acc);
        api.text(`(${ex[0]}, ${ex[1]})`,X+(R+12)*Math.cos(t)+(Math.cos(t)<0?-4:4),Y-(R+12)*Math.sin(t)+4,{size:11,color:C.acc,align:Math.cos(t)<-.1?"right":"left",halo:C.halo});
        api.answer(frac===1,frac,`θ = <b>${lab}</b>, you were ${Math.round(err)}° off`,()=>{});
      },(x,y)=>{base();if(x>-1e3)api.line(X,Y,X+R*Math.cos(Math.atan2(Y-y,x-X)),Y-R*Math.sin(Math.atan2(Y-y,x-X)),C.t3,1.4,[3,4])});
    }};
}
/* ── Mirror: the inverse is the reflection in y = x ── */
function gMirror(o){
  const FS=[{n:"2ˣ",f:x=>Math.pow(2,x),inv:y=>Math.log2(y),dom:[-5,2.3]},{n:"x³/4",f:x=>x*x*x/4,inv:y=>Math.cbrt(4*y),dom:[-2.7,2.7]},
    {n:"2√x",f:x=>x<0?NaN:2*Math.sqrt(x),inv:y=>y<0?NaN:y*y/4,dom:[0,5]},{n:"x² (x ≥ 0)",f:x=>x<0?NaN:x*x,inv:y=>y<0?NaN:Math.sqrt(y),dom:[0,2.3]},
    {n:"x/2 + 1",f:x=>x/2+1,inv:y=>2*(y-1),dom:[-5,5]},{n:"log₂x",f:x=>x<=0?NaN:Math.log2(x),inv:y=>Math.pow(2,y),dom:[.05,5]}];
  return{id:"mirror",title:"Mirror",how:"The inverse swaps x and y: every point (a, b) on f becomes (b, a) on f⁻¹. Click where the mirror point lands.",h:280,kinds:o&&o.kinds||["inverse"],
    round(api){
      const C=api.C,F=api.pick(FS),mode=api.i<=4?"pt":api.pick(["pt","read"]);
      let a,b;for(let t=0;t<40;t++){a=api.ri(Math.ceil(F.dom[0]),Math.floor(F.dom[1]));b=F.f(a);if(isFinite(b)&&Math.abs(b)<=5&&Math.abs(a)<=5&&(mode==="pt"||Math.abs(b-Math.round(b))<1e-9&&Math.round(b)!==a))break}
      b=Math.round(b*100)/100;
      const g=api.grid({xr:[-5,5],yr:[-5,5]});
      api.line(g.px(-5),g.py(-5),g.px(5),g.py(5),C.t4,1.2,[4,4]);api.text("y = x",g.px(4.3),g.py(4.6),{size:10,color:C.t3});
      api.plot(F.f,g,C.acc,2.4);api.text("y = "+F.n,10,14,{size:11,color:C.acc});
      let tx,ty;
      if(mode==="pt"){api.dot(g.px(a),g.py(b),5,C.acc);api.text(`P(${api.neg(a)}, ${api.fmt(b)})`,g.px(a)+8,g.py(b)-8,{size:11,color:C.acc,halo:C.halo});
        api.q(`P is on f. Click the point of <b>f⁻¹</b> that mirrors P.`);tx=b;ty=a}
      else{api.q(`Click the point of <b>f⁻¹</b> whose x-coordinate is <b>${api.fmt(b)}</b>. (Read f first.)`);tx=b;ty=a}
      api.tap((x,y)=>{
        const ux=g.xi(x),uy=g.yi(y),d=Math.hypot(ux-tx,uy-ty),frac=d<=.5?1:d<=1?.5:0;
        api.plot(F.inv,g,C.ok,2,[5,4]);api.dot(g.px(tx),g.py(ty),5,C.ok);api.dot(x,y,3.5,frac?C.ok:C.no);
        api.line(g.px(a),g.py(b),g.px(tx),g.py(ty),C.t3,1,[3,4]);
        api.text(`(${api.fmt(tx)}, ${api.neg(ty)})`,g.px(tx)+8,g.py(ty)+14,{size:11,color:C.ok,halo:C.halo});
        api.answer(frac===1,frac,`the mirror point is <b>(${api.fmt(tx)}, ${api.neg(ty)})</b>`,()=>{});
      });
    }};
}
/* ── Tangent Tap: set the slope of the line through the point ── */
function gTangent(o){
  const CURVES=[{n:"f(x) = x²/3 − 1",f:x=>x*x/3-1,d:x=>2*x/3},{n:"f(x) = 0.2x³ − x",f:x=>.2*x*x*x-x,d:x=>.6*x*x-1},{n:"f(x) = 2 sin x",f:x=>2*Math.sin(x),d:x=>2*Math.cos(x)},
    {n:"f(x) = 2ˣ/2 − 2",f:x=>Math.pow(2,x)/2-2,d:x=>Math.pow(2,x)/2*Math.LN2},{n:"f(x) = 3 − x²/4",f:x=>3-x*x/4,d:x=>-x/2},{n:"f(x) = 4/(x² + 1)",f:x=>4/(x*x+1),d:x=>-8*x/((x*x+1)*(x*x+1))}];
  return{id:"tangent",title:"Tangent Tap",how:"Turn the line until it just touches the curve at the point. Its slope is the instantaneous rate of change there.",h:270,kinds:o&&o.kinds||["rates"],
    round(api){
      const C=api.C,cv=api.pick(CURVES),avg=o&&o.avg&&api.i>2&&Math.random()<.3;
      let x0,x1;for(let t=0;t<60;t++){x0=api.ri(-6,6)/2;x1=x0+api.pick([1,1.5,2,3]);if(Math.abs(cv.f(x0))<3.4&&Math.abs(cv.d(x0))<=4&&(!avg||(Math.abs(cv.f(x1))<3.4&&x1<=4.5)))break}
      const y0=cv.f(x0),m=avg?(cv.f(x1)-y0)/(x1-x0):cv.d(x0);
      api.q(avg?`Set the slope of the line through <b>both points</b>: the average rate of change on [${api.neg(x0)}, ${api.neg(x1)}].`:`Set the slope of the <b>tangent</b> at x = ${api.neg(x0)}.`);
      let g;
      function redraw(mm,done){
        api.clear();g=api.grid({xr:[-5,5],yr:[-4,4]});api.plot(cv.f,g,C.acc,2.4);api.text(cv.n,10,14,{size:11,color:C.acc});
        const col=done?C.ok:C.ink;
        api.line(g.px(-6),g.py(y0+mm*(-6-x0)),g.px(6),g.py(y0+mm*(6-x0)),col,1.8);
        if(done){api.line(g.px(-6),g.py(y0+m*(-6-x0)),g.px(6),g.py(y0+m*(6-x0)),C.ok,2.2,[6,4])}
        const dx=1;api.line(g.px(x0),g.py(y0),g.px(x0+dx),g.py(y0),C.t3,1,[2,3]);api.line(g.px(x0+dx),g.py(y0),g.px(x0+dx),g.py(y0+mm*dx),C.t3,1,[2,3]);
        api.dot(g.px(x0),g.py(y0),5,C.acc);if(avg)api.dot(g.px(x1),g.py(cv.f(x1)),5,C.acc);
        api.text("m = "+api.fmt(mm,1),g.px(x0+dx)+6,g.py(y0+mm*dx/2)+4,{size:11,color:col,halo:C.halo});
        if(done)api.text("true slope "+api.fmt(m,2),api.W-10,api.H-8,{size:11,color:C.ok,align:"right"});
      }
      let last=0;
      api.slider({label:"slope m",min:-5,max:5,step:.1,val:0,fmt:v=>api.fmt(v,1),on(v){last=v;redraw(v,false)},
        score(v){const err=Math.abs(v-m);return err<=.3?1:api.clamp(1-(err-.3)/1.2,0,.8)},
        msg(v,sc){return `the slope is <b>${api.fmt(m,2)}</b>; you set ${api.fmt(v,1)}`},reveal(){redraw(last,true)}});
    }};
}
return{gTransform,gCircle,gMirror,gTangent,PARENTS,eqn};
})();

/* ══════════ MCV4U background games ══════════
   Tangent Tap (tangent, rider, limit, expo, sincos, motion), Derivative
   Match (graphs), Vector Sum (vectors, cross, proj, dist), Box Max
   (optbox, ladder) and Plane Check (plane, planes2, pierce). */
const GAMES=(function(){
"use strict";
const vstr=v=>"("+v.map(x=>String(x).replace("-","−")).join(", ")+")";
const DERIV={id:"deriv",title:"Derivative Match",how:"Where f rises, f′ is positive; where f turns, f′ is zero. Pick the derivative's graph, or click where the derivative is zero.",h:300,kinds:["graphs"],
  round(api){
    const C=api.C,mode=api.i%3===0?"zero":"match";
    const fam=api.pick(["cubic","quartic","sin","expo"]);let f;
    if(fam==="cubic"){const a=api.pick([.15,-.15,.2,-.2]),b=api.rnd(-.6,.6),c=api.pick([-1.5,-1,1,1.5]);f=x=>a*x*x*x+b*x*x+c*x}
    else if(fam==="quartic"){const a=api.pick([.05,-.05]),b=api.pick([-1,-.7,.7]);f=x=>a*x*x*x*x+b*x*x*(a>0?-1:1)*-1}
    else if(fam==="sin"){const k=api.pick([.8,1,1.3]),ph=api.rnd(0,3);f=x=>2*Math.sin(k*x+ph)}
    else{const s=api.pick([1,-1]);f=x=>s*(Math.pow(1.6,x)-2.5)}
    const h=1e-3,d=x=>(f(x+h)-f(x-h))/(2*h),dd=x=>(d(x+h)-d(x-h))/(2*h);
    function panel(fn,x0,y0,w,hh,lab,col){
      api.cx.save();api.cx.beginPath();api.cx.rect(x0,y0,w,hh);api.cx.clip();api.cx.strokeStyle=C.grid;api.cx.lineWidth=1;api.cx.strokeRect(x0+.5,y0+.5,w-1,hh-1);
      let M=0;for(let x=-4;x<=4;x+=.05)M=Math.max(M,Math.abs(fn(x)));const px=x=>x0+w/2+x/4.4*(w/2),py=y=>y0+hh/2-y/(M||1)*(hh/2-10);
      api.line(x0,py(0),x0+w,py(0),C.t3,1.1);api.line(px(0),y0,px(0),y0+hh,C.t3,1.1);for(let x=-4;x<=4;x++)api.line(px(x),py(0)-3,px(x),py(0)+3,C.t3,1);
      api.cx.beginPath();for(let i=0;i<=160;i++){const x=-4+8*i/160;i?api.cx.lineTo(px(x),py(fn(x))):api.cx.moveTo(px(x),py(fn(x)))}api.cx.strokeStyle=col;api.cx.lineWidth=2.2;api.cx.stroke();
      if(lab)api.text(lab,x0+6,y0+14,{size:11,bold:true,color:C.t2});api.cx.restore();return{px,py};
    }
    if(mode==="match"){
      const cands=api.shuffle([{fn:d,ok:true},{fn:x=>-d(x),ok:false},{fn:f,ok:false},{fn:dd,ok:false}]),L="ABCD";
      const lw=api.W*.42,gap=8,sw=(api.W-lw-3*gap)/2,sh=(api.H-3*gap)/2;
      panel(f,gap,gap,lw,api.H-2*gap,"f",C.acc);
      cands.forEach((c,k)=>panel(c.fn,lw+2*gap+(k%2)*(sw+gap),gap+Math.floor(k/2)*(sh+gap),sw,sh,L[k],C.ink));
      api.q("Which graph is <b>f′</b>, the derivative of f?");
      api.choices(cands.map((c,k)=>({t:L[k],ok:c.ok})),{keep:true,msg:"f′ crosses zero exactly where f has a peak or a valley",reveal(){cands.forEach((c,k)=>{if(c.ok){api.cx.strokeStyle=C.ok;api.cx.lineWidth=3;api.cx.strokeRect(lw+2*gap+(k%2)*(sw+gap)+1.5,gap+Math.floor(k/2)*(sh+gap)+1.5,sw-3,sh-3)}})}});
    }else{
      const g=api.grid({xr:[-4.4,4.4],yr:[-4,4],square:false});api.plot(f,g,C.acc,2.4);api.text("y = f(x)",10,14,{size:11,color:C.acc});
      const zeros=[];for(let x=-3.9;x<3.9;x+=.02)if(d(x)*d(x+.02)<=0&&Math.abs(f(x))<3.9)zeros.push(x+.01);
      if(!zeros.length)return DERIV.round(api);
      api.q("Click a point on the curve where <b>f′(x) = 0</b>.");
      api.tap((x,y)=>{const ux=g.xi(x),e=Math.min(...zeros.map(z=>Math.abs(z-ux))),frac=e<=.35?1:e<=.8?.5:0;
        zeros.forEach(z=>{api.dot(g.px(z),g.py(f(z)),5.5,C.ok);api.line(g.px(z-.8),g.py(f(z)),g.px(z+.8),g.py(f(z)),C.ok,1.6,[4,3])});api.dot(x,y,3.5,frac?C.ok:C.no);
        api.answer(frac===1,frac,`horizontal tangent${zeros.length>1?"s":""} at x ≈ <b>${zeros.map(z=>api.fmt(z,1)).join(", ")}</b>`,()=>{})});
    }
  }};
const VEC={id:"vec",title:"Vector Sum",how:"Tip to tail. Click where a vector expression lands, judge the sign of a dot product, or pick a cross product.",h:280,kinds:["vectors","cross","proj","dist"],
  round(api){
    const C=api.C,mode=api.i<=2?"add":api.pick(["add","sub","scale","dot","proj","cross"]);
    const pv=()=>[api.pick([-3,-2,-1,1,2,3]),api.pick([-3,-2,-1,1,2,3])];
    if(mode==="cross"){api.canvas(0);const u=[api.ri(-3,3),api.ri(-3,3),api.ri(-3,3)],v=[api.ri(-3,3),api.ri(-3,3),api.ri(-3,3)];
      const w=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];if(!w.some(x=>x))return VEC.round(api);
      api.q(`u = ${vstr(u)}, v = ${vstr(v)}. What is <b>u × v</b>?`);
      const opts=[{t:vstr(w),ok:true},{t:vstr(w.map(x=>-x)),ok:false},{t:vstr([w[1],w[0],w[2]]),ok:false},{t:vstr([u[0]*v[0],u[1]*v[1],u[2]*v[2]]),ok:false}];const seen=new Set();
      api.choices(opts.filter(o=>{if(seen.has(o.t))return false;seen.add(o.t);return true}),{msg:"check: the result is perpendicular to both (dot product 0)"});return}
    let u=pv(),v=pv(),tgt,q;
    if(mode==="add"){tgt=[u[0]+v[0],u[1]+v[1]];q="Click the tip of <b>u + v</b>."}
    else if(mode==="sub"){tgt=[u[0]-v[0],u[1]-v[1]];q="Click the tip of <b>u − v</b>."}
    else if(mode==="scale"){const s=api.pick([2,-1,-2,.5]);tgt=[s*u[0]+v[0],s*u[1]+v[1]];q=`Click the tip of <b>${api.neg(s===.5?"½":s)}u + v</b>.`}
    else if(mode==="proj"){const k=(u[0]*v[0]+u[1]*v[1])/(v[0]*v[0]+v[1]*v[1]);tgt=[k*v[0],k*v[1]];q="Click the tip of the <b>projection of u onto v</b>."}
    if(mode!=="dot"&&(Math.abs(tgt[0])>5.5||Math.abs(tgt[1])>5.5))return VEC.round(api);
    const g=api.grid({xr:[-6,6],yr:[-6,6]});
    api.arrow(g.px(0),g.py(0),g.px(u[0]),g.py(u[1]),C.acc,2.4);api.text("u "+vstr(u),g.px(u[0])+6,g.py(u[1])-6,{size:11,color:C.acc,halo:C.halo});
    api.arrow(g.px(0),g.py(0),g.px(v[0]),g.py(v[1]),C.t2,2.4);api.text("v "+vstr(v),g.px(v[0])+6,g.py(v[1])+14,{size:11,color:C.t2,halo:C.halo});
    if(mode==="dot"){const dp=u[0]*v[0]+u[1]*v[1];api.q("Without computing it exactly: is <b>u · v</b> positive, zero or negative?");
      api.choices([{t:"positive (angle under 90°)",ok:dp>0},{t:"zero (perpendicular)",ok:dp===0},{t:"negative (angle over 90°)",ok:dp<0}],{keep:true,one:true,msg:`u · v = ${vstr(u).slice(1,-1).split(", ")[0]}·${vstr(v).slice(1,-1).split(", ")[0]} + … = <b>${api.neg(dp)}</b>`});return}
    api.q(q);
    api.tap((x,y)=>{const d=Math.hypot(g.xi(x)-tgt[0],g.yi(y)-tgt[1]),frac=d<=.5?1:d<=1.1?.5:0;
      if(mode==="add"){api.arrow(g.px(u[0]),g.py(u[1]),g.px(tgt[0]),g.py(tgt[1]),C.t3,1.6)}
      if(mode==="sub"){api.arrow(g.px(u[0]),g.py(u[1]),g.px(tgt[0]),g.py(tgt[1]),C.t3,1.6);api.text("−v",(g.px(u[0])+g.px(tgt[0]))/2+6,(g.py(u[1])+g.py(tgt[1]))/2,{size:10,color:C.t3})}
      if(mode==="proj"){api.line(g.px(u[0]),g.py(u[1]),g.px(tgt[0]),g.py(tgt[1]),C.t3,1.2,[3,3])}
      api.arrow(g.px(0),g.py(0),g.px(tgt[0]),g.py(tgt[1]),C.ok,2.6);api.dot(x,y,3.5,frac?C.ok:C.no);
      api.text(mode==="proj"?`(${api.fmt(tgt[0],1)}, ${api.fmt(tgt[1],1)})`:vstr(tgt),g.px(tgt[0])+8,g.py(tgt[1])+4,{size:11,color:C.ok,halo:C.halo});
      api.answer(frac===1,frac,`it lands at <b>${mode==="proj"?"("+api.fmt(tgt[0],2)+", "+api.fmt(tgt[1],2)+")":vstr(tgt)}</b>`,()=>{})});
  }};
const OPT={id:"opt",title:"Box Max",how:"Slide the one free measurement and watch the quantity respond. Lock in where you think it peaks (or bottoms out). Calculus finds it exactly.",h:200,kinds:["optbox","ladder"],
  round(api){
    const C=api.C,k=api.i<=2?"box":api.pick(["box","fence","can","rect"]);const X=api.W/2,Y=api.H/2;
    let min,max,step,val,V,best,bestAt,unit,label,draw,q,note;
    if(k==="box"){const a=api.pick([12,18,20,24,30]);min=.5;max=a/2-.5;step=.5;val=1;V=x=>x*(a-2*x)*(a-2*x);bestAt=a/6;unit="cm³";label="cut x (cm)";q=`A ${a} cm × ${a} cm sheet. Cut a square of side x from each corner and fold up a box. Which x gives the <b>largest volume</b>?`;note=`V = x(${a} − 2x)²; V′ = 0 at x = ${a}/6 ≈ ${api.fmt(a/6,2)}`;
      draw=x=>{const s=Math.min(api.H-40,150)/a,x0=X-a*s/2,y0=Y-a*s/2;api.cx.strokeStyle=C.t3;api.cx.lineWidth=1;api.cx.strokeRect(x0,y0,a*s,a*s);api.cx.fillStyle=C.acc;api.cx.globalAlpha=.25;api.cx.fillRect(x0+x*s,y0+x*s,(a-2*x)*s,(a-2*x)*s);api.cx.globalAlpha=1;
        [[x0,y0],[x0+a*s-x*s,y0],[x0,y0+a*s-x*s],[x0+a*s-x*s,y0+a*s-x*s]].forEach(([px,py])=>{api.cx.fillStyle=C.t4;api.cx.fillRect(px,py,x*s,x*s)});
        api.text(`base ${api.fmt(a-2*x,1)} cm, height ${api.fmt(x,1)} cm`,X,y0+a*s+16,{size:10,color:C.t2,align:"center"})}}
    else if(k==="fence"){const P=api.pick([40,60,80,100,120]);min=1;max=P/2-1;step=1;val=5;V=x=>x*(P-2*x);bestAt=P/4;unit="m²";label="width x (m)";q=`${P} m of fence makes three sides of a rectangle against a straight river. Which width x gives the <b>largest area</b>?`;note=`A = x(${P} − 2x); A′ = 0 at x = ${P/4}`;
      draw=x=>{const sc=Math.min((api.W-60)/P,(api.H-60)/(P/2)),w=(P-2*x)*sc,h=x*sc,x0=X-w/2,y0=Y+40;api.line(X-api.W/2+20,y0,X+api.W/2-20,y0,"#4aa3df",4);api.text("river",X+api.W/2-24,y0-6,{size:9,color:"#4aa3df",align:"right"});
        api.cx.strokeStyle=C.acc;api.cx.lineWidth=2.5;api.cx.beginPath();api.cx.moveTo(x0,y0);api.cx.lineTo(x0,y0-h);api.cx.lineTo(x0+w,y0-h);api.cx.lineTo(x0+w,y0);api.cx.stroke();api.text(`${api.fmt(P-2*x,0)} m`,X,y0-h-6,{size:10,color:C.t2,align:"center"});api.text(`${x} m`,x0-6,y0-h/2+4,{size:10,color:C.t2,align:"right"})}}
    else if(k==="can"){const Vol=api.pick([330,500,1000]);min=1;max=12;step=.1;val=2;V=r=>-(2*Math.PI*r*r+2*Vol/r);bestAt=Math.cbrt(Vol/(2*Math.PI));unit="cm²";label="radius r (cm)";q=`A can must hold ${Vol} cm³. Which radius uses the <b>least metal</b> (surface area)?`;note=`SA = 2πr² + ${2*Vol}/r; SA′ = 0 at r = ∛(${Vol}/2π) ≈ ${api.fmt(bestAt,2)}`;
      draw=r=>{const hh=Vol/(Math.PI*r*r),sc=Math.min((api.H-50)/Math.max(hh,2*r,20),6);const w=2*r*sc,h=hh*sc;api.cx.strokeStyle=C.acc;api.cx.lineWidth=2;api.cx.strokeRect(X-w/2,Y-h/2,w,h);api.cx.beginPath();api.cx.ellipse(X,Y-h/2,w/2,Math.min(8,w/6),0,0,6.2832);api.cx.stroke();api.text(`r = ${api.fmt(r,1)}, h = ${api.fmt(hh,1)} cm`,X,Y+h/2+16,{size:10,color:C.t2,align:"center"})}}
    else{const P=api.pick([24,36,48,60]);min=1;max=P/2-1;step=1;val=2;V=x=>x*(P/2-x);bestAt=P/4;unit="cm²";label="width x (cm)";q=`A rectangle has perimeter ${P} cm. Which width gives the <b>largest area</b>?`;note=`A = x(${P/2} − x); A′ = 0 at x = ${P/4}`;
      draw=x=>{const sc=Math.min((api.W-60)/(P/2),(api.H-50)/(P/2)),w=(P/2-x)*sc,h=x*sc;api.cx.strokeStyle=C.acc;api.cx.lineWidth=2.5;api.cx.strokeRect(X-w/2,Y-h/2,w,h);api.text(`${P/2-x} × ${x}`,X,Y+h/2+16,{size:10,color:C.t2,align:"center"})}}
    best=V(bestAt);const show=v=>k==="can"?api.fmt(-v,1):api.fmt(v,1);
    api.q(q);let last=val;
    api.slider({label,min,max,step,val,fmt:v=>api.fmt(v,step<1?1:0)+"  →  "+show(V(v))+" "+unit,on(v){last=v;api.clear();draw(v)},
      score(v){const ratio=k==="can"?best/V(v):V(v)/best;return ratio>=.985?1:api.clamp((ratio-.6)/.385,0,.8)},
      msg(v){return `${note}; the best ${unit==="cm²"&&k==="can"?"surface area":"value"} is <b>${show(best)} ${unit}</b>, yours ${show(V(v))}`},
      reveal(){api.clear();draw(bestAt);api.text("best at "+api.fmt(bestAt,2),api.W-10,16,{size:12,color:C.ok,align:"right"})}});
  }};
const PLANE={id:"plane",title:"Plane Check",how:"Normals tell you almost everything about a plane: which way it faces, whether two planes are parallel, where a line pierces it.",h:0,kinds:["plane","planes2","pierce"],
  round(api){
    const k=api.i<=2?"normal":api.pick(["normal","on","rel","pierce","dist"]);
    const nz=()=>api.pick([-3,-2,-1,1,2,3]);
    const peq=(n,d)=>{const t=["x","y","z"].map((v,i)=>n[i]===0?"":(n[i]<0?" − ":" + ")+(Math.abs(n[i])===1?"":Math.abs(n[i]))+v).join("").replace(/^ \+ /,"").replace(/^ − /,"−");return t+" = "+api.neg(d)};
    if(k==="normal"){const n=[nz(),api.pick([0,nz()]),nz()],d=api.ri(-6,6);api.q(`A plane has equation <code>${peq(n,d)}</code>. Which vector is a <b>normal</b> to it?`);
      const opts=[{t:vstr(n),ok:true},{t:vstr([n[0],n[1],d]),ok:false},{t:vstr([n[2],n[1],n[0]]),ok:false},{t:vstr(n.map((x,i)=>i===1?-x:x)),ok:false},{t:vstr(n.map(x=>2*x)),ok:true,msg:"any multiple of the normal works"}];const seen=new Set();
      api.choices(api.shuffle(opts.filter(o=>{if(seen.has(o.t))return false;seen.add(o.t);return true})).slice(0,4),{msg:"the coefficients of x, y, z are the normal (or any multiple)"});}
    else if(k==="on"){const n=[nz(),nz(),nz()],P=[api.ri(-3,3),api.ri(-3,3),api.ri(-3,3)],d=n[0]*P[0]+n[1]*P[1]+n[2]*P[2],on=Math.random()<.5,Q=on?P:[P[0]+api.pick([-1,1]),P[1],P[2]];
      api.q(`Is the point ${vstr(Q)} on the plane <code>${peq(n,d)}</code>?`);const lhs=n[0]*Q[0]+n[1]*Q[1]+n[2]*Q[2];
      api.choices([{t:"yes",ok:lhs===d},{t:"no",ok:lhs!==d}],{keep:true,msg:`substituting gives ${api.neg(lhs)}${lhs===d?" = ":" ≠ "}${api.neg(d)}`});}
    else if(k==="rel"){const n1=[nz(),nz(),nz()],rel=api.pick(["parallel","perpendicular","neither"]);let n2;
      if(rel==="parallel")n2=n1.map(x=>x*api.pick([2,-1,-2]));else if(rel==="perpendicular"){n2=[n1[1],-n1[0],0];if(Math.random()<.5)n2=[0,n1[2],-n1[1]]}else{n2=[nz(),nz(),nz()];if(n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2]===0||n2.every((x,i)=>x*n1[0]===n1[i]*n2[0]))return PLANE.round(api)}
      api.q(`Planes <code>${peq(n1,api.ri(-5,5))}</code> and <code>${peq(n2,api.ri(-5,5))}</code> are …`);
      api.choices([{t:"parallel",ok:rel==="parallel"},{t:"perpendicular",ok:rel==="perpendicular"},{t:"neither",ok:rel==="neither"}],{keep:true,msg:rel==="parallel"?"one normal is a multiple of the other":rel==="perpendicular"?"the normals have dot product 0":`n₁ · n₂ = ${api.neg(n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2])} and the normals are not multiples`});}
    else if(k==="pierce"){const n=[nz(),nz(),nz()],t0=api.ri(-3,3),P=[api.ri(-3,3),api.ri(-3,3),api.ri(-3,3)];let dvec=[nz(),nz(),nz()];if(n[0]*dvec[0]+n[1]*dvec[1]+n[2]*dvec[2]===0)dvec[0]+=1;
      const Q=P.map((p,i)=>p+t0*dvec[i]),d=n[0]*Q[0]+n[1]*Q[1]+n[2]*Q[2];
      api.q(`The line <code>r = ${vstr(P)} + t${vstr(dvec)}</code> meets the plane <code>${peq(n,d)}</code> at what value of <b>t</b>?`);
      api.input({pre:"t =",ph:"t",check:v=>api.same(api.num(v),t0,.001),ans:api.neg(t0),why:`substitute x = ${api.neg(P[0])} ${dvec[0]<0?"−":"+"} ${Math.abs(dvec[0])}t, … and solve; the point is ${vstr(Q)}`});}
    else{const n=[nz(),nz(),nz()],d=api.ri(-6,6),P=[api.ri(-4,4),api.ri(-4,4),api.ri(-4,4)],num=Math.abs(n[0]*P[0]+n[1]*P[1]+n[2]*P[2]-d),D=num/Math.hypot(n[0],n[1],n[2]);
      api.q(`Distance from ${vstr(P)} to the plane <code>${peq(n,d)}</code>, to 2 decimals?`);
      api.input({ph:"distance",mode:"decimal",check:v=>Math.abs(api.num(v)-D)<=.006,ans:api.fmt(D,2),why:`|Ax₀ + By₀ + Cz₀ − D| / √(A² + B² + C²) = ${num}/√${n[0]*n[0]+n[1]*n[1]+n[2]*n[2]}`});}
  }};
return[GSHARED.gTangent({kinds:["tangent","rider","limit","expo","sincos","motion"]}),DERIV,VEC,OPT,PLANE];
})();

/* ══════════ Background games: engine (shared) ══════════
   Every background vignette is a door: click one (or tap it on a phone) and
   a short game on the same idea opens in an overlay. A game is eight rounds;
   each round asks one thing, scores it, and shows the answer. The site's
   games file defines GAMES = [{id, title, how, kinds, h, round(api)}, ...];
   this file supplies the overlay, the round loop, the scoring and the
   drawing helpers, and the hook that finds which vignette was clicked. */
(function(){
"use strict";
if(typeof GAMES==="undefined"||!GAMES.length||typeof vigs==="undefined")return;
const SITE=(document.querySelector(".chip")||{textContent:"site"}).textContent.trim().toLowerCase();
const ROUNDS=8,MONO="'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace";
const KIND2GAME={};GAMES.forEach(g=>(g.kinds||[]).forEach(k=>KIND2GAME[k]=g));

/* ── overlay ── */
const ov=document.createElement("div");ov.id="gm";ov.hidden=true;
ov.innerHTML=`<div class="gm-card" role="dialog" aria-modal="true" aria-labelledby="gm-title" tabindex="-1">
  <div class="gm-head"><div><div class="gm-kicker">background game</div><h2 id="gm-title"></h2><p class="gm-how"></p></div>
  <button class="gm-x" aria-label="Close">×</button></div>
  <div class="gm-q"></div><canvas class="gm-cv"></canvas><div class="gm-ui"></div><div class="gm-fb"></div>
  <div class="gm-foot"><span class="gm-round"></span><span class="gm-score"></span><span class="gm-streak"></span><span class="gm-best"></span></div></div>`;
document.body.appendChild(ov);
const Q=s=>ov.querySelector(s),card=Q(".gm-card"),cvEl=Q(".gm-cv"),ctx=cvEl.getContext("2d"),ui=Q(".gm-ui"),fb=Q(".gm-fb"),qEl=Q(".gm-q");
const S={g:null,i:0,score:0,streak:0,right:0,t0:0,locked:false,open:false,lastFocus:null,tap:null,move:null,raf:0};

/* ── small helpers ── */
const rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.floor(rnd(a,b+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const neg=s=>String(s).replace(/-/g,"−");
const fmt=(x,d)=>{if(d==null)d=2;let s=(Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toString();if(s==="-0")s="0";return neg(s)};
const SUP="⁰¹²³⁴⁵⁶⁷⁸⁹",sup=n=>String(n).split("").map(c=>c==="-"?"⁻":SUP[+c]).join("");
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
function frac(n,d){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;n/=g;d/=g;return d===1?neg(n):neg(n)+"/"+d}
/* parse a typed number: "3/4", "-2.5", "1 1/2", "2,5" */
function num(s){
  s=String(s).trim().replace(/−/g,"-").replace(/,/g,".").replace(/\s+/g," ");
  let m=s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);if(m)return (m[1]?-1:1)*(+m[2]+m[3]/m[4]);
  m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);if(m&&+m[2]!==0)return +m[1]/+m[2];
  m=s.match(/^(-?)√(\d+)$/);if(m)return (m[1]?-1:1)*Math.sqrt(+m[2]);
  const v=parseFloat(s);return isNaN(v)?NaN:v;
}
const same=(a,b,tol)=>isFinite(a)&&Math.abs(a-b)<=(tol==null?1e-6:tol);
function best(id){return +localStorage.getItem("gm-"+SITE+"-"+id)||0}
function colors(){
  const s=getComputedStyle(document.documentElement),g=k=>s.getPropertyValue(k).trim();
  return{ink:g("--ink"),t2:g("--t2"),t3:g("--t3"),t4:g("--t4"),acc:g("--accent"),ok:g("--done")||"#1f8a63",no:g("--warn-fg")||"#b32642",
    grid:g("--bdr"),bdr:g("--bdr2"),bg:g("--bg"),halo:g("--bg"),pal:k=>"rgb("+g("--pal-"+k)+")"};
}

/* ── the api handed to each round ── */
const api={rnd,ri,pick,shuffle,clamp,neg,fmt,sup,frac,num,same,cx:ctx,W:0,H:0,C:null};
api.q=html=>{qEl.innerHTML=html};
api.canvas=function(h){
  if(!h){cvEl.hidden=true;api.W=api.H=0;return}
  cvEl.hidden=false;const w=card.clientWidth-parseFloat(getComputedStyle(card).paddingLeft)*2;
  const dpr=Math.min(window.devicePixelRatio||1,2);api.W=Math.round(w);api.H=h;
  cvEl.width=api.W*dpr;cvEl.height=h*dpr;cvEl.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,api.W,h);
  ctx.lineCap="round";ctx.lineJoin="round";
};
api.clear=()=>ctx.clearRect(0,0,api.W,api.H);
api.text=function(s,x,y,o){
  o=o||{};ctx.font=(o.italic?"italic ":"")+(o.bold?"600 ":"")+(o.size||12)+"px "+MONO;ctx.textAlign=o.align||"left";ctx.textBaseline=o.base||"alphabetic";
  ctx.fillStyle=o.color||api.C.ink;if(o.halo){ctx.lineWidth=4;ctx.strokeStyle=o.halo;ctx.lineJoin="round";ctx.strokeText(s,x,y)}ctx.fillText(s,x,y);ctx.textAlign="left";ctx.textBaseline="alphabetic";
};
api.dot=(x,y,r,c)=>{ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fillStyle=c;ctx.fill()};
api.ring=(x,y,r,c,w)=>{ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.strokeStyle=c;ctx.lineWidth=w||1.5;ctx.stroke()};
api.line=(x1,y1,x2,y2,c,w,dash)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=c;ctx.lineWidth=w||1.5;if(dash)ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([])};
api.arrow=function(x1,y1,x2,y2,c,w){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<1)return;
  api.line(x1,y1,x2,y2,c,w||2);const ux=dx/L,uy=dy/L,hs=Math.min(10,L*.4);
  ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-ux*hs-uy*hs*.45,y2-uy*hs+ux*hs*.45);ctx.lineTo(x2-ux*hs+uy*hs*.45,y2-uy*hs-ux*hs*.45);ctx.closePath();ctx.fillStyle=c;ctx.fill();
};
/* a Cartesian grid: o.xr/o.yr ranges, o.step grid spacing, o.square = same scale both ways; returns px,py,xi,yi */
api.grid=function(o){
  o=o||{};const xr=o.xr||[-5,5],yr=o.yr||[-5,5],pad=o.pad==null?14:o.pad,st=o.step||1,C=api.C;
  let sx=(api.W-2*pad)/(xr[1]-xr[0]),sy=(api.H-2*pad)/(yr[1]-yr[0]);
  if(o.square!==false){const s=Math.min(sx,sy);sx=sy=s}
  const ox=pad+(api.W-2*pad-sx*(xr[1]-xr[0]))/2,oy=pad+(api.H-2*pad-sy*(yr[1]-yr[0]))/2;
  const px=x=>ox+(x-xr[0])*sx,py=y=>oy+(yr[1]-y)*sy,xi=X=>xr[0]+(X-ox)/sx,yi=Y=>yr[1]-(Y-oy)/sy;
  if(o.lines!==false){ctx.strokeStyle=C.grid;ctx.lineWidth=1;
    for(let x=Math.ceil(xr[0]/st)*st;x<=xr[1]+1e-9;x+=st){ctx.beginPath();ctx.moveTo(px(x),py(yr[0]));ctx.lineTo(px(x),py(yr[1]));ctx.stroke()}
    for(let y=Math.ceil(yr[0]/st)*st;y<=yr[1]+1e-9;y+=st){ctx.beginPath();ctx.moveTo(px(xr[0]),py(y));ctx.lineTo(px(xr[1]),py(y));ctx.stroke()}}
  if(o.axes!==false){ctx.strokeStyle=C.t3;ctx.lineWidth=1.3;
    if(yr[0]<=0&&yr[1]>=0){ctx.beginPath();ctx.moveTo(px(xr[0]),py(0));ctx.lineTo(px(xr[1]),py(0));ctx.stroke()}
    if(xr[0]<=0&&xr[1]>=0){ctx.beginPath();ctx.moveTo(px(0),py(yr[0]));ctx.lineTo(px(0),py(yr[1]));ctx.stroke()}}
  if(o.labels!==false){const lb=o.lab||(st>=1?st*(xr[1]-xr[0]>12?2:1):1);
    for(let x=Math.ceil(xr[0]/lb)*lb;x<=xr[1]+1e-9;x+=lb){if(Math.abs(x)<1e-9)continue;api.text(neg(+x.toFixed(2)),px(x),py(Math.max(yr[0],Math.min(yr[1],0)))+(yr[0]<=0?11:-3),{size:9,color:C.t3,align:"center"})}
    for(let y=Math.ceil(yr[0]/lb)*lb;y<=yr[1]+1e-9;y+=lb){if(Math.abs(y)<1e-9)continue;api.text(neg(+y.toFixed(2)),px(Math.max(xr[0],Math.min(xr[1],0)))-4,py(y)+3,{size:9,color:C.t3,align:"right"})}}
  return{px,py,xi,yi,xr,yr,sx,sy};
};
/* trace y = fn(x) over [a,b] through grid g; breaks at jumps */
api.plot=function(fn,g,c,w,dash,a,b,n){
  a=a==null?g.xr[0]:a;b=b==null?g.xr[1]:b;n=n||160;ctx.save();ctx.beginPath();ctx.rect(0,0,api.W,api.H);ctx.clip();
  ctx.beginPath();let pen=false,py0=0;
  for(let i=0;i<=n;i++){const x=a+(b-a)*i/n,y=fn(x);
    if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue}
    const X=g.px(x),Y=g.py(y);if(pen&&Math.abs(Y-py0)>api.H*1.5)pen=false;
    pen?ctx.lineTo(X,Y):ctx.moveTo(X,Y);pen=true;py0=Y}
  ctx.strokeStyle=c;ctx.lineWidth=w||2.2;if(dash)ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);ctx.restore();
};
/* controls */
function btn(label,cls,fn){const b=document.createElement("button");b.className=cls||"gm-btn";b.innerHTML=label;b.addEventListener("click",fn);return b}
api.choices=function(list,o){
  o=o||{};ui.className="gm-ui grid"+(o.one?" one":"");ui.innerHTML="";
  const items=list.map((it,i)=>typeof it==="string"?{t:it,ok:i===o.ok}:it),order=o.keep?items:shuffle(items);
  order.forEach((it,i)=>{const b=btn(`<span class="k">${i+1}</span>${it.t}`,"gm-ch",()=>{
    if(S.locked)return;b.classList.add("pick");
    const ok=!!it.ok;ui.querySelectorAll(".gm-ch").forEach(x=>{x.disabled=true;if(x._it.ok)x.classList.add("ok")});if(!ok)b.classList.add("no");
    api.answer(ok,ok?1:0,it.msg||o.msg||"",o.reveal)});b._it=it;ui.appendChild(b)});
};
api.input=function(o){
  ui.className="gm-ui";ui.innerHTML="";
  if(o.pre){const p=document.createElement("span");p.className="gm-pre";p.innerHTML=o.pre;ui.appendChild(p)}
  const inp=document.createElement("input");inp.className="gm-in";inp.placeholder=o.ph||"";inp.autocomplete="off";inp.spellcheck=false;inp.setAttribute("inputmode",o.mode||"text");ui.appendChild(inp);
  const go=()=>{if(S.locked)return;const v=inp.value.trim();if(!v)return;let r=o.check(v);if(r===true)r=1;if(r===false)r=0;
    inp.disabled=true;inp.classList.add(r>=.999?"ok":"no");api.answer(r>=.999,r,r>=.999?"":("answer: <b>"+o.ans+"</b>"+(o.why?" · "+o.why:"")),o.reveal)};
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go()}});
  ui.appendChild(btn("Check","gm-btn",go));setTimeout(()=>inp.focus(),30);return inp;
};
/* a slider plus a Lock in button; o.score(v) → 0..1 fraction; o.fmt(v) → readout; o.on(v) → redraw */
api.slider=function(o){
  ui.className="gm-ui";ui.innerHTML="";
  const wrap=document.createElement("div");wrap.className="gm-sl";const lab=document.createElement("label");const nm=document.createElement("span");nm.textContent=o.label||"";const val=document.createElement("b");lab.append(nm,val);
  const r=document.createElement("input");r.type="range";r.min=o.min;r.max=o.max;r.step=o.step||1;r.value=o.val==null?(o.min+o.max)/2:o.val;
  const upd=()=>{val.textContent=o.fmt?o.fmt(+r.value):r.value;if(o.on)o.on(+r.value)};r.addEventListener("input",upd);wrap.append(lab,r);ui.appendChild(wrap);
  ui.appendChild(btn(o.btn||"Lock in","gm-btn",()=>{if(S.locked)return;r.disabled=true;const v=+r.value,sc=clamp(o.score(v),0,1);api.answer(sc>=.999,sc,o.msg?o.msg(v,sc):"",o.reveal)}));
  upd();setTimeout(()=>r.focus(),30);return()=>+r.value;
};
/* several sliders (transform match): o.params [{k,label,min,max,step,val,fmt}], o.on(vals), o.score(vals) */
api.sliders=function(o){
  ui.className="gm-ui";ui.innerHTML="";const rs={};
  const vals=()=>{const v={};for(const k in rs)v[k]=+rs[k].value;return v};
  o.params.forEach(p=>{const wrap=document.createElement("div");wrap.className="gm-sl";const lab=document.createElement("label");const nm=document.createElement("span");nm.textContent=p.label;const val=document.createElement("b");lab.append(nm,val);
    const r=document.createElement("input");r.type="range";r.min=p.min;r.max=p.max;r.step=p.step||1;r.value=p.val;rs[p.k]=r;
    const upd=()=>{val.textContent=p.fmt?p.fmt(+r.value):neg(r.value);if(o.on)o.on(vals())};r.addEventListener("input",upd);wrap.append(lab,r);ui.appendChild(wrap);upd()});
  ui.appendChild(btn(o.btn||"Lock in","gm-btn",()=>{if(S.locked)return;for(const k in rs)rs[k].disabled=true;const v=vals(),sc=clamp(o.score(v),0,1);api.answer(sc>=.999,sc,o.msg?o.msg(v,sc):"",o.reveal)}));
  if(o.on)o.on(vals());return vals;
};
/* click on the canvas: fn(x,y) in CSS px; o.move(x,y) for a live preview */
api.tap=function(fn,move){S.tap=fn;S.move=move||null;cvEl.classList.add("tap");ui.className="gm-ui";ui.innerHTML="";
  const p=document.createElement("span");p.className="gm-pre";p.textContent="click on the graph";ui.appendChild(p)};
function cvPos(e){const r=cvEl.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[(t.clientX-r.left)*api.W/r.width,(t.clientY-r.top)*api.H/r.height]}
cvEl.addEventListener("click",e=>{if(!S.tap||S.locked)return;const[x,y]=cvPos(e);const f=S.tap;S.tap=null;S.move=null;cvEl.classList.remove("tap");f(x,y)});
cvEl.addEventListener("mousemove",e=>{if(S.move&&!S.locked){const[x,y]=cvPos(e);S.move(x,y)}});
cvEl.addEventListener("mouseleave",()=>{if(S.move&&!S.locked)S.move(-1e4,-1e4)});

/* ── round loop and scoring ── */
function setFoot(){
  Q(".gm-round").innerHTML=S.i>ROUNDS?"done":`round <b>${S.i}</b>/${ROUNDS}`;Q(".gm-score").innerHTML=`score <b>${S.score}</b>`;
  Q(".gm-streak").innerHTML=S.streak>1?`streak <b>×${S.streak}</b>`:"";const b=best(S.g.id);Q(".gm-best").innerHTML=b?`best <b>${b}</b>`:"";
}
function reset(){S.locked=false;S.tap=null;S.move=null;cvEl.classList.remove("tap");ui.className="gm-ui";ui.innerHTML="";fb.className="gm-fb";fb.innerHTML="";qEl.innerHTML=""}
function next(){
  if(S.i>=ROUNDS)return finish();
  S.i++;api.i=S.i;reset();setFoot();S.t0=performance.now();
  api.C=colors();api.canvas(S.g.h==null?260:S.g.h);
  try{S.g.round(api)}catch(err){console.error(err);api.q("That round broke. Skipping it.");fb.innerHTML="";setTimeout(next,600)}
}
api.answer=function(ok,frac,msg,reveal){
  if(S.locked)return;S.locked=true;S.tap=null;S.move=null;cvEl.classList.remove("tap");
  const dt=performance.now()-S.t0;frac=clamp(frac==null?(ok?1:0):frac,0,1);
  let pts=Math.round(100*frac);if(ok){S.streak++;S.right++;pts+=Math.round(40*clamp(1-(dt-3000)/8000,0,1));if(S.streak>=3)pts+=25}else if(frac<.5)S.streak=0;
  S.score+=pts;setFoot();if(pts)Q(".gm-score").classList.add("gm-pop");setTimeout(()=>Q(".gm-score").classList.remove("gm-pop"),400);
  fb.className="gm-fb "+(ok?"ok":frac>=.5?"mid":"no");
  fb.innerHTML=(ok?"✓ +"+pts+(S.streak>=3?" streak bonus":""):frac>=.5?"close · +"+pts:"✗")+(msg?" <span>"+msg+"</span>":"");
  if(reveal)try{reveal(api)}catch(err){console.error(err)}
  if(ok&&!reveal)setTimeout(()=>{if(S.open&&S.locked)next()},900);
  else{const b=btn("Next ⏎","gm-btn",next);fb.appendChild(b);setTimeout(()=>b.focus(),20)}
};
function finish(){
  S.i=ROUNDS+1;reset();api.canvas(0);setFoot();
  const b=best(S.g.id),nb=S.score>b;if(nb)localStorage.setItem("gm-"+SITE+"-"+S.g.id,S.score);
  qEl.innerHTML=`<div class="gm-end"><div class="big">${S.score}</div><div class="sub">${S.right} of ${ROUNDS} right${nb?" · new best":b?" · best "+b:""}</div><div class="acts"></div></div>`;
  const acts=qEl.querySelector(".acts");acts.appendChild(btn("Play again","gm-btn",()=>start(S.g)));acts.appendChild(btn("Close","gm-btn ghost",close));
  const pb=document.createElement("div");pb.className="pb";GAMES.filter(g=>g!==S.g).forEach(g=>pb.appendChild(btn(g.title,"gm-btn ghost",()=>start(g))));acts.appendChild(pb);
  setFoot();
}
function start(g){
  S.g=g;S.i=0;S.score=0;S.streak=0;S.right=0;Q("#gm-title").textContent=g.title;Q(".gm-how").textContent=g.how||"";
  if(!S.open){S.open=true;S.lastFocus=document.activeElement;ov.hidden=false;document.body.classList.add("gm-open");setTimeout(()=>card.focus(),30)}
  next();
}
function close(){if(!S.open)return;S.open=false;ov.hidden=true;document.body.classList.remove("gm-open");reset();if(S.lastFocus&&S.lastFocus.focus)S.lastFocus.focus()}
Q(".gm-x").addEventListener("click",close);
ov.addEventListener("click",e=>{if(e.target===ov)close()});
document.addEventListener("keydown",e=>{
  if(!S.open)return;
  if(e.key==="Escape"){close();return}
  const inInput=e.target&&e.target.tagName==="INPUT"&&e.target.type!=="range";
  if(inInput)return;
  if(/^[1-6]$/.test(e.key)){const b=ui.querySelectorAll(".gm-ch")[+e.key-1];if(b&&!b.disabled){e.preventDefault();b.click()}}
  else if(e.key==="Enter"&&S.locked){const b=fb.querySelector(".gm-btn");if(b){e.preventDefault();b.click()}}
  else if(e.key==="Enter"&&!S.locked){const b=ui.querySelector(".gm-btn");if(b&&e.target.tagName!=="BUTTON"){e.preventDefault();b.click()}}
});
window.addEventListener("resize",()=>{if(S.open&&S.i>=1&&S.i<=ROUNDS&&!cvEl.hidden){/* a resize mid-round redraws by replaying the round */const g=S.g,i=S.i,sc=S.score,st=S.streak,r=S.right;S.i=i-1;S.score=sc;S.streak=st;S.right=r;next()}});
window.GM={open:start,games:GAMES,close};

/* ── the hook: which vignette is under a point on empty page ── */
/* clicks pass through blank table space inside an open unit; the row headers, links and controls keep their own jobs */
const BLOCK='a,button,input,select,textarea,label,.uhead,.hero,.sbar,.top-bar,.help,.fab,.tipwrap,#gm';
function vigAt(x,y){
  for(const v of vigs){if(!v)continue;
    const span=H+v.h+80,yy=(((v.y-SCY*.1)+v.h+40)%span+span)%span-v.h-40,m=14;
    if(x>=v.x-m&&x<=v.x+v.w+m&&y>=yy-m&&y<=yy+v.h+m+10)return{v,yy}}
  return null;
}
const emptyEl=el=>!!el&&!el.closest(BLOCK);
document.addEventListener("click",e=>{
  if(S.open||e.defaultPrevented||e.button)return;
  if(!emptyEl(e.target))return;
  const hit=vigAt(e.clientX,e.clientY);if(!hit)return;
  const g=KIND2GAME[hit.v.kind]||pick(GAMES);start(g);
});
})();
