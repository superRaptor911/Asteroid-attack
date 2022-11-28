import * as THREE from 'three';
import { BaseNode } from '../../engine/BaseNode';
import { KeyboardInput } from '../../engine/KeyboardInput';
import { SceneNode } from '../../engine/SceneNode';
import { getStorage, setStorage } from '../../engine/storage';
import { UI } from '../../engine/UI';
import { UIProgressBar } from '../../engine/ui/ProgressBar';
import { float2Int } from '../../engine/utils';
import {
  getCamera,
  getClock,
  getKeyboardInput,
  getRootScene,
} from '../../game';
import { Asteroid } from '../Asteroid';
import { Dpad } from '../Dpad';
import { FpsCounterScene } from '../fpsCounter';
import { GameOverMenu } from '../menus/gameover';

export class GameScene extends SceneNode {
  asteroids: SceneNode[] = [];
  fpsCounter: BaseNode;
  camera: THREE.PerspectiveCamera;
  keyboardInput: KeyboardInput;
  movesLeftBar = new UIProgressBar();
  dpad = new Dpad();
  scoreLabel: UI;
  speed = 20;
  score = 0;
  clock: THREE.Clock;

  rechargeRate = 0.1;
  lastMoveTime = 0;
  cooldownPeriod = 1;

  constructor() {
    super('GameScene');

    for (let i = 0; i < 20; i++) {
      const asteroid = new Asteroid();
      asteroid.scene.position.z = -i * 10;
      asteroid.scene.position.x = i * 10 - 8;
      this.asteroids.push(asteroid);
    }

    this.fpsCounter = new FpsCounterScene();
    this.camera = getCamera();
    this.keyboardInput = getKeyboardInput();

    this.scoreLabel = new UI('label', 'scoreLabel');
    this.movesLeftBar.setClass('movesLeftBar');

    this.clock = getClock();
  }

  onReady(): void {
    const root = getRootScene();
    if (root.scene instanceof THREE.Scene) {
      root.scene.fog = new THREE.Fog(0xffffff, 0, 50);
      root.scene.background = new THREE.Color(0xffffff);
    }

    this.addChild(this.fpsCounter);

    this.movesLeftBar.mount(this);
    this.movesLeftBar.value = 100;
    this.scoreLabel.mount(this);
    this.dpad.mount(this);

    this.asteroids.forEach((cube) => {
      this.addChild(cube);
    });
  }

  update(delta: number): void {
    super.update(delta);

    let moved = false;
    const canMove = this.movesLeftBar.value > 0;

    if (canMove) {
      const dpadXValue = this.dpad.value[0];
      const dpadYValue = this.dpad.value[1];
      const dpadThreshold = 0.2;

      console.log(dpadXValue, dpadYValue);
      if (this.keyboardInput.isKeyDown('a') || dpadXValue < -dpadThreshold) {
        this.camera.position.x -= this.speed * delta;
        moved = true;
      }
      if (this.keyboardInput.isKeyDown('d') || dpadXValue > dpadThreshold) {
        this.camera.position.x += this.speed * delta;
        moved = true;
      }
      if (this.keyboardInput.isKeyDown('w') || dpadYValue < -dpadThreshold) {
        this.camera.position.y += this.speed * delta;
        moved = true;
      }
      if (this.keyboardInput.isKeyDown('s') || dpadYValue > dpadThreshold) {
        this.camera.position.y -= this.speed * delta;
        moved = true;
      }
    }

    if (moved) {
      this.movesLeftBar.value -= 40 * delta;
      this.lastMoveTime = this.clock.getElapsedTime();
    }

    this.cooldown();
    this.scoreLabel.setText('Score: ' + float2Int(this.score));
    this.score += 0.1;
  }

  cooldown(): void {
    const curTime = this.clock.getElapsedTime();
    if (curTime - this.lastMoveTime > this.cooldownPeriod)
      this.movesLeftBar.value += this.rechargeRate;
  }

  destroy(): void {
    super.destroy();
  }

  gameOver(): void {
    const highScore: number | undefined = getStorage('highScore');
    const isHighScore = !highScore || this.score > highScore;
    if (isHighScore) setStorage('highScore', this.score);

    getRootScene().addChild(new GameOverMenu(this.score, isHighScore));
    this.destroy();
  }
}
