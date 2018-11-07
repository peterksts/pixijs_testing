declare let WorkerTools: TWorkerTools;
declare let EnvironmentVariable: {[key: string]: any};
declare let WorkerDependencies: {[key: string]: new () => any};
declare let WorkerDependenciesS: {[key: string]: string};

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
      (<any>window).WorkerDependencies = {};
      (<any>window).WorkerDependenciesS = {};
    }
  }

  public createWorker<P extends CustomWorker, R extends P & Worker>
    (model: new() => P, environmentVariable?: {[key: string]: any}, dependencies?: Array<new() => object>): R {
    // Build web-worker
    if (!this.blobUrl) { this.blobUrl = buildVirtualPage(); }
    const __up = EnvironmentVariable['__up__'] || 0;
    environmentVariable ?
      environmentVariable['__up__'] =  __up + 1 : environmentVariable = { '__up__': __up + 1 };

    const workerDependencies = dependencies ? buildMapDependencies(dependencies) : WorkerDependenciesS;

    const worker = new Worker(this.blobUrl);
    let anyClass: string = Object.create(model)['__proto__'].toString();
    const _this = this;

    const newModel = new model();
    newModel['__proto__']['__cache__promise__'] = {};
    newModel['__proto__']['__subject__blocking__'] = {};

    // fix problems with the package manager
    anyClass = anyClass.replace(new RegExp(
      `this\\.([a-zA-Z0-9_]+)\\s?=\\s?new\\s[a-zA-Z0-9_]+\\.Subject\\(\\)`, 'g'),
      `this.$1=new Subject(\'$1\', -1)`
    );
    anyClass = anyClass.replace(new RegExp(
      `this\\.([a-zA-Z0-9_]+)\\s?=\\s?new\\s[a-zA-Z0-9_]+\\.BehaviorSubject\\(`, 'g'),
      `this.$1=new BehaviorSubject(\'$1\', -1, `
    );

    // all Subject & BehaviorSubject
    const subjectFields = [];
    for (const field in newModel) {
      if (newModel[field] && (<any>newModel[field]).next && (<any>newModel[field]).asObservable) {
        subjectFields.push(field);

        anyClass = anyClass.replace(new RegExp(
          `this\\.${field}\\s?=\\s?new\\sSubject\\('${field}', -1\\)`),
          `this.${field}=new Subject(\'${field}\', ${environmentVariable['__up__']})`
        );
        anyClass = anyClass.replace(new RegExp(
          `this\\.${field}\\s?=\\s?new\\sBehaviorSubject\\('${field}', -1, `),
          `this.${field}=new BehaviorSubject(\'${field}\', ${environmentVariable['__up__']}, `
        );
      }
    }

    // initialization of your class in worker
    worker.postMessage({
      object: anyClass,
      environmentVariable,
      blobUrl: this.blobUrl,
      subjectFields,
      workerDependencies
    });

    // build promise cache
    worker.addEventListener('message', ({data}) => {
      if (!data) { return; }

      if (data['__msg__for__subject__'] && data['__field__name__']) {
        const sub = newModel[data['__field__name__']];
        if (!sub) { return; }

        const blocking = newModel['__proto__']['__subject__blocking__'];
        blocking[data['__field__name__']] = true;
        sub.next(data['__msg__']);
        return;
      }

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

    subjectFields.forEach(f => {
      newModel[f].asObservable().subscribe(d => {
        const blocking = newModel['__proto__']['__subject__blocking__'];
        !blocking[f] && worker.postMessage(
          {__field__name__: f, __msg__for__subject__: true, __msg__: d});
        blocking[f] = false;
      });
    });

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
  _wstr += _WSTR_subject;
  _wstr += `WorkerTools = new ${thisClass}();\n`;
  _wstr += _WSTR_part_functions;

  const blob = new Blob([_wstr]);
  return window.URL.createObjectURL(blob);
}

function buildMapDependencies(dep: Array<new() => object>): {[className: string]: string} {
  if (!dep || !dep.length) { return null; }

  const dependencies = {};
  dep.forEach(dep => {
    let anyClass = Object.create(dep)['__proto__'].toString();

    // fix problems with the package manager
    anyClass = anyClass.replace(new RegExp(
      `this\\.([a-zA-Z0-9_]+)\\s?=\\s?new\\s[a-zA-Z0-9_]+\\.Subject\\(\\)`, 'g'),
      `this.$1=new Subject(\'$1\', -1)`
    );
    anyClass = anyClass.replace(new RegExp(
      `this\\.([a-zA-Z0-9_]+)\\s?=\\s?new\\s?[a-zA-Z0-9_]+\\.BehaviorSubject\\(`, 'g'),
      `this.$1=new BehaviorSubject(\'$1\', -1, `
    );
    dependencies[dep.name] = anyClass;
  });

  return dependencies;
}

const _WSTR_part_default = `window = false;
let built = null;
let WorkerDependencies = {};
let WorkerDependenciesS = {};
EnvironmentVariable = {};
addEventListener("message", function (e) {
built ? massageToBuilt(e) : init(e.data);
});
`;

const _WSTR_subject = `
const Subject = class Subject {
  constructor(fieldName, up, v) {
    this.v = v;
    this._sub = [];
    this.fieldName = fieldName;
    this.up = up;
  }
  next(v, stop) {
    this._sub.forEach(sub => sub(v));
    if (!stop && EnvironmentVariable['__up__'] === this.up) {
      postMessage({__field__name__: this.fieldName, __msg__for__subject__: true, __msg__: v});
    }
    this.v = v;
  }
  asObservable() {
    return {
      subscribe: (call) => {
        this._sub.push(call);
        return {
          unsubscribe: () => {
            const i = this._sub.indexOf(s => s === call);
            i !== -1 && this._sub.splice(i, 1);
          }
        }
      }
    };
  }
  getValue() { return this.v; }
};

const BehaviorSubject = class BehaviorSubject {
  constructor(fieldName, up, v) {
    this.v = v;
    this._sub = [];
    this.fieldName = fieldName;
    this.up = up;
  }
  next(v, stop) {
    this._sub.forEach(sub => sub(v));
    if (!stop && EnvironmentVariable['__up__'] === this.up) {
      postMessage({__field__name__: this.fieldName, __msg__for__subject__: true, __msg__: v});
    }
    this.v = v;
  }
  asObservable() {
    return {
      subscribe: (call) => {
        this._sub.push(call);
        call(this.v);
        return {
          unsubscribe: () => {
            const i = this._sub.indexOf(s => s === call);
            i !== -1 && this._sub.splice(i, 1);
          }
        }
      }
    };
  }
  getValue() { return this.v; }
};
`;

const _WSTR_part_functions = `
function massageToBuilt(e) {
  const data = e.data;
  if (data['__msg__for__subject__'] && data['__field__name__']) {
    built[data['__field__name__']].next(data['__msg__'], true);
    return;
  }
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

function init({ object, environmentVariable, blobUrl, subjectFields, workerDependencies }) {
  EnvironmentVariable = environmentVariable;
  WorkerTools.blobUrl = blobUrl;
  WorkerDependenciesS = workerDependencies || WorkerDependenciesS;
  for (const field in WorkerDependenciesS) {
    WorkerDependencies[field] = eval(\`( \${WorkerDependenciesS[field]} )\`);
  }
  const anyClass = eval(\`( \${object} )\`);
  built = new anyClass();
}
`;

export const yourWebWorker = new YourWebWorker();
