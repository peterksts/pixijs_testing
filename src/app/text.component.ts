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

  readonly interference: PXElement;

  pxOnInit(): void {
  }

  pxOnUpdate(): void {
  }

}
