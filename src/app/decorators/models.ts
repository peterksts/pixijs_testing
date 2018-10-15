import ApplicationOptions = PIXI.ApplicationOptions;

export interface ModuleData {
  components?: {
    component: Function,
    params?: {[key: string]: any},
    prop?: string,
  }[];
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
    module: Function,
    params?: {[key: string]: any},
    prop?: string,
  }[];
}

export interface OnInit {
  onInit(): void;
}
