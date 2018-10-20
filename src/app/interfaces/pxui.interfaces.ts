import * as PIXI from "pixi.js";
import {Subscription} from 'rxjs';
import {AnchorEnum, ComponentData, ElementData, EventTypes, SettingsElement} from "../decorators/models";
import {pushElOrComp, pushParams} from "../decorators/decorators";
import EventEmitter = PIXI.utils.EventEmitter;

export class PXElement extends PIXI.Container {

  private __pxEvents: Array<{event: EventTypes; fn: Function}> = [];
  private __pxProviders: {[key: string]: any};
  private __pxSubjects: Array<{path: string; fn: Function}> = [];
  private __pxSubscriptions: Array<Subscription> = [];
  private __pxComponentClasses: Array<ComponentData>;
  private __pxElementClasses: Array<ElementData>;
  private __pxSettings: SettingsElement;
  private __pxParamsMap: {[prop: string]: string};
  private __pxComponents: Array<PXComponent> = [];

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
      pushElOrComp(this, comp.prop, c);
    });

    this.__pxElementClasses.forEach( elem => {
      const e = this.addElement(elem.element, elem.params);
      pushElOrComp(this, elem.prop, e);
    });

    (<any>this).__proto__.__pxEvents && (<any>this).__proto__.__pxEvents.forEach(ev => {
      this.addListener(<any>ev.event, <any>ev.fn);
    });

    (<any>this).__proto__.__pxSubjects && (<any>this).__proto__.__pxSubjects.forEach(sub => {
      this.__pxAddSubject(sub);
    });
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
    comp = new comp();
    pushParams(outgoing || this, comp, params);
    comp.interference = this;
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

}

export interface PXComponent extends PXInit, PXUpdate, PXDestroy {
  readonly interference: PIXI.Container;
  pxActive: boolean;

  pxOnHide(): void;
  pxOnShow(): void;
}

export interface PXDestroy {
  pxOnDestroy(): void; // TODO: delete event
}

export interface PXInit {
  pxOnInit(): void;
}

export interface PXUpdate {
  pxOnUpdate(): void;
}

export class PXEventEmitter<T> {
  eventEmitter = new EventEmitter();

  emit(data: T) {
    this.eventEmitter.emit('all', data)
  }

  addListener(func?: Function, object?: any, param?: string) { // param: 'build()' | 'build'
    if (func) {
      this.eventEmitter.addListener('all', func);
    } else {
      if (param.slice(param.length - 2, param.length) === '()') {
        param = param.slice(0, param.length - 2);
        this.eventEmitter.addListener('all', object[param].bind(object));
      } else {
        this.eventEmitter.addListener('all', (d) => {
          object[param] = d;
        });
      }
    }
  }

}
