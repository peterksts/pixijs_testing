import * as PIXI from "pixi.js";

export class PXModule extends PIXI.Sprite {

  private __pxComponents: Array<PXComponent>;

  constructor() {
    super();
    const obj = new PIXI.Sprite();
    (<any>Object).assign(this, obj);
    this.__pxComponents.forEach( comp => {
      this.addChild(comp);
      comp.pxOnInit();
    });
  }

  private __pxComponentsUpdate(): void {
    this.__pxComponents.forEach(module => {
      module.pxOnUpdate();
    });
    this.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
    (<any>this).pxOnUpdate && (<any>this).pxOnUpdate();
  }

  public addComponent(comp: PXComponent): void {
    this.__pxComponents.push(comp);
  }

  public initComponents(): void {
    this.__pxComponents.forEach(module => {
      module.pxOnInit();
    });
  }

}

export interface PXInit {
  pxOnInit(): void;
}

export interface PXUpdate {
  pxOnUpdate(): void;
}

export class PXComponent extends PIXI.Sprite {

  private __pxParamsMap: any;

  constructor() {
    super();
    const obj = new PIXI.Sprite();
    (<any>Object).assign(this, obj);
  }

  private __pxAddParams(params: any): void {
    if (!this.__pxParamsMap || !params) { return; }

    for (const field in this.__pxParamsMap) {
      if (params[field]) {
        this[this.__pxParamsMap[field]] = params[field];
      }
    }
  }

  pxOnInit(): void {
  };

  pxOnUpdate(): void {
  };

}
