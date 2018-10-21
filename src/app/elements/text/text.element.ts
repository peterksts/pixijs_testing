import {Element} from "../../decorators/decorators";
import {PXInit} from "../../interfaces/pxui.interfaces";
import {TextWarp} from "./text.warp";

@Element({
    params: {
        'text': 'text',
    }
})
export class TextElement extends TextWarp implements PXInit {

    pxOnInit(): void {
        // const dom = new DomElement({
        //   'position': {x: 300, y: 200},
        // });
        // dom.pxOnInit();
        // this.addChild(dom);
        /*this.addElement(DomElement, {
            'position': {x: 300, y: 300},
        })*/

        // this.on("mousedown", () => {
        //   console.log(11);
        // });
    }

    /*@HostListener('mousedown')
    onClick(event: InteractionEvent) {
        console.log(1);
    }*/

}
