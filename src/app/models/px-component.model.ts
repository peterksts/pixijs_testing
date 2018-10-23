import * as PIXI from "pixi.js";
import {SettingsElement} from '../interfaces/metadata.interface';
import {Subscription} from 'rxjs';
import {EventTypes} from '../types/event-types.type';

export class PXComponent {

  readonly interference: PIXI.Container;
  pxActive: boolean;

  private __pxEvents: Array<{event: EventTypes; fn: Function}>;
  private __pxProviders: {[key: string]: any};
  private __pxSubjects: Array<{path: string; fn: Function}>;
  private __pxSubscriptions: Array<Subscription> = [];
  private __pxSettings: SettingsElement;
  private __pxParamsMap: {[prop: string]: string};

  constructor() {
    (<any>this).__proto__.__pxEvents && (<any>this).__proto__.__pxEvents.forEach(ev => {
      this.interference.addListener(<any>ev.event, <any>ev.fn.bind(this));
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

}
