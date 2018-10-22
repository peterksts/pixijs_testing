import {Module} from '../decorators/decorators';
import {DashboardElement} from './page/dashboard.element';
import {BranchService} from './services/branch.service';
import {ErrorInterceptor} from './services/error.interceptor';
import {LetRedirectRouterGuard} from './services/let-redirect.router-guard';

@Module({
  rootElement: {element: DashboardElement},
  provider: [
    BranchService,
  ],
  interceptor: [
    ErrorInterceptor,
  ],
  routerGuard: [
    LetRedirectRouterGuard,
  ],
  textures: {
    'branch': 'assets/textures/branch.png'
  },
})
export class DashboardModule {}
