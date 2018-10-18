import {Element} from "../../decorators/decorators";
import {PXElement, PXInit} from "../../interfaces/pxui.interfaces";
import {TextComponent} from "../../components/text/text.component";
import {Metadata} from "./dom.metadata";

@Element(Metadata)
export class DomElement extends PXElement implements PXInit {

  public textList: TextComponent;
  public positionEl: {x: number, y: number};

  pxOnInit(): void {
    if (this.positionEl) {
      this.textList.text.x = this.positionEl.x;
      this.textList.text.y = this.positionEl.y;
    }
  }

}
