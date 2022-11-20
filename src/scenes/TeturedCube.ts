import * as THREE from 'three';
import { SceneNode } from '../engine/Node';
import { getTexture } from '../engine/TextureMan';

export class TexturedCubeScene extends SceneNode {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;
  texture: THREE.Texture;

  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.texture = getTexture('crate');
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
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
