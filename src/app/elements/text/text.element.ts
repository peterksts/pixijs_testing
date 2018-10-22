import {Element} from '../../decorators/decorators';
import {PXInit} from '../../interfaces/pxui.interfaces';
import {TextWarp} from './text.warp';
import {ComponentData} from '../../decorators/models';

@Element({
  params: {
    'text': 'text',
    'components': 'pxcomponents'
  }
})
export class TextElement extends TextWarp implements PXInit {

  private pxcomponents: ComponentData[];

  pxOnInit(): void {
    this.pxcomponents.forEach(value => {
      this.addComponent(value.component, value.params);
    });
  }



}
