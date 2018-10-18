import {Element, HostListener} from "../../decorators/decorators";
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {TextComponent} from "../../components/text/text.component";
import {Metadata} from "./panel.metadata";
import {DomElement} from "../dom/dom.element";
import InteractionEvent = PIXI.interaction.InteractionEvent;

@Element(Metadata)
export class PanelElement extends PXElement implements PXInit {

  public textList: TextComponent[];

  pxOnInit(): void {
    const dom = new DomElement({
      'position': {x: 300, y: 200},
    });
    dom.pxOnInit();
    this.addChild(dom);
    this.on("mousedown", () => {
      console.log(11);
    });
  }

  @HostListener('mousedown')
  onClick(event: InteractionEvent) {
    console.log(1);
  }

}
