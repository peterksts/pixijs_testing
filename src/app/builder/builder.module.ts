import {Module} from '../decorators/decorators';
import {BuilderElement} from './page/builder.element';

@Module({
  rootElement: {element: BuilderElement},
  provider: [
  ],
  textures: {
    'smoke': 'assets/textures/smoke.png'
  },
})
export class BuilderModule {}
