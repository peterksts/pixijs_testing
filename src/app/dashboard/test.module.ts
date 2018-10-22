import {Module} from '../decorators/decorators';
import {BranchService} from './services/branch.service';
import {TestElement} from './page/test.element';

@Module({
  rootElement: {element: TestElement},
  provider: [
    BranchService,
  ],
  textures: {
    'branch': 'assets/textures/branch.png'
  },
})
export class TestModule {}