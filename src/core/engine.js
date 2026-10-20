import * as THREE from 'three';

// 渲染器 + 自适应像素比（手机掉帧时自动降分辨率）
export function createEngine(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const maxRatio = Math.min(window.devicePixelRatio, 2);
  let ratio = Math.min(maxRatio, 1.5);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 200);

  function resize() {
    renderer.setPixelRatio(ratio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let acc = 0, frames = 0, fps = 60;
  function adapt(dt) {
    acc += dt; frames++;
    if (acc >= 1) {
      fps = frames / acc; acc = 0; frames = 0;
      if (fps < 45 && ratio > 0.75) { ratio = Math.max(0.75, ratio - 0.25); resize(); }
      else if (fps > 58 && ratio < maxRatio) { ratio = Math.min(maxRatio, ratio + 0.25); resize(); }
    }
    return fps;
  }
  return { renderer, camera, adapt, getRatio: () => ratio };
}
