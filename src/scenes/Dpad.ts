import { clamp } from 'three/src/math/MathUtils.js';
import { UI } from '../engine/UI';

export class Dpad extends UI {
  innerCircle: HTMLElement;
  isTouching = false;
  innerCirClickPos = [0, 0];
  initialInnerCirclePos = [0, 0];
  value = [0, 0];

  constructor() {
    super('div', 'dpad');
    this.innerCircle = document.createElement('div');
    this.element.appendChild(this.innerCircle);

    this.element.addEventListener('touchstart', this.onTouchStart);
    this.element.addEventListener('touchmove', this.onTouchMove);
    this.element.addEventListener('touchend', this.onTouchEnd);
    this.element.addEventListener('touchcancel', this.onTouchEnd);

    this.element.addEventListener('mousedown', this.onTouchStart);
    this.element.addEventListener('mousemove', this.onTouchMove);
    this.element.addEventListener('mouseup', this.onTouchEnd);
    this.element.addEventListener('mouseleave', this.onTouchEnd);

    const innerCircleStyle = {
      position: 'relative',
      top: '15px',
      left: '15px',
      width: '70px',
      height: '70px',
      borderRadius: '35px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    };

    Object.assign(this.innerCircle.style, innerCircleStyle);

    this.initialInnerCirclePos = [
      parseInt(innerCircleStyle.top),
      parseInt(innerCircleStyle.left),
    ];
  }

  onTouchStart = (e: TouchEvent | MouseEvent): void => {
    e.preventDefault();
    this.isTouching = true;
    const isTouch = e instanceof TouchEvent;
    const touch = isTouch ? e.touches[0] : e;

    const rect = this.innerCircle.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    this.innerCirClickPos = [x, y];
  };

  onTouchMove = (e: TouchEvent | MouseEvent): void => {
    e.preventDefault();
    this.value[0] = 0;
    this.value[1] = 0;
    if (!this.isTouching) return;

    const isTouch = e instanceof TouchEvent;
    const touch = isTouch ? e.touches[0] : e;
    const rect = this.element.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    let y = touch.clientY - rect.top;

    x = clamp(x, 0, rect.width);
    y = clamp(y, 0, rect.height);

    this.value[0] = (x - rect.width / 2) / 100;
    this.value[1] = (y - rect.height / 2) / 100;

    this.setInnerCirclePosition(x, y);
  };

  setInnerCirclePosition(x: number, y: number): void {
    const X = x - this.innerCirClickPos[0];
    const Y = y - this.innerCirClickPos[1];

    this.innerCircle.style.left = `${X}px`;
    this.innerCircle.style.top = `${Y}px`;
  }

  onTouchEnd = (e: TouchEvent | MouseEvent): void => {
    e.preventDefault();
    this.isTouching = false;
    this.value[0] = 0;
    this.value[1] = 0;

    this.innerCircle.style.left = `${this.initialInnerCirclePos[0]}px`;
    this.innerCircle.style.top = `${this.initialInnerCirclePos[1]}px`;
  };
}
