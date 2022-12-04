import * as THREE from 'three';
import { getTexture } from '../engine/ResourceMan';
import { SceneNode } from '../engine/SceneNode';
import { randRange } from '../engine/utils';
import { getCamera, getScreenSize } from '../game';
// import { getScreenSize } from '../game';

export class Stars extends SceneNode {
  material: THREE.MeshBasicMaterial;
  geometry: THREE.BufferGeometry;
  constructor(count = 20) {
    super('Stars');

    const texture = getTexture('star');
    this.material = new THREE.MeshBasicMaterial({ fog: false, map: texture });
    this.geometry = new THREE.BufferGeometry();

    const vertices = [
      -1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
    ];

    const uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
    const indices = [0, 2, 1, 0, 3, 2];

    this.geometry.setIndex(indices);

    this.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    this.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const mesh = new THREE.InstancedMesh(this.geometry, this.material, count);
    const object = new THREE.Object3D();

    const { width, height } = getScreenSize();

    for (let i = 0; i < count; i++) {
      object.position.x = randRange(-width / 2, width / 2);
      object.position.y = randRange(-height / 2, height / 2);
      object.updateMatrix();

      mesh.setMatrixAt(i, object.matrix);
    }

    this.scene.add(mesh);
    this.scene.position.z = -this._computeZ();
  }

  _computeZ(): number {
    const screenSize = getScreenSize();
    const camera = getCamera();

    const fov = camera.fov * (Math.PI / 180);
    const zPos = screenSize.height / (2 * Math.tan(fov / 2));

    console.log('zPos', zPos);
    return zPos;
  }

  destroy(): void {
    super.destroy();
    this.material.dispose();
    this.geometry.dispose();
  }
}
