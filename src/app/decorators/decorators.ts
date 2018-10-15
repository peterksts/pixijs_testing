import * as PIXI from 'pixi.js';
import {ComponentData, ElementData, PXUIData} from "./models";

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

export function Element(data: ElementData) {
  return function (target: any): any {
    const comp = [];
    if (data.components) {
      data.components.forEach(component => {
        const newComp = new (<any>component.component)();
        for (const field in newComp.prototype.__pxParamsMap) {
          if (component.params[field]) {
            newComp[newComp.prototype.__pxParamsMap[field]] = component.params[field];
          }
        }
        newComp.interference = target;
        comp.push(newComp);

        if (component.prop) {
          target.prototype[component.prop] = newComp;
        }
      });
    }

    target.prototype.__pxComponents = comp;
    return target;
  }
}

export function Component(data: ComponentData) {
  return function(target: any) {
    target.prototype.__pxParamsMap = data.params;
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

  APP.ticker.add((delta) => {
    APP.stage.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
  });

  return function(target: any): any {
    if (data.modules) {
      data.modules.forEach(module => {
        const newModule = new (<any>module.module)(module.params);
        show(newModule);

        if (module.prop) {
          target.prototype[module.prop] = newModule;
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
