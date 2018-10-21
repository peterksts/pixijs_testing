import {PXElement, PXInit} from '../../../interfaces/pxui.interfaces';
import {Element, Inject} from '../../../decorators/decorators';
import {BranchService} from '../../services/branch.service';

@Element({
})
export class LeftPanelElement extends PXElement implements PXInit {

  @Inject() private branchService: BranchService;

  pxOnInit(): void {
  }

}
