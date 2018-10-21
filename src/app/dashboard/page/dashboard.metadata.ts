import {ElementMetadata} from '../../decorators/models';
import {LeftPanelElement} from '../elements/left-panel/left-panel.element';
import {ClickComponent} from '../components/click.component';

export const Metadata: ElementMetadata = {
  components: [
    {
      component: ClickComponent,
    },
  ],
  elements: [
    {
      element: LeftPanelElement,
    },
  ],
};
