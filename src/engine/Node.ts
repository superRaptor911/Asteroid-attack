import * as THREE from 'three';

export class SceneNode {
  scene: THREE.Scene;
  parent: SceneNode | null = null;
  _children: SceneNode[] = [];
  _childMap: { [key: string]: SceneNode } = {};
  _name = '';

  constructor(name = '') {
    this.scene = new THREE.Scene();
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

  addChild(child: SceneNode): void {
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

    this.scene.add(child.scene);
    child.onReady();
  }

  getChild(name: string): SceneNode | null {
    const indexOf = name.indexOf('/');
    if (indexOf === -1) {
      return this._childMap[name] || null;
    }
    const childName = name.substring(indexOf);
    return this._childMap[childName].getChild(name.substring(indexOf + 1));
  }

  onReady(): void {
    // Override this method to do something when the node is added to the scene
  }

  onRemove(): void {
    // Override this method to do something when the node is removed from the scene
  }

  removeChild(child: SceneNode): void {
    if (child.parent === this) {
      this.scene.remove(child.scene);
      child.parent = null;
      delete this._childMap[child._name];
      this._children.splice(this._children.indexOf(child), 1);
      child.onRemove();
    }
  }

  update(delta: number): void {
    this._children.forEach((child) => child.update(delta));
  }

  destroy(): void {
    this._children.forEach((child) => child.destroy());
    this._children = [];
  }
}
