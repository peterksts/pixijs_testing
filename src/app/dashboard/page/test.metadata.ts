import {ElementMetadata} from '../../decorators/models';
import {ClickComponent} from '../components/click.component';
import {LeftPanelElement} from '../elements/left-panel/left-panel.element';
import {TextElement} from '../../elements/text/text.element';
import {RichTextComponent} from '../../components/text/richtext.component';

export const Metadata: ElementMetadata = {
  components: [
    {
      component: ClickComponent,
    },
  ],
  elements: [
    {
      element: TextElement,
      params: {
        'text': 'Richi',
        'components': [
          {
            component: RichTextComponent,
          },
        ],
      },
    },
  ],
};
