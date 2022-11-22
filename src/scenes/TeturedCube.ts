import * as THREE from 'three';
import { SceneNode } from '../engine/SceneNode';
import { getTexture } from '../engine/TextureMan';

export class TexturedCubeScene extends SceneNode {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;
  texture: THREE.Texture | null;
  speed = 4;

  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.texture = getTexture('crate');
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
  }

  update(delta: number): void {
    super.update(delta);
    this.scene.position.z += this.speed * delta;

    if (this.scene.position.z > 5) {
      this.scene.position.z = -40;
      this.scene.position.x = Math.random() * 40 - 20;
      this.scene.position.y = Math.random() * 40 - 20;
    }
  }

  destroy(): void {
    super.destroy();
    this.geometry.dispose();
    this.material.dispose();
  }
}