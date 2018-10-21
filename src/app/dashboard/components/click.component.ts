import {PXComponent} from '../../interfaces/px-component.model';
import {PXInterfaceComponent} from '../../interfaces/pxui.interfaces';
import {Component, HostListener, HostSubscription, Inject} from '../../decorators/decorators';
import {BranchService} from '../services/branch.service';

@Component({})
export class ClickComponent extends PXComponent implements PXInterfaceComponent {

  @Inject() private branchService: BranchService;

  pxOnInit(): void {
    this.interference.interactive = true;
    this.interference.buttonMode = true;
  }

  pxOnDestroy(): void {
  }

  pxOnHide(): void {
  }

  pxOnShow(): void {
  }

  pxOnUpdate(): void {
  }

  @HostListener('mousedown')
  onClick() {
    console.log('click');
  }

  @HostSubscription('branchService.branchChange')
  changeBranch(data) {
    console.log(data);
  }

}
