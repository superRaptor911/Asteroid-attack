import { SceneNode } from '../engine/Node';
import { TexturedCubeScene } from './TeturedCube';

export class TestMenuScene extends SceneNode {
  showTexButton: HTMLButtonElement;
  hideTexButton: HTMLButtonElement;
  texturedCube: SceneNode;
  constructor() {
    super();
    this.showTexButton = document.createElement('button');
    this.showTexButton.innerText = 'Show Textured Cube';
    this.showTexButton.className = 'showTexButton';
    this.showTexButton.onclick = this.handleShowTexClick;

    this.hideTexButton = document.createElement('button');
    this.hideTexButton.innerText = 'Hide Textured Cube';
    this.hideTexButton.className = 'hideTexButton';
    this.hideTexButton.onclick = this.handleHideTexClick;
    this.hideTexButton.disabled = true;

    const gameDiv = document.getElementById('game');
    if (!gameDiv) {
      console.error("testMenu::constructor: Couldn't find game div");
      return;
    }
    gameDiv.appendChild(this.showTexButton);
    gameDiv.appendChild(this.hideTexButton);
    this.texturedCube = new TexturedCubeScene();
  }

  handleShowTexClick = (): void => {
    this.addChild(this.texturedCube);
    this.showTexButton.disabled = true;
    this.hideTexButton.disabled = false;
  };

  handleHideTexClick = (): void => {
    this.showTexButton.disabled = false;
    this.removeChild(this.texturedCube);
    this.hideTexButton.disabled = true;
  };
}
