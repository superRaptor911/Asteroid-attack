import * as THREE from 'three';

const assets = {
  crate: 'crate.png',
};

const textures = {};

export const loadTextures = (): void => {
  const loader = new THREE.TextureLoader();
  for (const [name, path] of Object.entries(assets)) {
    textures[name] = loader.load('build/assets/textures/' + path);
  }
};

export const getTexture = (name: string): THREE.Texture | null => {
  if (!textures[name]) {
    console.error('TextureMan::getTexture: texture not found: ' + name);
    return null;
  }
  return textures[name];
};
