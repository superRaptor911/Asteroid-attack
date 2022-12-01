import { SceneNode } from '../../engine/SceneNode';
import { UI } from '../../engine/UI';
import { UIProgressBar } from '../../engine/ui/ProgressBar';
import { getRootScene, loadResources } from '../../game';
import { MainMenu } from './mainmenu';

export class LoadingMenu extends SceneNode {
  label = new UI('label', 'loadingLabel');
  progressBar = new UIProgressBar();
  constructor() {
    super('LoadingMenu');
  }

  onReady(): void {
    this.label.mount(this);
    this.progressBar.mount(this);
    loadResources().then(this.onLoadComplete.bind(this));
  }

  onLoadComplete(): void {
    getRootScene().addChild(new MainMenu());
    this.destroy();
  }
}
