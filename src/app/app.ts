import {PXUI} from "./decorators/decorators";
import {DashboardModule} from './dashboard/dashboard.module';
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
        module: DashboardModule,
    },
  ],
})
export class PixiApp {}
