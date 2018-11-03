import {PXComponent} from '../../../models/px-component.model';
import {RouterService} from '../../../services/router.service';
import {PXInterfaceComponent} from '../../../interfaces/px.interface';
import {Component} from '../../../decorators/component.decorator';
import {Inject} from '../../../decorators/Inject.decorator';
import {HostListener} from '../../../decorators/host-listener.decorator';
import * as PIXI from "pixi.js";

@Component({
  params: {
    'sprite': 'sprite',
    'quad': 'quad',
  }
})
export class ProjectionComponent extends PXComponent implements PXInterfaceComponent {

  @Inject() private routerService: RouterService;
  public sprite: PIXI.projection.Sprite2s;
  public quad;

  pxOnInit(): void {

  }

  pxOnDestroy(): void {
  }

  pxOnHide(): void {
  }

  pxOnShow(): void {
  }

  pxOnUpdate(): void {
    this.sprite.proj.mapBilinearSprite(this.sprite, this.quad);
  }


}
