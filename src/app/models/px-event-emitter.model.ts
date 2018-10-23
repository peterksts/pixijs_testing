import EventEmitter = PIXI.utils.EventEmitter;

export class PXEventEmitter<T> {

  eventEmitter = new EventEmitter();

  emit(data: T) {
    this.eventEmitter.emit('all', data)
  }

  addListener(func?: (data: T) => void, object?: any, param?: string) { // param: 'build()' | 'build'
    if (func) {
      this.eventEmitter.addListener('all', func);
    } else {
      if (param.slice(param.length - 2, param.length) === '()') {
        param = param.slice(0, param.length - 2);
        this.eventEmitter.addListener('all', object[param].bind(object));
      } else {
        this.eventEmitter.addListener('all', (d) => {
          object[param] = d;
        });
      }
    }
  }

}
