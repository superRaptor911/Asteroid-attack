import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const textures = {
  crate: 'crate.png',
};

const models = {
  cube: 'cube.gltf',
};

const sounds = {
  music: 'theTrain.ogg',
};

const textureMap = {};
const modelMap = {};
const soundMap = {};

export const loadTextures = async (): Promise<void> => {
  const loader = new THREE.TextureLoader();

  try {
    for (const [name, path] of Object.entries(textures)) {
      textureMap[name] = await loader.loadAsync(
        'build/assets/textures/' + path,
      );
    }
  } catch (e) {
    console.error('ResourceMan::loadTextures', e);
  }
};

export const getTexture = (name: string): THREE.Texture | null => {
  if (!textureMap[name]) {
    console.error('TextureMan::getTexture: texture not found: ' + name);
    return null;
  }
  return textureMap[name];
};

export const loadModels = async (): Promise<void> => {
  const loader = new GLTFLoader();
  try {
    for (const [name, path] of Object.entries(models)) {
      modelMap[name] = await loader.loadAsync('build/assets/models/' + path);
    }
  } catch (e) {
    /* handle error */
    console.error('ResourceMan::loadModels', e);
  }
};

export const getModel = (name: string): GLTF | null => {
  if (!modelMap[name]) {
    console.error('ModelMan::getModel: model not found: ' + name);
    return null;
  }
  return modelMap[name];
};

export const loadSounds = async (): Promise<void> => {
  try {
    const loader = new THREE.AudioLoader();
    for (const [name, path] of Object.entries(sounds)) {
      soundMap[name] = await loader.loadAsync('build/assets/sounds/' + path);
    }
  } catch (e) {
    /* handle error */
    console.error('ResourceMan::loadSounds', e);
  }
};

export const getSound = (name: string): AudioBuffer | null => {
  if (!soundMap[name]) {
    console.error('SoundMan::getSound: sound not found: ' + name);
    return null;
  }
  return soundMap[name];
};
