import ApplicationOptions = PIXI.ApplicationOptions;
import InteractionEventTypes = PIXI.interaction.InteractionEventTypes;

export interface SettingsElement {
  autoInitComponentsOff?: boolean;
  autoInitElementsOff?: boolean;
}

export interface ElementMetadata {
  components?: {
    component: Function,
    params?: {[key: string]: any},
    prop?: string,
  }[];
  elements?: {
    element: Function,
    params?: {[key: string]: any},
    prop?: string,
  }[];
  params?: {[key: string]: string},
  settings?: SettingsElement,
}

export interface ComponentData {
  params?: {[key: string]: any}
}

export interface PXUIData {
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
    params: {[key: string]: any},
    prop?: string,
  }[];
}

export enum AnchorEnum {
  Top,
}

export type EventTypes = InteractionEventTypes | 'scroll';
