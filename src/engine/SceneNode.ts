import * as THREE from 'three';
import { BaseNode } from './BaseNode';

export class SceneNode extends BaseNode {
  scene: THREE.Scene;

  constructor(name = '') {
    name = name || 'SceneNode';
    super(name);
    this.scene = new THREE.Scene();
  }

  addChild(child: SceneNode | BaseNode): void {
    if (child instanceof SceneNode) this.scene.add(child.scene);
    super.addChild(child);
  }

  removeChild(child: SceneNode | BaseNode): void {
    if (child.parent === this && child instanceof SceneNode) {
      this.scene.remove(child.scene);
    }
    super.removeChild(child);
  }

  destroy(): void {
    super.destroy();
    this.parent?.removeChild(this);
  }
}
