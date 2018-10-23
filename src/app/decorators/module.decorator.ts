import {ModuleMetadata} from '../interfaces/metadata.interface';
import {RouterService} from '../services/router.service';
import {HttpClient} from '../services/http-client.service';
import {SoundService} from '../services/sound.service';
import {TextureService} from '../services/texture.service';
import {MainService} from '../px';

export function Module(data: ModuleMetadata) {

  return function (target: any): any {

    // target
    target.prototype.__pxIsInit = false;
    target.prototype.__pxInitModule = function() {
      target.prototype.__pxIsInit = true;

      // Provider
      target.prototype['__pxProviders'] = {};
      target.prototype['__pxProviders'][RouterService.name] = MainService.routerService;
      target.prototype['__pxProviders'][HttpClient.name] = MainService.httpClient;
      SoundService.prototype['__pxProviders'] =  target.prototype['__pxProviders'];
      const soundService = new SoundService();
      target.prototype['__pxProviders'][SoundService.name] = soundService;
      TextureService.prototype['__pxProviders'] = target.prototype['__pxProviders'];
      const textureService = new TextureService();
      target.prototype['__pxProviders'][TextureService.name] = textureService;

      data.provider && data.provider.forEach(provider => {
        provider.prototype['__pxProviders'] = target.prototype['__pxProviders'];
        target.prototype['__pxProviders'][provider.name] = new (<any>provider)();
      });
      ////////////

      // interceptor
      data.interceptor && data.interceptor.forEach(interceptor => {
        interceptor.prototype['__pxProviders'] = target.prototype['__pxProviders'];
        const inter = new (<any>interceptor)();
        target.prototype['__pxProviders'][interceptor.name] = inter;
        MainService.httpClient.addInterceptorForModule(target.prototype.__pxRoute, inter.interceptor.bind(inter));
      });
      /////////////

      // router guard
      data.routerGuard && data.routerGuard.forEach(routerGuard => {
        routerGuard.prototype['__pxProviders'] = target.prototype['__pxProviders'];
        const guard = new (<any>routerGuard)();
        target.prototype['__pxProviders'][routerGuard.name] = guard;
        MainService.routerService.addGuard(target.prototype.__pxRoute, guard.routerGuard.bind(guard));
      });
      /////////////

      // Sprite
      data.textures && textureService.loadByConfig(data.textures);
      ////////////

      // Sound
      data.sound && soundService.loadByConfig(data.sound);
      ////////////

      // element
      if (typeof data.rootElement === 'object') {
        (<any>data.rootElement).element.prototype.__pxProviders = target.prototype['__pxProviders'];
        target.prototype['__pxElement'] = new (<any>data.rootElement.element)();
      } else {
        (<any>data.rootElement).prototype.__pxProviders = target.prototype['__pxProviders'];
        target.prototype['__pxElement'] = new (<any>data.rootElement)();
      }
      ////////////

    };
    ///////////

    // destroy
    target.prototype.__pxDestroyModule = function() {
    };
    //////////

    return target;
  }
}
