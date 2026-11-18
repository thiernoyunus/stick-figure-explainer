(function(){
  const SC=window.SCENES=window.SCENES||{},R=window.RIG;
  const {C,E,P,mix,fig,rr,inkFill,ln,text,seg,breathe,lp,walkSeg,legs,nseq}=R;
  const green='#28765a',blue='#4969a0',butter='#f8d65e';
  const rest=P({hF:[5,-50],hB:[-3,-50],head:[6,-116]});
  const bump=(T,a,b,c,d)=>E.soft(seg(T,a,b))*(1-E.soft(seg(T,c,d)));
  const fade=T=>1-E.soft(seg(T,5.25,6));
  function card(g,x,y,label,col=blue,fill='#e5edf9'){
    rr(g,x-3,y-13,48,26,3);inkFill(g,fill,1.2,col);
    if(label)text(g,label,x+21,y+3,8,col);
  }
  function pile(g,x,y){
    for(let i=2;i>=0;i--)card(g,x+i*2,y+i*4,'',blue);
    ln(g,x+7,y-4,x+29,y-4,1,blue);ln(g,x+7,y+2,x+23,y+2,1,blue);
  }
  function desk(g,x0,x1,y){
    ln(g,x0,y,x1,y,3,C.woodDk);ln(g,x0+8,y,x0+3,0,2);ln(g,x1-8,y,x1-3,0,2);
  }
  function tray(g,x,label,col){
    R.strokePath(g,[[x,-77],[x,-49],[x+62,-49],[x+62,-77]],1.4,col);
    text(g,label,x+31,-27,10,col);
  }

  SC['desk-lamp']={dur:6,width:380,label:'A reader lifts one task from a full list, carries it into a steady pool of lamplight, and nods at the single task.',draw(g,S){
    const T=S.on?S.u*this.dur:0,k=fade(T);
    const ws=T<4.85?walkSeg(T,1.15,2.75,-116,24):walkSeg(T,4.85,6,24,-116);
    const x=ws.x,grip=nseq(T,[[0,[-92,-66]],[.8,[-92,-66]],[1.15,[-92,-78]],[2.75,[48,-78]],[3.05,[48,-66]]]);
    const carrying=T>=.8&&T<3.05,placed=T>=3.05;
    desk(g,-112,-40,-44);desk(g,39,153,-52);
    ln(g,141,-53,141,-117,3,blue);ln(g,141,-117,105,-141,3,blue);
    R.poly(g,[[97,-146],[119,-128],[104,-111],[81,-129]],true);inkFill(g,'#e5edf9',1.5,blue);
    g.save();g.globalAlpha*=.25;R.poly(g,[[100,-116],[3,-53],[150,-53]],true);g.fillStyle=butter;g.fill();g.restore();
    card(g,-90,-58,'CALL');card(g,-94,-62,'EMAIL');text(g,'LIST',-73,-27,10,C.muted);
    text(g,'NOW',94,-27,10,green);
    if(T<.8)card(g,-92,-66,'ONE TASK',green,butter);
    if(placed){g.save();g.globalAlpha*=k;card(g,48,-66,'ONE TASK',green,butter);g.restore()}
    if(T>5.25){g.save();g.globalAlpha*=1-k;card(g,-92,-66,'ONE TASK',green,butter);g.restore()}
    let p=breathe(rest,S.t);
    p=mix(p,P({hF:lp(grip,x,0),head:[9,-114]}),bump(T,.25,.8,3.05,3.5));
    p=mix(p,P({head:[12,-111]}),bump(T,3.65,3.9,4.15,4.45));
    p=legs(p,ws.dir<0?-ws.ph:ws.ph,ws.amp,{arms:false,stride:ws.stride});
    const J=fig(g,p,x,0);
    if(carrying){card(g,...J.w.handF,'ONE TASK',green,butter);R.frontArm(g,J)}
  }};

  SC['sort-trays']={dur:6,width:380,label:'A helper robot lifts the other task cards and carries them to the later tray. The reader uses a pencil to check off the one task in the now tray.',draw(g,S){
    const T=S.on?S.u*this.dur:0,k=fade(T);
    const ws=T<4.85?walkSeg(T,1.1,2.65,-40,64):walkSeg(T,4.85,6,64,-40);
    const x=ws.x,grip=nseq(T,[[0,[-16,-70]],[.75,[-16,-70]],[1.1,[-16,-82]],[2.65,[88,-82]],[2.95,[88,-70]]]);
    const carrying=T>=.75&&T<2.95,placed=T>=2.95;
    desk(g,-146,154,-48);tray(g,-116,'NOW',green);tray(g,78,'LATER',blue);
    card(g,-106,-68,'',green,'#fff4bd');
    if(T<.75)pile(g,-16,-70);
    if(placed){g.save();g.globalAlpha*=k;pile(g,88,-70);g.restore()}
    if(T>5.25){g.save();g.globalAlpha*=1-k;pile(g,-16,-70);g.restore()}
    const mark=nseq(T,[[0,[-99,-69]],[3.5,[-99,-69]],[3.75,[-94,-64]],[4.05,[-87,-75]]]);
    const tip=R.L2(mark,[-99,-69],E.soft(seg(T,4.05,4.35))),holdingPencil=T>=3.5&&T<4.35;
    if(!holdingPencil)ln(g,-108,-83,-99,-69,3,C.umber);
    let reader=breathe(rest,S.t);
    reader=mix(reader,P({hF:lp([tip[0]-3,tip[1]-3],-126,0),head:[10,-113]}),bump(T,3.05,3.5,4.35,4.7));
    const human=fig(g,reader,-126,0);
    if(T>3.5){
      g.save();g.globalAlpha*=k;R.strokePath(g,T<3.75?[[-99,-69],mark]:[[-99,-69],[-94,-64],mark],2,green);g.restore();
    }
    if(holdingPencil){
      const [hx,hy]=human.w.handF;
      ln(g,hx-6,hy-11,hx+3,hy+3,3,C.umber);R.frontArm(g,human);
    }
    let helper=breathe(rest,S.t+.7);
    helper=mix(helper,P({hF:lp(grip,x,0),head:[8,-114]}),bump(T,.2,.75,2.95,3.4));
    helper=legs(helper,ws.dir<0?-ws.ph:ws.ph,ws.amp,{arms:false,stride:ws.stride});
    const bot=fig(g,helper,x,0,{ink:'#d97757',far:'#e8b7a3',bot:{col:'#d97757',dark:'#a8553a',glow:carrying?1:0,happy:placed&&T<4.85}});
    if(carrying){pile(g,...bot.w.handF);R.frontArm(g,bot)}
    text(g,'you',-126,20,9,C.muted);text(g,'helper',x,20,9,'#a8553a');
  }};
})();
