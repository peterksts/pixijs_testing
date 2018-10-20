import {Element, HostListener, HostSubscription} from '../../decorators/decorators';
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {TextComponent} from "../../components/text/text.component";
import {Metadata} from "./panel.metadata";
import InteractionEvent = PIXI.interaction.InteractionEvent;
import {Subject} from 'rxjs';

@Element(Metadata)
export class PanelElement extends PXElement implements PXInit {

  public textList: TextComponent[];
  public sub = {su: new Subject<any>()};

  pxOnInit(): void {
  }

  @HostListener('mouseover')
  onMouseOver(event: InteractionEvent) {
  }

  @HostSubscription('sub.su')
  changeTask(data: any) {
    console.log(data);
  }

}
