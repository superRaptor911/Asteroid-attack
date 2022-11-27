import { BaseNode } from '../engine/BaseNode';
import { UI } from '../engine/UI';

export class FpsCounterScene extends BaseNode {
  label: UI;
  frames = 0;
  intervalId: NodeJS.Timer;

  constructor() {
    super('FpsCounterScene');
    this.label = new UI('label', 'fpsLabel');
    this.label.mount(this);
    this.label.setStyle({
      color: 'red',
    });
  }

  onReady(): void {
    this.label.setText('0 fps');
    this.intervalId = setInterval(() => this.onOneSecond(), 1000);
  }

  update(dt: number): void {
    super.update(dt);
    this.frames++;
  }

  onOneSecond(): void {
    this.label.setText(this.frames + ' fps');
    this.frames = 0;
  }

  onRemove(): void {
    this.label.unmount();
    clearInterval(this.intervalId);
  }

  destroy(): void {
    super.destroy();
    this.onRemove();
  }
}
