import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const textures = {
  crate: 'crate.png',
};

const models = {
  cube: 'cube.gltf',
};

const textureMap = {};
const modelMap = {};

export const loadTextures = (): void => {
  const loader = new THREE.TextureLoader();
  for (const [name, path] of Object.entries(textures)) {
    textureMap[name] = loader.load('build/assets/textures/' + path);
  }
};

export const getTexture = (name: string): THREE.Texture | null => {
  if (!textureMap[name]) {
    console.error('TextureMan::getTexture: texture not found: ' + name);
    return null;
  }
  return textureMap[name];
};

export const loadModels = (): void => {
  const loader = new GLTFLoader();
  for (const [name, path] of Object.entries(models)) {
    loader.load('build/assets/models/' + path, (gltf) => {
      modelMap[name] = gltf.scene;
    });
  }
};

export const getModel = (name: string): THREE.Mesh | null => {
  if (!modelMap[name]) {
    console.error('ModelMan::getModel: model not found: ' + name);
    return null;
  }
  return modelMap[name];
};
