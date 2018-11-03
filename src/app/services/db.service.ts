export enum TypeEvent {
  Create = 'create',
  Put = 'put',
  Delete = 'delete',
  Get = 'get',
  Init = 'init',
  Save = 'save',
  Load = 'load',
  Response = 'response',
}

export class DBService {

  private dbWorker = new Worker('assets/workers/db.worker.js');
  private loadCache: {[key: number]: {resolve, reject}} = {};
  private iterator = 0;

  constructor() {
    this.dbWorker.addEventListener('message', ({data}) => {
      switch (data.typeEvent) {
        case TypeEvent.Response: {
          const client = this.loadCache[data.id];
          client && client.resolve(data.data);
          break;
        }
        case TypeEvent.Load: {
          this.dbWorker.postMessage(
            {json: localStorage.getItem(data.nameDB), typeEvent: TypeEvent.Load});
          break;
        }
        case TypeEvent.Save: {
          localStorage.setItem(data.nameDB, data.json);
          break;
        }
      }
    });

    // window.onunload = () => {
    //   save(true);
    //   loadWorker.terminate();
    //   close();
    // };
  }

  public sd() {}

  public init(nameDB: string): DBService {
    this.dbWorker.postMessage({nameDB, typeEvent: TypeEvent.Init});
    return this;
  }

  public get<T>(path: string, keys: string, params: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.createID();
      this.loadCache[id] = {resolve, reject};
      this.dbWorker.postMessage({path, keys, params, id, typeEvent: TypeEvent.Get});
    });
  }

  public put(path: string, keys: string, data: any): DBService {
    this.dbWorker.postMessage({path, keys, data, typeEvent: TypeEvent.Put});
    return this;
  }

  public delete(path: string, keys: string, data: any): DBService {
    this.dbWorker.postMessage({path, keys, data, typeEvent: TypeEvent.Delete});
    return this;
  }

  public create(path: string): DBService {
    this.dbWorker.postMessage({path, typeEvent: TypeEvent.Create});
    return this;
  }

  private createID(): number {
    return this.iterator++;
  }

}
