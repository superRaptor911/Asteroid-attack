import { getModel } from '../engine/ResourceMan';
import { SceneNode } from '../engine/SceneNode';
import { randRange } from '../engine/utils';
import { getCamera } from '../game';
import { GameScene } from './gamescene/gamescene';

export class Asteroid extends SceneNode {
  scene: THREE.Mesh;
  speed = 8;
  camera: THREE.PerspectiveCamera;
  maxSpeed = 24;
  minSpeed = 10;

  constructor(name = '') {
    name = name || 'Asteroid';
    super(name);
    const scene = getModel('cube');
    if (scene) {
      this.scene = scene.clone();
    }

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
      this.maxSpeed++;
      this.minSpeed++;
      this.speed = randRange(this.minSpeed, this.maxSpeed);
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
  }
}
