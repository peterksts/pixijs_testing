import * as PIXI from "pixi.js";
import {MainService, PX} from '../px';
import {PXUIMetadata} from '../interfaces/metadata.interface';
import {RouterService} from '../services/router.service';
import {HttpClient} from '../services/http-client.service';
import {RootElement} from '../modules/root/page/root.element';
import {RootModule} from '../modules/root/root.module';

export function PXUI(data: PXUIMetadata) {

  // PIXI.Application
  if (data.settings.height === 'auto') {
    data.settings.height = window.innerHeight;
    PX.Settings.heightAuto = true;
  }
  if (data.settings.width === 'auto') {
    data.settings.width = window.innerWidth;
    PX.Settings.widthAuto = true;
  }

  PX.APP = new PIXI.Application((<any>data.settings));
  document.body.appendChild(PX.APP.view);
  document.body.style.padding = '0';
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';

  PX.APP.ticker.add((delta) => {
    PX.APP.stage.children.forEach(child => {
      (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
    });
  });
  /////////////////////

  return function(target: any): any {

    target.prototype['__pxProviders'] = {};
    target.prototype['__pxProviders'][RouterService.name] = MainService.routerService;
    target.prototype['__pxProviders'][HttpClient.name] = MainService.httpClient;

    // interceptor
    data.interceptor && data.interceptor.forEach(interceptor => {
      interceptor.prototype['__pxProviders'] = target.prototype['__pxProviders'];
      const inter = new (<any>interceptor)();
      target.prototype['__pxProviders'][interceptor.name] = inter;
      MainService.httpClient.addInterceptor(inter.interceptor.bind(inter));
    });
    /////////////

    // router guard
    data.routerGuard && data.routerGuard.forEach(routerGuard => {
      routerGuard.prototype['__pxProviders'] = target.prototype['__pxProviders'];
      const guard = new (<any>routerGuard)();
      target.prototype['__pxProviders'][routerGuard.name] = guard;
      MainService.routerService.addGuard('all', guard.routerGuard.bind(guard));
    });
    /////////////

    if (data.page404) {
      MainService.mapModule['page404'] = data.page404;
      MainService.mapRouter['page404'] = new (<any>data.page404)();
    }

    if (data.root) {
      MainService.mapModule['root'] = data.root;
      const rootElement = new (<any>data.root)();
      rootElement.__pxInitModule();
      MainService.mapRouter['root'] = rootElement;
      PX.APP.stage.addChild(rootElement.__pxElement);
    }

    if (data.modules) {
      data.modules.forEach(module => {
        module.module.prototype.__pxRoute = module.route;
        MainService.mapModule[module.route] = module.module;
      });
    }

    MainService.routerService.changeRoute();

    new target();
    return target;
  };
}
