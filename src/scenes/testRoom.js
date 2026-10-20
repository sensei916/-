import * as THREE from 'three';

// M0 测试场景：仅用于验证渲染、操控、碰撞与发布流程，不代表最终美术与内容
export function createTestRoom(scene) {
  scene.background = new THREE.Color(0x1a1620);
  scene.fog = new THREE.Fog(0x1a1620, 4, 28);
  const colliders = [];
  const mat = new THREE.MeshStandardMaterial({ color: 0xd8d0c0, roughness: 0.9 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x7a7468, roughness: 0.8 });

  const W = 3, L = 40, H = 3;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, L), floorMat);
  floor.rotation.x = -Math.PI / 2; floor.position.z = -L / 2 + 2; scene.add(floor);
  const ceil = floor.clone(); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);

  function wall(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), mat);
    m.position.set(x, H / 2, z); scene.add(m);
    colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
  }
  wall(-W / 2 - 0.1, -L / 2 + 2, 0.2, L);
  wall(W / 2 + 0.1, -L / 2 + 2, 0.2, L);
  wall(0, 2.1, W, 0.2);
  wall(0, -L + 1.9, W, 0.2);

  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x302838, 0.35));
  for (let z = 0; z > -L; z -= 6) {
    const p = new THREE.PointLight(0xfff0d0, 6, 9, 2); p.position.set(0, H - 0.2, z); scene.add(p);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.6), new THREE.MeshBasicMaterial({ color: 0xfff6e0 }));
    lamp.position.set(0, H - 0.02, z); scene.add(lamp);
  }
  return { colliders, update() {} };
}
