import {PXComponent} from '../../interfaces/px-component.model';
import {PXInterfaceComponent} from '../../interfaces/pxui.interfaces';
import {Component, HostListener, HostSubscription, Inject} from '../../decorators/decorators';
import {BranchService} from '../services/branch.service';
import {RouterService} from '../../services/router.service';

@Component({})
export class ClickComponent extends PXComponent implements PXInterfaceComponent {

  @Inject() private routerService: RouterService;

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
    // this.routerService.command('/home');
  }

}
