import {PXUI} from './decorators/px-ui.decorator';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {BuilderModule} from './modules/builder/builder.module';
import {DefaultPage404Module} from './modules/default-page404/default-page404.module';
import {TestModule} from './modules/test/test.module';

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
			module: TestModule,
		},
	],
})
export class App {}
