import {PXComponent} from '../../../models/px-component.model';
import {RouterService} from '../../../services/router.service';
import {RichTextComponent} from '../../../components/text/richtext.component';
import {TextElement} from '../../../elements/text/text.element';
import {PXInterfaceComponent} from '../../../interfaces/px.interface';
import {Component} from '../../../decorators/component.decorator';
import {Inject} from '../../../decorators/Inject.decorator';

@Component({
  params: {
    'speed': 'speed',
    'minValue': 'minValue',
    'maxValue': 'maxValue',
  }
})
export class RichEffectComponent extends PXComponent implements PXInterfaceComponent {

  @Inject() private routerService: RouterService;
  private richComponent: RichTextComponent;
  private time: number;
  private back: boolean;
  public speed: number;
  public minValue: number;
  public maxValue: number;

  pxOnInit(): void {
    this.richComponent = (<TextElement>this.interference).pxGetComponent<RichTextComponent>();
    this.time = this.minValue;
    this.back = false;
  }

  pxOnDestroy(): void {
  }

  pxOnHide(): void {
  }

  pxOnShow(): void {
  }

  pxOnUpdate(): void {
    if (!this.back) {
      this.time += this.speed;
      if (this.time >= this.maxValue) {
        this.time = this.maxValue;
        this.back = true;
      }
    }
    if (this.back) {
      this.time -= this.speed;
      if (this.time <= this.minValue) {
        this.time = this.minValue;
        this.back = false;
      }
    }
    (<TextElement>this.interference).style.fontSize = this.time;
  }

}
