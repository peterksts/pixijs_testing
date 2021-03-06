import ApplicationOptions = PIXI.ApplicationOptions;
import {LoadTextureType} from '../types/load-texture.type';
import {LoadSoundType} from '../types/load-sound.type';

export interface ComponentData {
  component: Function,
  params?: {[key: string]: any},
  prop?: string,
}

export interface ModuleData {
  route?: string,
  module: Function,
  params?: {[key: string]: any},
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
  page404: Function;
  root: Function;
  modules?: ModuleData[];
  interceptor?: Function[];
  routerGuard?: Function[];
}
