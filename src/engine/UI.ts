type elementType = 'button' | 'label' | 'div' | 'input';

export class UI {
  readonly element: HTMLElement;
  parent: HTMLElement | null = null;

  constructor(type: elementType, className?: string, id?: string) {
    this.element = document.createElement(type);
    id && (this.element.id = id);
    className && (this.element.className = className);
  }

  setText(text: string): void {
    this.element.innerText = text;
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

  mount(parent: HTMLElement = document.body): void {
    this.parent = parent;
    parent.appendChild(this.element);
  }

  unmount(): void {
    if (this.parent) {
      this.parent.removeChild(this.element);
      this.parent.removeChild(this.element);
      this.parent = null;
    }
  }

  setOnClick(callback: (e: MouseEvent) => void): void {
    this.element.onclick = callback;
  }
}
