import * as THREE from 'three';
import { TestCubesScene } from './scenes/testCubes';

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(1280, 720);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const testCubes = new TestCubesScene();
const testCubes2 = new TestCubesScene();

testCubes.addChild(testCubes2);
testCubes2.scene.position.x = 3;

function animate(): void {
  testCubes.update();
  requestAnimationFrame(animate);
  renderer.render(testCubes.scene, camera);
}

animate();
