import * as PIXI from 'pixi.js'

export class LoaderService {

  public mapTexture: {[key: string]: PIXI.Texture} = {};

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

}
