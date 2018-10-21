import {PXUI} from "./decorators/decorators";
import {HomeModule} from './home/home.module';
import {BuilderModule} from './builder/builder.module';

@PXUI({
  settings: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 0x1099bb,
  },
  modules: [
    {
        route: '/',
        module: HomeModule,
    },
    {
      route: '/builder',
      module: BuilderModule,
    },
  ],
})
export class PixiApp {}
