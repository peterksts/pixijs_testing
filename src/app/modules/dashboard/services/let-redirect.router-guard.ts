import {RouterGuard} from '../../../interfaces/router-guard.interface';

export class LetRedirectRouterGuard implements RouterGuard {

  routerGuard(oldPath: string, newPath: string): Promise<boolean> | boolean {
    return true;
  }

}
