import * as THREE from 'three';
import { BaseNode } from '../../engine/BaseNode';
import { KeyboardInput } from '../../engine/KeyboardInput';
import { SceneNode } from '../../engine/SceneNode';
import { UIProgressBar } from '../../engine/ui/ProgressBar';
import { getCamera, getKeyboardInput, getRootScene } from '../../game';
import { FpsCounterScene } from '../fpsCounter';
import { TexturedCubeScene } from '../TeturedCube';

export class GameScene extends SceneNode {
  texturedCubes: SceneNode[] = [];
  fpsCounter: BaseNode;
  camera: THREE.PerspectiveCamera;
  keyboardInput: KeyboardInput;
  movesLeftBar = new UIProgressBar();

  constructor() {
    super('GameScene');

    for (let i = 0; i < 20; i++) {
      const cube = new TexturedCubeScene();
      cube.scene.position.z = -i * 10;
      cube.scene.position.x = i * 10 - 8;
      this.texturedCubes.push(cube);
    }

    this.fpsCounter = new FpsCounterScene();
    this.camera = getCamera();
    this.keyboardInput = getKeyboardInput();
  }

  onReady(): void {
    getRootScene().scene.fog = new THREE.Fog(0xffffff, 0, 50);
    getRootScene().scene.background = new THREE.Color(0xffffff);
    this.addChild(this.fpsCounter);
    this.movesLeftBar.mount();
    this.movesLeftBar.setClass('movesLeftBar');
    this.movesLeftBar.value = 100;

    this.texturedCubes.forEach((cube) => {
      this.addChild(cube);
    });
  }

  update(delta: number): void {
    super.update(delta);
    if (this.keyboardInput.isKeyDown('a')) {
      this.camera.position.x -= 20 * delta;
      this.movesLeftBar.value -= 40 * delta;
    }
    if (this.keyboardInput.isKeyDown('d')) {
      this.camera.position.x += 20 * delta;
      this.movesLeftBar.value -= 40 * delta;
    }
    if (this.keyboardInput.isKeyDown('w')) {
      this.camera.position.y += 20 * delta;
      this.movesLeftBar.value -= 40 * delta;
    }

    if (this.keyboardInput.isKeyDown('s')) {
      this.camera.position.y -= 20 * delta;
      this.movesLeftBar.value -= 40 * delta;
    }
  }
}
