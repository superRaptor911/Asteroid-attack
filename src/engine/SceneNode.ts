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

    if (this.parent) this.parent.removeChild(this);
    this.scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.geometry.dispose();
        node.material.dispose();
      } else if (node instanceof THREE.Light) {
        node.dispose();
      } else if (node instanceof THREE.Group) {
        node.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      }
    });
  }
}
