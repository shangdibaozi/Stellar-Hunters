import { Matrix3 } from "./Matrix2d";
import { Node } from "./Node";
import { Rect } from "./rect";


export class Sprite extends Node {
    img: HTMLImageElement | null = null;
    isLoadingImg: boolean = true;
    public _url: string = "";
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        if(this._url == value) {
            return;
        }
        this._url = value;
        this.img = new Image();
        this.img.src = value;
        this.img.onload = () => {
            this.isLoadingImg = false;
            this.width = this.img!.width;
            this.height = this.img!.height;
            this.rect.width = this.img!.width;
            this.rect.height = this.img!.height;
        }
    }
    

    // public constructor(url: string) {
    //     this.img = new Image();
    //     this.img.src = url;
    //     this.img.onload = () => {
    //         this.isLoadingImg = false;
    //         this.node.width = this.img!.width;
    //         this.node.height = this.img!.height;
    //         this.node.rect.width = this.img!.width;
    //         this.node.rect.height = this.img!.height;
    //     }
    // }

    protected render(ctx: CanvasRenderingContext2D) {
        if(this.img == null || this.isLoadingImg || !this.active){
            return;
        }
        
        let width = this.img.width * this.scaleX
        let height = this.img.height * this.scaleY;
        let x = this.position.x - width * this.anchor.x;
        let y = this.position.y - height * this.anchor.y;
        this.rect.position.x = x;
        this.rect.position.y = y;
        
        let angle = this.matrix.angle;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle);
        ctx.drawImage(this.img, -width * this.anchor.x, -height * this.anchor.y, width, height);
        ctx.rotate(-angle);
        ctx.translate(-this.position.x, -this.position.y);
    }
}