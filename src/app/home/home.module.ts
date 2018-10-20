import {Module} from '../decorators/decorators';
import {DashboardElement} from './page/dashboard.element';
import {BranchService} from './services/branch.service';

@Module({
  element: {element: DashboardElement},
  provider: [
    BranchService,
  ],
  sprite: {
    'branch': 'assets/sprite/branch.png'
  },
})
export class HomeModule {}
