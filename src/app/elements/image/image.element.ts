import {TextWrap} from '../../wrappers/text.wrap';
import {ComponentData} from '../../interfaces/metadata.interface';
import {PXInit} from '../../interfaces/px.interface';
import {Element} from '../../decorators/element.decorator';

@Element({
  params: {
    'texture': 'pxtexture',
    'components': 'pxcomponents'
  }
})
export class TextElement extends TextWrap implements PXInit {

  private pxtexture: PIXI.Texture;
  private pxcomponents: ComponentData[];

  pxOnInit(): void {
    this.texture = this.pxtexture;
    this.pxcomponents.forEach(value => {
      this.addComponent(value.component, value.params);
    });
  }

}
