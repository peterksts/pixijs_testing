import {Module} from '../decorators/decorators';
import {BuilderElement} from './page/builder.element';

@Module({
  element: {element: BuilderElement},
  provider: [
  ],
  sprite: {
    'smoke': 'assets/sprite/smoke.png'
  },
})
export class BuilderModule {}
