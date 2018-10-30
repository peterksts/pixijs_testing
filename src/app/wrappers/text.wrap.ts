import * as PIXI from 'pixi.js';
import {ComponentData, ElementData, SettingsElement} from '../interfaces/metadata.interface';
import {pushTarget} from '../tools/push-target.tool';
import {pushParams} from '../tools/push-params.tool';
import {PXComponent} from '../models/px-component.model';
import {AnchorEnum} from '../enums/anchor.enum';
import {EventTypes} from '../types/event-types.type';

export class TextWrap extends PIXI.Text {

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
            pushTarget(this, comp.prop, c);
        });

        this.__pxElementClasses.forEach( elem => {
            const e = this.addElement(elem.element, elem.params);
            pushTarget(this, elem.prop, e);
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

  public pxGetComponents <T>(typeComponent): T[] {
    return this.__pxComponents.filter(value => value instanceof typeComponent);
  }

  public pxGetComponent <T>(typeComponent): T {
    return this.__pxComponents.find(value => value instanceof typeComponent);
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
