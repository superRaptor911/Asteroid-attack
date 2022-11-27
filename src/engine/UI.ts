import { BaseNode } from './BaseNode';

export class UI {
  readonly element: HTMLElement;
  parent: HTMLElement | null = null;

  constructor(type: string, className?: string, id?: string) {
    this.element = document.createElement(type);
    id && (this.element.id = id);
    className && (this.element.className = className);
  }

  setText(text: string): void {
    this.element.innerText = text;
  }

  setClass(className: string): void {
    this.element.className = className;
  }

  setId(id: string): void {
    this.element.id = id;
  }

  setStyle(style: Partial<CSSStyleDeclaration>): void {
    for (const key in style) {
      const value = style[key];
      if (value) {
        this.element.style[key] = value;
      }
    }
  }

  setPositon(x: number, y: number): void {
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
  }

  mount(scene: BaseNode, parent: HTMLElement = document.body): void {
    scene.registerUI(this);
    this.parent = parent;
    parent.appendChild(this.element);
  }

  unmount(): void {
    if (this.parent) {
      this.parent.removeChild(this.element);
      this.parent = null;
    }
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  show(): void {
    this.element.style.display = 'block';
  }

  setOnClick(callback: (e: MouseEvent) => void): void {
    this.element.onclick = callback;
  }

  setOnMouseOver(callback: (e: MouseEvent) => void): void {
    this.element.onmouseover = callback;
  }

  setOnMouseOut(callback: (e: MouseEvent) => void): void {
    this.element.onmouseout = callback;
  }
}
