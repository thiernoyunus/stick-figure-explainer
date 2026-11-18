// These are anonymous readers and teaching props, never Allah or historical people.
(function(){
  const SC=window.SCENES=window.SCENES||{},R=window.RIG;
  const {C,E,P,mix,fig,rr,inkFill,ln,circle,text,seg,breathe,lp,sparks}=R;
  const green='#28765a',blue='#4969a0',butter='#f8d65e',amber='#b45309';
  const rest=P({hF:[5,-50],hB:[-3,-50],head:[6,-116]});
  const bump=(T,a,b,c,d)=>E.soft(seg(T,a,b))*(1-E.soft(seg(T,c,d)));
  const fade=T=>1-E.soft(seg(T,5.3,6));
  function ar(g,s,x,y,size,col=C.ink){g.save();g.font=`600 ${size}px Arabic`;g.textAlign='center';g.fillStyle=col;g.fillText(s,x,y);g.restore()}
  function envelope(g,x,y,w=98,h=45){rr(g,x-w/2,y-h/2,w,h,4);inkFill(g,'#fff',1.7);R.strokePath(g,[[x-w/2,y-h/2],[x,y+4],[x+w/2,y-h/2]],1.3,C.far)}
  function moon(g,x,y,r){circle(g,x,y,r);inkFill(g,'#fff4bd',1.5,amber);g.beginPath();g.arc(x+r*.48,y-r*.18,r*.87,0,Math.PI*2);g.fillStyle='#fff';g.fill()}
  SC['question-pair']={dur:6,width:380,label:'An anonymous reader taps two question cards. One opens an explanation; the other leaves a sealed answer card.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0,left=bump(T,.5,.95,1.35,1.7),right=bump(T,2.1,2.55,3.8,4.2);
    ln(g,-153,-149,153,-149,2.2,C.woodDk);
    for(const [x,phrase,col,fill] of [[-78,'وَمَا أَدْرَاكَ',green,'#e3efd7'],[78,'وَمَا يُدْرِيكَ',blue,'#e5edf9']]){ln(g,x-20,-149,x-20,-129,1);ln(g,x+20,-149,x+20,-129,1);rr(g,x-55,-129,110,62,5);inkFill(g,fill,1.5);ar(g,phrase,x,-101,17,col);text(g,x<0?'ADRAKA':'YUDRIKA',x,-81,9,col)}
    const open=E.soft(seg(T,1.2,1.7))*k;
    g.save();g.globalAlpha*=open;rr(g,-131,-56,106,23,3);inkFill(g,'#e3efd7',1.2,green);text(g,'explained',-78,-41,10,green);g.restore();
    envelope(g,78,-44,106,23);circle(g,78,-44,7);inkFill(g,'#e5edf9',1.1,blue);text(g,'?',78,-40,10,blue);
    for(const [x,on,col] of [[-26,left,green],[26,right,blue]]){circle(g,x,-88,4);inkFill(g,on>.5?butter:'#fff',1,col)}
    const sx=T>=.3&&T<1.9?-1:1,target=[sx<0?-26:26,-88],hit=sx<0?left:right;
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp(target,-4,0,sx),hB:[-3,-50],head:[8,-116]}),hit);fig(g,p,-4,0,{sx});
    sparks(g,-78,-44,seg(T,1.6,2.25),15,5,green);
  }};
  SC['night-calendar']={dur:6,width:380,label:'A reader presses a calendar button beneath a crescent moon; the count rises to one thousand months.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    moon(g,55,-113,22);
    ln(g,-22,-12,-27,0,2);ln(g,122,-12,127,0,2);rr(g,-39,-79,180,68,5);inkFill(g,'#fff9e6',1.6);ln(g,-39,-63,141,-63,1,C.woodDk);
    for(const x of [-16,118]){ln(g,x,-85,x,-73,2,amber)}
    const count=1+Math.round(999*E.out3(seg(T,1.2,3.2))*k);text(g,this.question?'?':count.toLocaleString('en-US'),51,-31,25,amber);text(g,this.question?'what is this night?':'months',51,-17,9,amber);
    const tap=this.question?0:bump(T,.5,1,1.5,1.9);circle(g,-44,-64,5);inkFill(g,tap>.6?butter:'#fff',1.3,amber);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-44,-64],-78,0),hB:[-3,-50],head:[9,-114],chest:[3,-89]}),tap);fig(g,p,-78,0);if(!this.question)sparks(g,51,-36,seg(T,3.2,3.9),27,7,amber);
  }};
  SC['answer-book']={dur:6,width:380,label:'A reader presses a book tab: an explanation appears on one page, while the specific answer on the other stays sealed.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    ln(g,-21,-25,-27,0,2);ln(g,128,-25,134,0,2);
    R.poly(g,[[-44,-133],[51,-125],[51,-23],[-44,-31]],true);inkFill(g,'#fffdf6',1.6);R.poly(g,[[51,-125],[146,-133],[146,-31],[51,-23]],true);inkFill(g,'#fffdf6',1.6);ln(g,51,-125,51,-23,2,C.woodDk);
    text(g,'ADRAKA',3,-108,10,green);text(g,'YUDRIKA',99,-108,10,blue);
    g.save();g.globalAlpha*=seg(T,1.2,1.8)*k;rr(g,-33,-86,73,28,4);inkFill(g,'#e3efd7',1.2,green);text(g,'explained',3,-68,10,green);g.restore();
    envelope(g,99,-72,72,28);circle(g,99,-72,8);inkFill(g,'#e5edf9',1,blue);text(g,'?',99,-68,11,blue);
    const tap=bump(T,.5,1.05,1.5,1.95);circle(g,-49,-65,5);inkFill(g,tap>.5?butter:'#fff',1.2,green);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-49,-65],-83,0),hB:[-3,-50],head:[9,-114],chest:[3,-89]}),tap);fig(g,p,-83,0);sparks(g,3,-72,seg(T,1.8,2.5),22,6,green);
  }};
  SC['piercing-star']={dur:6,width:380,label:'A reader touches the knob of a telescope aimed at a bright star; the star lights up as the explanation appears.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0,light=this.question?0:E.soft(seg(T,1.2,2.2))*k;
    for(let i=0;i<5;i++){const x=42+i*25,y=-128+(i%3)*16;circle(g,x,y,1.2);inkFill(g,'#b9c8df',0,'#b9c8df')}
    ln(g,-40,-61,-58,0,2);ln(g,-40,-61,-18,0,2);ln(g,-40,-61,-39,0,1.6);
    R.poly(g,[[-61,-86],[9,-111],[15,-95],[-55,-72]],true);inkFill(g,'#dce5f2',1.7,blue);ln(g,-64,-86,-57,-69,3,blue);
    circle(g,-66,-64,5);inkFill(g,butter,1.2,blue);ln(g,-66,-64,-43,-71,2,blue);
    g.save();g.globalAlpha*=light*.3;R.poly(g,[[12,-104],[107,-128],[107,-91]],true);g.fillStyle=butter;g.fill();g.restore();
    R.star(g,111,-110,17,5,.43);inkFill(g,light>.2?butter:'#fff',1.4,amber);text(g,this.question?'night visitor?':'piercing star',99,-71,9,blue);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-66,-64],-100,0),hB:[-3,-50],head:[9,-115],chest:[3,-89]}),this.question?0:bump(T,.45,1.05,3.3,3.8));fig(g,p,-100,0);if(!this.question)sparks(g,111,-110,seg(T,2.2,3),30,7,amber);
  }};
  SC['hour-clock']={dur:6,width:380,label:'A reader touches a clock knob. Its hands move, but the question of when the Hour comes stays unanswered.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0,spin=E.soft(seg(T,1.2,3.6))*k;
    ln(g,25,-25,18,0,2);ln(g,88,-25,96,0,2);circle(g,56,-78,51);inkFill(g,'#e5edf9',1.8,blue);circle(g,56,-78,44);inkFill(g,'#fff',1.2,blue);
    for(let i=0;i<12;i++){const a=i*Math.PI/6;ln(g,56+Math.cos(a)*38,-78+Math.sin(a)*38,56+Math.cos(a)*42,-78+Math.sin(a)*42,1,blue)}
    const a=-Math.PI/2+spin*Math.PI*3;ln(g,56,-78,56+Math.cos(a)*29,-78+Math.sin(a)*29,2,blue);ln(g,56,-78,56+Math.cos(a*.42)*19,-78+Math.sin(a*.42)*19,2,blue);circle(g,56,-78,3);inkFill(g,blue,0,blue);
    ln(g,-17,-70,6,-70,2,blue);circle(g,-17,-70,5);inkFill(g,butter,1.2,blue);
    rr(g,108,-75,48,34,4);inkFill(g,'#fff9e6',1.2,amber);text(g,'WHEN?',132,-62,8.5,amber);text(g,'?',132,-47,13,amber);
    let p=breathe(rest,S.t);p=mix(p,P({hF:lp([-17,-70],-54,0),hB:[-3,-50],head:[9,-114],chest:[3,-89]}),bump(T,.45,1.05,1.5,1.95));fig(g,p,-54,0);
  }};
  SC['perhaps-letter']={dur:6,width:380,label:'An anonymous reader observes a sealed letter marked perhaps. A question mark remains; the person’s outcome is not stated.',draw(g,S){
    const T=S.on?S.u*6:0,k=S.on?fade(T):0;
    ln(g,45,-50,45,0,2);ln(g,21,0,69,0,2);envelope(g,45,-73,118,55);
    const pulse=1+Math.sin(S.t*2)*.025*k;g.save();g.translate(45,-72);g.scale(pulse,pulse);g.beginPath();g.moveTo(0,7);g.bezierCurveTo(-25,-6,-11,-19,0,-9);g.bezierCurveTo(11,-19,25,-6,0,7);inkFill(g,'#f5dce4',1.3,'#9d5373');g.restore();
    text(g,'perhaps',45,-121,12,blue);R.bubble(g,125,-99,'?',bump(T,1.2,1.8,4.4,5),{tail:-40,size:14,fill:'#e5edf9'});
    let p=breathe(rest,S.t);p=mix(p,P({hF:[5,-50],hB:[-3,-50],head:[10,-113]}),bump(T,.6,1.2,4.6,5.2));fig(g,p,-94,0);text(g,'outcome not stated',45,-23,9,blue);
  }};
  SC['night-question']={...SC['night-calendar'],question:true,label:'A reader considers the question about the Night of Decree; the calendar shows a question mark.'};
  SC['star-question']={...SC['piercing-star'],question:true,label:'A reader considers the question about the night visitor before its explanation.'};
})();
