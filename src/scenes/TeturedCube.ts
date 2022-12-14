import * as THREE from 'three';
import { getTexture } from '../engine/ResourceMan';
import { SceneNode } from '../engine/SceneNode';
import { randRange } from '../engine/utils';
import { getCamera } from '../game';
import { GameScene } from './gamescene/gamescene';

export class TexturedCubeScene extends SceneNode {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;
  speed = 8;
  camera: THREE.PerspectiveCamera;

  constructor() {
    super('TexturedCube');
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    const texture = getTexture('crate');
    this.material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    this.camera = getCamera();
  }

  update(delta: number): void {
    super.update(delta);
    this.scene.position.z += this.speed * delta;

    if (this.checkCollisionWithCamera()) {
      if (this.parent && this.parent instanceof GameScene) {
        this.parent.gameOver();
        return;
      }
    }
    if (this.scene.position.z > 5) {
      this.speed = randRange(8, 24);
      this.scene.position.z = -50;

      const camPos = this.camera.position;
      this.scene.position.x = randRange(camPos.x - 5, camPos.x + 5);
      this.scene.position.y = randRange(camPos.y - 8, camPos.y + 8);
    }
  }

  checkCollisionWithCamera(): boolean {
    const camPos = this.camera.position;
    const cubePos = this.scene.position;
    const cubeSize = 1;
    const camSize = 0.5;
    const xCollision = Math.abs(camPos.x - cubePos.x) < cubeSize + camSize;
    const yCollision = Math.abs(camPos.y - cubePos.y) < cubeSize + camSize;
    const zCollision = Math.abs(camPos.z - cubePos.z) < cubeSize + camSize;
    return xCollision && yCollision && zCollision;
  }

  destroy(): void {
    super.destroy();
    this.geometry.dispose();
    this.material.dispose();
  }
}
