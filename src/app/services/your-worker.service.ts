export interface CustomWorker {
  message: (data: EventData) => Promise<void>;
}

export type EventData = any;

export type TWorkerTools = {
  postMessage(data: any): void;
  createWorker<P extends CustomWorker, R extends P & Worker>
  (model: new() => P, settings?: {[key: string]: any}): R;
  [key: string]: any;
}

export class YourWorkerService {

  private iterator = 0;

  constructor() {
  }

  public createWorker<P extends CustomWorker, R extends P & Worker>
  (model: new() => P, settings?: {[key: string]: any}): R {
    const worker = new Worker('assets/workers/your-code.worker.js');
    let anyClass = Object.create(model)['__proto__'].toString();
    worker.postMessage({object: anyClass, settings});
    const newModel = new model();
    newModel['__proto__']['__cache__promise__'] = {};
    worker.addEventListener('message', ({data}) => {
      if (!data) { return; }
      const prom = newModel['__proto__']['__cache__promise__'][data.id];
      prom && prom.resolve(data.response);
      delete newModel['__proto__']['__cache__promise__'][data.id];
    });
    const _this = this;
    for (const field in newModel) {
      if (typeof newModel[field] === 'function') {
        (<any>newModel[field]) = function () {
          return new Promise((resolve, reject) => {
            const id = _this.createID();
            newModel['__proto__']['__cache__promise__'][id] = {resolve, reject};
            const request = [];
            for (let letter of arguments) {
              request.push(letter);
            }
            worker.postMessage({id, __is__object__for__fn: true, request, functionName: field});
          });
        }
      }
    }
    const assignModel = this.merge(newModel, worker);
    return <R>assignModel;
  }

  private merge<P, R extends P & Worker>(model: P, worker: Worker): R {
    model['postMessage'] = worker['postMessage'].bind(worker);
    model['terminate'] = worker['terminate'].bind(worker);
    model['addEventListener'] = worker['addEventListener'].bind(worker);
    model['addEventListener'] = worker['addEventListener'].bind(worker);
    model['removeEventListener'] = worker['removeEventListener'].bind(worker);
    model['removeEventListener'] = worker['removeEventListener'].bind(worker);
    Object.defineProperty(model, 'onmessage', {
      set: (value) => {
        worker['onmessage'] = value;
      }
    });
    return <R>model;
  }

  private createID(): number {
    return this.iterator++;
  }

}
