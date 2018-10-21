import {hide, show} from '../decorators/decorators';
import {CommandData} from '../models/router.model';

export class RouterService {

  readonly mapModule = {};
  readonly mapRouter = {};
  private _route = document.location.pathname;
  private _queryParams = this.getQueryParams();
  private _guards: {path: string, fn: () => boolean}[] = [];
  private is404 = false;

  get route(): string { return this._route; }
  get queryParams(): {[param: string]: string} { return this._queryParams; }

  constructor() {
    window.onpopstate = this.changeRoute.bind(this);
  }

  public command(path: string, data?: CommandData): boolean {
    if (!this.checkGuard()) {
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

    history.pushState(null, '', path);
    this.changeRoute();
    return true;
  }

  public addGuard(path: string, fn: () => boolean) {
    this._guards.push({path: path, fn: fn});
  }

  public changeRoute(event?): void {
    let oldModule;
    if (this.is404) {
      oldModule = this.mapRouter['/404'];
    } else {
      oldModule = this.mapRouter[this._route];
    }
    if (oldModule) {
      hide(oldModule.__pxElement);
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
        module.__pxElement.pxOnInit && module.__pxElement.pxOnInit();
      }
    }
    show(module.__pxElement);
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

  private checkGuard(): boolean {
    for (let i = 0; i < this._guards.length; i++) {
      const guard = this._guards[i];
      if (guard.path === this._route && !guard.fn()) {
        return false;
      }
    }

    return true;
  }

  private page404(): void {
    let module = this.mapRouter['/404'];
    if (!module) {
      module = this.mapModule['/404']();
      this.mapRouter['/404'] = module;
    }
    show(module.__pxElement);
    this.is404 = true;
  }

}
