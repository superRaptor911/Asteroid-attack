import * as THREE from 'three';
import { loadTextures } from './engine/TextureMan';
import { TestCubesScene } from './scenes/testCubes';
import { TexturedCubeScene } from './scenes/TeturedCube';

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(1280, 720);
loadTextures();

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const testCubes = new TestCubesScene();
const testCubes2 = new TestCubesScene();
const texturedCube = new TexturedCubeScene();

testCubes.addChild(testCubes2);
testCubes2.scene.position.x = 3;
texturedCube.scene.position.x = -3;
testCubes.addChild(texturedCube);

function animate(): void {
  testCubes.update();
  requestAnimationFrame(animate);
  renderer.render(testCubes.scene, camera);
}

animate();
