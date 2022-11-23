import * as THREE from 'three';
import { SceneNode } from '../engine/SceneNode';
import { getTexture } from '../engine/TextureMan';
import { randRange } from '../engine/utils';
import { getCamera } from '../game';

export class TexturedCubeScene extends SceneNode {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;
  texture: THREE.Texture | null;
  speed = 8;
  camera: THREE.PerspectiveCamera;

  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.texture = getTexture('crate');
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    this.camera = getCamera();
  }

  update(delta: number): void {
    super.update(delta);
    this.scene.position.z += this.speed * delta;

    if (this.scene.position.z > 5) {
      this.speed = randRange(8, 24);
      this.scene.position.z = -50;

      const camPos = this.camera.position;
      this.scene.position.x = randRange(camPos.x - 5, camPos.x + 5);
      this.scene.position.y = randRange(camPos.y - 8, camPos.y + 8);
    }
  }

  destroy(): void {
    super.destroy();
    this.geometry.dispose();
    this.material.dispose();
  }
}
