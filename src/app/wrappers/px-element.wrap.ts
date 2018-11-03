import * as PIXI from "pixi.js";
import {EventTypes} from '../types/event-types.type';
import {Subscription} from 'rxjs';
import {ComponentData, ElementData, SettingsElement} from '../interfaces/metadata.interface';
import {PXComponent} from '../models/px-component.model';
import {AnchorEnum} from '../enums/anchor.enum';
import {pushTarget} from '../tools/push-target.tool';
import {pushParams} from '../tools/push-params.tool';

export class PXElement extends PIXI.Container {

  private __pxEvents: Array<{event: EventTypes; fn: Function}> = [];
  private __pxProviders: {[key: string]: any};
  private __pxSubjects: Array<{path: string; fn: Function}> = [];
  private __pxSubscriptions: Array<Subscription> = [];
  private __pxComponentClasses: Array<ComponentData>;
  private __pxElementClasses: Array<ElementData>;
  private __pxSettings: SettingsElement;
  private __pxParamsMap: {[prop: string]: string};
  private __pxComponents: Array<PXComponent | any> = [];

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

  constructor() {
    super();
    const obj = new PIXI.Container();
    (<any>Object).assign(this, obj);

    this.__pxComponentClasses.forEach( comp => {
      const c = this.addComponent(comp.component, comp.params);
      pushTarget(this, comp.prop, c);
    });
    delete this.__pxComponentClasses;

    this.__pxElementClasses.forEach( elem => {
      const e = this.addElement(elem.element, elem.params);
      pushTarget(this, elem.prop, e);
    });
    delete this.__pxElementClasses;

    (<any>this).__proto__.__pxEvents && (<any>this).__proto__.__pxEvents.forEach(ev => {
      this.addListener(<any>ev.event, <any>ev.fn);
    });
    delete (<any>this).__proto__.__pxEvents;

    (<any>this).__proto__.__pxSubjects && (<any>this).__proto__.__pxSubjects.forEach(sub => {
      this.__pxAddSubject(sub);
    });
    delete (<any>this).__proto__.__pxSubjects;
  }

  private __pxAddSubject(sub: {path: string; fn: Function}) {
    const path = sub.path.split('.');
    let obj = this[path[0]];
    for (let i = 1; i < path.length; i++) {
      obj = obj[path[i]];
      if (i === path.length - 1) { // end path
        this.__pxSubscriptions.push(obj.asObservable().subscribe(sub.fn.bind(this)));
        break;
      }
    }
  }

  private __pxComponentsUpdate(): void {
    this.__pxComponents.forEach(comp => {
      comp.pxActive && comp.pxOnUpdate();
    });
    this.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
  }

  public addComponent(comp: PXComponent | any, params?: {[key: string]: any}, outgoing?: PXElement | any): any {
    comp.prototype.__pxProviders = (<any>this).__proto__.__pxProviders;
    comp.prototype.interference = this;
    comp = new comp();
    pushParams(outgoing || this, comp, params);
    comp.pxOnInit();
    this.__pxComponents.push(comp);
    return comp;
  }

  public addElement(elem: PXElement | any, params?: {[key: string]: any}, outgoing?: PXElement | any): any {
    elem.prototype.__pxProviders = (<any>this).__proto__.__pxProviders;
    elem = new elem();
    pushParams(outgoing || this, elem, params);
    elem.pxOnInit && elem.pxOnInit();
    this.addChild(elem);
    return elem;
  }

  public removeElement(elem: PXElement | any): any {
    elem.pxOnDelete && elem.pxOnDelete();
    this.removeChild(elem);
  }

}
