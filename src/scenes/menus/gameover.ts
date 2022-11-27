import * as THREE from 'three';
import { BaseNode } from '../../engine/BaseNode';
import { UI } from '../../engine/UI';
import { UIButton } from '../../engine/ui/Button';
import { float2Int } from '../../engine/utils';
import { getRootScene } from '../../game';
import { MainMenu } from './mainmenu';

export class GameOverMenu extends BaseNode {
  okButton: UIButton;
  headerLabel: UI;
  scoreLabel: UI;

  constructor(score: number) {
    super('gameover');
    this.okButton = new UIButton('OK', 'gameOverButton');
    this.headerLabel = new UI('label', 'gameOverLabel');
    this.scoreLabel = new UI('label', 'gameOverScoreLabel');

    this.okButton.setOnClick(this.onOkButtonClicked.bind(this));
    this.headerLabel.setText('Game Over');
    this.scoreLabel.setText(`Score: ${float2Int(score)}`);
  }

  onReady(): void {
    this.okButton.mount(this);
    this.headerLabel.mount(this);
    this.scoreLabel.mount(this);
    const root = getRootScene();

    if (root.scene instanceof THREE.Scene) {
      root.scene.background = new THREE.Color(0x000000);
    }
  }

  onOkButtonClicked(): void {
    if (this.parent) {
      this.parent.addChild(new MainMenu());
    }
    this.destroy();
  }
}
