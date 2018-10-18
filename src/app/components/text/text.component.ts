import {PXComponent, PXElement} from "../../interfaces/pxui.interfaces";
import {Component} from "../../decorators/decorators";

@Component({
  params: {
    'y': 'startY',
    'x': 'startX',
    'text': 'defaultText',
  },
})
export class TextComponent implements PXComponent {

  public text: PIXI.Text;
  public startY: number;
  public startX: number;
  public defaultText: string;

  readonly interference: PXElement;

  pxOnInit(): void {
    this.text = new PIXI.Text(this.defaultText || 'Hello!');
    this.text.x = this.startX || 0;
    this.text.y = this.startY || 0;
    this.interference.addChild(this.text);
  }

  pxOnUpdate(): void {
  }

}
