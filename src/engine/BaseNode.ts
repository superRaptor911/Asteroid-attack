import { UI } from './UI';

export class BaseNode {
  parent: BaseNode | null = null;
  _children: BaseNode[] = [];
  _childMap: { [key: string]: BaseNode } = {};
  _name = '';

  _uiElementsRegistry: UI[] = [];

  constructor(name = '') {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    if (this.parent) {
      if (this.parent._childMap[this._name] === this) {
        delete this.parent._childMap[this._name];
      }

      if (this.parent._childMap[name]) {
        this._name = `${name}_${this._children.length}`;
      }
      return;
    }
    this._name = name;
  }

  get path(): string {
    let path = this.name;
    if (this.parent) {
      path = this.parent.path + '/' + path;
    }
    return path;
  }

  addChild(child: BaseNode): void {
    if (child.parent !== null) {
      child.parent.removeChild(child);
    }

    // Check for name collisions
    if (this._childMap[child._name]) {
      child._name = `${child._name}_${this._children.length}`;
    }

    child.parent = this;
    this._childMap[child._name] = child; // Add to child map
    this._children.push(child); // Add to children array

    child.onReady();
  }

  getChild(name: string): BaseNode | null {
    const indexOf = name.indexOf('/');
    if (indexOf === -1) {
      return this._childMap[name] || null;
    }
    const childName = name.substring(0, indexOf);
    const child = this._childMap[childName];
    if (child) {
      return child.getChild(name.substring(indexOf + 1));
    }
    return null;
  }

  onReady(): void {
    // Override this method to do something when the node is added to the scene
  }

  onRemove(): void {
    // Override this method to do something when the node is removed from the scene
  }

  removeChild(child: BaseNode): void {
    if (child.parent === this) {
      child.parent = null;
      delete this._childMap[child._name];
      this._children = this._children.filter((c) => c !== child);
      child.onRemove();
    } else {
      console.warn(`Child ${child.path} is not a child of ${this.path}`);
    }
  }

  update(delta: number): void {
    this._children.forEach((child) => child.update(delta));
  }

  registerUI(ui: UI): void {
    this._uiElementsRegistry.push(ui);
  }

  unregisterUI(ui: UI): void {
    this._uiElementsRegistry = this._uiElementsRegistry.filter((u) => u !== ui);
  }

  destroy(): void {
    this._children.forEach((child) => child.destroy());
    this._children = [];
    this._childMap = {};
    this._uiElementsRegistry.forEach((ui) => ui.unmount());
    this._uiElementsRegistry = [];
  }
}
