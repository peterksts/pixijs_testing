import {PXUI} from "./decorators/decorators";
import {DashboardModule} from './dashboard/dashboard.module';
import {BuilderModule} from './builder/builder.module';
import {DefaultPage404Module} from './default-page404/default-page404.module';

@PXUI({
  settings: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 0x1099bb,
  },
  modules: [
    {
      route: '/404',
      module: DefaultPage404Module,
    },
    {
        route: '/',
        module: DashboardModule,
    },
  ],
})
export class PixiApp {}

