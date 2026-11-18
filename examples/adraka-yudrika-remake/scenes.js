// Anonymous modern readers and teaching props; never Allah or historical people.
(function () {
  const SC = window.SCENES = window.SCENES || {}, R = window.RIG;
  const { C, E, P, mix, seq, fig, rr, inkFill, ln, circle, text, seg, lp, breathe, legs, walkSeg } = R;
  const green = '#28765a', blue = '#4969a0', amber = '#b45309';
  const mint = '#e3efd7', sky = '#e5edf9', gold = '#fff4bd';
  const rest = P({ hF: [5, -50], hB: [-3, -50], head: [6, -116] });
  const time = S => S.on ? S.u * 6 : 0;
  const reset = T => 1 - E.soft(seg(T, 5, 6));
  const change = (T, a, b) => E.soft(seg(T, a, b)) * reset(T);
  const pose = (x, sx, hand, back) => P({ hF: lp(hand, x, 0, sx), hB: back ? lp(back, x, 0, sx) : rest.hB, head: [8, -115], hang: back ? 0 : 1 });
  function reader(g, p, x, sx, t, col = C.ink) {
    const b = breathe(p, t, .4);
    // Keep a working grip fixed while the chest breathes.
    b.hF = p.hF; b.hB = p.hB;
    return fig(g, b, x, 0, { sx, ink: col, far: col === C.ink ? C.far : '#a9bdcc' });
  }
  function arabic(g, s, x, y, col) {
    g.save(); g.font = '600 18px Arabic'; g.textAlign = 'center'; g.fillStyle = col; g.fillText(s, x, y); g.restore();
  }
  function envelope(g, x, y, w = 58, h = 36, mark = '?') {
    rr(g, x - w / 2, y - h / 2, w, h, 3); inkFill(g, sky, 1.5, blue);
    R.strokePath(g, [[x - w / 2, y - h / 2], [x, y + 3], [x + w / 2, y - h / 2]], 1.2, blue);
    ln(g, x, y - h / 2, x, y + h / 2, 1, blue);
    circle(g, x, y + 2, 7); inkFill(g, '#fff', 1.2, blue);
    if (mark) text(g, mark, x, y + 5, 9, blue);
  }
  function paper(g, h, k, col = green) {
    const x = h[0], y = h[1], w = 27 + 35 * k;
    R.poly(g, [[x - 10, y - 32], [x + w - 10, y - 32 - 3 * k], [x + w - 10, y], [x - 10, y]], true);
    inkFill(g, k > .1 ? mint : '#fffdf6', 1.4, col);
    for (let i = 1; i <= 2; i++) ln(g, x - 10 + w * i / 3, y - 30, x - 10 + w * i / 3, y - 2, .8, '#b4c6b0');
    ln(g, x - 5, y - 23, x + w - 16, y - 23, 1.6, col);
    ln(g, x - 5, y - 17, x + w - 20, y - 17, 1.1, col);
    if (k > .8) text(g, 'explained', x + w / 2 - 10, y - 6, 8.5, col);
  }
  function moon(g, x, y, r = 18) {
    circle(g, x, y, r); inkFill(g, gold, 1.3, amber);
    circle(g, x + r * .5, y - r * .23, r * .84); g.fillStyle = '#fff'; g.fill();
  }
  function walk(T, a, b, from, to) {
    const w = T < 5 ? walkSeg(T, a, b, from, to) : walkSeg(T, 5, 6, to, from);
    return { ...w, ph: w.dir < 0 ? -w.ph : w.ph };
  }
  function finish(g, J, draw) { draw(J.w.handF, J.w.handB); R.frontArm(g, J); }

  SC['unfolded-questions'] = {
    dur: 6, width: 380,
    label: 'Two anonymous readers hold question notes. One unfolds an explanation; the other keeps a packet sealed.',
    draw(g, S) {
      const T = time(S), k = change(T, .5, 1.9);
      arabic(g, 'وَمَا أَدْرَاكَ', -85, -149, green);
      arabic(g, 'وَمَا يُدْرِيكَ', 85, -149, blue);
      const a = reader(g, mix(pose(-108, 1, [-88, -57]), pose(-108, 1, [-79, -67]), k), -108, 1, S.t);
      finish(g, a, h => paper(g, h, k));
      const b = reader(g, mix(pose(108, -1, [85, -55]), pose(108, -1, [80, -67]), change(T, 1, 2.2)), 108, -1, S.t + 1, blue);
      finish(g, b, h => envelope(g, h[0] - 23, h[1] - 16, 46, 32));
    }
  };

  SC['open-explanation'] = {
    dur: 6, width: 380,
    label: 'A modern reader lifts and unfolds a book cover into a visible explanation page; a separate answer packet remains sealed.',
    draw(g, S) {
      const T = time(S), k = change(T, .5, 2.1), x = -83;
      const J = reader(g, mix(pose(x, 1, [-57, -58]), pose(x, 1, [-52, -76]), k), x, 1, S.t);
      finish(g, J, h => {
        const hinge = [h[0] + 22, h[1] + 6], width = 12 + 72 * k;
        R.poly(g, [[h[0] - 4, h[1] - 30], [hinge[0], hinge[1] - 28], hinge, [h[0] - 4, h[1] + 3]], true); inkFill(g, '#fffdf6', 1.6, green);
        R.poly(g, [[hinge[0], hinge[1] - 28], [hinge[0] + width, hinge[1] - 34], [hinge[0] + width, hinge[1] - 2], hinge], true); inkFill(g, mint, 1.6, green);
        ln(g, hinge[0], hinge[1] - 28, hinge[0], hinge[1], 1.5, green);
        if (k > .7) { text(g, 'explanation', hinge[0] + width / 2, hinge[1] - 18, 10, green); ln(g, hinge[0] + 9, hinge[1] - 10, hinge[0] + width - 10, hinge[1] - 10, 1, green); }
      });
      envelope(g, 118, -69, 64, 42); text(g, 'still sealed', 118, -34, 9, blue);
    }
  };

  SC['night-wait'] = {
    dur: 6, width: 380,
    label: 'A reader walks with a backpack and a held lantern, stops beneath a crescent and waits with the question unanswered.',
    draw(g, S) {
      const T = time(S), w = walk(T, .4, 2, -90, -40), look = change(T, 1.8, 2.8);
      moon(g, 78, -143, 21); text(g, '?', 125, -115, 22, amber);
      rr(g, w.x - 22, -76, 20, 35, 5); inkFill(g, '#ecdfc8', 1.4, amber);
      ln(g, w.x - 8, -78, w.x + 3, -57, 2, amber); rr(g, w.x - 20, -56, 16, 12, 2); inkFill(g, gold, 1, amber);
      let p = pose(w.x, 1, [w.x + 23, -53]); p.head = [6 + 5 * look, -115 - 5 * look];
      p = legs(p, w.ph, w.amp, { arms: false, stride: w.stride });
      const J = reader(g, p, w.x, 1, S.t);
      finish(g, J, h => {
        g.beginPath(); g.arc(h[0], h[1] + 7, 7, Math.PI, 0); g.strokeStyle = amber; g.lineWidth = 1.4; g.stroke();
        rr(g, h[0] - 9, h[1] + 7, 18, 23, 3); inkFill(g, gold, 1.4, amber);
        ln(g, h[0] - 10, h[1] + 7, h[0] + 10, h[1] + 7, 2, amber); ln(g, h[0], h[1] + 12, h[0], h[1] + 24, 2, amber);
      });
    }
  };

  SC['month-scroll'] = {
    dur: 6, width: 380,
    label: 'A reader physically draws out a long strip of month pages beneath a crescent. The strip says better than one thousand months, not merely equal.',
    draw(g, S) {
      const T = time(S), w = walk(T, .45, 3.1, -93, 76), h = [w.x + 24, -65], length = h[0] + 69;
      moon(g, -117, -144, 18);
      ln(g, -69, -81, -69, -44, 3, amber);
      rr(g, -69, -80, Math.max(10, length), 35, 2); inkFill(g, '#fff9e6', 1.4, amber);
      g.save(); g.beginPath(); g.rect(-66, -78, Math.max(0, length - 6), 31); g.clip();
      for (let i = 0; i < 11; i++) {
        const cx = -57 + i * 15; rr(g, cx - 5, -75, 10, 12, 1); inkFill(g, '#fff', .8, amber); ln(g, cx - 5, -71, cx + 5, -71, .7, amber);
      }
      text(g, '1,000 months', 8, -50, 11, amber); g.restore();
      const k = change(T, 2.6, 3.3); g.save(); g.globalAlpha *= k; text(g, 'better than', 8, -99, 16, amber); g.restore();
      const p = legs(pose(w.x, 1, h), w.ph, w.amp, { arms: false, stride: w.stride });
      const J = reader(g, p, w.x, 1, S.t);
      finish(g, J, hand => { rr(g, hand[0] - 4, -82, 8, 39, 3); inkFill(g, gold, 1.4, amber); });
    }
  };

  SC['telescope-search'] = {
    dur: 6, width: 380,
    label: 'A reader raises and supports a real handheld telescope to look into the night. No identifying star or answer appears yet.',
    draw(g, S) {
      const T = time(S), k = change(T, .5, 1.9), x = -70;
      for (const [a, b] of [[46, -147], [101, -127], [144, -151]]) { circle(g, a, b, 1); inkFill(g, '#aebbd0', 0, '#aebbd0'); }
      text(g, '?', 95, -70, 22, blue);
      const p = mix(pose(x, 1, [-46, -61], [-58, -61]), pose(x, 1, [-39, -93], [-53, -87]), k);
      const J = reader(g, p, x, 1, S.t);
      finish(g, J, h => {
        const a = .12 - .43 * k, d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]];
        const point = (along, across) => [h[0] + d[0] * along + n[0] * across, h[1] + d[1] * along + n[1] * across];
        R.poly(g, [point(-20, -12), point(46, -12), point(46, -2), point(-20, -2)], true); inkFill(g, sky, 1.6, blue);
        const b = point(46, -7), c = point(-20, -7);
        ln(g, b[0] - n[0] * 8, b[1] - n[1] * 8, b[0] + n[0] * 8, b[1] + n[1] * 8, 3, blue);
        ln(g, c[0] - n[0] * 4, c[1] - n[1] * 4, c[0] + n[0] * 5, c[1] + n[1] * 5, 3, blue);
        ln(g, h[0], h[1], h[0] - n[0] * 3, h[1] - n[1] * 3, 3, blue);
      });
    }
  };

  SC['star-chart'] = {
    dur: 6, width: 380,
    label: 'A reader grips the lower dowel and pulls a rolled star chart down, physically revealing the piercing-star diagram.',
    draw(g, S) {
      const T = time(S), k = change(T, .35, 1.9), bottom = -101 + 46 * k;
      ln(g, -47, -151, 131, -151, 3, C.woodDk);
      ln(g, -28, -151, -28, -143, 1, C.woodDk); ln(g, 111, -151, 111, -143, 1, C.woodDk);
      rr(g, -49, -143, 181, bottom + 143, 2); inkFill(g, '#fffdf6', 1.3, blue);
      g.save(); g.beginPath(); g.rect(-47, -141, 177, bottom + 141); g.clip();
      text(g, 'a revealed explanation', 43, -126, 10, blue);
      R.star(g, 57, -88, 15, 5, .43); inkFill(g, gold, 1.4, amber);
      for (const [dx, dy] of [[-28, 0], [28, 0], [0, -27]]) ln(g, 57 + dx * .75, -88 + dy * .75, 57 + dx, -88 + dy, 1.5, amber);
      text(g, 'piercing star', 57, -63, 11, blue); g.restore();
      ln(g, -52, bottom, 135, bottom, 4, C.woodDk);
      const J = reader(g, pose(-75, 1, [-49, bottom]), -75, 1, S.t); R.frontArm(g, J);
    }
  };

  SC['compare-pages'] = {
    dur: 6, width: 380,
    label: 'A reader lifts an open explanation sheet onto a hanging display. Beside it, a specific-answer packet remains sealed.',
    draw(g, S) {
      const T = time(S), k = change(T, .5, 1.7), y = -59 - 24 * k;
      ln(g, -57, -145, 144, -145, 2.3, C.woodDk);
      ln(g, -13, -145, -28, -115, 1, C.far); ln(g, -13, -145, 2, -115, 1, C.far);
      arabic(g, 'وَمَا أَدْرَاكَ', -20, -158, green); arabic(g, 'وَمَا يُدْرِيكَ', 102, -158, blue);
      envelope(g, 104, -85, 66, 42); ln(g, 104, -145, 84, -106, 1, C.far); ln(g, 104, -145, 124, -106, 1, C.far);
      const release = change(T, 2, 2.7);
      const p = mix(pose(-77, 1, [-48, y]), rest, release);
      const J = reader(g, p, -77, 1, S.t);
      paper(g, [-48, y], 1); if (release < .99) R.frontArm(g, J);
      if (k > .99) { circle(g, -13, -115, 2); inkFill(g, C.ink, 0); }
    }
  };

  SC['sealed-hour'] = {
    dur: 6, width: 380,
    label: 'A reader carries a sealed WHEN packet with a clock emblem. No date, countdown or arrival is revealed.',
    draw(g, S) {
      const T = time(S), w = walk(T, .4, 2.6, -103, -14);
      const p = legs(pose(w.x, 1, [w.x + 27, -65], [w.x + 13, -60]), w.ph, w.amp, { arms: false, stride: w.stride });
      const J = reader(g, p, w.x, 1, S.t);
      finish(g, J, h => {
        envelope(g, h[0] + 22, h[1] - 2, 68, 42, '?');
        circle(g, h[0] + 44, h[1] - 2, 10); inkFill(g, '#fff', 1.3, blue);
        ln(g, h[0] + 44, h[1] - 9, h[0] + 44, h[1] - 2, 1.2, blue); ln(g, h[0] + 44, h[1] - 2, h[0] + 49, h[1] + 1, 1.2, blue);
        text(g, 'WHEN?', h[0] + 18, h[1] + 14, 9, blue);
      });
      text(g, 'when?', 119, -113, 17, blue);
    }
  };

  SC['perhaps-heart'] = {
    dur: 6, width: 380,
    label: 'A modern reader carefully lifts and cradles a sealed packet bearing a heart. Perhaps remains a possibility, with no growth or confirmed outcome.',
    draw(g, S) {
      const T = time(S), k = change(T, .5, 2), x = -70;
      text(g, 'perhaps', 67, -127, 16, blue); text(g, '?', 122, -83, 23, blue);
      const J = reader(g, mix(pose(x, 1, [-48, -45], [-59, -48]), pose(x, 1, [-40, -68], [-53, -64]), k), x, 1, S.t);
      finish(g, J, h => {
        const cx = h[0] + 20, cy = h[1] - 2;
        envelope(g, cx, cy, 64, 40, '');
        g.beginPath(); g.moveTo(cx, cy + 6); g.bezierCurveTo(cx - 19, cy - 4, cx - 8, cy - 16, cx, cy - 7); g.bezierCurveTo(cx + 8, cy - 16, cx + 19, cy - 4, cx, cy + 6); inkFill(g, '#f5dce4', 1.2, '#9d5373');
        ln(g, cx, cy + 7, cx, cy + 17, 1.2, blue);
      });
      text(g, 'outcome not stated', 65, -26, 10, blue);
    }
  };

  SC['reading-partners'] = {
    dur: 6, width: 380,
    label: 'Two reading partners meet and pass an open explanation from one pair of hands to the other. The receiver also carries a still-sealed answer packet.',
    draw(g, S) {
      const T = time(S), a = walk(T, .4, 1.65, -96, -51), b = walk(T, .4, 1.65, 96, 51);
      const offer = change(T, 1.5, 2.25), receive = change(T, 1.9, 2.65), release = change(T, 2.8, 3.4);
      let pa = mix(pose(a.x, 1, [a.x + 23, -59]), pose(a.x, 1, [a.x + 29, -68]), offer); pa = mix(pa, rest, release);
      let pb = mix(pose(b.x, -1, [b.x - 12, -52], [b.x - 10, -48]), pose(b.x, -1, [b.x - 29, -68], [b.x - 10, -48]), receive);
      pa = legs(pa, a.ph, a.amp, { arms: false, stride: a.stride }); pb = legs(pb, -b.ph, b.amp, { arms: false, stride: b.stride });
      const A = reader(g, pa, a.x, 1, S.t), B = reader(g, pb, b.x, -1, S.t + 1, blue);
      // Both hands touch opposite sheet edges before the giver lets go.
      const grip = release > 0 ? [B.w.handF[0] - 44, B.w.handF[1]] : A.w.handF;
      rr(g, grip[0], grip[1] - 30, 44, 30, 2); inkFill(g, mint, 1.4, green);
      ln(g, grip[0] + 22, grip[1] - 28, grip[0] + 22, grip[1] - 2, 1, green);
      for (const dx of [5, 27]) { ln(g, grip[0] + dx, grip[1] - 21, grip[0] + dx + 12, grip[1] - 21, 1.2, green); ln(g, grip[0] + dx, grip[1] - 14, grip[0] + dx + 9, grip[1] - 14, 1, green); }
      envelope(g, B.w.handB[0] - 19, B.w.handB[1] + 15, 40, 28);
      R.frontArm(g, A); R.frontArm(g, B);
      text(g, 'explanation shared', -47, -137, 11, green); text(g, 'still sealed', 91, -137, 11, blue);
    }
  };

  SC['different-endings'] = {
    dur: 6, width: 380,
    label: 'Reading partners lift an open explanation together while the second reader continues to carry a sealed answer packet: two different endings.',
    draw(g, S) {
      const T = time(S), k = change(T, .6, 2), y = -57 - 18 * k;
      const A = reader(g, pose(-51, 1, [-22, y]), -51, 1, S.t);
      const B = reader(g, pose(51, -1, [22, y], [41, -48]), 51, -1, S.t + 1, blue);
      rr(g, -22, y - 30, 44, 30, 2); inkFill(g, mint, 1.5, green); ln(g, 0, y - 29, 0, y - 2, 1, green);
      for (const dx of [-16, 6]) { ln(g, dx, y - 21, dx + 11, y - 21, 1.3, green); ln(g, dx, y - 14, dx + 8, y - 14, 1, green); }
      envelope(g, 78, -48, 44, 30); ln(g, 41, -48, 56, -48, 1.4, blue);
      R.frontArm(g, A); R.frontArm(g, B);
      arabic(g, 'وَمَا أَدْرَاكَ', -86, -150, green); arabic(g, 'وَمَا يُدْرِيكَ', 86, -150, blue);
      text(g, 'an explanation', -90, -127, 10, green); text(g, 'answer not given', 90, -127, 10, blue);
    }
  };
})();
