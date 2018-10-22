import {Element, Inject} from '../../decorators/decorators';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';
import {LoaderService} from '../../services/loader.service';
import {HttpClient} from '../../services/http-client.service';
import {BranchService} from '../services/branch.service';
import {Metadata} from './dashboard.metadata';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private http: HttpClient;

  pxOnInit(): void {
    this.addChild(new PIXI.Sprite(this.loaderService.mapTexture['branch']));
  }

}
