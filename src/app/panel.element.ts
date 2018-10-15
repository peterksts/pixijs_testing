import {Element} from "./decorators/decorators";
import {PXElement} from "./interfaces/pxui.interfaces";
import {TextComponent} from "./text.component";

@Element({
  components: [
    {
      component: TextComponent,
      params: {
        'x': 50,
        'y': 50,
      },
    },
  ],
})
export class PanelElement extends PXElement {

  constructor() {
    super();
  }

}
