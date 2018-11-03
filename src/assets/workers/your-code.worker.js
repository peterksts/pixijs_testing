addEventListener("message", function (e) {
  built ? massageToBuilt(e) : build(e.data);
});

function massageToBuilt(e) {
  const data = e.data;
  if (data['__is__object__for__fn']) {
    const response = built[data.functionName].apply(built, data.request);
    outMessage({response, id: data.id});
  } else {
    built.message && built.message(e.data);
  }
}

function outMessage({response, id}) {
  if (typeof response.then === 'function') {
     response.then(d => outMessage({response: d, id}));
  } else {
    postMessage({response, id: id});
  }
}

function build({object, settings}) {
  for (let field in settings) {
    WorkerTools[field] = settings[field];
  }
  const anyClass = eval(`( ${object} )`);
  built = new anyClass();
}

let built = null;

WorkerTools = {
  iterator: 0,

  createWorker(model, settings) {
    const worker = new Worker('your-code.worker.js');
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
        newModel[field] = function () {
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
    return assignModel;
  },

  merge(model, worker) {
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
    return model;
  },

  createID() {
    return this.iterator++;
  },

  postMessage(data) {
    postMessage(data);
  }
};
