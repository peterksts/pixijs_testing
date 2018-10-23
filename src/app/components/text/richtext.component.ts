import {TextElement} from "../../elements/text/text.element";
import {Component} from '../../decorators/component.decorator';
import {PXInterfaceComponent} from '../../interfaces/px.interface';
import {PXComponent} from '../../models/px-component.model';

@Component({
    params: {
    },
})
export class RichTextComponent extends PXComponent implements PXInterfaceComponent {

    public style = new PIXI.TextStyle({
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

    readonly interference: TextElement;
    public pxActive: boolean;

    pxOnInit(): void {
        this.interference.style = this.style;
    }

    pxOnUpdate(): void {
    }

    pxOnDestroy(): void {
    }

    pxOnHide(): void {
    }

    pxOnShow(): void {
    }

}
