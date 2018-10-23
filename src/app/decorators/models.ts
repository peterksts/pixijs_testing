import ApplicationOptions = PIXI.ApplicationOptions;
import InteractionEventTypes = PIXI.interaction.InteractionEventTypes;
import {LoadTextureType} from '../models/load-texture.model';
import {LoadSoundType} from '../models/load-sound.type';

export interface ComponentData {
  component: Function,
  params?: {[key: string]: any},
  prop?: string,
}

export interface ElementData {
  element: Function,
  params?: {[key: string]: any},
  prop?: string,
}

export interface SettingsElement {
}

export interface ElementMetadata {
  components?: ComponentData[];
  elements?: ElementData[];
  params?: {[key: string]: string},
  settings?: SettingsElement,
}

export interface ComponentMetadata {
  params?: {[key: string]: any}
}

export interface ModuleMetadata {
  rootElement: ElementData | Function;
  provider?: Function[];
  interceptor?: Function[];
  routerGuard?: Function[];
  textures?: {[key: string]: LoadTextureType};
  sound?: {[key: string]: LoadSoundType};
}

export interface PXUIMetadata {
  settings?: ApplicationOptions | {
    width?: number | 'auto',
    height?: number | 'auto',
    options?: ApplicationOptions,
    noWebGL?: boolean,
    sharedTicker?: boolean,
    sharedLoader?: boolean
  }
  modules?: {
    route: string,
    module: Function,
    params?: {[key: string]: any},
  }[];
  interceptor?: Function[];
  routerGuard?: Function[];
}

export enum AnchorEnum {
  Top,
}

export type EventTypes = InteractionEventTypes | 'scroll';
