import * as PIXI from "pixi-sound";
import {LoadSoundType} from '../models/load-sound.type';

export class SoundService {

  readonly mapSound: {[key: string]: PIXI.Sound} = {};

  constructor() {
  }

  public loadByConfig(data: {[key: string]: LoadSoundType}): {[key: string]: PIXI.Sound} {
    for (const field in data) {
      this.mapSound[field] = PIXI.Sound.from(data[field]);
    }
    return this.mapSound;
  }

  public load(data: LoadSoundType, key?: string): PIXI.Sound {
    const sound = PIXI.Sound.from(data);
    if (key) {
      this.mapSound[key] = sound;
    }
    return sound;
  }

  public getSound(key: string): PIXI.Sound {
    const sound = this.mapSound[key];
    if (!sound) {
      console.error(`Not found: '${key}' sound`);
    }
    return sound;
  }

}
