import {ComponentMetadata} from '../interfaces/metadata.interface';

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
