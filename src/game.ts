import * as THREE from 'three';
import { SceneNode } from './engine/Node';
import { loadTextures } from './engine/TextureMan';

const Width = 800;
const Height = 600;

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, Width / Height, 0.1, 1000);
const rootScene = new SceneNode();

export const initGame = (): void => {
  renderer.setSize(Width, Height);
  loadTextures();
  camera.position.z = 5;
  document.getElementById('game').appendChild(renderer.domElement);
};

export const getCamera = (): THREE.PerspectiveCamera => camera;
export const getRenderer = (): THREE.WebGLRenderer => renderer;
export const getRootScene = (): SceneNode => rootScene;
export const getScreenSize = (): { width: number; height: number } => ({
  width: Width,
  height: Height,
});

export const startGame = (): void => {
  function animate(): void {
    rootScene.update();
    requestAnimationFrame(animate);
    renderer.render(rootScene.scene, camera);
  }

  animate();
};
