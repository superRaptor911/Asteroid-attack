import * as THREE from 'three';
import { SceneNode } from '../../engine/SceneNode';
import { UI } from '../../engine/UI';
import { getRootScene, loadResources } from '../../game';
import { MainMenu } from './mainmenu';

export class LoadingMenu extends SceneNode {
  label = new UI('label', 'loadingLabel');
  constructor() {
    super('LoadingMenu');
    this.label.setText('Loading...');
  }

  onReady(): void {
    this.label.mount(this);

    const root = getRootScene();
    if (root.scene instanceof THREE.Scene) {
      root.scene.background = new THREE.Color(0x5f5ba6);
    }

    const textures = [{ name: 'crate', path: 'crate.png' }];
    const models = [{ name: 'cube', path: 'cube.gltf' }];
    const sounds = [{ name: 'music', path: 'theTrain.ogg' }];

    loadResources({ textures, models, sounds }).then(
      this.onLoadComplete.bind(this),
    );
  }

  onLoadComplete(): void {
    getRootScene().addChild(new MainMenu());
    this.destroy();
  }
}
