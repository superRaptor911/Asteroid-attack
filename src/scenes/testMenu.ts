import { SceneNode } from '../engine/SceneNode';
import * as THREE from 'three';
import { TexturedCubeScene } from './TeturedCube';
import { FpsCounterScene } from './fpsCounter';
import { BaseNode } from '../engine/BaseNode';
import { getCamera, getKeyboardInput, getRootScene } from '../game';
import { KeyboardInput } from '../engine/KeyboardInput';

export class TestMenuScene extends SceneNode {
  showButton: HTMLButtonElement;
  hideButton: HTMLButtonElement;
  texturedCubes: SceneNode[] = [];
  fpsCounter: BaseNode;
  camera: THREE.PerspectiveCamera;
  keyboardInput: KeyboardInput;

  constructor() {
    super();
    this.showButton = document.createElement('button');
    this.showButton.innerText = 'Show Textured Cube';
    this.showButton.className = 'showTexButton';
    this.showButton.onclick = this.handleShowTexClick;

    this.hideButton = document.createElement('button');
    this.hideButton.innerText = 'Hide Textured Cube';
    this.hideButton.className = 'hideTexButton';
    this.hideButton.onclick = this.handleHideTexClick;
    this.hideButton.disabled = true;

    const gameDiv = document.getElementById('game');
    if (!gameDiv) {
      console.error("testMenu::constructor: Couldn't find game div");
      return;
    }
    gameDiv.appendChild(this.showButton);
    gameDiv.appendChild(this.hideButton);

    for (let i = 0; i < 10; i++) {
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
  }

  handleShowTexClick = (): void => {
    this.texturedCubes.forEach((cube) => {
      this.addChild(cube);
    });
    this.showButton.disabled = true;
    this.hideButton.disabled = false;
  };

  handleHideTexClick = (): void => {
    this.showButton.disabled = false;
    this.hideButton.disabled = true;

    this.texturedCubes.forEach((cube) => {
      this.removeChild(cube);
    });
  };

  update(delta: number): void {
    super.update(delta);
    if (this.keyboardInput.isKeyDown('a')) {
      this.camera.position.x -= 20 * delta;
    }
    if (this.keyboardInput.isKeyDown('d')) {
      this.camera.position.x += 20 * delta;
    }
    if (this.keyboardInput.isKeyDown('w')) {
      this.camera.position.z += 20 * delta;
    }

    if (this.keyboardInput.isKeyDown('s')) {
      this.camera.position.z -= 20 * delta;
    }
  }
}
