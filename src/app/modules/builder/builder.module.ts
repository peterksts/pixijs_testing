import {BuilderElement} from './page/builder.element';
import {Module} from '../../decorators/module.decorator';

@Module({
  rootElement: {element: BuilderElement},
  provider: [
  ],
  textures: {
    'smoke': 'assets/textures/smoke.png'
  },
})
export class BuilderModule {}
