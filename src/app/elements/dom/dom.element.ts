import {Element, HostListener} from "../../decorators/decorators";
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {TextComponent} from "../../components/text/text.component";
import {Metadata} from "./dom.metadata";

@Element(Metadata)
export class DomElement extends PXElement implements PXInit {

  public textComp: TextComponent;
  public positionEl: {x: number, y: number};
  public speedText: number;
  public textX: number;

  pxOnInit(): void {
    if (this.positionEl) {
      this.textComp.text.x = this.positionEl.x;
      this.textComp.text.y = this.positionEl.y;
    }
    this.interactive = true;
    this.buttonMode = true;
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.scale.x *= 1.25;
    this.scale.y *= 1.25;
  }

}
