import * as THREE from 'three';
import { createEngine } from './core/engine.js';
import { createInput } from './core/input.js';
import { createPlayer } from './core/player.js';
import { createTestRoom } from './scenes/testRoom.js';

const canvas = document.getElementById('app');
const { renderer, camera, adapt, getRatio } = createEngine(canvas);
const scene = new THREE.Scene();
const input = createInput(canvas);
const room = createTestRoom(scene);
const player = createPlayer(camera, input, room.colliders);
const hud = document.getElementById('hud');

const overlay = document.getElementById('overlay');
document.getElementById('start').addEventListener('click', () => {
  overlay.style.display = 'none';
  if (!input.isTouch) canvas.requestPointerLock?.();
});
document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement && !input.isTouch) overlay.style.display = 'flex';
});

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  player.update(dt);
  room.update(dt);
  renderer.render(scene, camera);
  const fps = adapt(dt);
  hud.textContent = `${fps.toFixed(0)} FPS · ${getRatio().toFixed(2)}x`;
});
