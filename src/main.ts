import { getRootScene, initRenderer, startGame } from './game';
import { MainMenu } from './scenes/menus/mainmenu';

initRenderer();
getRootScene().addChild(new MainMenu());
startGame();
