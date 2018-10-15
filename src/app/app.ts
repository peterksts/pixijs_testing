import {PXUI} from "./decorators/decorators";
import {PanelModule} from "./panel.module";

@PXUI({
  settings: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 0x1099bb,
  },
  modules: [
    {
      route: '/',
      module: PanelModule,
      params: {},
      prop: 'panelModule',
    }
  ],
})
export class PixiApp {

  private panelModule: PanelModule;

  constructor() {
  }

}
