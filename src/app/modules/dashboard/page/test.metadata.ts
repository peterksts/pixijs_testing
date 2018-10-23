import {ElementMetadata} from '../../../interfaces/metadata.interface';
import {ClickComponent} from '../components/click.component';
import {TextElement} from '../../../elements/text/text.element';
import {RichTextComponent} from '../../../components/text/richtext.component';
import {RichEffectComponent} from '../components/richtexteffects.components';

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
        'text': 'Wow!!!',
        'components': [
          {
            component: RichTextComponent,
          },
          {
            component: RichEffectComponent,
            params: {
              speed: 1,
              minValue: 18,
              maxValue: 78,
            }
          },
        ],
      },
    },
  ],
};
