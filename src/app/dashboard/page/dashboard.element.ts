import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';
import {TextureService} from '../../services/texture.service';
import {HttpClient} from '../../services/http-client.service';
import {BranchService} from '../services/branch.service';
import {Metadata} from './dashboard.metadata';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private http: HttpClient;

  pxOnInit(): void {
    this.addChild(new PIXI.Sprite(this.textureService.getTexture('branch')));
  }

}
