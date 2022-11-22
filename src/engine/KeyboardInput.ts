export class KeyboardInput {
  private _keys: { [key: string]: boolean } = {};

  constructor(element?: HTMLElement) {
    this.attach(element);
  }

  keyDownListener = (event: KeyboardEvent): boolean => {
    this._keys[event.key] = true;
    event.preventDefault();
    return false;
  };

  keyUpListener = (event: KeyboardEvent): boolean => {
    this._keys[event.key] = false;
    event.preventDefault();
    return false;
  };

  attach(element?: HTMLElement): void {
    if (!element) {
      document.addEventListener('keydown', this.keyDownListener);
      document.addEventListener('keyup', this.keyUpListener);
    } else {
      element.addEventListener('keydown', this.keyDownListener);
      element.addEventListener('keyup', this.keyUpListener);
    }
  }

  isKeyDown(key: string): boolean {
    return this._keys[key] === true;
  }

  isKeyUp(key: string): boolean {
    return this._keys[key] === false;
  }

  isKeysDown(keys: string[]): boolean {
    return keys.every((key) => this._keys[key] === true);
  }

  isKeysUp(keys: string[]): boolean {
    return keys.every((key) => this._keys[key] === false);
  }

  isAnyKeyDown(keys: string[]): boolean {
    return keys.some((key) => this._keys[key] === true);
  }

  isAnyKeyUp(keys: string[]): boolean {
    return keys.some((key) => this._keys[key] === false);
  }

  clear(): void {
    this._keys = {};
  }

  detach(element: HTMLElement): void {
    element.removeEventListener('keydown', this.keyDownListener);
    element.removeEventListener('keyup', this.keyUpListener);
  }
}
