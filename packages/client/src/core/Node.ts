import { Matrix3 } from "./Matrix2d";
import { Rect } from "./rect";
import { Vec2 } from "./vec";

export class Node {
    public name: string = '';
    public isDirty: boolean = true;
    _position: Vec2 = Vec2.zero();
    public get position() {
        return this._position;
    }
    localPosition: Vec2 = Vec2.zero();
    _scale: Vec2 = Vec2.one();
    public set scale(val: number) {
        if(this._scale.x == val && this._scale.y == val) {
            return;
        }
        this._scale.x = val;
        this._scale.y = val;
        this.matrix.setScale(val, val);
    }
    public get scaleX() {
        return this.matrix.scaleX;
    }
    public get scaleY() {
        return this.matrix.scaleY;
    }
    /**
     * canvas的坐标原点在左上角，且y轴向下为正方向。所以y为0表示y轴锚点在顶部，1为在底部
     */
    anchor: Vec2 = Vec2.center();
    _width: number = 0;
    public get width() {
        return this._width;
    }
    public set width(value: number) {
        if(this._width == value) {
            return;
        }
        this._width = value;
        this.isDirty = true;
    }
    _height: number = 0;
    public get height() {
        return this._height;
    }
    public set height(value: number) {
        if(this._height == value) {
            return;
        }
        this._height = value;
        this.isDirty = true;
    }
    parent: Node | null = null;

    public children: Node[] = [];

    matrix: Matrix3 = new Matrix3();
    _degree: number = 0;
    get degree() {
        return this._degree;
    }
    set degree(val: number) {
        if(val == this._degree){
            return;
        }
        this._degree = val;
        this.isDirty = true;
    }

    rect: Rect = new Rect();

    _active: boolean = true;
    public get active() {
        return this._active;
    }
    public set active(value: boolean) {
        if(this._active == value) {
            return;
        }
        this._active = value;
        this.isDirty = true;
    }

    queue: Node[] = [];

    public constructor(name: string = '') {
        this.name = name;
    }

    public addChild(child: Node) {
        child.parent = this;
        this.children.push(child);
    }

    // public setPosition(x: number, y: number) {
    //     this._position.set(x, y);
    //     this.isDirty = true;
    // }

    public setLocalPosition(x: number, y: number) {
        this.localPosition.set(x, y);
        this.isDirty = true;
    }

    public setScale(x: number, y: number) {
        this._scale.set(x, y);
        this.isDirty = true;
    }

    public setAnchor(x: number, y: number) {
        this.anchor.set(x, y);
        this.isDirty = true;
    }

    updateMatrix() {
        if(this.isDirty) {
            this.matrix.set(this._scale.x, this._scale.y, this._degree, this.localPosition.x, this.localPosition.y);
            if(this.parent != null) {
                this.parent.matrix.apply(this.localPosition, this._position);
                Matrix3.multi(this.parent.matrix, this.matrix, this.matrix);
            }
        }
    }

    update(ctx: CanvasRenderingContext2D) {
        if(!this.active) {
            return;
        }
        this.updateMatrix();
        this.render(ctx);
        for(let i = 0; i < this.children.length; i++) {
            if(this.isDirty) {
                this.children[i].isDirty = true;
            }
        }

        this.isDirty = false;
    }

    process(ctx: CanvasRenderingContext2D) {
        this.queue.length = 0;
        this.queue.push(this);
        let i = 0;
        while(i < this.queue.length) {
            let node = this.queue[i++];
            for(let j = 0; j < node.children.length; j++) {
                if(node.children[j].active) {
                    this.queue.push(node.children[j]);
                }
            }
        }
        for(let i = 0; i < this.queue.length; i++) {
            this.queue[i].update(ctx);
        }
    }

    protected render(ctx: CanvasRenderingContext2D) {

    }

    public onClick(event: MouseEvent) {
        // event.clientX, event.clientY
        if(this.rect.intersect(event.clientX, event.clientY)) {
            
        }
    }
}