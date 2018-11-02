import {PXUI} from './decorators/px-ui.decorator';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {BuilderModule} from './modules/builder/builder.module';
import {DefaultPage404Module} from './modules/default-page404/default-page404.module';
import {TestModule} from './modules/test/test.module';
import {RootModule} from './modules/root/root.module';

@PXUI({
	settings: {
		width: 'auto',
		height: 'auto',
		backgroundColor: 0x1099bb,
	},
  page404: DefaultPage404Module,
  root: RootModule,
	modules: [
		{
			route: '/',
			module: DashboardModule,
		},
    {
      route: '/builder',
      module: BuilderModule,
    },
    {
      route: '/test',
      module: TestModule,
    },
	],
})
export class App {}
