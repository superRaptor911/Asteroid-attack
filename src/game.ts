import * as THREE from 'three';
import { KeyboardInput } from './engine/KeyboardInput';
import { loadModels, loadSounds, loadTextures } from './engine/ResourceMan';
import { SceneNode } from './engine/SceneNode';

const gameDiv = document.getElementById('game');
let Width = gameDiv?.clientWidth ?? 800;
let Height = gameDiv?.clientHeight ?? 600;

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, Width / Height, 0.1, 1000);
const keyboardInput = new KeyboardInput();
const clock = new THREE.Clock();
const audioListener = new THREE.AudioListener();
const rootScene = new SceneNode('root', true);

const handleResize = (): void => {
  Width = gameDiv ? gameDiv.clientWidth : 800;
  Height = gameDiv ? gameDiv.clientHeight : 600;

  camera.aspect = Width / Height;
  camera.updateProjectionMatrix();
  renderer.setSize(Width, Height);
};

export const initRenderer = (): void => {
  camera.add(audioListener);
  renderer.setSize(Width, Height);
  rootScene.scene.add(camera);

  camera.position.z = 5;
  gameDiv?.appendChild(renderer.domElement);
  document.body.onresize = handleResize;
};

export const loadResources = async ({
  textures,
  models,
  sounds,
}): Promise<void> => {
  await loadTextures(textures);
  await loadModels(models);
  await loadSounds(sounds);
};

export const getCamera = (): THREE.PerspectiveCamera => camera;
export const getRenderer = (): THREE.WebGLRenderer => renderer;
export const getRootScene = (): SceneNode => rootScene;
export const getScreenSize = (): { width: number; height: number } => ({
  width: Width,
  height: Height,
});
export const getKeyboardInput = (): KeyboardInput => keyboardInput;
export const getClock = (): THREE.Clock => clock;
export const getAudioListener = (): THREE.AudioListener => audioListener;

export const startGame = (): void => {
  let delta = 0;
  function animate(): void {
    delta = clock.getDelta();
    rootScene.update(delta);
    requestAnimationFrame(animate);
    renderer.render(rootScene.scene, camera);
  }

  animate();
};
