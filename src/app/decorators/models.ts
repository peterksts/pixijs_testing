import ApplicationOptions = PIXI.ApplicationOptions;
import InteractionEventTypes = PIXI.interaction.InteractionEventTypes;

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
  rootElement: ElementData;
  provider?: Function[];
  textures?: {[key: string]: string}; // Example: LogoTexture: 'assets/logo.svg'
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
}

export enum AnchorEnum {
  Top,
}

export type EventTypes = InteractionEventTypes | 'scroll';
