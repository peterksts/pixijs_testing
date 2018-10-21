import {PXElement, PXEventEmitter, PXInterfaceComponent} from '../../interfaces/pxui.interfaces';
import {Component} from "../../decorators/decorators";
import {TextElement} from "../../elements/text/text.element";

@Component({
    params: {
    },
})
export class RichTextComponent implements PXInterfaceComponent {

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
