import { SceneNode } from '../../engine/SceneNode';
import { UIButton } from '../../engine/ui/Button';
import { GameScene } from '../gamescene/gamescene';

export class MainMenu extends SceneNode {
  newGameButton: UIButton;
  constructor() {
    super('MainMenu');
    this.newGameButton = new UIButton('New Game');
    this.newGameButton.setStyle({
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '200px',
      fontSize: '24px',
      padding: '10px',
    });
    this.newGameButton.setOnClick(this.onNewGame.bind(this));
  }

  onReady(): void {
    this.newGameButton.mount();
  }

  onRemove(): void {
    this.newGameButton.unmount();
  }

  onNewGame(): void {
    const gameScene = new GameScene();
    this.parent?.addChild(gameScene);
    this.parent?.removeChild(this);
  }
}
