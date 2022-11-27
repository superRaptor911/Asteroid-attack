import { getRootScene, initGame, startGame } from './game';
import { MainMenu } from './scenes/menus/mainmenu';

initGame();
getRootScene().addChild(new MainMenu());
startGame();
