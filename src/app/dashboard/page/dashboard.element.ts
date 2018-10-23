import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';
import {TextureService} from '../../services/texture.service';
import {HttpClient} from '../../services/http-client.service';
import {Metadata} from './dashboard.metadata';
import {SoundService} from '../../services/sound.service';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private soundService: SoundService;
  @Inject() private http: HttpClient;

  pxOnInit(): void {
    this.addChild(new PIXI.Sprite(this.textureService.getTexture('branch')));
    this.soundService.getSound('wild_boar');
  }

}
