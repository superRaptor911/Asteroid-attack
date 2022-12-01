import { UI } from '../UI';

export class UIProgressBar extends UI {
  declare element: HTMLProgressElement;
  _min: number;
  _max: number;
  _value: number;

  constructor(min = 0, max = 100, value = 0) {
    super('progress');
    this._min = min;
    this._max = max;
    this._value = value;
    this.element.max = 100;
    this.element.value = 0;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = Math.max(this._min, Math.min(this._max, value));
    this.update();
  }

  get min(): number {
    return this._min;
  }

  set min(min: number) {
    this._min = min;
    this.update();
  }

  get max(): number {
    return this._max;
  }

  set max(max: number) {
    this._max = max;
    this.update();
  }

  private update(): void {
    const percent = (100 * this._value) / (this._max - this._min);
    this.element.value = percent;
  }
}
