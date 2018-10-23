import {VoidWarp} from "../../wrappers/void.warp";
import {PXInit} from '../../interfaces/px.interface';
import {Element} from '../../decorators/element.decorator';

@Element({
})
export class VoidElement extends VoidWarp implements PXInit {

  pxOnInit(): void {
  }

}
