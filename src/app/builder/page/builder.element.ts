import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {Metadata} from "./dashboard.metadata";
import {LoaderService} from '../../services/loader.service';
import {RouterService} from '../../services/router.service';

@Element(Metadata)
export class BuilderElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private routerService: RouterService;

  pxOnInit(): void {
    const sp = new PIXI.Sprite(this.loaderService.mapTexture['smoke']);
    sp.x = 100;
    this.addChild(sp);
    sp.interactive = true;
    sp.buttonMode = true;
    sp.addListener('mousedown', () => {
      this.routerService.command('/');
    });
  }

}
