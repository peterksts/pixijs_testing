import {TextComponent} from "../../components/text/text.component";
import {ElementMetadata} from "../../decorators/models";

export const Metadata: ElementMetadata = {
  params: {
    'position': 'positionEl',
  },
  components: [
    {
      prop: 'textComp',
      component: TextComponent,
      params: {
        'y': 50,
        'text': 'Dom',
        'speed': 0,
        'x': '[textX]',
        'changeX': '(textX)',
      },
    },
  ],
};
