import * as PIXI from "pixi.js";
import {AnchorEnum} from "../decorators/models";

export class PXElement extends PIXI.Container {

  private __pxComponents: Array<PXComponent>;
  private __pxAnchor = {
    x: 0,
    y: 0,
    position: AnchorEnum.Top, // default
  };

  set anchor(anchor: AnchorEnum) {
  }

  get anchor(): AnchorEnum {
    return this.__pxAnchor.position;
  }

  constructor() {
    super();
    const obj = new PIXI.Container();
    (<any>Object).assign(this, obj);
  }

  private __pxComponentsUpdate(): void {
    this.__pxComponents.forEach(comp => {
      comp.pxOnUpdate();
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
    this.__pxComponents.forEach(comp => {
      comp.pxOnInit();
    });
  }

}

export interface PXComponent {

  readonly interference: PXElement;

  pxOnInit(): void;

  pxOnUpdate(): void;

}
