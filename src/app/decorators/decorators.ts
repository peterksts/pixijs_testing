import * as PIXI from 'pixi.js';
import 'reflect-metadata'
import {ComponentMetadata, ElementMetadata, EventTypes, ModuleMetadata, PXUIMetadata} from './models';
import {LoaderService} from '../services/loader.service';
import {RouterService} from '../services/router.service';

let APP: PIXI.Application;
let routerService = new RouterService();
let mapModule = {};
let mapRouter = {};
(<any>routerService).mapModule = mapModule;
(<any>routerService).mapRouter = mapRouter;
let Settings = {
  heightAuto: false,
  widthAuto: false,
};

export function show(component: any): void {
  APP.stage.addChild(component);
}

export function hide(component: any): void {
  APP.stage.removeChild(component);
}

export function pushElOrComp(object, property, el) {
  if (property) {
    if (/\[]$/.test(property)) {
      const prop = property.slice(0, property.length - 2);
      if (Array.isArray(object[prop])) {
        object[prop].push(el);
      } else {
        object[prop] = [el];
      }
    } else {
      object[property] = el;
    }
  }
}

export function pushParams(outgoing, incoming, params) {
  params = params || {};
  for (const field in incoming.__pxParamsMap) {
    if (params[field]) {
      let d = params[field];
      if (d.includes && d.slice(0, 1) === '[' && d.slice(d.length - 1, d.length) === ']') { // '[prop]'
        d = d.slice(1, d.length - 1);
        Object.defineProperty(outgoing, d, {
          set: function(v) {
            outgoing['__pxParam' + d] = v;
            if (incoming[incoming.__pxParamsMap[field]] !== v) {
              incoming[incoming.__pxParamsMap[field]] = v;
            }
          },
          get: function() {
            return outgoing['__pxParam' + d];
          },
        });
      } else if (d.includes && d.slice(0, 1) === '(' && d.slice(d.length - 1, d.length) === ')') { // '(prop)' || '(prop())'
        d = d.slice(1, d.length - 1);
        incoming[incoming.__pxParamsMap[field]].addListener(null, outgoing, d);
      } else { // other
        incoming[incoming.__pxParamsMap[field]] = d;
      }
    }
  }
}

export function Inject() {
  return function (target: Object, propKey: string): any {
    const propType = Reflect.getMetadata("design:type", target, propKey);
    const descriptor = {
      get: function () {
        return (<any>target).__pxProviders[propType.name];
      }
    };
    Object.defineProperty(target, propKey, descriptor);
    return descriptor;
  }
}

export function HostSubscription(... subjectPaths: string[]) {
  return function (target: any, propKey: string) {
    if (!Array.isArray(target.__pxSubjects)) {
      target.__pxSubjects = [];
    }
    subjectPaths.forEach(path => {
      target.__pxSubjects.push({path: path, fn: target[propKey]});
    });
    return {};
  }
}

export function HostListener(... typeEvents: EventTypes[]) {
  return function (target: any, propKey: string) {
    if (!Array.isArray(target.__pxEvents)) {
      target.__pxEvents = [];
    }
    typeEvents.forEach(type => {
      target.__pxEvents.push({event: type, fn: target[propKey]});
    });
    return {};
  }
}

export function Module(data: ModuleMetadata) {

  return function (target: any): any {

    // Provider
    target.prototype['__pxProviders'] = {};
    LoaderService.prototype['__pxProviders'] = target.prototype['__pxProviders'];
    const loaderService = new LoaderService();
    target.prototype['__pxProviders'][LoaderService.name] = loaderService;
    target.prototype['__pxProviders'][RouterService.name] = routerService;

    data.provider && data.provider.forEach(provider => {
      provider.prototype['__pxProviders'] = target.prototype['__pxProviders'];
      target.prototype['__pxProviders'][provider.name] = new (<any>provider)();
    });
    ////////////

    // Sprite
    data.sprite && loaderService.loadByConfig(data.sprite);
    ////////////

    // element
    (<any>data.element).element.prototype.__pxProviders = target.prototype['__pxProviders'];
    target.prototype['__pxElement'] = new (<any>data.element.element)();
    ////////////

    return target;
  }
}

export function Element(data: ElementMetadata) {
  return function (target: any): any {

    // settings
    const settings = data.settings || {};
    ///////////

    // Components
    const comp = data.components || [];
    ////////////

    // Elements
    const elem = data.elements || [];
    ////////////

    // Target
    target.prototype.__pxParamsMap = data.params || {};
    if (!target.prototype.__pxParamsMap['anchor']) {
      target.prototype.__pxParamsMap['anchor'] = 'anchor';
    }
    target.prototype.__pxSettings = settings;
    /////////

    target.prototype.__pxComponentClasses = comp;
    target.prototype.__pxElementClasses = elem;
    return target;
  }
}

export function Component(data: ComponentMetadata) {
  return function(target: any) {
    target.prototype.__pxParamsMap = data.params || {};
    target.prototype.__pxActive = true;
    Object.defineProperty(target.prototype, 'pxActive', {
      set: function(v) {
        const isChange = this.__pxActive !== v;
        this.__pxActive = v;

        // Events:
        if (isChange) {
          if (this.__pxActive) {
            this.pxOnShow();
          } else {
            this.pxOnHide();
          }
        }
      },
      get: function() {
        return this.__pxActive;
      },
    });

    return target;
  };
}

export function PXUI(data: PXUIMetadata) {
  if (data.settings.height === 'auto') {
    data.settings.height = window.innerHeight;
    Settings.heightAuto = true;
  }
  if (data.settings.width === 'auto') {
    data.settings.width = window.innerWidth;
    Settings.widthAuto = true;
  }

  APP = new PIXI.Application((<any>data.settings));
  document.body.appendChild(APP.view);
  document.body.style.padding = '0';
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';

  APP.ticker.add((delta) => {
    APP.stage.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
  });

  return function(target: any): any {
    if (data.modules) {
      data.modules.forEach(module => {
        mapModule[module.route] = module.module;
      });
    }

    routerService.changeRoute();

    new target();
    return target;
  };
}

window.addEventListener('resize', () => {
  if (!APP || (!Settings.heightAuto && !Settings.widthAuto)) { return; }

  let height = APP.renderer.height;
  let width = APP.renderer.width;
  if (Settings.heightAuto) { height = window.innerHeight; }
  if (Settings.widthAuto) { width = window.innerWidth; }
  APP.renderer.resize(width, height);
});

function changeRoute() {
}




// class GlobalService {
//   private services: Array<{interfaceType: Function, instance: Object}> | any = [] as any;
//
//   public getService(interfaceType: Function): any {
//     return this.services.find((x: any) => x.interfaceType == interfaceType).instance;
//   }
//
//   public registerService(interfaceType: Function, instance: Object): void {
//     this.services.push({ interfaceType: interfaceType, instance: instance});
//   }
//
//   public initService(): void {
//     this.services.forEach((ser: any) => {
//       ser.instance.onInit && ser.instance.onInit();
//     });
//   }
// }
//
// const globalService = new GlobalService();
//
// export function Module(data: ModuleData) {
//   if (data.provider) {
//     data.provider.forEach(ser => {
//       globalService.registerService(ser, new ser());
//     });
//     globalService.initService();
//   }
//
//   return function (target: any): any {
//     new target();
//     return target;
//   }
// }
//

