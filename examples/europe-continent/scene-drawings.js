// Modern teaching figures and physical props; coastline data is Natural Earth public domain.
(function () {
  const SC = window.SCENES = window.SCENES || {}, R = window.RIG;
  const {C,E,P,mix,fig,rr,inkFill,ln,circle,text,seg,lp,breathe,legs,walkSeg} = R;
  const green='#28765a',blue='#4969a0',amber='#b45309',mint='#d9ebca',sky='#eaf3fa',gold='#fff0b1';
  const rest=P({hF:[5,-50],hB:[-3,-50],head:[6,-116]});
  const time=S=>S.on?S.u*6:0;
  const change=(T,a,b)=>E.soft(seg(T,a,b))*(1-E.soft(seg(T,5,6)));
  const outline=new Path2D();
  for(const polygon of window.MAP_LAND)for(const ring of polygon){
    ring.forEach(([lon,lat],i)=>outline[i?'lineTo':'moveTo']((lon+20)/200,(85-lat)/90));outline.closePath();
  }
  function geo(lon,lat,x,y,w,h){return [x+(lon+20)/200*w,y+(85-lat)/90*h]}
  function map(g,x,y,w,h,{folds=false,label=false}={}){
    g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle=sky;g.fillRect(x,y,w,h);
    g.translate(x,y);g.scale(w,h);g.fillStyle=mint;g.fill(outline,'evenodd');g.strokeStyle=green;g.lineWidth=.0022;g.stroke(outline);g.restore();
    rr(g,x-2,y-2,w+4,h+4,2);g.strokeStyle=blue;g.lineWidth=1.2;g.stroke();
    if(folds)for(let i=1;i<4;i++)ln(g,x+w*i/4,y,x+w*i/4,y+h,.5,'#acbec4');
    if(label)text(g,'EURASIA',x+w*.52,y+h*.4,16,green);
  }
  function dot(g,p,col=amber){circle(g,...p,2.5);inkFill(g,gold,1,col)}
  function reader(g,p,x,y,t,sx=1,col=C.ink){
    const b=breathe(p,t,.35);b.hF=p.hF;b.hB=p.hB;
    return fig(g,b,x,y,{sx,ink:col,far:col===C.ink?'#999999':'#b4c5d9',hat:col===blue});
  }
  function grip(x,y,sx,h){return P({hF:lp(h,x,y,sx),hB:rest.hB,head:[8,-115]})}
  function backpack(g,x,y,T){
    const sway=Math.sin(T*5)*1.2;rr(g,x-20,y-76+sway,18,30,4);inkFill(g,gold,1.4,amber);
    ln(g,x-5,y-76,x+2,y-58,1.5,amber);rr(g,x-19,y-57+sway,15,10,2);inkFill(g,'#e7d3ab',1,amber);
  }
  function walking(T,a,b,x0,x1){const w=T<5?walkSeg(T,a,b,x0,x1):walkSeg(T,5,6,x1,x0);return {...w,ph:w.dir<0?-w.ph:w.ph}}
  function book(g,h,k,caption='HISTORY',col=amber){
    const [x,y]=h,w=18+100*k;
    rr(g,x-3,y-43,w+9,47,3);inkFill(g,'#fffdf4',1.6,col);
    ln(g,x+15,y-42,x+15,y+3,1.5,col);
    for(let i=1;i<3;i++)ln(g,x+20+(w-20)*i/3,y-37,x+20+(w-20)*i/3,y-5,.6,'#d8cbaa');
    if(k>.55){text(g,caption,x+15+(w-15)/2,y-24,10,col);ln(g,x+26,y-15,x+w-10,y-15,1,col);}
    R.frontArm(g,h.J);
  }
  function labelCard(g,h,s,col,offset){
    h=[h[0]+offset,h[1]];
    const width=s==='EUROPE'?69:56;rr(g,h[0]-width/2,h[1]-27,width,29,3);inkFill(g,col===green?mint:gold,1.4,col);
    text(g,s,h[0],h[1]-8,12,col);
  }
  function sharedMap(g,S,closing=false){
    const T=time(S),k=change(T,.4,2),lift=15*k;
    const left=[-117,-58-lift],right=[117,-58-lift];
    // The same sheet is supported at its two lower corners.
    map(g,left[0],left[1]-100,right[0]-left[0],100,{folds:true,label:!closing});
    const a=reader(g,grip(-141,0,1,left),-141,0,S.t);
    const b=reader(g,grip(141,0,-1,right),141,0,S.t+.7,-1,blue);
    if(closing){
      text(g,'EUROPE',-73,left[1]-65,10,amber);text(g,'ASIA',...geo(95,50,left[0],left[1]-100,234,100),10,blue);
      text(g,'the land stays connected',0,24,12,green);
    }else text(g,'one connected landmass',0,24,12,green);
    R.frontArm(g,a);R.frontArm(g,b);
  }
  SC['map-open']={dur:6,width:380,loopOnly:true,label:'An explorer stands beside an already unfolded map, holding its corner. Europe and Asia are visibly connected from the first frame.',draw(g,S){
    map(g,-118,-165,264,100,{folds:true});
    text(g,'EUROPE',-70,-130,12,amber);text(g,'ASIA',...geo(95,50,-118,-165,264,100),12,blue);
    text(g,'WHERE IS THE OCEAN?',15,-180,13,blue);
    backpack(g,-142,0,0);
    const J=reader(g,grip(-142,0,1,[-118,-65]),-142,0,S.t);R.frontArm(g,J);
  }};
  const route=[[-8,40],[3,47],[14,51],[24,52],[41,55],[66,50],[93,43],[108,35]];
  function floorPoint(lon,lat){const [x,y]=geo(lon,lat,0,0,316,167);return [-165+x+.2*y,-84+.58*y]}
  SC['walk-map']={dur:6,width:380,label:'A backpacked traveller walks on a large floor map from Portugal toward China along the connected land, with no ocean gap.',draw(g,S){
    const T=time(S),pts=route.map(p=>floorPoint(...p));
    g.save();g.transform(1,0,.2,.58,-165,-84);map(g,0,0,316,167,{folds:true});g.restore();
    const w=walking(T,.55,3.65,pts[0][0],pts.at(-1)[0]);
    let j=0;while(j<pts.length-2&&w.x>pts[j+1][0])j++;
    const f=Math.max(0,Math.min(1,(w.x-pts[j][0])/(pts[j+1][0]-pts[j][0]))),y=R.lerp(pts[j][1],pts[j+1][1],f)-2;
    g.save();g.setLineDash([3,3]);R.strokePath(g,pts,1.2,amber);g.restore();dot(g,pts[0]);dot(g,pts.at(-1));
    text(g,'PORTUGAL',pts[0][0]+6,26,10,amber);text(g,'CHINA',pts.at(-1)[0]+20,26,10,amber);
    backpack(g,w.x,y,T);let p=legs(rest,w.ph,w.amp,{arms:false,stride:w.stride});reader(g,p,w.x,y,S.t);
    text(g,'connected mainland',35,-161,14,green);
  }};
  SC['name-eurasia']={dur:6,width:380,label:'Two companions lift and support one continuous map labelled Eurasia.',draw(g,S){sharedMap(g,S)}};
  SC['definition-book']={dur:6,width:380,label:'A reader opens a definition book beside the continuous Eurasian landmass.',draw(g,S){
    const T=time(S),k=change(T,.45,2.2),x=-139;
    map(g,-20,-167,176,80,{label:true});
    text(g,'one continuous landmass',68,-44,10,green);
    const J=reader(g,mix(grip(x,0,1,[-115,-57]),grip(x,0,1,[-110,-70]),k),x,0,S.t);
    const h=J.w.handF;h.J=J;book(g,h,k,'DEFINITION');
    if(k>.8){text(g,'separate?',h[0]+69,h[1]-3,11,amber);}
  }};
  SC['history-atlas']={dur:6,width:380,label:'A reader unfolds a historical atlas, with a bookmark and old map visible on the pages.',draw(g,S){
    const T=time(S),k=change(T,.35,2),x=-115;
    const J=reader(g,mix(grip(x,0,1,[-93,-56]),grip(x,0,1,[-87,-70]),k),x,0,S.t);
    const h=J.w.handF;h.J=J;book(g,h,k,'HISTORY');
    if(k>.75){ln(g,h[0]+85,h[1]-43,h[0]+85,h[1]-54,3,green);text(g,'start with the labels',32,-145,15,amber);}
  }};
  SC['place-labels']={dur:6,width:380,label:'Two modern teaching figures physically place Europe and Asia labels on a single map. The land never separates.',draw(g,S){
    const T=time(S),a=change(T,.5,1.8),b=change(T,1.4,2.7);
    map(g,-142,-164,284,126,{folds:true});
    const pa=[-101,-53-23*a],pb=[51,-53-23*b];
    const ja=reader(g,grip(-128,0,1,pa),-128,0,S.t);
    labelCard(g,ja.w.handF,'EUROPE',green,25);R.frontArm(g,ja);
    const jb=reader(g,grip(78,0,-1,pb),78,0,S.t+.5,-1,blue);
    labelCard(g,jb.w.handF,'ASIA',amber,-25);R.frontArm(g,jb);
    text(g,'IDENTITY',-78,23,12,green);text(g,'POLITICS',78,23,12,amber);
  }};
  const boundary=[[66,68],[60,61],[59,55],[58,51],[51,47],[47,43],[41,42],[37,41],[29,41]];
  SC['draw-boundary']={dur:6,width:380,label:'A cartographer draws a dashed schematic Europe–Asia boundary on the map with a hand-held pencil. The coastline stays unchanged.',draw(g,S){
    const T=time(S),w=walking(T,.65,3.2,-42,-92),k=(-42-w.x)/50,pts=boundary.map(p=>geo(...p,-130,-154,276,124));
    map(g,-130,-154,276,124,{folds:true});
    const partial=R.partial(pts,k),tip=partial.at(-1)||pts[0],target=[tip[0]-3,tip[1]+4];
    // shortcut: a schematic conventional boundary, not a surveyed border; use GIS for a border-focused lesson.
    g.save();g.setLineDash([3,3]);R.strokePath(g,partial,1.8,amber);g.restore();
    rr(g,-126,-26,111,5,2);inkFill(g,'#ead3a8',1.2,amber);
    ln(g,-120,-21,-120,0,2,amber);ln(g,-21,-21,-21,0,2,amber);
    const x=w.x,y=-25;
    let pose=mix(grip(x,y,1,[x+22,y-53]),grip(x,y,1,target),change(T,.1,.6));
    pose=legs(pose,w.ph,w.amp,{arms:false,stride:w.stride});
    const J=reader(g,pose,x,y,S.t);
    const h=J.w.handF;ln(g,h[0]-5,h[1]+7,h[0]+3,h[1]-4,3,amber);R.frontArm(g,J);
    text(g,'URAL MOUNTAINS',68,-170,12,amber);text(g,'a boundary — not an ocean',28,24,12,green);
  }};
  function schoolBook(g,S,x,sx,title,k,col){
    const hand=[x+sx*25,-60-9*k],J=reader(g,grip(x,0,sx,hand),x,0,S.t+x/50,sx,col),h=J.w.handF;
    const bx=sx===1?h[0]-3:h[0]-88,by=h[1]-35,w=85;
    rr(g,bx-3,by-3,w+6,47,3);inkFill(g,'#fffdf4',1.6,col);
    map(g,bx,by+3,w,33);ln(g,bx+w/2,by-2,bx+w/2,by+42,1,col);
    text(g,'EURASIA',bx+w/2,by+61,12,green);text(g,title,bx+w/2,by-13,13,col);R.frontArm(g,J);
  }
  SC['school-books']={dur:6,width:380,label:'Two readers lift open Russian and Japanese geography books, both showing Eurasia as one continent.',draw(g,S){
    const T=time(S),a=change(T,.3,1.5),b=change(T,1.1,2.3);
    schoolBook(g,S,-145,1,'RUSSIA',a,C.ink);schoolBook(g,S,145,-1,'JAPAN',b,blue);
    text(g,'different teaching models',0,-169,14,green);text(g,'one continent: EURASIA',0,24,13,green);
  }};
  SC['map-question']={dur:6,width:380,loopOnly:true,label:'Two companions hold the same connected map while the viewer chooses Europe or Eurasia.',draw(g,S){sharedMap(g,{...S,on:true,u:.5},true)}};
  SC['one-landmass']={dur:6,width:380,label:'Two companions hold one intact map: the historical labels remain, while the land is visibly connected.',draw(g,S){sharedMap(g,S,true)}};
})();
