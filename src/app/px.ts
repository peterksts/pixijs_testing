import * as PIXI from "pixi.js";
import {RouterService} from './services/router.service';
import {HttpClient} from './services/http-client.service';
import {RouterElement} from './elements/router/router.element';

class px {

  public routerElement: RouterElement;
  public APP: PIXI.Application;
  public Settings = {
    heightAuto: false,
    widthAuto: false,
  };

  constructor() {
  }

  public show(component: any): void {
    this.routerElement && this.routerElement.addChild(component);
  }

  public hide(component: any): void {
    this.routerElement && this.routerElement.removeChild(component);
  }

}

class mainService {

  public routerService = new RouterService();
  public httpClient = new HttpClient();
  public mapModule;
  public mapRouter;

  constructor() {
    this.mapModule = this.routerService.mapModule;
    this.mapRouter = this.routerService.mapRouter;
  }

}

export const PX = new px();
export const MainService = new mainService();

window.addEventListener('resize', () => {
  if (!PX.APP || (!PX.Settings.heightAuto && !PX.Settings.widthAuto)) { return; }

  let height = PX.APP.renderer.height;
  let width = PX.APP.renderer.width;
  if (PX.Settings.heightAuto) { height = window.innerHeight; }
  if (PX.Settings.widthAuto) { width = window.innerWidth; }
  PX.APP.renderer.resize(width, height);
});
