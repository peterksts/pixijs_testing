import {APP, PXUI} from "./decorators/decorators";
import {PanelElement} from "./elements/panel/panel.element";
import {VoidWarp} from "./elements/void/void.warp";
import {TextWarp} from "./elements/text/text.warp";
import {VoidElement} from "./elements/void/void.element";
import {TextElement} from "./elements/text/text.element";
import {DomElement} from "./elements/dom/dom.element";
import {RichTextComponent} from "./components/text/richtext.component";

@PXUI({
    settings: {
        width: 'auto',
        height: 'auto',
        backgroundColor: 0x1099bb,
    },
    modules: [
        {
            route: '/',
            prop: 'root',
            module: VoidElement,
            params: {}
        }
    ],
})
export class PixiApp {

    private root: PanelElement;

  constructor() {
    const obj: TextElement = this.root.addElement(TextElement, {
      'text': 'Bad Text',
      });

      let comp: RichTextComponent;
    setTimeout(() => {
        comp = obj.addComponent(RichTextComponent);
        obj.text = 'Good Text';
    }, 2000);

      setTimeout(() => {
          comp.style.fontSize = 70;
      }, 4000);
  }

}
