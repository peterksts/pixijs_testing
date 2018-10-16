import {Element} from "./decorators/decorators";
import {PXElement} from "./interfaces/pxui.interfaces";
import {TextComponent} from "./text.component";

@Element({
  components: [
    {
      prop: 'text',
      component: TextComponent,
      params: {
        'x': 50,
        'y': 50,
      },
    },
  ],
  params: {
    'anchor': 'anchor',
  }
})
export class PanelElement extends PXElement {

  constructor() {
    super();
  }

}
