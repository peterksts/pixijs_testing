import {Module} from '../../decorators/module.decorator';
import {DashboardElement} from './page/dashboard.element';
import {BranchService} from './services/branch.service';
import {ErrorInterceptor} from './services/error.interceptor';
import {LetRedirectRouterGuard} from './services/let-redirect.router-guard';

@Module({
  rootElement: DashboardElement,
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
    'branch': {imageUrl: 'assets/textures/branch.png'}, // or 'assets/textures/branch.png';
  },
  sound: {
    'wild_boar': {url: 'assets/sound/wild_boar.mp3', loop: true}, // or 'assets/sound/wild_boar.mp3';
  }
})
export class DashboardModule {}
