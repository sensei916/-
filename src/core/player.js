import * as THREE from 'three';

// 第一人称控制器：平滑加减速 + 走路镜头起伏 + 简单 AABB 碰撞
export function createPlayer(camera, input, colliders) {
  const pos = new THREE.Vector3(0, 1.6, 0), vel = new THREE.Vector3();
  let yaw = 0, pitch = 0, bob = 0;
  const speed = 2.4, radius = 0.3;
  camera.rotation.order = 'YXZ';

  function blocked(x, z) {
    for (const b of colliders) if (x > b.minX - radius && x < b.maxX + radius && z > b.minZ - radius && z < b.maxZ + radius) return true;
    return false;
  }
  function update(dt) {
    const l = input.consumeLook();
    yaw -= l.x * 0.0022; pitch -= l.y * 0.0022; pitch = Math.max(-1.4, Math.min(1.4, pitch));
    const a = input.axes();
    const fx = -Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const tx = (fx * a.y + rx * a.x) * speed, tz = (fz * a.y + rz * a.x) * speed;
    const k = 1 - Math.exp(-dt * 10);
    vel.x += (tx - vel.x) * k; vel.z += (tz - vel.z) * k;
    const nx = pos.x + vel.x * dt, nz = pos.z + vel.z * dt;
    if (!blocked(nx, pos.z)) pos.x = nx; else vel.x = 0;
    if (!blocked(pos.x, nz)) pos.z = nz; else vel.z = 0;
    const sp = Math.hypot(vel.x, vel.z);
    bob += dt * sp * 3.2;
    camera.position.set(pos.x, pos.y + Math.sin(bob * 2) * 0.03 * (sp / speed), pos.z);
    camera.rotation.set(pitch, yaw, Math.sin(bob) * 0.004 * (sp / speed));
  }
  return { pos, update };
}
