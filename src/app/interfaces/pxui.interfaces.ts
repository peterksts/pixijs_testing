import * as PIXI from "pixi.js";
import {AnchorEnum, SettingsElement} from "../decorators/models";

export class PXElement extends PIXI.Container {

  private __pxComponents: Array<PXComponent>;
  private __pxElements: Array<PXElement>;
  private __pxSettings: SettingsElement;
  private __pxParamsMap: {[prop: string]: string};
  private __pxAnchor = {
    x: 0,
    y: 0,
    position: AnchorEnum.Top, // default
  };

  // set anchor(anchor: AnchorEnum) {
  // }
  //
  // get anchor(): AnchorEnum {
  //   return this.__pxAnchor.position;
  // }

  constructor(params?: {[key: string]: any}) {
    super();
    const obj = new PIXI.Container();
    (<any>Object).assign(this, obj);
    if (!this.__pxSettings.autoInitComponentsOff) {
      this.initComponents();
    }
    this.elementsToChildren();
    if (params) {
      this.__pxAddParams(params);
    }
  }

  private __pxAddParams(params: {[key: string]: any}): void {
    for (const field in this.__pxParamsMap) {
      if (params[field]) {
        this[this.__pxParamsMap[field]] = params[field];
      }
    }
  }

  private __pxComponentsUpdate(): void {
    this.__pxComponents.forEach(comp => {
      comp.pxOnUpdate();
    });
    this.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
  }

  public addComponent(comp: PXComponent): void {
    this.__pxComponents.push(comp);
  }

  public initComponents(): void {
    this.__pxComponents.forEach(comp => {
      (<any>comp).interference = this;
      comp.pxOnInit();
    });
  }

  public elementsToChildren(): void {
    this.__pxElements.forEach(elem => {
      this.addChild(elem);
    });
  }

}

export interface PXComponent extends PXInit, PXUpdate {
  readonly interference: PXElement;
}

export interface PXInit {
  pxOnInit(): void;
}

export interface PXUpdate {
  pxOnUpdate(): void;
}
