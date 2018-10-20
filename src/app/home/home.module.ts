import {Module} from '../decorators/decorators';
import {DashboardElement} from './page/dashboard.element';

@Module({
  element: {element: DashboardElement},
  provider: [
  ],
  sprite: {
    'branch': 'assets/sprite/branch.png'
  },
})
export class HomeModule {}
