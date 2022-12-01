import * as THREE from 'three';
import { getSound } from '../../engine/ResourceMan';
import { SceneNode } from '../../engine/SceneNode';
import { getStorage, setStorage } from '../../engine/storage';
import { UI } from '../../engine/UI';
import { UIProgressBar } from '../../engine/ui/ProgressBar';
import { float2Int } from '../../engine/utils';
import {
  getAudioListener,
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
  fpsCounter = new FpsCounterScene();
  camera = getCamera();
  keyboardInput = getKeyboardInput();
  clock = getClock();

  staminaBar = new UIProgressBar();
  dpad = new Dpad();
  scoreLabel = new UI('label', 'scoreLabel');

  music = new THREE.Audio(getAudioListener());

  speed = 20;
  score = 0;
  rechargeRate = 0.1;
  lastMoveTime = 0;
  cooldownPeriod = 1;
  scoreInterval: NodeJS.Timer;

  constructor() {
    super('GameScene');
    for (let i = 0; i < 20; i++) {
      const asteroid = new Asteroid();
      asteroid.scene.position.z = -i * 10;

      asteroid.scene.position.x = i * 10 - 8;
      this.asteroids.push(asteroid);
    }

    this.staminaBar.setClass('staminaBar');
    const musicBuffer = getSound('music');
    if (musicBuffer) {
      this.music.setBuffer(musicBuffer);
      this.music.setVolume(0.5);
      this.music.setLoop(true);
    }

    this.scoreInterval = setInterval(
      this.onScoreIntervalTimeout.bind(this),
      1000,
    );
  }

  onReady(): void {
    const root = getRootScene();
    if (root.scene instanceof THREE.Scene) {
      root.scene.fog = new THREE.Fog(0x87ceeb, 0, 60);
      root.scene.background = new THREE.Color(0x87ceeb);
    }

    this.addChild(this.fpsCounter);

    this.staminaBar.mount(this);
    this.staminaBar.value = 100;
    this.scoreLabel.mount(this);
    this.dpad.mount(this);

    this.asteroids.forEach((cube) => {
      this.addChild(cube);
    });

    this.music.play();
  }

  update(delta: number): void {
    super.update(delta);

    let moved = false;
    const canMove = this.staminaBar.value > 0;

    if (canMove) {
      moved = this.handleInput(delta);
    }

    if (moved) {
      this.staminaBar.value -= 40 * delta;
      this.lastMoveTime = this.clock.getElapsedTime();
    }

    this.cooldown();
    this.scoreLabel.setText('Score: ' + float2Int(this.score));
  }

  handleInput(delta: number): boolean {
    const dpadXValue = this.dpad.value[0];
    const dpadYValue = this.dpad.value[1];
    const dpadThreshold = 0.1;

    let moved = false;
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

    return moved;
  }

  cooldown(): void {
    const curTime = this.clock.getElapsedTime();
    if (curTime - this.lastMoveTime > this.cooldownPeriod)
      this.staminaBar.value += this.rechargeRate;
  }

  onScoreIntervalTimeout(): void {
    this.score += 100;
  }

  destroy(): void {
    super.destroy();
    this.music.stop();
    clearInterval(this.scoreInterval);
  }

  gameOver(): void {
    const highScore: number | undefined = getStorage('highScore');
    const isHighScore = !highScore || this.score > highScore;
    if (isHighScore) setStorage('highScore', this.score);

    getRootScene().addChild(new GameOverMenu(this.score, isHighScore));
    this.destroy();
  }
}
