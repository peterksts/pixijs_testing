import {PXUI} from "./decorators/decorators";
import {HomeModule} from './home/home.module';

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
    ],
})
export class PixiApp {}
