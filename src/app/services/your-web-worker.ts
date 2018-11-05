export interface CustomWorker {
  message: (data: EventData) => Promise<void>;
}

export type EventData = any;

export type TWorkerTools = {
  postMessage(data: EventData): void;
  createWorker<P extends CustomWorker, R extends P & Worker>
    (model: new() => P, environmentVariable?: {[key: string]: any}): R;
}

class YourWebWorker {

  private iterator = 0;
  public blobUrl: string;

  constructor() {
    if (window) {
      (<any>window).WorkerTools = {};
      (<any>window).EnvironmentVariable = {};
    }
  }

  public createWorker<P extends CustomWorker, R extends P & Worker>
    (model: new() => P, environmentVariable?: {[key: string]: any}): R {
    // Build web-worker
    if (!this.blobUrl) { this.blobUrl = buildVirtualPage(); }
    if (window) {
      environmentVariable ? environmentVariable['up_1'] = true : environmentVariable = {'up_1': true};
    }
    const worker = new Worker(this.blobUrl);
    let anyClass = Object.create(model)['__proto__'].toString();
    const _this = this;

    // initialization of your class in worker
    worker.postMessage({object: anyClass, environmentVariable, blobUrl: this.blobUrl});

    const newModel = new model();
    newModel['__proto__']['__cache__promise__'] = {};

    // build promise cache
    worker.addEventListener('message', ({data}) => {
      if (!data) { return; }
      const prom = newModel['__proto__']['__cache__promise__'][data.__id__worker];
      prom && prom.resolve(data.response);
      prom && delete newModel['__proto__']['__cache__promise__'][data.__id__worker];
    });

    // all class function in bridge: mainThread => Promise => thread => Promise => mainThread;
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
            worker.postMessage({__id__worker: id, __is__object__for__fn: true, request, functionName: field});
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

  private postMessage(data) {
    (<any>postMessage)(data);
  }

}

// Creating a virtual page with the code of the web-worker, return blobURL
function buildVirtualPage(): string {
  let thisClass = Object.create(YourWebWorker)['__proto__'].toString();

  let _wstr = _WSTR_part_default;
  _wstr += `WorkerTools = new ${thisClass}();\n`;
  _wstr += _WSTR_part_functions;

  const blob = new Blob([_wstr]);
  return window.URL.createObjectURL(blob);
}

const _WSTR_part_default = `window = false;
let built = null;
EnvironmentVariable = {};
addEventListener("message", function (e) {
built ? massageToBuilt(e) : init(e.data);
});
`;

const _WSTR_part_functions = `
function massageToBuilt(e) {
  const data = e.data;
  if (data['__is__object__for__fn']) {
    const response = built[data.functionName].apply(built, data.request);
    outMessage({response, __id__worker: data.__id__worker});
  } else {
    built.message && built.message(e.data);
  }
}

function outMessage({response, __id__worker}) {
  if (response instanceof Promise) {
     response.then(d => outMessage({response: d, __id__worker}));
  } else {
    postMessage({response, __id__worker});
  }
}

function init({ object, environmentVariable, blobUrl }) {
  EnvironmentVariable = environmentVariable;
  WorkerTools.blobUrl = blobUrl;
  const anyClass = eval(\`( \${object} )\`);
  built = new anyClass();
}
`;

export const yourWebWorker = new YourWebWorker();
