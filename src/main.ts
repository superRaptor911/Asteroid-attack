import { getRootScene, initGame, startGame } from './game';
import { MainMenu } from './scenes/mainmenu/mainmenu';

initGame();
getRootScene().addChild(new MainMenu());
startGame();
