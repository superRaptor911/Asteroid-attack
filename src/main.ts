import { getRootScene, initRenderer, startGame } from './game';
import { LoadingMenu } from './scenes/menus/loadingMenu';
import { initTelegramData } from './telegram';

initTelegramData();
initRenderer();
getRootScene().addChild(new LoadingMenu());
startGame();
