import * as PIXI from "pixi.js";
import {AnchorEnum, ComponentData, ElementData, EventTypes, SettingsElement} from "../../decorators/models";
import {Element, pushElOrComp, pushParams} from "../../decorators/decorators";
import EventEmitter = PIXI.utils.EventEmitter;
import {PXComponent} from '../../interfaces/px-component.model';

export class TextWarp extends PIXI.Text {

    private __pxEvents: Array<{event: EventTypes; fn: Function}> = [];
    private __pxComponentClasses: Array<ComponentData>;
    private __pxElementClasses: Array<ElementData>;
    private __pxSettings: SettingsElement;
    private __pxParamsMap: {[prop: string]: string};
    private __pxComponents: Array<PXComponent | any> = [];

    private __pxAnchor = {
        x: 0,
        y: 0,
        position: AnchorEnum.Top, // default
    };
    // set anchor(anchor: AnchorEnum) {
    // }
    //
    // get anchor(): AnchorEnum {
    //   return this.__pxAnchor.position;
    // }

    constructor() {
        super();
        const obj = new PIXI.Text();
        (<any>Object).assign(this, obj);

        this.__pxComponentClasses.forEach( comp => {
            const c = this.addComponent(comp.component, comp.params);
            pushElOrComp(this, comp.prop, c);
        });

        this.__pxElementClasses.forEach( elem => {
            const e = this.addElement(elem.element, elem.params);
            pushElOrComp(this, elem.prop, e);
        });

      (<any>this).__proto__.__pxEvents && (<any>this).__proto__.__pxEvents.forEach(ev => {
            this.addListener(<any>ev.event, <any>ev.fn);
        });
    }

    private __pxComponentsUpdate(): void {
        this.__pxComponents.forEach(comp => {
            comp.pxActive && comp.pxOnUpdate();
        });
        this.children.forEach(child => {
            (<any>child).__pxComponentsUpdate && (<any>child).__pxComponentsUpdate();
        });
    }

    public addComponent(comp: PXComponent | any, params?: {[key: string]: any}): any {
        comp = new comp();
        pushParams(this, comp, params);
        comp.interference = this;
        comp.pxOnInit();
        this.__pxComponents.push(comp);
        return comp;
    }

    public addElement(elem: PIXI.Container | any, params?: {[key: string]: any}): any {
        elem = new elem();
        pushParams(this, elem, params);
        elem.pxOnInit && elem.pxOnInit();
        this.addChild(elem);
        return elem;
    }

}
