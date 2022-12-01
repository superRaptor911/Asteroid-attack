import { getRootScene, initRenderer, startGame } from './game';
import { LoadingMenu } from './scenes/menus/loadingMenu';

initRenderer();
getRootScene().addChild(new LoadingMenu());
startGame();
