import {Element} from '../../../decorators/element.decorator';
import {PXInit} from '../../../interfaces/px.interface';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {RouterElement} from '../../../elements/router/router.element';

@Element({
  elements: [
    {
      element: RouterElement,
    }
  ]
})
export class RootElement extends PXElement implements PXInit {

  pxOnInit(): void {
  }

}
