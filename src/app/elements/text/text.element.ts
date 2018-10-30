import {TextWrap} from '../../wrappers/text.wrap';
import {ComponentData} from '../../interfaces/metadata.interface';
import {PXInit} from '../../interfaces/px.interface';
import {Element} from '../../decorators/element.decorator';

@Element({
  params: {
    'text': 'text',
    'components': 'pxcomponents'
  }
})
export class TextElement extends TextWrap implements PXInit {

  private pxcomponents: ComponentData[];

  pxOnInit(): void {
    this.pxcomponents.forEach(value => {
      this.addComponent(value.component, value.params);
    });
  }

}
