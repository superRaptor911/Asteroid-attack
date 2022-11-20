import * as THREE from 'three';
import { SceneNode } from '../engine/Node';

export class TestCubesScene extends SceneNode {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;

  constructor(color = 0x00ff00) {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: color });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
  }

  update(): void {
    super.update();
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

  destroy(): void {
    super.destroy();
    this.geometry.dispose();
    this.material.dispose();
  }
}
