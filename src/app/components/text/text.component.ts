import {PXComponent, PXElement, PXEventEmitter} from "../../interfaces/pxui.interfaces";
import {Component} from "../../decorators/decorators";

@Component({
  params: {
    'y': 'startY',
    'x': '_startX',
    'text': 'defaultText',
    'speed': 'speed',
    'changeX': 'changeX',
  },
})
export class TextComponent implements PXComponent {

  public text: PIXI.Text;
  public startY = 0;
  public startX = 0;
  public defaultText = 'Hello!';
  public speed = 0;
  public changeX = new PXEventEmitter<number>();
  set _startX(x) {
    if (this.text)  {
      this.text.x = x;
    } else {
      this.startX = x;
    }
  }

  readonly interference: PXElement;
  public pxActive: boolean;

  pxOnInit(): void {
    this.text = new PIXI.Text(this.defaultText);
    this.text.x = this.startX;
    this.text.y = this.startY;
    this.interference.addChild(this.text);
    window.addEventListener('wheel', (d: WheelEvent) => {
      this.text.x += d.deltaX;
      this.text.y += d.deltaY;
    });
  }

  pxOnUpdate(): void {
    this.text.x += this.speed;
    this.changeX.emit(this.text.x);
  }

  pxOnDestroy(): void {
  }

  pxOnHide(): void {
  }

  pxOnShow(): void {
  }

}
