import {Metadata} from "./dashboard.metadata";
import {TextureService} from '../../../services/texture.service';
import {RouterService} from '../../../services/router.service';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {PXInit} from '../../../interfaces/px.interface';
import {Inject} from '../../../decorators/Inject.decorator';
import {Element} from '../../../decorators/element.decorator';

@Element(Metadata)
export class BuilderElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private routerService: RouterService;

  pxOnInit(): void {
    const sp = new PIXI.Sprite(this.textureService.getTexture('smoke'));
    sp.x = 100;
    this.addChild(sp);
    sp.interactive = true;
    sp.buttonMode = true;
    sp.addListener('mousedown', () => {
      this.routerService.command('/');
    });
  }

}
