import 'reflect-metadata'

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
