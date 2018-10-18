import {TextComponent} from "../../components/text/text.component";
import {ElementMetadata} from "../../decorators/models";

export const Metadata: ElementMetadata = {
  params: {
    'position': 'positionEl',
  },
  components: [
    {
      prop: 'textList',
      component: TextComponent,
      params: {
        'x': 200,
        'y': 50,
        'text': 'Dom',
      },
    },
  ],
};
