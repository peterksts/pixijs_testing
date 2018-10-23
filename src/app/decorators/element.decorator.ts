import {ElementMetadata} from '../interfaces/metadata.interface';

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
