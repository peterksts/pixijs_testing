import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {Metadata} from "./dashboard.metadata";
import {LoaderService} from '../../services/loader.service';
import {BranchService} from '../services/branch.service';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private branchService: BranchService;

  pxOnInit(): void {
    this.addChild(new PIXI.Sprite(this.loaderService.mapTexture['branch']));
    this.branchService.branchChange.next('Hello!');
  }

}
