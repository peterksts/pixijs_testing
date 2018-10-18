import {TextComponent} from "../../components/text/text.component";
import {ElementMetadata} from "../../decorators/models";
import {DomElement} from "../dom/dom.element";

export const Metadata: ElementMetadata = {
  components: [
    {
      prop: 'textList[]',
      component: TextComponent,
      params: {
        'x': 50,
        'y': 50,
      },
    },
    {
      prop: 'textList[]',
      component: TextComponent,
      params: {
        'x': 50,
        'y': 75,
      },
    },
    {
      prop: 'textList[]',
      component: TextComponent,
      params: {
        'x': 50,
        'y': 100,
      },
    },
  ],
  elements: [
    {
      element: DomElement,
      params: {
        'position': {x: 300, y: 150},
      },
    },
  ]
};
