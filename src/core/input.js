// 键鼠 + 触屏（左摇杆移动、右侧滑动转向）
export function createInput(canvas) {
  const s = { move: { x: 0, y: 0 }, look: { x: 0, y: 0 }, keys: {} };
  const isTouch = matchMedia('(pointer: coarse)').matches;
  if (isTouch) document.body.classList.add('touch');

  addEventListener('keydown', e => (s.keys[e.code] = true));
  addEventListener('keyup', e => (s.keys[e.code] = false));
  document.addEventListener('mousemove', e => {
    if (document.pointerLockElement === canvas) { s.look.x += e.movementX; s.look.y += e.movementY; }
  });

  const stick = document.getElementById('stick'), knob = document.getElementById('knob');
  let stickId = null, lookId = null, lx = 0, ly = 0, cx = 0, cy = 0;
  addEventListener('touchstart', e => {
    for (const t of e.changedTouches) {
      if (t.clientX < innerWidth * 0.45 && stickId === null) {
        stickId = t.identifier; const r = stick.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      } else if (lookId === null) { lookId = t.identifier; lx = t.clientX; ly = t.clientY; }
    }
  }, { passive: true });
  addEventListener('touchmove', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === stickId) {
        let dx = t.clientX - cx, dy = t.clientY - cy; const m = Math.hypot(dx, dy), max = 50;
        if (m > max) { dx = dx / m * max; dy = dy / m * max; }
        knob.style.transform = `translate(${dx}px,${dy}px)`;
        s.move.x = dx / max; s.move.y = -dy / max;
      } else if (t.identifier === lookId) {
        s.look.x += (t.clientX - lx) * 2.2; s.look.y += (t.clientY - ly) * 2.2; lx = t.clientX; ly = t.clientY;
      }
    }
  }, { passive: true });
  const end = e => {
    for (const t of e.changedTouches) {
      if (t.identifier === stickId) { stickId = null; s.move.x = s.move.y = 0; knob.style.transform = ''; }
      if (t.identifier === lookId) lookId = null;
    }
  };
  addEventListener('touchend', end); addEventListener('touchcancel', end);

  s.axes = () => {
    let x = s.move.x, y = s.move.y;
    if (s.keys.KeyW || s.keys.ArrowUp) y += 1;
    if (s.keys.KeyS || s.keys.ArrowDown) y -= 1;
    if (s.keys.KeyD || s.keys.ArrowRight) x += 1;
    if (s.keys.KeyA || s.keys.ArrowLeft) x -= 1;
    const m = Math.hypot(x, y); if (m > 1) { x /= m; y /= m; }
    return { x, y };
  };
  s.consumeLook = () => { const l = { ...s.look }; s.look.x = s.look.y = 0; return l; };
  s.isTouch = isTouch;
  return s;
}
