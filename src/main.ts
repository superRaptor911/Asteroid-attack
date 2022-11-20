import { getRootScene, initGame, startGame } from './game';
import { TestMenuScene } from './scenes/testMenu';

initGame();
getRootScene().addChild(new TestMenuScene());
startGame();
