import {Module} from '../../decorators/module.decorator';
import {BranchService} from '../dashboard/services/branch.service';
import {TestElement} from './page/test.element';

@Module({
  rootElement: {element: TestElement},
  provider: [
    BranchService,
  ],
  textures: {
    'branch': {imageUrl: 'assets/textures/branch.png'},
  },
})
export class TestModule {}
