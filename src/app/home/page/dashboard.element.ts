import {Element, HostSubscription, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {Metadata} from "./dashboard.metadata";
import {LoaderService} from '../../services/loader.service';
import {BranchService} from '../services/branch.service';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private branchService: BranchService;

  pxOnInit(): void {
    const sp = new PIXI.Sprite(this.loaderService.mapTexture['branch']);
    sp.x = 100;
    this.addChild(sp);
    window.addEventListener('wheel', (d: WheelEvent) => {
      sp.y += d.deltaY;
    });
  }

  @HostSubscription('branchService.branchChange')
  changeBranch(data: string) {
    console.log(data);
  }

}
