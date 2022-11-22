import { BaseNode } from '../engine/BaseNode';

export class FpsCounterScene extends BaseNode {
  label: HTMLLabelElement;
  frames = 0;
  intervalId: NodeJS.Timer;

  constructor() {
    super('FpsCounterScene');
    this.label = document.createElement('label');
    this.label.className = 'fpsLabel';
    document.getElementById('game')?.appendChild(this.label);
  }

  onReady(): void {
    this.label.innerText = '0 fps';
    this.intervalId = setInterval(() => this.onOneSecond(), 1000);
  }

  update(dt: number): void {
    super.update(dt);
    this.frames++;
  }

  onOneSecond(): void {
    this.label.innerText = `${this.frames} fps`;
    this.frames = 0;
  }

  onRemove(): void {
    this.label.remove();
    clearInterval(this.intervalId);
  }
}
