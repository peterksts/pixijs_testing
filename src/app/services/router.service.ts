import {PX} from '../px';
import {CommandData} from '../models/router.model';

type GuardType = (oldPath: string, newPath: string) => Promise<boolean> | boolean;

export class RouterService {

  readonly mapModule = {};
  readonly mapRouter = {};
  private _route = document.location.pathname;
  private _queryParams = this.getQueryParams();
  private _guards: {path: string, fn: GuardType}[] = [];
  private is404 = false;

  get route(): string { return this._route; }
  get queryParams(): {[param: string]: string} { return this._queryParams; }

  constructor() {
    window.onpopstate = this.changeRoute.bind(this);
  }

  public command(path: string, data?: CommandData): Promise<boolean> {
    return Promise.all(this.checkGuard(this._route, path)).then(check => {
      if (check.find(s => s === false) === false) {
        return false;
      }

      if (data) {
        if (data.queryParams) {
          path += '?';
          for (const field in data.queryParams) {
            path += field + '=' + data.queryParams[field];
          }
        }
      }

      const pR = this._route;
      history.pushState(null, '', path);
      this.changeRoute(null, true);
      return true;
    });
  }

  public addGuard(path: string, fn: GuardType) {
    this._guards.push({path: path, fn: fn});
  }

  public changeRoute(event?, checkGuard?: boolean): void {
    let promises: Promise<boolean>[] = [];
    if (!checkGuard) {
      promises = this.checkGuard(this._route, document.location.pathname);
    }

    Promise.all(promises).then(check => {
      if (check.find(s => s === false) === false) {
        return;
      }

      let oldModule;
      if (this.is404) {
        oldModule = this.mapRouter['page404'];
      } else {
        oldModule = this.mapRouter[this._route];
      }
      if (oldModule) {
        PX.hide(oldModule.__pxElement);
      }
      this.is404 = false;

      this._route = document.location.pathname;
      this._queryParams = this.getQueryParams();

      let module = this.mapRouter[this._route];
      if (!module) {
        if (!this.mapModule[this._route]) {
          this.page404();
          return;
        } else {
          module = new this.mapModule[this._route]();
          this.mapRouter[this._route] = module;
          !module.__pxIsInit && module.__pxInitModule();
          module.__pxElement.pxOnInit && module.__pxElement.pxOnInit();
        }
      }
      PX.show(module.__pxElement);
    });
  }

  private getQueryParams(): {[key: string]: string} {
    const queryParams = {};
    let search = document.location.search;
    search = search.slice(1, search.length);
    const params = search.split('&');
    params.forEach(param => {
      const p = param.split('=');
      queryParams[p[0]] = p[1];
    });

    return queryParams;
  }

  private checkGuard(oldPath: string, newPath: string): Promise<boolean>[] {
    const promises: Promise<boolean>[] = [];
    for (let i = 0; i < this._guards.length; i++) {
      const guard = this._guards[i];
      if (guard.path === this._route || guard.path === 'all') {
        let res = guard.fn(oldPath, newPath);
        if (res === true || res === false) {
          (<any>res) = Promise.resolve(res);
        }
        promises.push(<Promise<boolean>>res)
      }
    }

    return promises;
  }

  private page404(): void {
    let module = this.mapRouter['page404'];
    if (!module) {
      module = new this.mapModule['page404']();
      this.mapRouter['page404'] = module;
    }
    if (!module.__pxIsInit) {
      module.__pxInitModule();
      module.__pxElement.pxOnInit && module.__pxElement.pxOnInit();
    }
    PX.show(module.__pxElement);
    this.is404 = true;
  }

}
