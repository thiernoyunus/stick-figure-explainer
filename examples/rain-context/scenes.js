// Anonymous teaching figures; none represents a prophet or a Qur’anic historical person.
(function () {
  const SC = window.SCENES = window.SCENES || {};
  const R = window.RIG;
  const {C,E,P,mix,fig,rr,inkFill,ln,circle,text,seg,breathe,lp,sparks,tickBadge,bubble,walkSeg,legs}=R;
  const red='#ba5545', green='#28765a', blue='#4969a0', butter='#f8d65e';
  const rest=P({hF:[5,-50],hB:[-3,-50],head:[6,-116]});
  const bump=(T,a,b,c,d)=>E.soft(seg(T,a,b))*(1-E.soft(seg(T,c,d)));
  const fade=T=>1-E.soft(seg(T,5.3,6));
  function cloud(g,x,y,s=1,fill='#edf0f4') {
    g.save();g.translate(x,y);g.scale(s,s);
    g.beginPath();g.moveTo(-42,12);g.bezierCurveTo(-64,10,-59,-16,-39,-17);g.bezierCurveTo(-40,-42,-5,-46,5,-25);g.bezierCurveTo(24,-38,45,-19,39,-7);g.bezierCurveTo(64,-11,65,17,42,18);g.lineTo(-42,18);g.closePath();inkFill(g,fill,1.7);g.restore();
  }
  function rain(g,T,x0,x1,y0,y1,k,color=blue) {
    g.save();g.globalAlpha*=k;
    for(let i=0;i<24;i++) {const x=x0+R.hash(i*4.7)*(x1-x0),v=(T*.95+R.hash(i*8.3))%1,y=y0+v*(y1-y0);ln(g,x,y,x-2.5,y+7,1.25,color)}
    g.restore();
  }
  function arabic(g,s,x,y,size=25,col=C.ink) {g.save();g.font=`600 ${size}px Arabic`;g.textAlign='center';g.fillStyle=col;g.fillText(s,x,y);g.restore()}
  function wordCard(g,x,y,arab,en,sub,fill,col,k=1) {
    g.save();g.translate(x,y);g.rotate(Math.sin(y*.1)*.025);g.scale(k,k);
    rr(g,-55,-41,110,82,6);inkFill(g,fill,1.7);arabic(g,arab,0,-7,27,col);text(g,en,0,12,11,col);text(g,sub,0,29,8.5,col);g.restore();
  }
  function sprout(g,x,grow,t,flower=false) {
    if(grow<=.02)return;
    g.save();g.translate(x,-3);g.scale(1,Math.max(.03,grow));const sway=Math.sin(t*1.8+x)*3;
    R.strokePath(g,[[0,0],[sway*.25,-22],[sway,-50]],2,green);
    for(const [side,y] of [[-1,-18],[1,-28],[-1,-36]]) {g.beginPath();g.moveTo(sway*.5,y);g.quadraticCurveTo(side*23+sway,y-24,side*24+sway,y-9);g.quadraticCurveTo(side*15+sway,y+5,sway*.5,y);inkFill(g,'#b9df9c',1.2,green)}
    if(flower){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;circle(g,sway+Math.cos(a)*7,-55+Math.sin(a)*7,5);inkFill(g,butter,1,green)}circle(g,sway,-55,3);inkFill(g,'#ba5545',1,green)}g.restore();
  }
  SC['rain-words']={dur:6,width:380,label:'A curious stick figure compares two Arabic rain words on hanging cards, then points out their different contexts.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    const left=bump(T,.55,.9,1.2,1.55),right=bump(T,2,2.4,4.2,4.6);
    ln(g,-158,-170,154,-170,2.4,C.woodDk);
    for(const [x,a,en,sub,col,fill] of [[-76,'مَطَر','MATAR','often harm',red,'#fae4dd'],[76,'غَيْث','GHAYTH','rain as relief',green,'#e3efd7']]){
      const sway=Math.sin(S.t*1.5+x)*.02*k;g.save();g.translate(x,-170);g.rotate(sway);ln(g,-20,0,-20,20,1);ln(g,20,0,20,20,1);wordCard(g,0,61,a,en,sub,fill,col);g.restore();
    }
    for(const [x,hit,col] of [[-24,left,red],[24,right,green]]){circle(g,x,-92,4);inkFill(g,hit>.4?butter:'#fff',1,col)}
    const sx=T>=.35&&T<1.7?-1:1;
    let p=breathe(rest,S.t);const hit=sx<0?left:right,target=[sx<0?-24:24,-92];
    p=mix(p,P({hF:lp(target,-4,0,sx),hB:[-4,-52],head:[8,-116]}),hit);
    fig(g,p,-4,0,{sx});
    for(const [x,at,col] of [[-76,.9,red],[76,2.4,green]]){const lit=seg(T,at,at+.15)*k;g.save();g.globalAlpha*=lit;R.wline(g,[[x-35,-73],[x+34,-73]],1.8,col);g.restore();sparks(g,x,-108,seg(T,at,at+.65),13,5,col)}
  }};
  SC['matar-storm']={dur:6,width:380,label:'An anonymous figure grips a yellow umbrella as slanting rain and wind make the journey difficult.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    cloud(g,70,-145,.95,'#dce2eb');rain(g,S.t,-5,138,-132,-14,k,blue);
    for(let i=0;i<3;i++){const a=(S.t*.5+i/3)%1;g.save();g.globalAlpha*=Math.sin(Math.PI*a)*k;R.strokePath(g,[[-164+a*65,-122+i*28],[-132+a*65,-126+i*28],[-109+a*65,-123+i*28]],1.3,blue);g.restore()}
    g.beginPath();g.ellipse(60,-1,64,5,0,0,Math.PI*2);inkFill(g,'#dcebf2',1,'#8bb1c2');
    let p=breathe(P({hF:[30,-63],hB:[-4,-52],head:[6,-116]}),S.t);const hold=bump(T,.3,.9,4.6,5.3);p=mix(p,P({hF:[24,-103],hB:[-4,-52],head:[5,-116],chest:[-2,-90]}),hold);
    fig(g,p,-80,0,{held:(gg,J)=>R.held(gg,J,h=>{const open=E.soft(seg(hold,.7,1));gg.save();gg.translate(h[0],h[1]);gg.rotate(-.1+Math.sin(S.t*4)*.025*k);ln(gg,0,7,0,-39,2);gg.save();gg.translate(0,-39);gg.scale(.08+.92*open,1);gg.beginPath();gg.arc(0,0,33,Math.PI,0);gg.quadraticCurveTo(16,-3,0,0);gg.quadraticCurveTo(-16,-3,-33,0);inkFill(gg,butter,1.5);gg.restore();gg.restore()})});
    bubble(g,81,-59,'hardship',bump(T,1.6,2.1,4.5,5),{size:9,fill:'#fae4dd',tail:4});
  }};
  SC['stone-shower']={dur:6,width:380,label:'A teaching figure points to a framed diagram of falling stones above empty houses, illustrating the destructive shower in Quran 7:84.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    ln(g,-30,-33,-38,0,2);ln(g,139,-33,147,0,2);rr(g,-44,-176,200,143,7);inkFill(g,'#fffaf4',1.8);
    cloud(g,57,-140,.65,'#e4c9c0');
    for(let i=0;i<3;i++){const x=-7+i*58;rr(g,x,-66,34,23,1);inkFill(g,'#ead6bf',1.2);R.poly(g,[[x-3,-66],[x+17,-81],[x+37,-66]],true);inkFill(g,'#e2ad91',1.2,red)}
    g.save();g.beginPath();g.rect(-38,-111,188,61);g.clip();g.globalAlpha*=k*E.soft(seg(T,1.18,1.4));
    for(let i=0;i<8;i++){const x=-20+R.hash(i*6)*155,v=(T*.65+i*.17)%1,y=-115+v*81;g.save();g.translate(x,y);g.rotate(v*3+i);R.poly(g,[[-4,-3],[1,-5],[5,0],[2,5],[-4,3]],true);inkFill(g,'#aa7962',1.2,red);g.restore()};g.restore();
    const ws=T<4.7?walkSeg(T,.1,.8,-112,-82):walkSeg(T,4.7,5.6,-82,-112);
    const tap=bump(T,.8,1.15,1.5,1.9);
    circle(g,-49,-75,5);inkFill(g,tap>.7?butter:'#fff',1.3,red);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-49,-75],ws.x,0),hB:[-4,-52],head:[9,-114],chest:[3,-89]}),tap);
    p=legs(p,T<4.7?ws.ph:-ws.ph,ws.amp,{arms:false,stride:ws.stride});fig(g,p,ws.x,0);
  }};
  SC['ghayth-garden']={dur:6,width:380,label:'A tired figure waits beside a dry garden; welcome rain arrives, plants grow, and the figure celebrates the relief.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0,grow=E.soft(seg(T,1.8,3.5))*k;
    rr(g,-15,-6,168,12,5);inkFill(g,'#e7d4ad',1.2,C.umber);
    for(let i=0;i<4;i++) {const x=12+i*39;sprout(g,x,grow,S.t,i%2===0);if(grow<.4){g.save();g.globalAlpha*=1-grow/.4;R.strokePath(g,[[x-4,-5],[x+3,-1],[x-1,2]],.8,C.umber);g.restore()}}
    cloud(g,65,-145,.95,'#e7edf2');rain(g,S.t,-6,141,-128,-45,bump(T,.6,1.2,3.7,4.7)*k,'#6c9cb4');
    let p=breathe(rest,S.t);p=mix(p,P({chest:[4,-86],head:[14,-106],hF:[5,-50],hB:[-3,-50]}),bump(T,.1,.5,1.3,1.8));p=mix(p,P({hF:[5,-50],hB:[-3,-50],head:[7,-118],chest:[1,-91]}),bump(T,2.9,3.6,4.5,5.2));fig(g,p,-93,0);
    bubble(g,-95,-143,'finally!',bump(T,3.2,3.6,4.5,4.9),{size:9,tail:6,fill:'#e3efd7'});sparks(g,64,-85,seg(T,3.3,4.2),30,7,green);
  }};
  SC['context-board']={dur:6,width:380,label:'A figure checks a context board: Quran 4:102 uses matar for rain causing hardship, so the always-punishment claim is crossed out.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    ln(g,-22,-38,-30,0,2);ln(g,137,-38,145,0,2);rr(g,-41,-169,202,131,6);inkFill(g,'#fff',1.7);rr(g,-34,-162,188,29,4);inkFill(g,'#e5edf9',0,blue);text(g,'READ THE CONTEXT',60,-143,11,blue);
    text(g,'matar = always punishment?',60,-112,9,red);
    R.strokePath(g,R.partial([[-23,-109],[140,-118]],E.soft(seg(T,2.3,2.7))*k),2,red);
    g.save();g.globalAlpha*=E.soft(seg(T,2.6,3.2))*k;text(g,'4:102 → rain causing hardship',60,-88,9,blue);g.restore();
    rr(g,-36,-83,24,27,3);inkFill(g,'#fff6d1',1,blue);
    tickBadge(g,-24,-69,E.soft(seg(T,2.3,2.7))*k,8,'#e3efd7',green);
    const ws=T<4.7?walkSeg(T,.15,1.1,-110,-60):walkSeg(T,4.7,5.6,-60,-110);
    const press=bump(T,1.6,2.15,2.45,2.9);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-24,-72],ws.x,0),hB:[-4,-52],head:[9,-114],chest:[3,-89]}),press);
    p=legs(p,T<4.7?ws.ph:-ws.ph,ws.amp,{arms:false,stride:ws.stride});
    fig(g,p,ws.x,0,{held:(gg,J)=>R.held(gg,J,h=>{rr(gg,h[0]-3,h[1]-7,6,8,1.5);inkFill(gg,C.wood,1);rr(gg,h[0]-7,h[1]+1,14,3,1);inkFill(gg,blue,1)})});
    sparks(g,-24,-69,seg(T,2.35,3),16,6,green);
  }};
})();
