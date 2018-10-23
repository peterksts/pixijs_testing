import * as PIXI from 'pixi.js'
import {LoadTextureType} from '../types/load-texture.type';

export class TextureService {

  readonly mapTexture: {[key: string]: PIXI.Texture} = {};

  constructor() {
  }

  public loadByConfig(data: {[key: string]: LoadTextureType}): {[key: string]: PIXI.Texture} {
    for (const field in data) {
      const d = data[field];
      if (typeof d === 'object') {
        this.mapTexture[field] = PIXI.Texture.fromImage(d.imageUrl, d.crossOrigin, d.scaleMode, d.sourceScale);
      } else {
        this.mapTexture[field] = PIXI.Texture.fromImage(d);
      }
    }
    return this.mapTexture;
  }

  public load(data: LoadTextureType, key?: string): PIXI.Texture {
    let texture: PIXI.Texture;
    if (typeof data === 'object') {
      texture = PIXI.Texture.fromImage(data.imageUrl, data.crossOrigin, data.scaleMode, data.sourceScale);
    } else {
      texture = PIXI.Texture.fromImage(data);
    }

    if (key) {
      this.mapTexture[key] = texture;
    }
    return texture;
  }

  public getTexture(key: string): PIXI.Texture {
    const texture = this.mapTexture[key];
    if (!texture) {
      console.error(`Not found: '${key}' texture`);
    }
    return texture;
  }

}
