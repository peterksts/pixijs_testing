import {Module} from '../decorators/decorators';
import {DashboardElement} from './page/dashboard.element';
import {BranchService} from './services/branch.service';

@Module({
  rootElement: {element: DashboardElement},
  provider: [
    BranchService,
  ],
  textures: {
    'branch': 'assets/textures/branch.png'
  },
})
export class DashboardModule {}
