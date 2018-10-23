import {Module} from '../../decorators/module.decorator';
import {Page404Element} from './page/page404.element';

@Module({
  rootElement: {element: Page404Element},
})
export class DefaultPage404Module {}
