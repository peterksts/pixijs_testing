import {PXComponent, PXElement} from "./interfaces/pxui.interfaces";
import {Component} from "./decorators/decorators";

@Component({
  params: {
    'y': 'startY',
    'x': 'startX',
    'speed': 'speed',
  },
})
export class TextComponent implements PXComponent {

  public startY: number;
  public startX: number;

  readonly interference: PXElement;

  pxOnInit(): void {
    console.log(this.startY);
    console.log(this.startX);
  }

  pxOnUpdate(): void {
  }

}
