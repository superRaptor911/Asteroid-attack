import { SceneNode } from '../engine/Node';
import * as THREE from 'three';
import { TexturedCubeScene } from './TeturedCube';

export class TestMenuScene extends SceneNode {
  showButton: HTMLButtonElement;
  hideButton: HTMLButtonElement;
  texturedCubes: SceneNode[] = [];
  fpsLabel: HTMLLabelElement;

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
    this.fpsLabel = document.createElement('label');
    this.fpsLabel.className = 'fpsLabel';

    const gameDiv = document.getElementById('game');
    if (!gameDiv) {
      console.error("testMenu::constructor: Couldn't find game div");
      return;
    }
    gameDiv.appendChild(this.showButton);
    gameDiv.appendChild(this.hideButton);
    gameDiv.appendChild(this.fpsLabel);

    for (let i = 0; i < 10; i++) {
      const cube = new TexturedCubeScene();
      cube.scene.position.z = -i * 10;
      cube.scene.position.x = i * 10 - 8;
      this.texturedCubes.push(cube);
    }
  }

  onReady(): void {
    if (this.parent) {
      this.parent.scene.fog = new THREE.Fog(0xffffff, 0, 50);
      this.parent.scene.background = new THREE.Color(0xffffff);
    }
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
    this.fpsLabel.innerText = `FPS: ${Math.round(1 / delta)}`;
  }
}
