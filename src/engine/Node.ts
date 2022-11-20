import * as THREE from 'three';

export class SceneNode {
  scene: THREE.Scene;
  parent: SceneNode | null = null;
  children: SceneNode[] = [];

  constructor() {
    this.scene = new THREE.Scene();
  }

  addChild(child: SceneNode): void {
    if (child.parent !== null) {
      child.parent.removeChild(child);
    }
    child.parent = this;
    this.children.push(child);

    this.scene.add(child.scene);
  }

  removeChild(child: SceneNode): void {
    if (child.parent === this) {
      this.scene.remove(child.scene);
      child.parent = null;
      this.children.splice(this.children.indexOf(child), 1);
    }
  }

  update(): void {
    this.children.forEach((child) => child.update());
  }

  destroy(): void {
    this.children.forEach((child) => child.destroy());
    this.children = [];
  }
}
