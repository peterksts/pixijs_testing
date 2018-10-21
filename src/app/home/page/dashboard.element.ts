import {Element, HostSubscription, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {Metadata} from "./dashboard.metadata";
import {LoaderService} from '../../services/loader.service';
import {BranchService} from '../services/branch.service';
import {RouterService} from '../../services/router.service';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private branchService: BranchService;
  @Inject() private routerService: RouterService;

  pxOnInit(): void {
    const sp = new PIXI.Sprite(this.loaderService.mapTexture['branch']);
    sp.x = 100;
    this.addChild(sp);
    window.addEventListener('wheel', (d: WheelEvent) => {
      sp.y += d.deltaY;
    });
    sp.interactive = true;
    sp.buttonMode = true;
    sp.addListener('mousedown', () => {
      this.routerService.command('/builder');
    });
  }

  @HostSubscription('branchService.branchChange')
  changeBranch(data: string) {
    console.log(data);
  }

}
