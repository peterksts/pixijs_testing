import {VoidWrap} from "../../wrappers/void.wrap";
import {PXInit} from '../../interfaces/px.interface';
import {Element} from '../../decorators/element.decorator';
import {ComponentData} from "../../interfaces/metadata.interface";

@Element({
  params: {
    'components': 'pxcomponents'
  }
})
export class VoidElement extends VoidWrap implements PXInit {

  private pxcomponents: ComponentData[];

  pxOnInit(): void {
    this.pxcomponents.forEach(value => {
      this.addComponent(value.component, value.params);
    });
  }
}
