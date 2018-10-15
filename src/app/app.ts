import {PXUI} from "./decorators/decorators";
import {PanelElement} from "./panel.element";

@PXUI({
  settings: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 0x1099bb,
  },
  modules: [
    {
      route: '/',
      module: PanelElement,
      params: {},
      prop: 'panelElement',
    }
  ],
})
export class PixiApp {

  private panelElement: PanelElement;

  constructor() {
  }

}
