import * as PIXI from 'pixi.js';
import {PXComponent} from "./interfaces/PIXIUI.interfaces";
import {Component} from "./decorators/decorators";

@Component({
  params: {
    'y': 'startY',
    'x': 'startX',
    'speed': 'speed',
  },
})
export class TextComponent extends PXComponent {

  public basicText: PIXI.Text;
  public startY: number = 20;
  public startX: number = 20;
  public speed: number = 0.2;
  set text(text: string) {
    this.basicText.text = text;
  }

  constructor() { super(); }

  pxOnInit(): void {
    this.basicText = new PIXI.Text('1');
    this.x = this.startX;
    this.y = this.startY;

    this.addChild(this.basicText);
  }

  pxOnUpdate(): void {
    this.x += this.speed;
  }

}
