import {Module} from "./decorators/decorators";
import {PXModule, PXUpdate} from "./interfaces/PIXIUI.interfaces";
import {TextComponent} from "./text.component";

@Module({
  components: [
    {
      prop: 'textComponent',
      component: TextComponent,
      params: {
        'startX': 50,
        'startY': 50,
      },
    },
    {
      prop: 'text1Component',
      component: TextComponent,
      params: {
        'startX': 10,
        'startY': 10,
        'speed': 0.1,
      },
    },
    {
      prop: 'text2Component',
      component: TextComponent,
      params: {
        'startX': 30,
        'startY': 30,
        'speed': 0.25,
      },
    }
  ],
})
export class PanelModule extends PXModule implements PXUpdate {

  private textComponent: TextComponent;
  private text1Component: TextComponent;
  private text2Component: TextComponent;
  private speed = 0.25;

  constructor() {
    super();

    setInterval(() => {
      if (this.text1Component.speed === 0.5) {
        this.text1Component.speed = 0.1;
        this.text1Component.basicText.style.fontSize = 22;
      } else {
        this.text1Component.speed = 0.5;
        this.text1Component.basicText.style.fontSize = 26;
      }
    }, 2000);

    setInterval(() => {
      this.speed = this.speed === 0.25 ? -0.25 : 0.25;
    }, 1000);
  }

  pxOnUpdate(): void {
    const components = [this.textComponent, this.text1Component, this.text2Component];
    const max = Math.max(components[0].x, components[1].x, components[2].x);
    const min = Math.min(components[0].x, components[1].x, components[2].x);
    components.forEach(comp => {
      if (comp.x === max) {
        comp.text = '1';
      } else if (comp.x === min) {
        comp.text = '3';
      } else {
        comp.text = '2';
      }
    });

    this.y += this.speed;
  }

}
