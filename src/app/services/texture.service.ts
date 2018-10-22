import * as PIXI from 'pixi.js'

export class TextureService {

  readonly mapTexture: {[key: string]: PIXI.Texture} = {};

  constructor() {
  }

  public loadByConfig(data: {[key: string]: string}): {[key: string]: PIXI.Texture} {
    for (const field in data) {
      this.mapTexture[field] = PIXI.Texture.fromImage(data[field]);
    }
    return this.mapTexture;
  }

  public load(path: string, key?: string): PIXI.Texture {
    const texture = PIXI.Texture.fromImage(path);
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
