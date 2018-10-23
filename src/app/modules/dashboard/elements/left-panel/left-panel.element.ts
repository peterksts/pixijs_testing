import {BranchService} from '../../services/branch.service';
import {PXElement} from '../../../../wrappers/px-element.wrap';
import {PXInit} from '../../../../interfaces/px.interface';
import {Element} from '../../../../decorators/element.decorator';
import {Inject} from '../../../../decorators/Inject.decorator';

@Element({
})
export class LeftPanelElement extends PXElement implements PXInit {

  @Inject() private branchService: BranchService;

  pxOnInit(): void {
  }

}
