import {PXComponent} from '../../../models/px-component.model';
import {RouterService} from '../../../services/router.service';
import {PXInterfaceComponent} from '../../../interfaces/px.interface';
import {Component} from '../../../decorators/component.decorator';
import {Inject} from '../../../decorators/Inject.decorator';
import {HostListener} from '../../../decorators/host-listener.decorator';

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
    this.routerService.command('/home');
  }

}
