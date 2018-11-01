import {Module} from '../../decorators/module.decorator';
import {RootElement} from './page/root.element';

@Module({
  rootElement: RootElement,
})
export class RootModule {}
