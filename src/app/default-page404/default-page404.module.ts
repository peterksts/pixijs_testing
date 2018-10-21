import {Module} from '../decorators/decorators';
import {Page404Element} from './page/page404.element';

@Module({
  rootElement: {element: Page404Element},
})
export class DefaultPage404Module {}
