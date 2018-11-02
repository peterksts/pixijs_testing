import {PXInit} from '../../interfaces/px.interface';
import {Element} from '../../decorators/element.decorator';
import {VoidWrap} from '../../wrappers/void.wrap';
import {PX} from '../../px';

@Element({
  params: {}
})
export class RouterElement extends VoidWrap implements PXInit {

  pxOnInit(): void {
    PX.routerElement = this;
  }

}
