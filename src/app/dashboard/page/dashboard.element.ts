import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {Metadata} from "./dashboard.metadata";
import {LoaderService} from '../../services/loader.service';
import {HttpClient} from '../../services/http-client.service';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private http: HttpClient;

  pxOnInit(): void {
    this.addChild(new PIXI.Sprite(this.loaderService.mapTexture['branch']));
  }

}
