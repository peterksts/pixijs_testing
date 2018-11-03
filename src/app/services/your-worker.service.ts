export interface CustomWorker {
  message(data: EventData): void;
}

export interface CustomWorkerInput {
  message(e: EventData): Promise<void>;
  [key: string]: (args?, args2?, args3?, args4?) => Promise<any>;
}

export type EventData = any;

export class YourWorkerService {

  private iterator = 0;

  constructor() {
  }

  public createWorker<Function extends new() => P,
    P extends CustomWorker, R extends CustomWorkerInput & P & Worker>(model: Function): R {
    const worker = new Worker('assets/workers/your-code.worker.js');
    let anyClass = Object.create(model)['__proto__'].toString();
    worker.postMessage({object: anyClass});
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

  private merge<P extends CustomWorker, R extends CustomWorkerInput & P & Worker>(model: P, worker: Worker): R {
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
