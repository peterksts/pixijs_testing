import {Metadata} from './test.metadata';
import * as PIXI from 'pixi.js';
import 'pixi-projection';
import {TextureService} from '../../../services/texture.service';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {PXInit} from '../../../interfaces/px.interface';
import {Element} from '../../../decorators/element.decorator';
import {Inject} from '../../../decorators/Inject.decorator';
import {ProjectionComponent} from "../components/projection.component";
import {pushTarget} from "../../../tools/push-target.tool";

@Element(Metadata)
export class TestElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;

  private bunny:PIXI.Sprite;

  pxOnInit(): void {
    var w = 200, h = 200;

    function createSquare(x, y):DragSprite {
      let square:DragSprite = new DragSprite();
      square.texture = PIXI.Texture.WHITE;
      square.tint = 0xff0000;
      //square.factor = 1;
      square.anchor.set(0.5);
      square.position.set(x, y);
      return square;
    }

    var squares = [
      createSquare(w - 150, h - 150),
      createSquare(w + 150, h - 150),
      createSquare(w + 150, h + 150),
      createSquare(w - 150, h + 150)
    ];

    var quad = squares.map(function (s:any) {
      return s.position
    });

//add sprite itself
    let containerSprite: PIXI.projection.Sprite2s = new PIXI.projection.Sprite2s(this.textureService.getTexture('branch'));
    containerSprite.anchor.set(0.5);

    this.addChild(containerSprite);
    /*squares.forEach(function (s:PIXI.Container) {
      this.addChild(s);
    });*/
    this.addChild(squares[0]);
    this.addChild(squares[1]);
    this.addChild(squares[2]);
    this.addChild(squares[3]);

// Listen for animate update
    /*app.ticker.add(function (delta) {
      containerSprite.proj.mapBilinearSprite(containerSprite, quad);
    });*/
    /*let comp:ProjectionComponent = new ProjectionComponent();
    comp.sprite = containerSprite;
    comp.quad = quad;*/
    this.addComponent(ProjectionComponent,{
      'sprite': containerSprite,
      'quad': quad,
    });

    /*squares.forEach(function (s) {
      addInteraction(s);
    });*/
    this.addInteraction(squares[0]);
    this.addInteraction(squares[1]);
    this.addInteraction(squares[2]);
    this.addInteraction(squares[3]);

// let us add sprite to make it more funny

    this.bunny = new PIXI.projection.Sprite2s(this.textureService.getTexture('branch'));
    this.bunny.anchor.set(0.5);
    containerSprite.addChild(this.bunny);

    //this.addInteraction(this.bunny);

// === INTERACTION CODE  ===



  }


  toggle(obj):void {
  }

  snap(obj):void {
      obj.position.x = Math.min(Math.max(obj.position.x, 0), 400);
      obj.position.y = Math.min(Math.max(obj.position.y, 0), 400);
  }

  addInteraction(obj:DragSprite):void  {
    obj.interactive = true;
    obj
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);
  }

  onDragStart(event):void  {
    let obj2:DragSprite = event.currentTarget;
    obj2.dragData = event.data;
    obj2.dragging = 1;
    obj2.dragPointerStart = event.data.getLocalPosition(obj2.parent);
    obj2.dragObjStart = new PIXI.Point();
    obj2.dragObjStart.copy(obj2.position);
    obj2.dragGlobalStart = new PIXI.Point();
    obj2.dragGlobalStart.copy(event.data.global);
  }

  onDragEnd(event):void  {
    var obj:DragSprite = event.currentTarget;
    /*if (obj.dragging == 1) {
      this.toggle(obj);
    } else {
      this.snap(obj);
    }*/
    obj.dragging = 0;
    obj.dragData = null;
    // set the interaction data to null
  }

  onDragMove(event):void  {
    var obj:DragSprite = event.currentTarget;
    if (!obj.dragging) return;
    var data = obj.dragData; // it can be different pointer!
    if (obj.dragging == 1) {
      // click or drag?
      if (Math.abs(data.global.x - obj.dragGlobalStart.x) +
        Math.abs(data.global.y - obj.dragGlobalStart.y) >= 3) {
        // DRAG
        obj.dragging = 2;
      }
    }
    if (obj.dragging == 2) {
      var dragPointerEnd = data.getLocalPosition(obj.parent);
      // DRAG
      obj.position.set(
        obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
        obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
      );
    }
  }


}

class DragSprite extends PIXI.Sprite{
  public dragging:number;
  public dragData:any;
  public dragObjStart:any;
  public dragGlobalStart:any;
  public dragPointerStart:any;
  constructor() {
    super();
    const obj = new PIXI.Sprite();
    (<any>Object).assign(this, obj);
  }
}