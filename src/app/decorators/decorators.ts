import * as PIXI from 'pixi.js';
import {ComponentData, ElementMetadata, EventTypes, PXUIData} from "./models";
import InteractionEventTypes = PIXI.interaction.InteractionEventTypes;

let APP: PIXI.Application;
let Settings = {
  heightAuto: false,
  widthAuto: false,
};

function show(component: any): void {
  APP.stage.addChild(component);
}

function hide(component: any): void {
  APP.stage.removeChild(component);
}

function pushElOrComp(target, property, el) {
  if (property) {
    if (/\[]$/.test(property)) {
      const prop = property.slice(0, property.length - 2);
      if (Array.isArray(target.prototype[prop])) {
        target.prototype[prop].push(el);
      } else {
        target.prototype[prop] = [el];
      }
    } else {
      target.prototype[property] = el;
    }
  }
}

export function HostListener(typeEvent: EventTypes): any {
  return function (target: any, propKey: string) {
    // console.log(target.on);
    // setTimeout(() => {
    //   target.on(typeEvent, target[propKey]);
    // }, 100);
    return {};
  }
}

export function Element(data: ElementMetadata) {
  return function (target: any): any {

    // settings
    const settings = data.settings || {};
    ///////////

    // Components
    const comp = [];
    if (data.components) {
      data.components.forEach(component => {
        const newComp = new (<any>component.component)();
        component.params = component.params || {};
        for (const field in newComp.__pxParamsMap) {
          if (component.params[field]) {
            newComp[newComp.__pxParamsMap[field]] = component.params[field];
          }
        }
        comp.push(newComp);
        pushElOrComp(target, component.prop, newComp);
      });
    }
    ////////////

    // Elements
    const elem = [];
    if (data.elements) {
      data.elements.forEach(element => {
        element.params = element.params || {};
        const newElem = new (<any>element.element)();
        for (const field in newElem.__pxParamsMap) {
          if (element.params[field]) {
            newElem[newElem.__pxParamsMap[field]] = element.params[field];
          }
        }
        elem.push(newElem);
        if (!settings.autoInitElementsOff) {
          newElem.pxOnInit && newElem.pxOnInit();
        }
        pushElOrComp(target, element.prop, newElem);
      });
    }
    ////////////

    // Target
    target.prototype.__pxParamsMap = data.params || {};
    if (!target.prototype.__pxParamsMap['anchor']) {
      target.prototype.__pxParamsMap['anchor'] = 'anchor';
    }
    target.prototype.__pxSettings = settings;
    /////////

    target.prototype.__pxComponents = comp;
    target.prototype.__pxElements = elem;
    return target;
  }
}

export function Component(data: ComponentData) {
  return function(target: any) {
    target.prototype.__pxParamsMap = data.params || {};
    return target;
  };
}

export function PXUI(data: PXUIData) {
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
        const newElem = new (<any>module.module)();
        show(newElem);
        newElem.pxOnInit && newElem.pxOnInit();

        if (module.prop) {
          target.prototype[module.prop] = newElem;
        }
      });
    }

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
// export function Inject() {
//   return function (target: Object, propKey: string): any {
//     const propType = Reflect.getMetadata("design:type", target, propKey);
//     const descriptor = {
//       get: function () {
//         return globalService.getService(propType);
//       },
//       set: function () {
//       },
//     };
//     Object.defineProperty(target, propKey, descriptor);
//     return descriptor;
//   }
// }
