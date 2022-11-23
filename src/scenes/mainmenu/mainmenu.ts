import { SceneNode } from '../../engine/SceneNode';
import { UIButton } from '../../engine/ui/Button';
import { TestMenuScene } from '../testMenu';

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
    const testMenuScene = new TestMenuScene();
    this.parent?.addChild(testMenuScene);
    this.parent?.removeChild(this);
  }
}
