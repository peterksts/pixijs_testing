import {Element} from '../../decorators/decorators';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';

@Element({})
export class Page404Element extends PXElement implements PXInit {

  private style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
  });

  pxOnInit(): void {
    const text = new PIXI.Text('page not found');
    this.addChild(text);
    text.style = this.style;
    text.style.fontSize = 20;
    text.x = window.innerWidth / 2 - 85;
    text.y = window.innerHeight / 2;
  }

}
